import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

/* -----------------------------
   SMALL PURE COMPONENTS (TOP LEVEL)
------------------------------ */

// Reusable row component
function DataPoint({ label, value }) {
  return (
    <div className="py-2 grid grid-cols-3 gap-4">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="col-span-2 text-sm text-gray-900">
        {value || <span className="text-gray-400 italic">N/A</span>}
      </dd>
    </div>
  );
}

// Section title + 3 dots
function SectionHeader({ title, sectionKey, menuOpen, toggleMenu, onEdit, onAction }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="relative">
        <button
          onClick={() => toggleMenu(sectionKey)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <HiDotsVertical size={20} />
        </button>

        {menuOpen === sectionKey && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => onEdit(sectionKey)}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => onAction(sectionKey, "Activate")}
            >
              Activate
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={() => onAction(sectionKey, "Deactivate")}
            >
              Deactivate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



export default function IngredientDetails({ onEditSection }) {
//   const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);

  const [data, _setData] = useState(() => ({
  generalInfo: JSON.parse(localStorage.getItem("ingredient-generalInfo")) || {},
  description: JSON.parse(localStorage.getItem("ingredient-description")) || {},
  whyUse: JSON.parse(localStorage.getItem("ingredient-whyUse")) || {},
  prakriti: JSON.parse(localStorage.getItem("ingredient-prakriti")) || {},
  ayurvedaProps: JSON.parse(localStorage.getItem("ingredient-ayurvedaProps")) || {},
  otherDetails: JSON.parse(localStorage.getItem("ingredient-otherDetails")) || {},
   }));


  const toggleMenu = (sectionKey) => {
    setMenuOpen(menuOpen === sectionKey ? null : sectionKey);
  };

  const handleAction = (sectionKey, action) => {
    alert(`${action} clicked for ${sectionKey}`);
    setMenuOpen(null);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl space-y-10">

      {/* GENERAL INFORMATION */}
      <section>
        <SectionHeader
          title="General Information"
          sectionKey="generalInfo"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />

        <dl className="divide-y divide-gray-200">
          <DataPoint label="Name" value={data.generalInfo.name} />
          <DataPoint label="Scientific Name" value={data.generalInfo.scientificName} />
          <DataPoint label="Family Name" value={data.generalInfo.familyName} />
          <DataPoint label="Common Name" value={data.generalInfo.commonName} />
        </dl>
      </section>

      {/* DESCRIPTION */}
      <section>
        <SectionHeader
          title="Description"
          sectionKey="description"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />
        <p className="text-sm text-gray-700">{data.description.description || "N/A"}</p>
      </section>

      {/* WHY USE */}
      <section>
        <SectionHeader
          title="Why Use"
          sectionKey="whyUse"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {data.whyUse.whyUse || "N/A"}
        </p>
      </section>

      {/* PRAKRITI IMPACT */}
      <section>
        <SectionHeader
          title="Prakriti Impact"
          sectionKey="prakriti"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />

        <dl className="divide-y divide-gray-200">
          <DataPoint label="Vata" value={data.prakriti.vata} />
          <DataPoint label="Pitta" value={data.prakriti.pitta} />
          <DataPoint label="Kapha" value={data.prakriti.kapha} />
        </dl>
      </section>

      {/* AYURVEDIC PROPERTIES */}
      <section>
        <SectionHeader
          title="Ayurvedic Properties"
          sectionKey="ayurvedaProps"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />

        <dl className="divide-y divide-gray-200">
          <DataPoint label="Rasa" value={data.ayurvedaProps.rasa} />
          <DataPoint label="Guna" value={data.ayurvedaProps.guna} />
          <DataPoint label="Virya" value={data.ayurvedaProps.virya} />
          <DataPoint label="Vipaka" value={data.ayurvedaProps.vipaka} />
          <DataPoint label="Dosha Effect" value={data.ayurvedaProps.doshaEffect} />
        </dl>
      </section>

      {/* PLANT PARTS */}
      <section>
        <SectionHeader
          title="Plant Parts & Uses"
          sectionKey="plantParts"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />

        <div className="mt-4 space-y-4">
          {data.otherDetails.plantParts?.length ? (
            data.otherDetails.plantParts.map((p, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                <p className="font-medium text-gray-800">{p.part}</p>
                <p className="text-gray-600">{p.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No plant parts added.</p>
          )}
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section>
        <SectionHeader
          title="Additional Info"
          sectionKey="additional"
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          onEdit={onEditSection}
          onAction={handleAction}
        />

        <dl className="divide-y divide-gray-200">
          <DataPoint
            label="Best Combined With"
            value={data.otherDetails.bestCombinedWith}
          />
          <DataPoint
            label="Geographical Locations"
            value={data.otherDetails.geographicalLocations}
          />
        </dl>
      </section>
    </div>
  );
}
