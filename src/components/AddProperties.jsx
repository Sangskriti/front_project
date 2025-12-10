// AddProperties.jsx
import React, { useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiX, FiUpload } from "react-icons/fi";

const AddProperties = ({ onNext, onPrevious }) => {
  const fileInputRefs = useRef([]);
  const [whyToUseItems, setWhyToUseItems] = useState([
    "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.",
    "",
  ]);

  const [prakritiImpact, setPrakritiImpact] = useState({
    rasa: "Madhura",
    veerya: "Shita",
    guna: "Guru",
    vipaka: "Madhura",
  });

  const [formulationsList, setFormulationsList] = useState([
    { icon: null, text: "Chyawanprash" },
    { icon: null, text: "Dashamoola" },
  ]);

  const handleWhyToUseChange = (index, value) => {
    const newItems = [...whyToUseItems];
    newItems[index] = value;
    setWhyToUseItems(newItems);
  };
  const handleWhyToUseAddItem = () => setWhyToUseItems([...whyToUseItems, ""]);
  const handleWhyToUseRemoveItem = (index) => setWhyToUseItems(whyToUseItems.filter((_, i) => i !== index));

  const handlePrakritiImpactChange = (key, value) => setPrakritiImpact((prev) => ({ ...prev, [key]: value }));

  const handleFormulationChange = (index, value) => {
    const newFormulations = [...formulationsList];
    newFormulations[index].text = value;
    setFormulationsList(newFormulations);
  };
  const handleFormulationAddItem = () => setFormulationsList([...formulationsList, { icon: null, text: "" }]);
  const handleFormulationRemoveItem = (index) => setFormulationsList(formulationsList.filter((_, i) => i !== index));

  const handleIconUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFormulations = [...formulationsList];
        newFormulations[index].icon = reader.result;
        setFormulationsList(newFormulations);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (index) => {
    fileInputRefs.current[index]?.click();
  };

  const handleIconRemove = (index) => {
    const newFormulations = [...formulationsList];
    newFormulations[index].icon = null;
    setFormulationsList(newFormulations);
    if (fileInputRefs.current[index]) fileInputRefs.current[index].value = "";
  };

  const handleSave = () => {
    const validFormulations = formulationsList.filter((f) => f.text.trim() !== "");
    const validUses = whyToUseItems.filter((i) => i.trim() !== "");
    console.log("Saving Properties Data:", { therapeuticUses: validUses, ayurvedicProperties: prakritiImpact, formulations: validFormulations });
    alert("Data Saved Successfully!");
  };

  const proceedNext = () => {
    const requiredAyurvedicFields = ["rasa", "veerya", "guna", "vipaka"];
    const isAyurvedicValid = requiredAyurvedicFields.every((field) => prakritiImpact[field] && prakritiImpact[field].toString().trim() !== "");
    if (!isAyurvedicValid) {
      alert("Please enter values for all Ayurvedic Properties (Rasa, Veerya, Guna, Vipaka).");
      return;
    }

    const validWhyToUseItems = whyToUseItems.filter((i) => i.trim() !== "");
    if (validWhyToUseItems.length === 0) {
      alert("Please add at least one item in the 'Therapeutic Uses' section.");
      return;
    }

    const validFormulations = formulationsList.filter((f) => f.text.trim() !== "");
    if (validFormulations.length === 0) {
      alert("Please add at least one item in the 'Important Formulations' section.");
      return;
    }

    const propertiesData = {
      ayurvedicProperties: prakritiImpact,
      therapeuticUses: validWhyToUseItems,
      formulations: validFormulations,
    };

    if (onNext) onNext(propertiesData);
  };

  const handleSubmitProperties = (e) => {
    e.preventDefault();
    proceedNext();
  };

  return (
    <form onSubmit={handleSubmitProperties} className="bg-white p-8 rounded-xl shadow-xl">
      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Ayurvedic Properties</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="rasa" className="block text-sm font-medium text-gray-700 capitalize">Rasa*</label>
            <input type="text" id="rasa" value={prakritiImpact.rasa} onChange={(e) => handlePrakritiImpactChange("rasa", e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" required />
          </div>
          <div>
            <label htmlFor="veerya" className="block text-sm font-medium text-gray-700 capitalize">Veerya*</label>
            <input type="text" id="veerya" value={prakritiImpact.veerya} onChange={(e) => handlePrakritiImpactChange("veerya", e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="guna" className="block text-sm font-medium text-gray-700 capitalize">Guna*</label>
            <input type="text" id="guna" value={prakritiImpact.guna} onChange={(e) => handlePrakritiImpactChange("guna", e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" required />
          </div>
          <div>
            <label htmlFor="vipaka" className="block text-sm font-medium text-gray-700 capitalize">Vipaka*</label>
            <input type="text" id="vipaka" value={prakritiImpact.vipaka} onChange={(e) => handlePrakritiImpactChange("vipaka", e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" required />
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Important Formulations</h4>
        <div className="space-y-4">
          {formulationsList.map((formulation, index) => (
            <div key={`formulation-${index}`} className="flex items-center gap-2">
              <div className="relative flex items-center">
                <button type="button" onClick={() => triggerFileInput(index)} className="px-4 py-2 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center text-sm font-medium text-green-700 hover:bg-gray-200 transition duration-150 border border-green-300 min-w-[120px]">
                  {formulation.icon ? <img src={formulation.icon} alt="Icon" className="h-5 w-5 mr-2 object-contain" /> : <FiUpload className="h-4 w-4 mr-2" />}
                  <span>{formulation.icon ? "Change Icon" : "Upload icon"}</span>
                </button>

                <input type="file" accept="image/*" className="sr-only" ref={(el) => (fileInputRefs.current[index] = el)} onChange={(e) => handleIconUpload(index, e.target.files && e.target.files[0])} />
                {formulation.icon && <button type="button" onClick={() => handleIconRemove(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-[2px] shadow-md hover:bg-red-600 transition duration-150"><FiX className="h-4 w-4" /></button>}
              </div>

              <input type="text" value={formulation.text} onChange={(e) => handleFormulationChange(index, e.target.value)} placeholder="Chyawanprash" className="flex-1 border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" />
              <button type="button" onClick={() => handleFormulationRemoveItem(index)} className="text-red-500 hover:text-red-700"><FiX className="h-6 w-6" /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleFormulationAddItem} className="flex items-center text-green-700 hover:text-green-600 font-medium mt-4 transition duration-150"><BsPlusCircle className="h-5 w-5 mr-2" /> Add Another Formulation</button>
      </div>

      <div className="mb-8 p-6 rounded-lg bg-gray-50 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Therapeutic Uses</h4>
        <div className="space-y-4">
          {whyToUseItems.map((item, index) => (
            <div key={`use-${index}`} className="flex items-center gap-2">
              <input type="text" value={item} onChange={(e) => handleWhyToUseChange(index, e.target.value)} placeholder="Type the therapeutic use here" className="flex-1 border border-gray-300 rounded-md shadow-sm p-3 text-sm focus:ring-green-500 focus:border-green-500" required />
              {whyToUseItems.length > 1 && <button type="button" onClick={() => handleWhyToUseRemoveItem(index)} className="text-red-500 hover:text-red-700"><FiX className="h-6 w-6" /></button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={handleWhyToUseAddItem} className="flex items-center text-green-700 hover:text-green-600 font-medium mt-4 transition duration-150"><BsPlusCircle className="h-5 w-5 mr-2" /> Add Another Use</button>
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

export default AddProperties;
