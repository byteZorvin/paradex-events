import { defineIndexer } from "apibara/indexer";
import { useLogger } from "apibara/plugins";
import { drizzleStorage } from "@apibara/plugin-drizzle";
import { drizzle } from "@apibara/plugin-drizzle";
import { EvmStream } from "@apibara/evm";
import type { ApibaraRuntimeConfig } from "apibara/types";
import * as schema from "../lib/schema";

export default function (runtimeConfig: ApibaraRuntimeConfig) {
  const { startingBlock, streamUrl } = runtimeConfig["messaging"];
  const db = drizzle({
    schema,
  });

  return defineIndexer(EvmStream)({
    streamUrl,
    finality: "accepted",
    startingBlock: BigInt(startingBlock),
    filter: {
      logs: [],
    },
    plugins: [
      drizzleStorage({ db, migrate: { migrationsFolder: "./drizzle" } }),
    ],
    async transform({ endCursor, finality }) {
      const logger = useLogger();

      logger.info(
        "Transforming block | orderKey: ",
        endCursor?.orderKey,
        " | finality: ",
        finality,
      );

      // Example snippet to insert data into db using drizzle with postgres
      // const { db: database } = useDrizzleStorage();

      // await database.insert(schema.cursorTable).values({
      //   endCursor: Number(endCursor?.orderKey),
      //   uniqueKey: `${endCursor?.uniqueKey}`,
      // });
    },
  });
}
