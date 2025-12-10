import React, { useState } from 'react';
// BsChevronLeft এবং BsChevronRight আর প্রয়োজন নেই, তাই সরানো হলো
import { BsCheckCircle, BsDashCircle, BsPlusCircle, BsCloudUpload } from 'react-icons/bs'; // আপলোডের জন্য BsCloudUpload ব্যবহার করা হলো 
import { FiX } from 'react-icons/fi';
// 'lucide-react' আমদানি (import) লাইনটি সরানো হলো বা কমেন্ট করা হলো 
// import { ChevronLeft, ChevronRight } from 'lucide-react'; 

// ইমেজ ইম্পোর্টগুলো আর দরকার নেই, তাই কমেন্ট করা হলো 
// import img1 from '../assets/image3.png'; 
// import img2 from '../assets/image1.png';
// import img3 from '../assets/image2.png';


const STEPS = [
    { number: 1, title: 'General Information' },
    { number: 2, title: 'Benefits' },
    { number: 3, title: 'Properties' },
    { number: 4, title: 'FAQ' },
    { number: 5, title: 'Overview' },
];


const VariantField = ({ label, value, readOnly, isPrice, onRemove }) => (
    <div className="flex items-center gap-2">
        <div className="flex-1">
            <label className="block text-xs font-medium text-gray-400 mb-1">{label}*</label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    readOnly={readOnly}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm bg-gray-50 cursor-not-allowed"
                    style={{ paddingLeft: isPrice ? '28px' : '8px' }}
                />
                {isPrice && (
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                )}
            </div>
        </div>
        {onRemove && (
            <button type="button" onClick={onRemove} className="text-gray-400 hover:text-red-500 mt-5">
                <FiX className="h-5 w-5" />
            </button>
        )}
    </div>
);


export const AddProductForm = () => {
    
    const [variants] = useState([{ id: 1, quantity: '170 GM', time: '1 Month / 1 Jar', price: 329 }]);
    const [currentStep, setCurrentStep] = useState(1);
    
    // imageIndex state এবং productImages অ্যারে আর প্রয়োজন নেই
    // const productImages = [...]
    // const [imageIndex, setImageIndex] = useState(0); 

    const handleNext = () => {
        
        setCurrentStep(2);
    };

    const handleAddMoreVariant = () => {
        
        console.log("Add More clicked");
    };

    // imageWidth, goToPrev, goToNext ফাংশনগুলিও সরানো হলো 
    // const imageWidth = 272; 
    // const goToPrev = () => { ... };
    // const goToNext = () => { ... };
    
    const handleFileUpload = (e) => {
        console.log("File uploaded:", e.target.files[0]?.name);
        // এখানে আপনি ফাইল আপলোড লজিক যোগ করতে পারেন
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                
                <div className="text-sm text-gray-500 mb-6">
                    <span className="text-green-700 font-semibold">Product</span> &gt; Add Product
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-6">
                    <div className="flex justify-between items-start space-x-2">
                        {STEPS.map((step, index) => (
                            <div key={step.number} className="flex flex-col items-center flex-1 relative">
                                
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 
                                    ${step.number <= currentStep 
                                        ? 'bg-green-100 border-green-700 text-green-700' 
                                        : 'bg-white border-gray-300 text-gray-500'}`}>
                                    {step.number < currentStep ? <BsCheckCircle className="h-4 w-4 text-green-700" /> : `0${step.number}`}
                                </div>
                                
                                <div className={`mt-2 text-center text-xs whitespace-nowrap 
                                    ${step.number === currentStep ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>
                                    {step.title}
                                </div>
                                
                                {index < STEPS.length - 1 && (
                                    <div className={`absolute top-4 w-full h-0.5 z-0 
                                        ${step.number < currentStep ? 'bg-green-700' : 'bg-gray-300'}`}
                                        style={{ left: '50%', transform: 'translateX(25%)' }}>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">General Information</h3>
                    
                    <form>
                        
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name*</label>
                                <select id="productName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500 appearance-none">
                                    <option>Label</option>
                                </select>
                                
                            </div>
                            <div>
                                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle*</label>
                                <select id="subtitle" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-green-500 focus:border-green-500 appearance-none">
                                    <option>Label</option>
                                </select>
                            </div>
                        </div>

                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end">
                            
                            <VariantField label="Select Quantity" value={variants[0].quantity} readOnly={true} />
                            <VariantField label="Month / Jar" value={variants[0].time} readOnly={true} />
                            
                            <div className="flex items-start gap-3 col-span-2">
                                <VariantField label="Add Price" value={variants[0].price} readOnly={true} isPrice={true} />
                                <button
                                    type="button"
                                    onClick={handleAddMoreVariant}
                                    className="flex items-center text-sm text-green-700 font-medium whitespace-nowrap mt-7 hover:text-green-600 transition"
                                >
                                    <BsPlusCircle className="h-4 w-4 mr-1" /> Add More
                                </button>
                                
                                <button type="button" className="text-gray-400 hover:text-red-500 mt-7">
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        
                        
                        <div className="mb-8">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description*</label>
                            <textarea
                                id="description"
                                rows="3"
                                placeholder="description. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm resize-none focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        
                        {/* **পরিবর্তন শুরু এখানে** */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image*</label>
                            
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-green-50 hover:bg-green-100 transition duration-150">
                                <div className="space-y-1 text-center">
                                    <BsCloudUpload className="mx-auto h-12 w-12 text-green-600" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 p-1"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} accept="image/*" />
                                        </label>
                                        <p className="pl-1 text-gray-500">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* **পরিবর্তন শেষ এখানে** */}
                        
                        

                        
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
                </div>
            </div>
        </div>
    );
};