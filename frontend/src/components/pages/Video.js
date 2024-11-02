const Video = () => {
    const videos = [
      { title: "TED: This could be why you're depressed or anxious", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "TED: How to live a stress free life?", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Motivation", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ];
  
    return (
      <div className="flex flex-col h-screen bg-indigo-900 p-4">
        <h2 className="text-2xl text-white mb-4">Videos</h2>
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 p-2 bg-blue-500 text-white rounded block"
          >
            {video.title}
          </a>
        ))}
      </div>
    );
  };

  export default Video;