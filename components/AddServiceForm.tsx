import React, { useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Loader2, Plus } from 'lucide-react';

export default function AddServiceForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Stitching'); // Stitching, Embroidery, Alteration
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Not authenticated. Please log in.');
            }

            await addDoc(collection(db, 'services'), {
                tailorId: user.uid,
                title,
                description,
                price: Number(price),
                type,
                createdAt: new Date().toISOString()
            });

            setSuccess('Service added successfully!');
            setTitle('');
            setDescription('');
            setPrice('');
            setType('Stitching');
        } catch (err: any) {
            setError(err.message || 'Failed to add service.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E6E1]">
            <h3 className="text-xl font-bold font-serif mb-4 flex items-center">
                <Plus className="mr-2 h-5 w-5 text-[#8B4513]" />
                Add New Service / Catalog Item
            </h3>

            {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">{success}</div>}
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Bridal Lehenga Stitching"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-[#8B4513] focus:border-[#8B4513]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-[#8B4513] focus:border-[#8B4513]"
                        >
                            <option value="Stitching">Stitching</option>
                            <option value="Embroidery">Heritage Embroidery</option>
                            <option value="Alteration">Alteration & Repair</option>
                            <option value="Readymade">Readymade Garment</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the service details, materials used, turnaround time..."
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-[#8B4513] focus:border-[#8B4513]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                    <input
                        type="number"
                        required
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 1500"
                        className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:ring-[#8B4513] focus:border-[#8B4513]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-4 py-2 rounded font-medium transition-colors flex items-center disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Save Item'}
                </button>
            </form>
        </div>
    );
}
