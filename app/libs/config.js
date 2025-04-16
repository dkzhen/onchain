// lib/config.ts
"use client";

import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { customChains } from "./network";

export const config = getDefaultConfig({
  appName: "Smart Contract Generator",
  projectId: "26ec97bdc44c4db67252abe4ec83958c",
  chains: customChains,
  transports: Object.fromEntries(
    customChains.map((chain) => [chain.id, http(chain.rpcUrls.default.http[0])])
  ),
  ssr: true,
});
