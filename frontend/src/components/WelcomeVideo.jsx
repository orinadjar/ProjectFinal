import React, { useState, useEffect } from "react";

const WelcomeVideo = ({ videoSrc }) => {
  const [isVisible, setIsVisible] = useState(true); // Manages whether the video overlay is displayed
  const [isFading, setIsFading] = useState(false); // Tracks whether the fade-out effect is in progress

  useEffect(() => {
    if (isFading) {
      // Set a timeout for the fade-out effect
      const timeout = setTimeout(() => setIsVisible(false), 1000); // 1 second for the fade-out
      return () => clearTimeout(timeout); // Clean up the timeout if the component unmounts
    }
  }, [isFading]);

  const handleVideoEnd = () => {
    setIsFading(true); // Trigger the fade-out when the video ends
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed", // Ensure the overlay covers the entire screen
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black", // Black background for the video overlay
            zIndex: 1000, // Place the video overlay above all other content
            display: "flex", // Center the video within the overlay
            alignItems: "center",
            justifyContent: "center",
            opacity: isFading ? 0 : 1, // Transition opacity from 1 to 0 for fade-out
            transition: "opacity 1s ease-in-out", // Define the fade-out animation
          }}
        >
          <video
            src={videoSrc} // Path to the video file
            autoPlay // Automatically start playing the video
            muted // Mute the video (required for autoplay in some browsers)
            onEnded={handleVideoEnd} // Trigger fade-out when the video finishes playing
            style={{ width: "100%", height: "auto" }} // Responsive video styling
          />
        </div>
      )}
    </>
  );
};

export default WelcomeVideo;
