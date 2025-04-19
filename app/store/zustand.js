import { create } from "zustand";
import { customChains } from "@/app/libs/network";

const LOCAL_KEY = "custom_networks";
const ACTIVE_KEY = "active_network";
export const defaultNetworks = customChains.map((chain) => ({
  ...chain,
  icon: chain.iconUrl,
  isCustom: chain.isCustom,
  isTestnet: chain.isTestnet, // bisa kamu deteksi otomatis dari nama kalau mau
}));

// Ambil data awal dari localStorage
const getInitialNetworks = () => {
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) return [...defaultNetworks, ...parsed];
    return defaultNetworks;
  } catch (e) {
    console.warn("Invalid localStorage data, using defaults.");
    return defaultNetworks;
  }
};

const getInitialActiveNetwork = () => {
  try {
    const saved = localStorage.getItem(ACTIVE_KEY);
    if (saved) return parseInt(saved, 10); // <-- konversi ke number
    return customChains[0]?.id ?? null;
  } catch (e) {
    return customChains[0]?.id ?? null;
  }
};

export const useNetworkStore = create((set, get) => ({
  allNetworks: [],
  activeNetwork: null,
  showModal: false,
  showMore: false,

  toggleModal: () => set((state) => ({ showModal: !state.showModal })),
  setShowMore: (val) => set({ showMore: val }),

  setActiveNetwork: (id) => {
    localStorage.setItem(ACTIVE_KEY, id);
    set({ activeNetwork: id });
  },

  addNetwork: (network) => {
    const custom = get().allNetworks.filter((n) => n.isCustom);
    const updated = [...defaultNetworks, ...custom, network];
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...custom, network]));
    set({ allNetworks: updated });
  },

  removeNetwork: (id) => {
    const custom = get().allNetworks.filter((n) => n.isCustom && n.id !== id);
    const updated = [...defaultNetworks, ...custom];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(custom));
    set({ allNetworks: updated });
  },

  hydrateNetworks: () => {
    const initial = getInitialNetworks();
    const active = getInitialActiveNetwork();
    set({
      allNetworks: initial,
      activeNetwork: active,
    });
  },
}));
