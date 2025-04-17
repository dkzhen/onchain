// components/Navbar.tsx
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Server } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Ganti dengan logic connect wallet kamu
    setIsConnected(!isConnected);
  };

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between">
        {/* Kiri: Logo dan Judul */}
        {/* MOBILE: hanya logo */}
        <div className="flex items-center sm:hidden">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Server className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* DESKTOP: logo + teks */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Smart Tools
            </h1>
            <p className="text-sm text-gray-400">Smart management tools</p>
          </div>
        </div>

        {/* Kanan: Tombol Connect Wallet */}
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar", // Menampilkan hanya avatar pada layar kecil
            largeScreen: "full", // Menampilkan avatar, nama, dan alamat pada layar besar
          }}
          showBalance={{
            smallScreen: false, // Menyembunyikan saldo pada layar kecil
            largeScreen: true, // Menampilkan saldo pada layar besar
          }}
        />
      </div>
    </header>
  );
}
