const customChains = [
  {
    id: 11155111,
    name: "Sepolia",
    network: "sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/11155111.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [
          "https://rpc.sepolia.org",
          "https://eth-sepolia.public.blastapi.io",
        ],
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
    id: 10218,
    name: "Tea Sepolia",
    network: "tea-sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/10218.jpg",
    nativeCurrency: {
      name: "TEA",
      symbol: "TEA",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://tea-sepolia.g.alchemy.com/public"],
      },
    },
    blockExplorers: {
      default: {
        name: "Sepolia Explorer",
        url: "https://sepolia.tea.xyz",
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
    iconUrl: "/icons/1301.png",
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
        name: "blockscout",
        url: "https://unichain-sepolia.blockscout.com/",
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
    iconUrl: "/icons/2358.png",
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
        name: "blockscout",
        url: "https://blockscout.sepolia.kroma.network/",
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
    id: 6342,
    name: "MegaETH Testnet",
    network: "megaeth-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/6342.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://carrot.megaeth.com/rpc"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://megaexplorer.xyz/",
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
    id: 84532,
    name: "Base Sepolia",
    network: "base-sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/84532.png",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://sepolia.base.org"],
      },
    },
    blockExplorers: {
      default: {
        name: "blockscout",
        url: "https://base-sepolia.blockscout.com/",
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
    id: 10143,
    name: "Monad Testnet",
    network: "monad-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/10143.png",
    nativeCurrency: {
      name: "Monad",
      symbol: "MON",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://testnet-rpc.monad.xyz"],
      },
    },
    blockExplorers: {
      default: {
        name: "blockscout",
        url: "https://monad-testnet.socialscan.io/",
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
    id: 11155931,
    name: "Rise Testnet",
    network: "rise-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/11155931.svg",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://testnet.riselabs.xyz"],
      },
    },
    blockExplorers: {
      default: {
        name: "SnowTrace",
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
    id: 16600,
    name: "0G Testnet",
    network: "0g-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/16600.png",
    nativeCurrency: {
      name: "a0gi",
      symbol: "A0GI",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://0g-evm-rpc.murphynode.net"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://chainscan-newton.0g.ai/",
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
    id: 17000,
    name: "Holesky",
    network: "holesky",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/17000.svg",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://1rpc.io/holesky"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://holesky.etherscan.io/",
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
    id: 50312,
    name: "Somnia Testnet",
    network: "somnia-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "/icons/50312.png",
    nativeCurrency: {
      name: "somnia",
      symbol: "STT",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://dream-rpc.somnia.network"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://shannon-explorer.somnia.network/",
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
