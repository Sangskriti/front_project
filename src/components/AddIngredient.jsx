// AddIngredientForm.jsx
import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { FiX } from "react-icons/fi";

import AddBenefits from "./AddBenefits";
import AddProperties from "./AddProperties";
import AddOtherDetails from "./AddOtherDetails";
import Overview from "./Overview";

const STEPS = [
  { number: 1, title: "General Information" },
  { number: 2, title: "Benefits" },
  { number: 3, title: "Properties" },
  { number: 4, title: "Other" },
  { number: 5, title: "Overview" },
];

const GeneralInformationForm = ({
  ingredient,
  errors,
  handleChange,
  handleFileUpload,
  handleNext,
  handleSave,
  isImageUploaded,
  setIngredient,
}) => (
  <form onSubmit={handleSave}>
    <h3 className="text-xl font-bold text-gray-800 mb-6">
      General Information
    </h3>

    <div className="grid grid-cols-3 gap-6 mb-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Ingredient Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={ingredient.name}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="scientificName"
          className="block text-sm font-medium text-gray-700"
        >
          Scientific Name*
        </label>
        <input
          id="scientificName"
          name="scientificName"
          type="text"
          value={ingredient.scientificName}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.scientificName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500`}
        />
        {errors.scientificName && (
          <p className="text-red-500 text-xs mt-1">{errors.scientificName}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="sanskritName"
          className="block text-sm font-medium text-gray-700"
        >
          Sangskrit Name*
        </label>
        <input
          id="sanskritName"
          name="sanskritName"
          type="text"
          value={ingredient.sanskritName}
          onChange={handleChange}
          className={`mt-1 block w-full border ${
            errors.sanskritName ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500`}
        />
        {errors.sanskritName && (
          <p className="text-red-500 text-xs mt-1">{errors.sanskritName}</p>
        )}
      </div>
    </div>

    <div className="mb-8">
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Ingredient Description*
      </label>
      <textarea
        id="description"
        name="description"
        value={ingredient.description}
        onChange={handleChange}
        rows="3"
        placeholder="description..."
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm resize-none focus:ring-green-500 focus:border-green-500"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ingredient Image*
      </label>

      <div className="mt-1 flex justify-center py-4 px-4 border-2 border-gray-300 border-dashed rounded-md bg-green-50 hover:bg-green-100 transition duration-150 relative">
        {isImageUploaded ? (
          <>
            <img
              src={ingredient.image}
              alt="Preview"
              className="max-h-40 max-w-full object-contain rounded-md"
            />
            <button
              type="button"
              onClick={() =>
                setIngredient((prev) => ({ ...prev, image: null }))
              }
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-700 shadow-md"
            >
              <FiX className="h-5 w-5" />
            </button>
          </>
        ) : (
          <div className="space-y-1 text-center">
            <BsCloudUpload className="mx-auto h-10 w-10 text-green-600" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 p-1"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </label>
              <p className="pl-1 text-gray-500">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>

    <div className="flex justify-center pt-6 border-t border-gray-200">
      <button
        type="submit"
        className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 mr-4"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150"
      >
        Next
      </button>
    </div>
  </form>
);

const initialFormData = {
  generalInfo: {
    title: "",
    scientific: "",
    sanskrit: "",
    description: "",
    whyItems: [],
    imageUrl: "",
  },
  benefits: {},
  properties: {},
  otherDetails: {},
};

const AddIngredientForm = ({
  onProductAdded /* optional parent callback */,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [ingredient, setIngredient] = useState({
    name: "",
    scientificName: "",
    sanskritName: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!ingredient.name || !ingredient.name.trim())
      tempErrors.name = "Ingredient Name is required.";
    if (!ingredient.scientificName || !ingredient.scientificName.trim())
      tempErrors.scientificName = "Scientific Name is required.";
    if (!ingredient.sanskritName || !ingredient.sanskritName.trim())
      tempErrors.sanskritName = "Sanskrit Name is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIngredient((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // safer handleChange: try id, then name
  const handleChange = (e) => {
    const id = e.target.id || e.target.name;
    const value = e.target.value;
    setIngredient((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Save: also populate generalInfo so Overview will show it if user saved then jumped forward
  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      const storageKey = `ingredient-${Date.now()}`;
      const dataToSave = { ...ingredient, savedAt: new Date().toISOString() };

      try {
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
        // also update formData.generalInfo immediately
        const general = {
          title: ingredient.name,
          scientific: ingredient.scientificName,
          sanskrit: ingredient.sanskritName,
          description: ingredient.description,
          imageUrl: ingredient.image,
        };
        setFormData((prev) => ({ ...prev, generalInfo: general }));
        alert("Ingredient saved successfully to Local Storage!");
      } catch (error) {
        console.error("Error saving to local storage:", error);
        alert("Failed to save ingredient.");
      }
    } else {
      console.log("Validation failed on Save", { ingredient, errors });
    }
  };

  // handleNext: ALWAYS log the ingredient object and write into formData.generalInfo
  const handleNext = (newData) => {
    console.log("handleNext called. current ingredient:", ingredient);
    if (newData && typeof newData === "object") {
      const updatedKey = Object.keys(newData)[0];
      setFormData((prevData) => {
        const next = { ...prevData, [updatedKey]: newData[updatedKey] };
        console.log("formData after newData set:", next);
        return next;
      });
    } else {
      // ensure we map and set generalInfo
      const general = {
        title: ingredient.name,
        scientific: ingredient.scientificName,
        sanskrit: ingredient.sanskritName,
        description: ingredient.description,
        imageUrl: ingredient.image,
      };
      setFormData((prev) => {
        const next = { ...prev, generalInfo: general };
        console.log("formData after writing generalInfo:", next);
        return next;
      });
    }
    setCurrentStep((prev) => prev + 1);
  };

  // const handleFinalSubmit = () => {
  //   console.log("Final Data Submitted:", formData);
  //   // if parent wants to be notified:
  //   if (onProductAdded && typeof onProductAdded === "function") {
  //     // map to a friendly object
  //     const payload = {
  //       ...formData,
  //       generalInfo: { ...formData.generalInfo, submittedAt: new Date().toISOString() },
  //     };
  //     onProductAdded(payload);
  //   }
  //   alert("Ingredient data has been successfully submitted!");
  //   setFormData(initialFormData);
  //   setCurrentStep(1);
  //   setIngredient({ name: "", scientificName: "", sanskritName: "", description: "", image: null });
  // };

  const handleFinalSubmit = async () => {
    try {
      console.log("Final Data Submitted:", formData);

      // notify parent if provided
      if (onProductAdded && typeof onProductAdded === "function") {
        const payload = {
          ...formData,
          generalInfo: {
            ...formData.generalInfo,
            submittedAt: new Date().toISOString(),
          },
        };
        // allow parent to be async
        await Promise.resolve(onProductAdded(payload));
      }

      // show success feedback but DO NOT reset form or change step
      setSubmittedSuccess(true);

      // clear success message after 3s (optional)
      setTimeout(() => setSubmittedSuccess(false), 3000);

      setFormData((prev) => ({
        ...prev,
        _lastSubmittedAt: new Date().toISOString(), // optional helper
      }));
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit. See console for details.");
    }
  };

  const handlePrevious = () => setCurrentStep((s) => Math.max(1, s - 1));
  const isImageUploaded = !!ingredient.image;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralInformationForm
            ingredient={ingredient}
            errors={errors}
            handleChange={handleChange}
            handleFileUpload={handleFileUpload}
            handleNext={handleNext}
            handleSave={handleSave}
            isImageUploaded={isImageUploaded}
            setIngredient={setIngredient}
          />
        );
      case 2:
        return (
          <AddBenefits
            onPrevious={handlePrevious}
            onNext={(benefitsData) => {
              setFormData((p) => ({ ...p, benefits: benefitsData }));
              setCurrentStep(3);
            }}
          />
        );
      case 3:
        return (
          <AddProperties
            onPrevious={() => setCurrentStep(2)}
            onNext={(propData) => {
              setFormData((p) => ({ ...p, properties: propData }));
              setCurrentStep(4);
            }}
          />
        );
      case 4:
        return (
          <AddOtherDetails
            onPrevious={() => setCurrentStep(3)}
            onNext={(otherData) => {
              setFormData((p) => ({ ...p, otherDetails: otherData }));
              setCurrentStep(5);
            }}
          />
        );
      case 5:
        return (
          <div>
            {submittedSuccess && (
              <p className="text-green-600 mb-4">
                Ingredient submitted successfully!
              </p>
            )}

            <Overview
              allData={formData}
              onPrevious={() => setCurrentStep(4)}
              onSubmit={handleFinalSubmit}
            />
          </div>
        );

      default:
        return (
          <h3 className="text-xl font-bold text-gray-800 mb-6">Unknown Step</h3>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 mb-6">
          <span className="text-green-700 font-semibold">Ingredient</span> &gt; Add
          Ingredient
        </div>

        <div className="p-8 rounded-xl mb-6">
          <div className="flex justify-between items-start space-x-2">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1 relative"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                    step.number <= currentStep
                      ? "bg-green-100 border-green-700 text-green-700"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {step.number < currentStep ? (
                    <span className="text-green-700">✓</span>
                  ) : (
                    `0${step.number}`
                  )}
                </div>

                <div
                  className={`mt-2 text-center text-xs whitespace-nowrap ${
                    step.number === currentStep
                      ? "text-green-700 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </div>

                {index < STEPS.length - 1 && (
                  <div
                    className={`absolute top-4 w-full h-0.5 z-0 ${
                      step.number < currentStep ? "bg-green-700" : "bg-gray-300"
                    }`}
                    style={{ left: "50%", transform: "translateX(25%)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default AddIngredientForm;
