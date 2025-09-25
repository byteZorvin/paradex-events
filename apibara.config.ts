import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    "log-message-to-l2": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
    "log-message-to-l1": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
    "consumed-message-to-l1": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
    "consumed-message-to-l2": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
    "message-to-l2-cancellation-started": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
    "message-to-l2-canceled": {
      startingBlock: 17733931,
      streamUrl: "https://mainnet.ethereum.a5a.ch",
    },
  },
});
