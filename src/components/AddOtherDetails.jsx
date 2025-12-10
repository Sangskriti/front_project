// AddOtherDetails.jsx
import React, { useState } from "react";

const PART_OPTIONS = [
  { value: "leaf", label: "Leaf" },
  { value: "bark", label: "Bark" },
  { value: "root", label: "Root" },
  { value: "flower", label: "Flower" },
  { value: "seed", label: "Seed" },
];

const AddOtherDetails = ({ onNext, onPrevious, initial = {} }) => {
  const [plantParts, setPlantParts] = useState(initial.plantParts ?? []);
  const [partType, setPartType] = useState("");
  const [partDescription, setPartDescription] = useState("");
  const [bestCombinedWith, setBestCombinedWith] = useState(initial.bestCombinedWith ?? "");
  const [geographicalLocations, setGeographicalLocations] = useState(initial.geographicalLocations ?? "");

  const addPlantPart = () => {
    const typeLabel = PART_OPTIONS.find((p) => p.value === partType)?.label ?? partType;
    if (!partType) {
      alert("Please select a Plant Part.");
      return;
    }
    if (!partDescription.trim()) {
      alert("Please provide a description for the plant part.");
      return;
    }
    setPlantParts((prev) => [...prev, { part: typeLabel, description: partDescription.trim() }]);
    setPartType("");
    setPartDescription("");
  };

  // updatePlantPart now used by inline inputs in the table
  const updatePlantPart = (index, key, value) =>
    setPlantParts((p) => p.map((it, i) => (i === index ? { ...it, [key]: value } : it)));

  const removePlantPart = (index) => setPlantParts((p) => p.filter((_, i) => i !== index));

  const handleSave = () => {
    try {
      const payload = { plantParts, bestCombinedWith, geographicalLocations, savedAt: new Date().toISOString() };
      localStorage.setItem("ingredient-otherDetails", JSON.stringify(payload));
      alert("Other details saved to local storage.");
    } catch (err) {
      console.error("save error", err);
      alert("Unable to save locally.");
    }
  };

  const handleNext = () => {
    // filter out empty plantParts
    const filteredParts = plantParts.filter((pt) => (pt.part && pt.part.trim()) || (pt.description && pt.description.trim()));
    const otherData = {
      plantParts: filteredParts,
      bestCombinedWith: bestCombinedWith.trim(),
      geographicalLocations: geographicalLocations.trim(),
    };
    if (onNext && typeof onNext === "function") onNext(otherData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Plant Parts And Its Purpose</h4>

      {/* Input row */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Plant Part <span className="text-red-500">*</span></label>
            <select
              value={partType}
              onChange={(e) => setPartType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              aria-label="Select plant part"
            >
              <option value="">Select</option>
              {PART_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="col-span-7">
            <label className="block text-sm text-gray-600 mb-1">Description <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Type here..."
              value={partDescription}
              onChange={(e) => setPartDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              aria-label="Plant part description"
            />
          </div>

          <div className="col-span-2 flex items-end gap-2">
            <button
              type="button"
              onClick={addPlantPart}
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800"
              aria-label="Add plant part"
            >
              + Add
            </button>
            <button
              type="button"
              onClick={() => { setPartType(""); setPartDescription(""); }}
              className="inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
              aria-label="Clear inputs"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Table of added parts (editable rows) */}
      <div className="mb-6 border border-gray-200 rounded-lg p-4">
        <div className="text-sm font-medium text-gray-700 mb-3">Type & Description</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600"> </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {plantParts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-sm text-gray-500 italic">No plant parts added yet.</td>
                </tr>
              ) : (
                plantParts.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm">
                      {/* editable type (select) */}
                      <select
                        value={PART_OPTIONS.find(p => p.label === item.part)?.value ?? ""}
                        onChange={(e) => {
                          const label = PART_OPTIONS.find(p => p.value === e.target.value)?.label ?? e.target.value;
                          updatePlantPart(idx, "part", label);
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                        aria-label={`Plant part type ${idx + 1}`}
                      >
                        <option value="">--</option>
                        {PART_OPTIONS.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <input
                        value={item.description}
                        onChange={(e) => updatePlantPart(idx, "description", e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                        aria-label={`Description ${idx + 1}`}
                      />
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => removePlantPart(idx)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.part}`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Combined With & Geographical */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Best Combined With <span className="text-red-500">*</span></label>
        <input
          value={bestCombinedWith}
          onChange={(e) => setBestCombinedWith(e.target.value)}
          placeholder="Type here..."
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-label="Best combined with"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Geographical Locations <span className="text-red-500">*</span></label>
        <input
          value={geographicalLocations}
          onChange={(e) => setGeographicalLocations(e.target.value)}
          placeholder="Type here..."
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          aria-label="Geographical locations"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6 border-t border-gray-300">
        <button onClick={onPrevious} className="px-6 py-2 bg-gray-200 rounded">Back</button>
        <div>
          <button onClick={handleSave} className="px-6 py-2 bg-green-700 text-white rounded mr-4">Save</button>
          <button onClick={handleNext} className="px-6 py-2 bg-white border border-green-700 text-green-700 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddOtherDetails;
