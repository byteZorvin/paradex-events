import { defineIndexer } from "apibara/indexer";
import { useLogger } from "apibara/plugins";
import { drizzleStorage, useDrizzleStorage } from "@apibara/plugin-drizzle";
import { drizzle } from "@apibara/plugin-drizzle";
import { B256, EvmStream } from "@apibara/evm";
import type { ApibaraRuntimeConfig } from "apibara/types";
import * as schema from "../lib/schema";
import { encodeEventTopics, decodeEventLog, parseAbi } from "viem";

const abi = parseAbi([
  "event ConsumedMessageToL1(uint256 indexed fromAddress, address indexed toAddress, uint256[] payload)",
]);

export default function (runtimeConfig: ApibaraRuntimeConfig) {
  const { startingBlock, streamUrl } = runtimeConfig["consumed-message-to-l1"];
  const db = drizzle({
    schema,
  });

  return defineIndexer(EvmStream)({
    streamUrl,
    finality: "accepted",
    startingBlock: BigInt(startingBlock),
    filter: {
      header: "on_data_or_on_new_block",
      logs: [
        {
          address: "0xF338cad020D506e8e3d9B4854986E0EcE6C23640",
          transactionStatus: "succeeded",
          topics: encodeEventTopics({
            abi,
            eventName: "ConsumedMessageToL1",
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
          "Timestamp: ",
          new Date(Number(block.header.timestamp) * 1000),
        );

        await db.insert(schema.ConsumedMessageToL1).values({
          fromAddress: decodedLog.args.fromAddress.toString(),
          toAddress: decodedLog.args.toAddress,
          payload: JSON.stringify(decodedLog.args.payload.map(p => p.toString())),
          endCursor: endCursor?.orderKey.toString(),
          uniqueKey: endCursor?.uniqueKey,
          timestamp: block.header.timestamp,
        });
      }
    },
  });
}
