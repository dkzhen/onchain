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
    id: 6342,
    name: "MegaETH Testnet",
    network: "megaeth-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "https://owlto.finance/icon/chain/mega.png",
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
    id: 84532,
    name: "Base Sepolia",
    network: "base-sepolia",
    isTestnet: true,
    isCustom: false,
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABoVBMVEUAUv////8AAABYjf/F2P8AUv8AAP8AUv8AUv8AUv8AUf/8/f/+/v8AUf8BU/8AUv/9/v/6+/8AUv8AUv8AQP8AUv8AUf8AUv8AS/8AUv8AUv8AUf8AUf8AUv8ARv8AUP8AUv8AUf8AUv8AUf8ASf8AUv8ATf8AUv8AUv8EVP8AUf8ATv8AUv8AUv8AUv8AUf8AUf8ATv8AUP9ekv8AUP/T4f8IWP8AU//x9f+Nsf+4zv8ATv8FVf++0/8zdP+nw//p8P8pbv8AUf/1+P8AUf/K2/9ml/86ef9KhP+Vt/9vnf9EgP8AT/+Jr/9pmf8iaf8AU//g6v8PXP8bZP9Mhf8AUf8AUf8GVv8SXv8eZ/9Ui//j7P8MW//u8/+qxf8la//d6P+yy/8ZY/9Oh/8RXf8xc/+70f82d//r8v/m7v/B1f+Dq/9Ggv99pv8KWf9QiP+Hrf+fvv8rcP/Y5P/D1/8UYP+FrP/z9/9/qf91of+Yuv89ev/O3v+PtP+iwP/b5v8YYv9Xjf8tcf+auv9ckP8gZ/95pP9Zjv9Aff8AUf/V4v+XiP2xAAAAi3RSTlP//wD///4B6fjwnf//pv+c//9gkwTTOfMRuCJr2O0LNuAmHG8H9xTXxP/rMZX6cNVhFzD/Rv//R////y7///////+k/8D/////////Kv///zH/////KcL//////////////////////////////////////////////////////////////////xb/OY6O1QAABUtJREFUeJzNmvdbGkkYx2fJIQpiR0SNvQuonBVFA/ZeooboqVEvmlNjTLlcej2v/dU3u4DwvjO7zBZ58v1xd+f9PDv1LUNsYqqrHgr6fR6HN2C3B7wOj88fHKquE2wsAqlorHH3tBJGrT3umsYKKyB59eW1+Swgpfza8vo8k5C25nZ1QErtzW3GIXkhZ0F2hKwC55rW72hARt0a3cR0WyxkANJXbBdHyLIX9+mEtPR26UPI6upt0QNZ2tb5G8mfmdoSh5Q5jCBkOcoEIVVOowhZzioRSFOHoa5Kyd7RlB3S3WAGIauhOxukUnD5aamgUhvSf1erddHG6vji8bO599EvD7S+u9uvBalUZ2zMLkz8t+cqlGSVTK5Hlo+vi1Qp8F8ApFutr8a+TvyhWAcqnH56X6VBARiXTEiTyphfv/6NJSTkCi8Octs0ZM6xDEhVB/fzg++Tagil5z7sjPGadWSslwyIk7c+Bs/3tBDK30S+cRrai3mQMs6XRZuPsiFklc7/wmmc3mFuIFuc/eryvFSEQTX9mG3tWMKQlin2q6NXJYIMSRr+k22/ndr5U5BedkCiQl2VUuFTZtXYeyGkjz2jZu/pYVDKSCc20ZU8K5OQYoZx+kQfg07mEeZfkjMsAQkxnbWquv60eozpsNE0JC+G38YH9DMohRl9t+IpKZA17Pt0Hhph0Dk2jgzlK46SAmHO2xWXMYg0vYEsOVOQNrz5Ph42yJCkd8hUgezBypBm9KIoYpghufDSb05A8rBPvZM4mYzpDO3J7XToKaQeMS4NzaybX7mDzNUrkHL0dEZ8x+JpAJ1i5TKkohY+HHxpiiGVXEB7tRUU0ogWyaKZEZEVhvbyGymkBvXWvkmG5HoIDdZQiBs+2tA80YX0Blp020hdD3z0s2mGNA134546Uo1i5wnzkMJVYLG1mgxBxgMDWzyjZ9BmPwnCB1ELGNIytBkkfvhg0wrIGbTpJz744K0VkF3o8/uIB0LeWQGZ/AJsegjy6UZ+0qPPfEjJC2DTQbwQok9qi+o9+MpLArcBmQNfBYipUFcNAheK/XYgxwhyK921CL4K4IH/544ezfMZhdD98uIpbMH+SIOia2DTgRfjaysgT2Dg5cHbigXHCfUl4IHiwxvkrBWQT9CmH2/1cdEoUUsr0GYQH1rkzALIKTQ5xBy/5+YZe5fAIj1+sSPxwpz/KOs5tEgdCewSEVOesKJNaJC6RIxzt2CW8QhFwbJzh93U+2a9u7+gPcVNxQ43+W6OMYxyYIrDzYQO34wHc7I+InNK6MAEQeSjGcY9nMxLBEFMOBc38ysLyFgynGMCUzOx1gBOsCQDUzbEHgwbZUxCPyUjxGaTBUe7xhgu3FnpZIEtxJR8No2lJA5xzjN/LZ3AwVsLTXwYGZYPv2IzsXQCxzbKOkYj+uPT9SNsJDMVxUuqdeqmfI4yRkBSjZce7FzWNy4vDxgTXf9mTXSSGT1H8UmcaY8TnbaWbRZCLtZFEaXznJT9FE7Z2pZ4xbLf98W6bHeOU+Vw3JTqtNPoZOxvgcSt6znKQSTESaOrFATI5ZssmNITnHhUZFfWumhpgzy80kgRu8JzTM5ZkUppQ7VIQ+JfI/yJtn4V5SNUizQa5SY6BVYmULeVvlo+VS1qqZebNAtnNCNycDFz9enwJBLen3+7M87sUxnSKpxlKwGKSrsEmJtiZm7KsrkpMJstlRcLlcqpclD0p9qaMnZ9YfumIPejXMSgysGVElmhmJ7LMe6Ez6D/ms+a+DWfkMFrPrJu/8JSrq5eKVK/RBaz6BJZUpzrcP3C1+H+B+MXqW23gY7MAAAAAElFTkSuQmCC",
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
    id: 10143,
    name: "Monad Testnet",
    network: "monad-testnet",
    isTestnet: true,
    isCustom: false,
    iconUrl: "https://owlto.finance/icon/chain/monad.png",
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
];

export { customChains };
