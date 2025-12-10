import React from 'react';
import { AppHeader } from './Header'; 
import { AppSidebar } from './sidebar'; 
/**
 * @param {object} props
 * @param {React.ReactNode} props.children - 
 * @param {string} [props.userName] 
 * @param {string} [props.userRole] 
 * @param {string} [props.userAvatar] 
 */
export const AppLayout = ({ children, userName, userRole, userAvatar }) => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            
            <AppHeader 
                userName={userName} 
                userRole={userRole} 
                userAvatar={userAvatar} 
            />

            
            <div className="flex flex-1 overflow-hidden">
                
                <AppSidebar />

                
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

