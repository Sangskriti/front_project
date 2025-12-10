// Overview.jsx
import React, { useEffect } from "react";

const DataPoint = ({ label, value }) => (
  <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const Overview = ({ allData = {}, onPrevious, onSubmit, submittedSuccess = false }) => {
  const { generalInfo = {}, benefits = {}, properties = {}, otherDetails = {} } = allData;

  useEffect(() => {
    // helpful debug while developing — remove in production if desired
    console.log("Overview data:", allData);
  }, [allData]);

  const renderList = (arr, fallback = "N/A") => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return fallback;
    return (
      <ul className="list-disc list-inside space-y-1">
        {arr.map((item, idx) => {
          if (item === null || item === undefined) return <li key={idx}>N/A</li>;
          if (typeof item === "object") {
            const text = item.text ?? item.label ?? JSON.stringify(item);
            return (
              <li key={idx} className="flex items-center gap-2">
                {item.icon && <img src={item.icon} alt="" className="h-4 w-4 object-contain mr-2" />}
                <span>{text}</span>
              </li>
            );
          }
          if (typeof item === "string" && item.trim() === "") return <li key={idx}>N/A</li>;
          return <li key={idx}>{String(item)}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <h3 className="text-2xl font-bold text-green-700 mb-8 border-b pb-3">Ingredient Overview</h3>

      {/* General Info */}
      <div className="mb-8 border border-gray-200 rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold text-gray-800">General Information</h4>
        </div>
        <dl className="divide-y divide-gray-200">
          {generalInfo.imageUrl && (
            <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Image</dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <img src={generalInfo.imageUrl} alt={`${generalInfo.title || "Ingredient"} preview`} className="h-24 w-auto object-cover rounded-md shadow-md" />
              </dd>
            </div>
          )}

          <DataPoint label="Name / Title" value={generalInfo.title || "N/A"} />
          <DataPoint label="Scientific Name" value={generalInfo.scientific || "N/A"} />
          <DataPoint label="Sanskrit Name" value={generalInfo.sanskrit || "N/A"} />
          <DataPoint label="Description" value={generalInfo.description || "N/A"} />

          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Why Use?</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {renderList(benefits.whyToUse ?? [], "N/A")}
            </dd>
          </div>
        </dl>
      </div>

      {/* Ayurvedic Properties */}
      <div className="mb-8 border border-gray-200 rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold text-gray-800">Ayurvedic Properties & Uses</h4>
        </div>
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-100">
            <dt className="text-sm font-bold text-gray-700 col-span-3">Ayurvedic Properties (Rasa, Veerya, Vipaka, Guna)</dt>
          </div>

          <DataPoint label="Rasa" value={properties.ayurvedicProperties?.rasa || "N/A"} />
          <DataPoint label="Veerya" value={properties.ayurvedicProperties?.veerya || "N/A"} />
          <DataPoint label="Guna" value={properties.ayurvedicProperties?.guna || "N/A"} />
          <DataPoint label="Vipaka" value={properties.ayurvedicProperties?.vipaka || "N/A"} />

          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Therapeutic Uses</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{renderList(properties.therapeuticUses ?? [], "N/A")}</dd>
          </div>

          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Important Formulations</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{renderList(properties.formulations ?? [], "N/A")}</dd>
          </div>
        </dl>
      </div>

      {/* Dosha & Benefits */}
      <div className="mb-8 border border-gray-200 rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold text-gray-800">Dosha Impact & Benefits</h4>
        </div>
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-100">
            <dt className="text-sm font-bold text-gray-700 col-span-3">Dosha Impact</dt>
          </div>

          <DataPoint label="Vata" value={`${benefits.prakritiImpact?.vata || "Select"} (${benefits.prakritiImpact?.vataReason || "No reason provided"})`} />
          <DataPoint label="Pitta" value={`${benefits.prakritiImpact?.pitta || "Select"} (${benefits.prakritiImpact?.pittaReason || "No reason provided"})`} />
          <DataPoint label="Kapha" value={`${benefits.prakritiImpact?.kapha || "Select"} (${benefits.prakritiImpact?.kaphaReason || "No reason provided"})`} />

          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Health Benefits</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{renderList(benefits.benefits ?? [], "N/A")}</dd>
          </div>
        </dl>
      </div>

      {/* Other Details */}
      <div className="mb-8 border border-gray-200 rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h4 className="text-lg font-semibold text-gray-800">Other Details</h4>
        </div>
        <dl className="divide-y divide-gray-200">
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Plant Parts & Purpose</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-1 text-left text-xs font-medium text-gray-600">Part</th>
                    <th className="px-3 py-1 text-left text-xs font-medium text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {otherDetails.plantParts && otherDetails.plantParts.length > 0 ? (
                    otherDetails.plantParts.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-1 text-sm text-gray-900">{item.part || "N/A"}</td>
                        <td className="px-3 py-1 text-sm text-gray-500">{item.description || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-3 py-1 text-sm text-gray-500 italic">N/A</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </dd>
          </div>

          <DataPoint label="Best Combined With" value={otherDetails.bestCombinedWith || "N/A"} />
          <DataPoint label="Geographical Locations" value={otherDetails.geographicalLocations || "N/A"} />
        </dl>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-300">
        <button type="button" onClick={onPrevious} className="px-8 py-3 bg-gray-200 text-gray-700 rounded">&larr; Go Back</button>
        <button type="button" onClick={onSubmit} 
        className="px-8 py-3 bg-green-700 text-white rounded">Submit
        {typeof submittedSuccess !== 'undefined' && submittedSuccess && (
    <span className="text-sm text-green-700">Saved — staying on this page.</span>
  )}
        </button>
      </div>
    </div>
  );
};

export default Overview;
