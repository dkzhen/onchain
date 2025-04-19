"use client";

import { useState } from "react";
import AvailableNetworks from "@/components/availableNetwork";
import CreateContractCard from "@/components/createContract";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContractTypeSelector from "@/components/contractTypeSelector";
import { ToastContainer } from "react-toastify";
import MultiSenderETH from "@/components/multiSender";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <ToastContainer />
      <div className="container py-6 px-4 mx-auto space-y-8">
        <Navbar />

        {/* Available Networks */}
        <section>
          <AvailableNetworks />
        </section>

        {/* Contract Type Selector */}
        <ContractTypeSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Create Contract Form */}
        {selectedOption && (
          <section className="animate-fadeInUp mt-6">
            {(() => {
              switch (selectedOption?.toLowerCase()) {
                case "erc20":
                  return <CreateContractCard selectedType={selectedOption} />;
                case "multisender":
                  return <MultiSenderETH />;
                default:
                  return null;
              }
            })()}
          </section>
        )}

        {/* Footer */}

        <Footer />
      </div>
    </div>
  );
}
