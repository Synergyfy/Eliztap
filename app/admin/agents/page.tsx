'use client';

import React, { useState } from 'react';
import { notify } from '@/lib/notify';
import { User, Shield, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

export default function AdminAgentsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock staff data
    const [staff, setStaff] = useState([
        { id: 1, name: 'Emily Davis', email: 'emily@fitness.ng', isAgent: true, assignedChats: 3, status: 'online' },
        { id: 2, name: 'Michael Cashier', email: 'staff@vemtap.com', isAgent: false, assignedChats: 0, status: 'offline' },
        { id: 3, name: 'Sarah Supervisor', email: 'manager@vemtap.com', isAgent: true, assignedChats: 1, status: 'online' },
        { id: 4, name: 'John Doe', email: 'john@example.com', isAgent: false, assignedChats: 0, status: 'offline' },
    ]);

    const toggleAgentStatus = (id: number) => {
        setStaff(staff.map(s => {
            if (s.id === id) {
                const newStatus = !s.isAgent;
                notify.success(`${s.name} is ${newStatus ? 'now an active' : 'no longer a'} support agent.`);
                return { ...s, isAgent: newStatus };
            }
            return s;
        }));
    };

    const filteredStaff = staff.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">Agent Management</h1>
                    <p className="text-text-secondary font-medium mt-1">Assign and monitor support agents across the platform</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search staff by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-text-secondary">
                        <span className="flex items-center gap-1.5"><Shield size={16} className="text-primary" /> {staff.filter(s => s.isAgent).length} Active Agents</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr className="text-left text-[10px] font-black uppercase tracking-widest text-text-secondary border-b border-gray-100">
                                <th className="px-6 py-4">Staff Member</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Chats</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStaff.map((person) => (
                                <tr key={person.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-text-main text-sm">{person.name}</p>
                                                <p className="text-xs text-text-secondary">{person.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${person.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${person.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                            {person.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-text-main">{person.assignedChats} Active</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleAgentStatus(person.id)}
                                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${person.isAgent
                                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                                                }`}
                                        >
                                            {person.isAgent ? 'Revoke Access' : 'Assign as Agent'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
