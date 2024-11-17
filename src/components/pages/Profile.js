// import React from 'react';
// import { ArrowLeft, Settings, LogOut, Award, Calendar, Clock } from 'lucide-react';
import React from 'react'
import { ArrowLeft, Settings, LogOut, Award, Calendar, Clock } from 'lucide-react'
import { redirect, useNavigate, useLoaderData } from 'react-router-dom';
import Navigation from '../Navigation';
import { verifyToken } from '../../utils';


export async function loader() {
    const data = await verifyToken();
    if (!data) {
        return redirect('/login');
    }
    return data;
}

// export default function UserProfile() {
//     const navigate = useNavigate();
//     const data = useLoaderData();
//     console.log(data);

//     const user = {
//         name: data.given_name,
//         email:data.email,
//         stats: {
//             meditations: 42,
//             streak: 7,
//             totalTime: '14h 30m'
//         },
//         recentActivities: [
//             { type: 'Meditation', name: 'Morning Calm', duration: '15 min', date: '2023-06-15' },
//             { type: 'Affirmation', name: 'Self-Confidence Boost', duration: '5 min', date: '2023-06-14' },
//             { type: 'Breathing', name: '4-7-8 Technique', duration: '10 min', date: '2023-06-13' },
//         ]
//     };

//     const stressReliefTechniques = [
//         { title: "Deep Breathing", description: "Inhale for 4 counts, hold for 7, exhale for 8" },
//         { title: "Progressive Muscle Relaxation", description: "Tense and relax each muscle group" },
//         { title: "Mindfulness Meditation", description: "Focus on the present moment" },
//         { title: "Guided Imagery", description: "Visualize a peaceful, calming scene" },
//     ];

//     // Logout functionality
//     const handleLogout = () => {
//         // Clear the authentication token (localStorage or cookies)
//         localStorage.removeItem('authToken'); // If stored in localStorage
//         document.cookie = "authToken=; path=/; max-age=0; Secure; SameSite=None"; // If stored in cookies

//         // Redirect to login page
//         navigate('/login');
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-indigo-900">
//             {/* Header Section */}
//             <div className="relative h-48">
//                 <img
//                     src="/placeholder.svg?height=200&width=800"
//                     alt="Cover"
//                     className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start">
//                     <button className="text-white">
//                         <ArrowLeft className="w-6 h-6" />
//                     </button>
//                     <button className="text-white">
//                         <Settings className="w-6 h-6" />
//                     </button>
//                 </div>
//             </div>

//             {/* Profile Info */}
//             <div className="relative px-6 py-8">
//                 <div className="absolute -top-16 left-6">
//                     <img
//                         src={data.picture}
//                         alt={data.given_name}
//                         className="w-24 h-24 rounded-full border-4 border-indigo-900"
//                     />
//                 </div>
//                 <div className="mt-16">
//                     <h1 className="text-3xl font-bold text-white">{user.name}</h1>
//                     <p className="text-indigo-300">{user.email}</p>
//                     <button
//                         className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full flex items-center space-x-2"
//                         onClick={handleLogout} // Attach logout function here
//                     >
//                         <LogOut className="w-4 h-4" />
//                         <span>Logout</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <div className="px-6 py-6 bg-indigo-800 rounded-t-3xl">
//                 <h2 className="text-2xl font-semibold text-white mb-4">Your Stats</h2>
//                 <div className="grid grid-cols-3 gap-4">
//                     <div className="bg-indigo-700 p-4 rounded-lg text-center">
//                         <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold text-white">{user.stats.meditations}</p>
//                         <p className="text-sm text-indigo-300">Meditations</p>
//                     </div>
//                     <div className="bg-indigo-700 p-4 rounded-lg text-center">
//                         <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold text-white">{user.stats.streak} days</p>
//                         <p className="text-sm text-indigo-300">Streak</p>
//                     </div>
//                     <div className="bg-indigo-700 p-4 rounded-lg text-center">
//                         <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold text-white">{user.stats.totalTime}</p>
//                         <p className="text-sm text-indigo-300">Total Time</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Stress Relief Techniques */}
//             <div className="px-6 py-6 bg-indigo-800">
//                 <h2 className="text-2xl font-semibold text-white mb-4">Stress Relief Techniques</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {stressReliefTechniques.map((technique, index) => (
//                         <div key={index} className="bg-indigo-700 p-4 rounded-lg">
//                             <h3 className="text-lg font-semibold text-white mb-2">{technique.title}</h3>
//                             <p className="text-indigo-300">{technique.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Recent Activities */}
//             <div className="px-6 py-6 bg-indigo-800 flex-grow">
//                 <h2 className="text-2xl font-semibold text-white mb-4">Recent Activities</h2>
//                 <div className="space-y-4">
//                     {user.recentActivities.map((activity, index) => (
//                         <div key={index} className="bg-indigo-700 p-4 rounded-lg flex justify-between items-center">
//                             <div>
//                                 <p className="text-white font-semibold">{activity.name}</p>
//                                 <p className="text-sm text-indigo-300">{activity.type}</p>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-white">{activity.duration}</p>
//                                 <p className="text-sm text-indigo-300">{activity.date}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Navigation/>
//         </div>
//     );
// }



export default function UserProfile() {
    const data = useLoaderData();
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

    const stressReliefTechniques = [
        { title: "Deep Breathing", description: "Inhale for 4 counts, hold for 7, exhale for 8" },
        { title: "Progressive Muscle Relaxation", description: "Tense and relax each muscle group" },
        { title: "Mindfulness Meditation", description: "Focus on the present moment" },
        { title: "Guided Imagery", description: "Visualize a peaceful, calming scene" },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-indigo-900">
            {/* Header Section */}
            <div className="relative h-48">
                <img
                    src="header.jpg"
                    alt="Cover"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/30 p-6 flex justify-between items-start">
                    <button className="text-white">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button className="text-white">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 py-8">
                <div className="absolute -top-16 left-6">
                    <img
                        src={data.picture}
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-indigo-900"
                    />
                </div>
                <div className="mt-16">
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    <p className="text-indigo-300">{user.email}</p>
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-6 py-6 bg-indigo-800 rounded-t-3xl">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Stats</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-700 p-4 rounded-lg text-center">
                        <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{user.stats.meditations}</p>
                        <p className="text-sm text-indigo-300">Meditations</p>
                    </div>
                    <div className="bg-indigo-700 p-4 rounded-lg text-center">
                        <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{user.stats.streak} days</p>
                        <p className="text-sm text-indigo-300">Streak</p>
                    </div>
                    <div className="bg-indigo-700 p-4 rounded-lg text-center">
                        <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{user.stats.totalTime}</p>
                        <p className="text-sm text-indigo-300">Total Time</p>
                    </div>
                </div>
            </div>

            {/* Stress Relief Techniques */}
            <div className="px-6 py-6 bg-indigo-800">
                <h2 className="text-2xl font-semibold text-white mb-4">Stress Relief Techniques</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {stressReliefTechniques.map((technique, index) => (
                        <div key={index} className="bg-indigo-700 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-white mb-2">{technique.title}</h3>
                            <p className="text-indigo-300">{technique.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div className="px-6 py-6 bg-indigo-800 flex-grow">
                <h2 className="text-2xl font-semibold text-white mb-4">Recent Activities</h2>
                <div className="space-y-4">
                    {user.recentActivities.map((activity, index) => (
                        <div key={index} className="bg-indigo-700 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-white font-semibold">{activity.name}</p>
                                <p className="text-sm text-indigo-300">{activity.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white">{activity.duration}</p>
                                <p className="text-sm text-indigo-300">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Navigation/>
        </div>
    )
}