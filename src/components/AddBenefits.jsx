// AddBenefits.jsx
import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiX } from "react-icons/fi";

const AddBenefits = ({ onNext, onPrevious }) => {
  const [whyToUseItems, setWhyToUseItems] = useState([
    "Support immunity",
    "",
  ]);

  const [prakritiImpact, setPrakritiImpact] = useState({
    vata: "Select",
    vataReason: "",
    kapha: "Select",
    kaphaReason: "",
    pitta: "Select",
    pittaReason: "",
  });

  const [benefitsList, setBenefitsList] = useState([
    { emoji: "❤️", text: "Supports overall well-being" },
  ]);

  const prakritiOptions = ["Select", "High", "Medium", "Low"];

  const handleWhyToUseChange = (index, value) => {
    const newItems = [...whyToUseItems];
    newItems[index] = value;
    setWhyToUseItems(newItems);
  };
  const handleWhyToUseAddItem = () => setWhyToUseItems([...whyToUseItems, ""]);
  const handleWhyToUseRemoveItem = (index) => setWhyToUseItems(whyToUseItems.filter((_, i) => i !== index));

  const handlePrakritiImpactChange = (key, value) => setPrakritiImpact((prev) => ({ ...prev, [key]: value }));

  const handleBenefitChange = (index, value) => {
    const copy = [...benefitsList];
    copy[index].text = value;
    setBenefitsList(copy);
  };
  const handleBenefitAddItem = () => setBenefitsList([...benefitsList, { emoji: "😀", text: "" }]);
  const handleBenefitRemoveItem = (index) => setBenefitsList(benefitsList.filter((_, i) => i !== index));

  const handleSave = () => {
    console.log("Saving Benefits Data:", { whyToUse: whyToUseItems, prakritiImpact, benefits: benefitsList });
    alert("Data Saved Successfully!");
  };

  const proceedNext = () => {
    const requiredDoshaFields = ["vata", "kapha", "pitta"];
    const isDoshaImpactValid = requiredDoshaFields.every((field) => prakritiImpact[field] && prakritiImpact[field] !== "Select");
    if (!isDoshaImpactValid) {
      alert("Please select valid impact levels for Vata, Kapha, and Pitta.");
      return;
    }

    const validWhyToUseItems = whyToUseItems.filter((i) => i.trim() !== "");
    if (validWhyToUseItems.length === 0) {
      alert("Please add at least one item in the 'Why To Use?' section.");
      return;
    }

    const validBenefits = benefitsList.filter((b) => b.text && b.text.trim() !== "");
    if (validBenefits.length === 0) {
      alert("Please add at least one description in the 'Benefits' section.");
      return;
    }

    const benefitsData = {
      whyToUse: validWhyToUseItems,
      prakritiImpact,
      benefits: validBenefits,
    };

    if (onNext) onNext(benefitsData);
  };

  const handleSubmitBenefits = (e) => {
    e.preventDefault();
    proceedNext();
  };

  return (
    <form onSubmit={handleSubmitBenefits} className="bg-white p-8 rounded-xl shadow-xl">
      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Why To Use?</h4>
        <div className="space-y-4">
          {whyToUseItems.map((item, index) => (
            <div key={`why-${index}`} className="flex items-center gap-2">
              <input type="text" value={item} onChange={(e) => handleWhyToUseChange(index, e.target.value)} placeholder="Enter Here" className="flex-1 border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" />
              {whyToUseItems.length > 1 && <button type="button" onClick={() => handleWhyToUseRemoveItem(index)} className="text-red-500 hover:text-red-700"><FiX className="h-6 w-6" /></button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={handleWhyToUseAddItem} className="flex items-center text-green-700 hover:text-green-600 font-medium mt-4 transition duration-150"><BsPlusCircle className="h-5 w-5 mr-2" /> Add Another Item</button>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Prakriti Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {["vata", "kapha", "pitta"].map((dosha) => (
            <div key={dosha}>
              <label htmlFor={dosha} className="block text-sm font-medium text-gray-700 capitalize">{dosha}*</label>
              <select id={dosha} value={prakritiImpact[dosha]} onChange={(e) => handlePrakritiImpactChange(dosha, e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500">
                {prakritiOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["vataReason", "kaphaReason", "pittaReason"].map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
              <input id={key} type="text" value={prakritiImpact[key] || ""} onChange={(e) => handlePrakritiImpactChange(key, e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Benefits</h4>
        <div className="space-y-4">
          {benefitsList.map((benefit, index) => (
            <div key={`benefit-${index}`} className="flex items-center gap-2">
              <div className="px-4 py-2 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center text-lg">
                {benefit.emoji}
              </div>
              <input type="text" value={benefit.text} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder="Enter Benefit description here" className="flex-1 border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" />
              <button type="button" onClick={() => handleBenefitRemoveItem(index)} className="text-red-500 hover:text-red-700"><FiX className="h-6 w-6" /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleBenefitAddItem} className="flex items-center text-green-700 hover:text-green-600 font-medium mt-4 transition duration-150"><BsPlusCircle className="h-5 w-5 mr-2" /> Add Another Item</button>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-300">
        <button type="button" onClick={onPrevious} className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150">Back</button>
        <div>
          <button type="button" onClick={handleSave} className="px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-150 mr-4">Save</button>
          <button type="submit" className="px-8 py-3 bg-white text-green-700 border border-green-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-150">Next</button>
        </div>
      </div>
    </form>
  );
};

export default AddBenefits;
