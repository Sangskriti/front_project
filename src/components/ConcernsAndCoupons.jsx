// src/components/ConcernsAndCoupons.jsx

import React from "react";

export const Coupons = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex-1">
      <h2 className="text-2xl font-bold mb-4">🏷️ Coupons Management</h2>
      <p className="text-gray-600">
        This is the dashboard where you can view, create, and manage discount
        coupons for your products.
      </p>
      {/* Coupon list/table implementation would go here */}
    </div>
  );
};

export const Concerns = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex-1">
      <h2 className="text-2xl font-bold mb-4">❓ Concerns/Issues Management</h2>
      <p className="text-gray-600">
        This section is for tracking and resolving customer concerns or common
        health issues addressed by your products.
      </p>
      {/* Concerns list/table implementation would go here */}
    </div>
  );
};