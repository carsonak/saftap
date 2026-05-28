import { createPublicClient, createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { getOptionalEnv } from "../config/env.js";

export const baseSepoliaTransport = http(
  getOptionalEnv("BASE_SEPOLIA_RPC_URL", baseSepolia.rpcUrls.default.http[0]),
);

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: baseSepoliaTransport,
});

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: baseSepoliaTransport,
});
