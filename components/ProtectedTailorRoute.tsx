import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

const ProtectedTailorRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="animate-spin text-[#8B4513] h-12 w-12" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/tailor/login" replace />;
};

export default ProtectedTailorRoute;
