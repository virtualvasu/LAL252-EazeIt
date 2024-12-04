import React from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'  // <-- Import redirect here
import Navigation from '../Navigation'
import { verifyToken } from '../../utils'

export async function loader() {
    const data = await verifyToken()
    if (!data) {
        return redirect('/login') // <-- Now the redirect function is properly defined
    }
    return data
}

export default function UserProfile() {
    const navigate = useNavigate()
    const data = useLoaderData()
    const user = {
        name: data.given_name,
        email: data.email,
        stats: {
            meditations: 42,
            streak: 7,
            totalTime: '14h 30m'
        },
        recentActivities: [
            { type: 'Meditation', name: 'Morning Calm', duration: '15 min', date: '2023-06-15' },
            { type: 'Affirmation', name: 'Self-Confidence Boost', duration: '5 min', date: '2023-06-14' },
            { type: 'Breathing', name: '4-7-8 Technique', duration: '10 min', date: '2023-06-13' },
        ]
    }

    // Logout functionality
    const handleLogout = () => {
        // Clear the authentication token (localStorage or cookies)
        localStorage.removeItem('authToken'); // If stored in localStorage
        document.cookie = "authToken=; path=/; max-age=0; Secure; SameSite=None"; // If stored in cookies

        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen bg-indigo-900 text-white">
            {/* Header Section */}
            <div className="relative h-48">
                <img
                    src="header.jpg"
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-b-3xl"
                />
                <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start"></div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 py-8 pt-16">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <img
                        src={data.picture}
                        alt={user.name}
                        className="w-32 h-32 rounded-full border-4 border-indigo-900 shadow-xl"
                    />
                </div>
                <div className="text-center mt-24">
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    <p className="text-indigo-300">{user.email}</p>
                    <div className="mt-6">
                        <button
                            className="px-6 py-3 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 flex items-center justify-center space-x-2 mx-auto"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            

            

            {/* Navigation */}
            <Navigation />
        </div>
    )
}
