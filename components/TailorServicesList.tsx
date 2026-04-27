import React, { useEffect, useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Loader2, AlertCircle } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
    createdAt: string;
}

export default function TailorServicesList() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchServices = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const q = query(
                collection(db, 'services'),
                where('tailorId', '==', user.uid),
                // orderBy requires a composite index if used with where, skipping for simplicity unless index exists
            );

            const querySnapshot = await getDocs(q);
            const servicesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Service[];

            // Sort in memory to avoid needing composite indexes immediately
            servicesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setServices(servicesData);
        } catch (err: any) {
            console.error("Error fetching services:", err);
            setError('Could not load your catalog.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-[#8B4513]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center text-red-600 bg-red-50 p-4 rounded">
                <AlertCircle className="mr-2" />
                {error}
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="text-center p-8 bg-white rounded border border-[#E8E6E1]">
                <p className="text-gray-500">You haven't added any services yet. Start building your catalog to get orders!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold font-serif text-lg">Your Catalog ({services.length})</h3>
                <button onClick={fetchServices} className="text-sm text-[#8B4513] hover:underline">
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-4 rounded shadow-sm border border-[#E8E6E1] flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900 leading-tight">{service.title}</h4>
                            <span className="text-xs font-semibold px-2 py-1 bg-[#FDFBF7] text-[#8B4513] rounded border border-[#8B4513]/20">
                                {service.type}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{service.description}</p>
                        <div className="mt-auto pt-3 border-t border-gray-100 font-bold text-lg text-green-700">
                            ₹{service.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
