import React from "react";
import { Link, useLocation } from "react-router-dom"; 

const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Patients", path: "/patients" },
    { name: "Appointments", path: "/appointments" },
    { name: "Specialties", path: "/specialties" },
    // ... (Product commented out)
    { name: "Coupons", path: "/coupons" },
    { name: "Concerns", path: "/concerns" },
    {
        name: "Ingredients",
        path: "/ingredients", 
        submenu: [
            { name: "Ingredients List", path: "/ingredients/list" },
            { name: "Add Ingredients", path: "/ingredients/add" },
        ],
    },
    { name: "Referral", path: "/referral" },
    { name: "Customization", path: "/customization" },
    { name: "Wallet", path: "/wallet" },
    { name: "Refund", path: "/refund" },
];

export const AppSidebar = () => {
    const location = useLocation(); 

    
    const isActive = (path) => {
        return location.pathname === path;
    };

    
    const isSubmenuActive = (item) => {
        return item.submenu && item.submenu.some(sub => location.pathname.startsWith(sub.path));
    };

    return (
        
        <div className="w-64 bg-gray-50 shadow-xl p-4 overflow-y-auto shrink-0">
            <ul className="space-y-1">
                {menuItems.map((item) => (
                    
                    item.name && ( 
                        <React.Fragment key={item.name}>
                            
                            <li
                                className={`text-sm font-medium transition duration-150 ease-in-out ${
                                    isActive(item.path) || isSubmenuActive(item)
                                    
                                    ? "bg-gray-200 text-indigo-900 rounded-lg shadow-md"
                                    
                                    : "text-gray-600 hover:bg-gray-200 rounded-lg"
                                }`}
                            >
                                <Link 
                                    to={item.path}
                                    className={`block w-full p-3 ${item.submenu ? 'font-bold' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            </li>

                            {/* Submenu Items - Always displayed if they exist */}
                            {item.submenu && (
                                <ul className="pl-6 space-y-1 mt-1">
                                    {item.submenu.map((subItem) => (
                                        <li
                                            key={subItem.name}
                                            className={`text-sm font-medium transition duration-150 ease-in-out ${
                                                location.pathname.startsWith(subItem.path)
                                                
                                                ? "bg-gray-200 text-green-800 rounded-lg"
                                                
                                                : "text-gray-600 hover:bg-gray-100 rounded-lg"
                                            }`}
                                        >
                                            <Link
                                                to={subItem.path}
                                                className="block w-full p-2"
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    )
                ))}
            </ul>
        </div>
    );
};