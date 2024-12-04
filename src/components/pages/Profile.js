import React from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate, useLoaderData, redirect } from 'react-router-dom'
import Navigation from '../Navigation'
import { verifyToken } from '../../utils'

export async function loader() {
    const data = await verifyToken()
    if (!data) {
        return redirect('/login')
    }
    return data
}

export default function UserProfile() {
    const navigate = useNavigate()
    const data = useLoaderData()
    const user = {
        name: data.given_name,
        email: data.email,
    }

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        document.cookie = "authToken=; path=/; max-age=0; Secure; SameSite=None"
        navigate('/login')
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-900 text-white">
            {/* Header Section */}
            <div className="relative h-56 mb-8">
                <img
                    src="header.jpg"
                    alt="Cover"
                    className="w-full h-56 object-cover rounded-t-xl shadow-lg"
                />
            </div>

            {/* Profile Info Section */}
            <div className="relative px-6 py-8 pt-16">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <img
                        src={data.picture}
                        alt={user.name}
                        className="w-36 h-36 rounded-full border-4 border-indigo-900 shadow-xl"
                    />
                </div>
                <div className="text-center mt-24">
                    <h1 className="text-4xl font-extrabold text-white">{user.name}</h1>
                    <p className="text-indigo-300 text-xl">{user.email}</p>
                    <div className="mt-8">
                        <button
                            className="px-8 py-4 bg-red-500 text-white text-xl rounded-full hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center space-x-3 mx-auto shadow-lg"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-6 h-6" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section (Optional) */}
            {/* Uncomment if you want to add some stats */}
            {/* <div className="px-8 py-6 bg-indigo-800 rounded-t-3xl mx-6 shadow-xl mt-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Your Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-indigo-700 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
                        <h3 className="text-xl font-medium text-white mb-2">Meditations</h3>
                        <p className="text-indigo-300 text-lg">42</p>
                    </div>
                    <div className="bg-indigo-700 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
                        <h3 className="text-xl font-medium text-white mb-2">Streak</h3>
                        <p className="text-indigo-300 text-lg">7 days</p>
                    </div>
                    <div className="bg-indigo-700 p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
                        <h3 className="text-xl font-medium text-white mb-2">Total Time</h3>
                        <p className="text-indigo-300 text-lg">14h 30m</p>
                    </div>
                </div>
            </div> */}

            {/* Navigation Section */}
            <Navigation />
        </div>
    )
}
