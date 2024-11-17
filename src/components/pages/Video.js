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
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-6">
      <h2 className="text-3xl text-white font-semibold mb-8 text-center">Watch these stress relieving Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-lg font-semibold">{video.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Video;
