
import React, { useState } from "react";

import AddBenefits from "./AddBenefits.jsx";
import AddProperties from "./AddProperties.jsx";
import Overview from "./Overview.jsx"; 

const STEPS = {
    BENEFITS: 'benefits',
    PROPERTIES: 'properties',
    OVERVIEW: 'overview',
};


const ProductFlow = () => {
    
    
    const [allFormData, setAllFormData] = useState({
        generalInfo: {},
        benefits: {},
        properties: {},
        otherDetails: {},
    });
    
    const [currentStep, setCurrentStep] = useState(STEPS.BENEFITS);

    
    const handleBenefitsNext = (benefitsData) => {
        setAllFormData(prev => ({ ...prev, benefits: benefitsData }));
        console.log("Moving from Benefits to Properties. Data Saved:", benefitsData);
        setCurrentStep(STEPS.PROPERTIES); 
    };

    
    const handlePropertiesNext = (propertiesData) => {
        setAllFormData(prev => ({ ...prev, properties: propertiesData })); 
        console.log("Moving to Finish/Overview. Data Saved:", propertiesData);
        setCurrentStep(STEPS.OVERVIEW); 
    };

    const handlePrevious = () => {
    setCurrentStep(STEPS.PROPERTIES);
    };

    const handleSubmit = () => {
    console.log("Final Data Submitted:", allFormData);
    alert("Data Submitted Successfully! Check console for full data.");
    
    };

    const renderStep = () => {
        switch (currentStep) {
            case STEPS.BENEFITS:
                return (
                    <AddBenefits 
                        onNext={handleBenefitsNext}
                    />
                );
            case STEPS.PROPERTIES:
                return (
                    <AddProperties 
                        onNext={handlePropertiesNext} 
                    />
                );
            case STEPS.OVERVIEW:
                return (
                    
                    <Overview 
                        allData={allFormData} 
                        onPrevious={handlePrevious} 
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return <div className="text-center text-red-500">Unknown Step</div>;
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
                Product Data Entry - 
                {currentStep === STEPS.BENEFITS ? ' Step 1: Benefits' : 
                 currentStep === STEPS.PROPERTIES ? ' Step 2: Properties' : 
                 ' Step 3: Overview'}
            </h2>
            {renderStep()}
        </div>
    );
};

export default ProductFlow;