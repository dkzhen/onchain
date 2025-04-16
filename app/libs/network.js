const customChains = [
  {
    id: 11155111,
    name: "Sepolia",
    network: "sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "	https://owlto.finance/icon/img/Sepolia.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://sepolia.infura.io"],
      },
    },
    blockExplorers: {
      default: {
        name: "Sepolia Explorer",
        url: "https://sepolia.etherscan.io",
      },
    },
    contracts: {
      multicall3: {
        address: "",
        blockCreated: 0,
      },
    },
  },
  {
    id: 1301,
    name: "Unichain Sepolia",
    network: "unichain-sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "https://owlto.finance/icon/chain/UnichainMainnet.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://unichain-sepolia.api.onfinality.io/public"],
      },
    },
    blockExplorers: {
      default: {
        name: "Unichain Explorer",
        url: "",
      },
    },
    contracts: {
      multicall3: {
        address: "",
        blockCreated: 0,
      },
    },
  },
  {
    id: 2358,
    name: "Kroma Sepolia",
    network: "kroma-sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "	https://owlto.finance/assets/255-d2fda42f.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://api.sepolia.kroma.network"],
      },
    },
    blockExplorers: {
      default: {
        name: "sSnowTrace",
        url: "",
      },
    },
    contracts: {
      multicall3: {
        address: "",
        blockCreated: 0,
      },
    },
  },
];

export { customChains };
