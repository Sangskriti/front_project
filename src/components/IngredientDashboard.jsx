import React, { useState, useMemo } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import productImage from "../assets/product-image.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import { MdOutlineFileDownload } from "react-icons/md";

const IngredientRow = ({ ingredient, selected, setSelected }) => {
  return (
    <div
      key={ingredient.id}
      className={`flex items-center px-2 py-4 ${
        selected === ingredient.id ? "bg-white" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-10 text-center">
        <input
          type="radio"
          name="selected"
          checked={selected === ingredient.id}
          onChange={() => setSelected(ingredient.id)}
        />
      </div>

      <div className="flex-1 flex items-center gap-3">
        <div
          className="h-8 w-8 relative shrink-0"
          style={{
            width: "37.8px",
            height: "33.9px",
          }}
        >
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="absolute"
            style={{
              top: "-2.99px",
              left: "-5.48px",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <div className="text-sm font-medium">{ingredient.name}</div>
          <div className="text-xs text-gray-400 hidden md:block">
            ID: ING-{String(ingredient.id).padStart(4, "0")}
          </div>
        </div>
      </div>

      <div className="flex-1 text-sm text-gray-600">
        {ingredient.description}
      </div>

      <div className="w-48 text-right flex items-center justify-end gap-3">
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            ingredient.status === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {ingredient.status}
        </div>
      </div>
    </div>
  );
};

export const Ingredients = () => {
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState(() =>
    new Array(8).fill(0).map((_, i) => ({
      id: i + 1,
      image: productImage,
      name: "Ashwagandha Extract",
      description:
        "A versatile herb that enhances fertility and aids in treating insomnia . It has a calming effect on the nervous...",
      status: "Active",
    }))
  );
  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ingredients;
    return ingredients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, ingredients]);

  function removeIngredient(id) {
    setIngredients((s) => s.filter((p) => p.id !== id));
    if (selected === id) setSelected(null);
  }

  const handleEdit = () => {
    console.log("Edit action triggered for selected ingredient:", selected);
    setIsMenuOpen(false);
  };

  const handleToggleStatus = () => {
    console.log(
      "Toggle Status action triggered for selected ingredient:",
      selected
    );

    setIsMenuOpen(false);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      
      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        
        <div className="flex items-center justify-between relative">
          <h2 className="text-lg font-semibold text-gray-800">
            Ingredient Details
          </h2>

          <div className="relative">
            <div
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-8 h-8 flex items-center justify-center text-black500 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <BsThreeDotsVertical />
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                <div
                  onClick={handleEdit}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Edit
                </div>
                <div className="border-t border-gray-200 my-1"></div>
                <div
                  onClick={handleToggleStatus}
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>
        
        {selected ? (
          <>
            <p className="mt-2">
              <strong>Name:</strong>{" "}
              {ingredients.find((i) => i.id === selected)?.name || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {ingredients.find((i) => i.id === selected)?.description || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  ingredients.find((i) => i.id === selected)?.status ===
                  "Active"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {ingredients.find((i) => i.id === selected)?.status || "N/A"}
              </span>
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            Select an ingredient to view details.
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="font-semibold text-gray-700 whitespace-nowrap">
              Ingredient List
            </div>

            <div className="flex items-center rounded px-1 py-1 bg-white shadow-sm border border-gray-200">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-2 outline-none text-sm w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center justify-center bg-white border border-gray-200 shadow-sm cursor-pointer"
              style={{
                width: "37px",
                height: "37px",
                borderRadius: "12px",
              }}
            >
              <TbArrowsSort className="text-xl text-green-700" />
            </div>

            <div
              className="flex items-center justify-center bg-white border border-gray-200 shadow-sm cursor-pointer"
              style={{
                width: "37px",
                height: "37px",
                borderRadius: "12px",
              }}
            >
              <MdOutlineFileDownload className="text-xl text-green-700" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center text-xs text-gray-500 px-2 py-3 border-b bg-gray-50 rounded-t-lg">
          <div className="w-10">#</div>
          <div className="flex-1">Ingredient</div>
          <div className="flex-1">Description</div>
          <div className="w-48 text-right">Status: Active</div>
        </div>

        <div className="divide-y divide-gray-200">
          {filtered.map((ingredient) => (
            <IngredientRow
              key={ingredient.id}
              ingredient={ingredient}
              // toggleStatus={toggleStatus}
              removeIngredient={removeIngredient}
              selected={selected}
              setSelected={setSelected}
            />
          ))}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No ingredients found matching "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
