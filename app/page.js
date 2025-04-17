"use client";

import { useState } from "react";
import AvailableNetworks from "@/components/availableNetwork";
import CreateContractCard from "@/components/createContract";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContractTypeSelector from "@/components/contractTypeSelector";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <ToastContainer />
      <div className="container py-6 px-4 mx-auto space-y-8">
        <Navbar />

        {/* Available Networks */}
        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            Available Networks
          </h2>
          <AvailableNetworks />
        </section>

        {/* Contract Type Selector */}
        <ContractTypeSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Create Contract Form */}
        {selectedOption && selectedOption !== "custom" && (
          <section className="animate-fadeInUp mt-6">
            <CreateContractCard selectedType={selectedOption} />
          </section>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
