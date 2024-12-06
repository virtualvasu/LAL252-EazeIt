import Navigation from "../Navigation";
import { redirect, useLoaderData } from 'react-router-dom';
import { verifyToken } from '../../utils';

export function loader() {
  console.log('hello');
  //  return null;
  try {
    const user = verifyToken(); // Check if the token is valid and return the user information
    return { user }; // Return the user data to the component
  } catch (err) {
    console.error('Authentication error:', err.message);
    return redirect('/login'); // Redirect to the login page if no valid token is found
  }
}

const Video = () => {
  const videos = [
    {
      title: "Learning to Live with Clinical Depression",
      url: "https://www.youtube.com/watch?v=Izy1TgMe-tI",
      thumbnail: "https://img.youtube.com/vi/Izy1TgMe-tI/sddefault.jpg"
    },
    {
      title: "Mindful Breathing for Anxiety",
      url: "https://www.youtube.com/watch?v=v-w-vSvi-24",
      thumbnail: "https://img.youtube.com/vi/v-w-vSvi-24/sddefault.jpg"
    },
    {
      title: "How to make stress your friend?",
      url: "https://www.youtube.com/watch?v=RcGyVTAoXEU",
      thumbnail: "https://img.youtube.com/vi/RcGyVTAoXEU/sddefault.jpg"
    },
    {
      title: "How To Deal With Depression?",
      url: "https://www.youtube.com/watch?v=TEwoWxLwCfA",
      thumbnail: "https://img.youtube.com/vi/TEwoWxLwCfA/sddefault.jpg"
    },
    {
      title: "How To Eliminate Self Doubt?",
      url: "https://www.youtube.com/watch?v=v1ojZKWfShQ",
      thumbnail: "https://img.youtube.com/vi/v1ojZKWfShQ/sddefault.jpg"
    },
    {
      title: "What Is Depression Really Like?",
      url: "https://youtu.be/WWloIAQpMcQ?si=Nh_ojZ4BNK-8aV2v",
      thumbnail: "https://img.youtube.com/vi/WWloIAQpMcQ/sddefault.jpg"
    },
    {
      title: "Overcoming Self-Doubt",
      url: "https://youtu.be/qq0DBeFdDlM?si=3cAMact2RVKlkuXJ",
      thumbnail: "https://img.youtube.com/vi/qq0DBeFdDlM/sddefault.jpg"
    },
    {
      title: "Understanding Anxiety and Panic Attacks",
      url: "https://youtu.be/ntfcfJ28eiU?si=1zdbaZtTeAZUdIpt",
      thumbnail: "https://img.youtube.com/vi/ntfcfJ28eiU/sddefault.jpg"
    },
    {
      title: "How to Be Kind to Yourself?",
      url: "https://youtu.be/kSZKIupBUuc?si=t8jPVuvja0AcWUts",
      thumbnail: "https://img.youtube.com/vi/kSZKIupBUuc/sddefault.jpg"
    },
    {
      title: "The Importance of Mental Health Awareness",
      url: "https://youtu.be/-jtuH1H8dfI?si=-xelVSre5ceVj54P",
      thumbnail: "https://img.youtube.com/vi/-jtuH1H8dfI/sddefault.jpg"
    },
    {
      title: "The Science of Mindfulness",
      url: "https://youtu.be/d9j4t5JLRPI?si=4rQKwUnkSKwUC3X6",
      thumbnail: "https://img.youtube.com/vi/d9j4t5JLRPI/sddefault.jpg"
    },
    {
      title: "How to Handle Negative Emotions?",
      url: "https://youtu.be/eytNiPy0xg0?si=A9I0Yt5DtkFVqA1H",
      thumbnail: "https://img.youtube.com/vi/eytNiPy0xg0/sddefault.jpg"
    },
    {
      title: "Overcoming Challenges with Resilience",
      url: "https://youtu.be/Nz9eAaXRzGg?si=_u8lL31wFqLxnTPm",
      thumbnail: "https://img.youtube.com/vi/Nz9eAaXRzGg/sddefault.jpg"
    }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-6">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">
        Watch these Stress-Relieving Videos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 scale-90 hover:scale-100 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-44 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-sm font-semibold">{video.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-auto">
        <Navigation />
      </div>
    </div>

  );
};

export default Video;
