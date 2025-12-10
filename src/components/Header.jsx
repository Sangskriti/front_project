import React from 'react';

import logoImage from '../assets/logo.png'; 
import AmrutamLogo from '../assets/AmrutamLogo.png';
import defaultUserAvatar from '../assets/rightLogo.png';


export const AppHeader = ({ userName = "User", userRole = "Role", userAvatar }) => {
    
    
    const avatarToUse = userAvatar || defaultUserAvatar;

    return (
       
        <header className="bg-white shadow-md z-20"> 
            <div className="flex justify-between items-center p-4 px-6 border-b border-gray-100">
                
                {/* Left Section: Logos */}
                <div className="flex items-center space-x-3">
                    
                    <img 
                        src={logoImage} 
                        alt="AMRUTAM Logo" 
                        
                        className="h-10 w-10 object-contain" 
                    />
                    <span>
                        <img 
                            src={AmrutamLogo} 
                            alt="Amrutam Logo Text" 
                            className="h-8 object-contain" 
                        />
                    </span>
                </div>

                {/* Right Section: User Profile */}
                <div className="flex items-center gap-3">
                    
                    {/* Text Details */}
                    <div className="text-right">
                        
                        <div className="text-sm font-semibold text-green-700">
                            {userName}
                        </div>
                        
                        <div className="text-xs text-gray-500">
                            {userRole}
                        </div>
                    </div>
                    
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                        {avatarToUse ? (
                            <img 
                                src={avatarToUse} 
                                alt={userName} 
                                className="h-full w-full object-cover" 
                            />
                        ) : (
                            
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                                {userName[0]}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};