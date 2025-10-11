"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc: string;
  className?: string;
}

export default function VideoBackground({ 
  videoSrc, 
  fallbackImageSrc, 
  className = "object-cover w-full h-full" 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.error('Video error occurred:', e);
      console.error('Video error details:', video.error);
      setVideoError(true);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      // Video load started
    };

    const handleLoadedData = () => {
      // Video data loaded
    };

    const handleLoadedMetadata = () => {
      // Video metadata loaded
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Try to load the video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSrc]);

  if (videoError) {
    return (
      <div 
        className={className}
        style={{
          backgroundImage: `url(${fallbackImageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={className}
        style={{ 
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {!videoLoaded && !videoError && (
        <div 
          className={`absolute inset-0 ${className}`}
          style={{
            backgroundImage: `url(${fallbackImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </div>
  );
}
