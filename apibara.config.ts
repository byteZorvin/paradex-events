import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    messaging: {
      startingBlock: 0,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
  },
});
