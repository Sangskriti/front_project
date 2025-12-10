// App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./components/AppLayout";
import { Ingredients } from "./components/IngredientDashboard.jsx";
import AddIngredientForm from "./components/AddIngredient.jsx";
import userAvatarImage from "./assets/rightLogo.png";
// import IngredientDetails from "./components/IngredientDetails.jsx";
import ProductFlow from "./components/ProductFlow.jsx";

const DefaultPage = ({ name }) => (
  <h2 className="text-2xl font-semibold p-6 text-gray-800">
    {name} Page Content
  </h2>
);

// Add Ingredient Route
const AddIngredientRoute = () => {
  return (
    <AddIngredientForm
      onIngredientAdded={(newIngredient) => {
        console.log("New Product Data Received:", newIngredient);
        alert(`Successfully added ${newIngredient.name}!`);
      }}
    />
  );
};

// Product Flow Route
const ProductFlowRoute = () => {
  return <ProductFlow />;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout
        userName="Liam Michael"
        userRole="Admin"
        userAvatar={userAvatarImage}
      >
        <Routes>
          {/* Default Home */}
          <Route
            path="/"
            element={<DefaultPage name="Welcome to AMRUTAM Admin Dashboard" />}
          />

          {/* INGREDIENTS */}
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/ingredients/list" element={<Ingredients />} />
          <Route path="/ingredients/add" element={<AddIngredientRoute />} />

          
          {/* <Route
            path="/ingredients-details"
            element={
              <IngredientDetails
                onEditSection={(sectionKey) => {
                  console.log("Edit clicked:", sectionKey);
                }}
              />
            }
          /> */}

          {/* OTHER ROUTES */}
          <Route path="/doctors" element={<DefaultPage name="Doctors" />} />
          <Route path="/patients" element={<DefaultPage name="Patients" />} />
          <Route
            path="/appointments"
            element={<DefaultPage name="Appointments" />}
          />
          <Route
            path="/specialties"
            element={<DefaultPage name="Specialties" />}
          />
          <Route path="/coupons" element={<DefaultPage name="Coupons" />} />
          <Route path="/concerns" element={<DefaultPage name="Concerns" />} />
          <Route path="/referral" element={<DefaultPage name="Referral" />} />
          <Route
            path="/customization"
            element={<DefaultPage name="Customization" />}
          />
          <Route path="/wallet" element={<DefaultPage name="Wallet" />} />
          <Route path="/refund" element={<DefaultPage name="Refund" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
