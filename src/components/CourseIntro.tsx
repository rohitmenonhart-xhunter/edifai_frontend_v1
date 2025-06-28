import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Settings,
  Volume2,
  Maximize,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";

import figma from "../Assets/video/Master Figma UI Design in 15 Minutes _ This Tutorial Is For You!.mp4";

interface CourseIntroProps {
  courseTitle: string;
  lessonTitle: string;
  onBack?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onSettings?: () => void;
  about?: string;
  description?: string;
  videoSrc?: string;
  videoPoster?: string;
}
export default function CourseIntro({
  courseTitle,
  lessonTitle,
  onBack,
  onPrevious,
  onNext,
  onSettings,
  about = "This comprehensive course will guide you through the fundamental principles of UI/UX design. Learn to create intuitive and engaging user experiences from ideation to implementation, preparing you for a successful career in product design..",
  description = "Delve deep into the world of User Interface (UI) and User Experience (UX) design. This course covers essential topics such as user research, wireframing, prototyping, usability testing, and visual design principles. Through practical exercises and real-world case studies, you'll develop the skills to design user-centered products that are both aesthetically pleasing and highly functional. Whether you're a beginner looking to enter the field or a professional aiming to enhance your skills, this course provides the knowledge and tools you need to excel",
  videoSrc = figma,
  videoPoster = "",
}: CourseIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  // Add state for volume level
  const [volume, setVolume] = useState(1); // Volume range: 0 to 1

  // Check if the videoSrc is a YouTube URL
  const isYouTubeVideo = videoSrc.includes("youtube.com");

  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:v=)([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : url;
  };

  // Volume adjustment function
  const adjustVolume = (newVolume: number) => {
    if (videoRef.current) {
      // Clamp volume between 0 and 1
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      videoRef.current.volume = clampedVolume;
      setVolume(clampedVolume);
      setIsMuted(clampedVolume === 0);
    }
  };

  // Handle volume button click (to toggle volume levels)
  const handleVolumeClick = () => {
    if (videoRef.current) {
      if (volume === 0) {
        adjustVolume(0.5);
      } else if (volume === 0.5) {
        adjustVolume(1);
      } else {
        adjustVolume(0);
      }
    }
  };

  // Settings action
  const handleSettingsClick = () => {
    if (onSettings) {
      onSettings();
    } else {
      console.log("Settings clicked: Customize playback speed, quality, etc.");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newTime = (clickPosition / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress((newTime / videoRef.current.duration) * 100);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Sync volume on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      setIsMuted(videoRef.current.muted);
    }
  }, [volume]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} aria-label="Back">
            <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
          </button>
          <div>
            <h2 className="text-sm text-gray-500">{courseTitle}</h2>
            <h1 className="text-base font-semibold text-gray-900">
              {lessonTitle}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-700">
          <button
            onClick={onPrevious}
            className={`flex items-center space-x-1 ${onPrevious ? 'cursor-pointer hover:text-blue-600' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!onPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={onNext}
            className={`flex items-center space-x-1 ${onNext ? 'cursor-pointer hover:text-blue-600' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!onNext}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full overflow-hidden rounded-xl">
        {isYouTubeVideo ? (
          <iframe
            className="w-full h-[420px] rounded-xl"
            src={getYouTubeEmbedUrl(videoSrc)}
            title={lessonTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-[420px] rounded-xl object-cover"
              src={videoSrc}
              poster={videoPoster}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            ></video>

            {/* Custom Video Controls */}
            <div className="absolute bottom-6 inset-x-6 bg-gray-800/60 rounded-full px-5 py-3 flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="bg-white border border-gray-300 rounded-full p-1 text-gray-700 hover:text-gray-800"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              {/* Current Time */}
              <span className="text-white text-sm w-[42px] text-center">
                {formatTime(currentTime)}
              </span>

              {/* Progress Bar */}
              <div
                className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer overflow-hidden"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Duration */}
              <span className="text-white text-sm w-[42px] text-center">
                {formatTime(duration)}
              </span>

              {/* Icons */}
              <button
                onClick={onNext}
                className="text-white hover:text-gray-300"
              >
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={handleVolumeClick}
                className={`text-white hover:text-gray-300 ${isMuted ? 'opacity-50' : ''}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleSettingsClick}
                className="text-white hover:text-gray-300"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/*---- About ---- */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          About this course
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{about}</p>
      </section>

      {/* Description */}
      <hr />
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </section>
    </div>
  );
}