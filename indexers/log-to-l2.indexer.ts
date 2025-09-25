import { defineIndexer } from "apibara/indexer";
import { useLogger } from "apibara/plugins";
import { drizzleStorage, useDrizzleStorage } from "@apibara/plugin-drizzle";
import { drizzle } from "@apibara/plugin-drizzle";
import { B256, EvmStream } from "@apibara/evm";
import type { ApibaraRuntimeConfig } from "apibara/types";
import * as schema from "../lib/schema";
import { encodeEventTopics, decodeEventLog, parseAbi } from "viem";

const abi = parseAbi([
  "event LogMessageToL2(address indexed fromAddress, uint256 indexed toAddress, uint256 indexed selector,  uint256[] payload, uint256 nonce, uint256 fee)",
]);

export default function (runtimeConfig: ApibaraRuntimeConfig) {
  const { startingBlock, streamUrl } = runtimeConfig["log-message-to-l2"];
  const db = drizzle({
    schema,
  });

  return defineIndexer(EvmStream)({
    streamUrl,
    finality: "accepted",
    startingBlock: BigInt(startingBlock),
    filter: {
      header: "on_data",
      logs: [
        {
          address: "0xF338cad020D506e8e3d9B4854986E0EcE6C23640",
          transactionStatus: "succeeded",
          topics: encodeEventTopics({
            abi,
            eventName: "LogMessageToL2",
          }) as `0x${string}`[],
        },
      ],
    },
    plugins: [
      drizzleStorage({ db, migrate: { migrationsFolder: "./drizzle" } }),
    ],
    async transform({ endCursor, finality, block, context }) {
      const logger = useLogger();

      logger.info(
        "Transforming block | orderKey: ",
        endCursor?.orderKey,
        " | finality: ",
        finality,
      );

      for (const log of block.logs) {

        let timestamp = block.header.timestamp;

        const decodedLog = decodeEventLog({
          abi,
          data: log.data,
          topics: log.topics as [B256, ...B256[]],
        });

        logger.info(
          "Decoded log:",
          JSON.stringify(decodedLog, (key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          ),
        );

        await db.insert(schema.LogMessageToL2).values({
          fromAddress: decodedLog.args.fromAddress.toString(),
          toAddress: decodedLog.args.toAddress.toString(),
          selector: decodedLog.args.selector.toString(),
          payload: JSON.stringify(decodedLog.args.payload.toString()),
          nonce: decodedLog.args.nonce.toString(),
          fee: decodedLog.args.fee.toString(),
          endCursor: endCursor?.orderKey.toString(),
          uniqueKey: endCursor?.uniqueKey,
          timestamp: timestamp,
        });
      }
    },
  });
}
