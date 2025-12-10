import React, { useState, useMemo } from "react";

import productImage from "../assets/product-image.png";
import { TbArrowsSort } from "react-icons/tb";
import { MdOutlineFileDownload } from "react-icons/md";

export default function ProductDashboard() {
  const [query, setQuery] = useState("");

  const [products] = useState(() =>
    new Array(8).fill(0).map((_, i) => ({
      id: i + 1,
      image: productImage,
      name: "B Feral Gold Malt",
      description:
        "A versatile herb that enhances fertility and aids in treating insomnia . It has a calming effect on the nervous...",
      status: "Active",
    }))
  );

  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  // function addProduct() {
  //   const id = products.length ? products[products.length - 1].id + 1 : 1;
  //   const newProd = {
  //     id,
  //     image: productImage,
  //     name: "New Product",
  //     description: "New product description...",
  //     status: "Active",
  //   };
  //   setProducts((s) => [newProd, ...s]);
  // }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-full mx-auto p-6">
        <div className="bg-white rounded shadow-md overflow-hidden">
          <div className="flex">
            <main className="flex-1 p-6">
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Products</h2>
              </header>

              <section className="bg-gray-50 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">Products List</div>
                    <div className="flex items-center bg-white rounded p-1 border border-gray-200 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        className="px-3 py-2 outline-none text-sm w-64"
                        placeholder="Search here"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center bg-white border border-gray-200 shadow-sm"
                      style={{
                        width: "37px",
                        height: "37px",
                        borderRadius: "12px",
                      }}
                    >
                      <TbArrowsSort className="text-xl text-green-700" />
                    </div>

                    <div
                      className="flex items-center justify-center bg-white border border-gray-200 shadow-sm"
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

                <div className="hidden md:flex items-center text-xs text-gray-500 px-2 py-3 border-b">
                  <div className="w-10">#</div>
                  <div className="flex-1">Products</div>
                  <div className="flex-1">Description</div>
                  <div className="w-28 text-right">Status</div>
                </div>

                <div className="divide-y">
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      className={`flex items-center px-2 py-4 ${
                        selected === p.id ? "bg-white" : ""
                      }`}
                    >
                      <div className="w-10 text-center">
                        <input
                          type="radio"
                          name="selected"
                          checked={selected === p.id}
                          onChange={() => setSelected(p.id)}
                        />
                      </div>

                      <div className="flex-1 flex items-center gap-3">
                        <div
                          className="h-8 w-8 relative"
                          style={{
                            width: "37.8px",
                            height: "33.9px",
                          }}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
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
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-gray-400 hidden md:block">
                            SKU: PROD-{String(p.id).padStart(4, "0")}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 text-sm text-gray-600">
                        {p.description}
                      </div>

                      <div className="w-28 text-right flex items-center justify-end gap-3">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {p.status}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filtered.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                      No products found.
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    Showing {filtered.length} of {products.length} products
                  </div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 border rounded">Prev</button>
                    <button className="px-3 py-1 border rounded">Next</button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
