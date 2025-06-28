import React, { useState, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  FileText,
  Share2,
  MoreVertical,
} from "lucide-react";

export default function LessonViewer({ config = {} }) {
  const [zoom, setZoom] = useState(100);
  const pdfContainerRef = useRef<HTMLDivElement>(null); // Added ref for full-screen

  // Configuration object with unique keys
  const lessonConfig = {
    courseCategory: config.courseCategory || "UI/UX Designer Tutorial",
    lessonTitle: config.lessonTitle || "Introduction",
    lessonName: config.lessonName || "Introduction Lesson",
    totalPages: config.totalPages || 2,
    currentPage: config.currentPage || 1,
    bookSrc: config.bookSrc || "", // PDF file path from props
    aboutCourse: config.aboutCourse || "Lorem ipsum dolor sit amet consectetur. Sociis tempus fermentum morbi enim posuere nisi. Lorem ipsum dolor sit amet consectetur. Sociis tempus fermentum morbi enim posuere nisi.",
    courseDescription: config.courseDescription || "Lorem ipsum dolor sit amet consectetur. Tincidunt sed enim mi proin fermentum. In ornare blandit nec tortor varius semper. Tincidunt ultrices magna ipsum una scelerisque porta ad sem eu. Scelerisque eros maecenas volutpat amet tortor proin elit mattis. Est amet et elit bibendum amet. Aliquet dolor sit pharetra at aliquam sapien nisl eget. Sit nisl metus vel fermentum sit sed. Auctor nisi ullamcorper mi tellus bibendum. Donec quis in dolor vel duis dui turpis nunc id.",
    documentWidth: config.documentWidth || "600px",
    documentMinHeight: config.documentMinHeight || "800px",
  };

  // Toggle full-screen mode
  const toggleFullscreen = () => {
    if (pdfContainerRef.current) {
      if (!document.fullscreenElement) {
        pdfContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(25, prev - 25));
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(200, prev + 25));
  };

  // Append #toolbar=0 to the PDF URL to hide the native black toolbar
  const pdfUrl = lessonConfig.bookSrc ? `${lessonConfig.bookSrc}#toolbar=0` : "";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between h-10">
        <div className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
          <div>
            <h2 className="text-sm text-gray-500">{lessonConfig.courseCategory}</h2>
            <h1 className="text-base font-semibold text-gray-900">{lessonConfig.lessonTitle}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-700">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
      {/* PDF Viewer Section */}
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="bg-purple-600 text-white px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-semibold">{lessonConfig.lessonName}</span>
          <div className="flex items-center space-x-3 text-white text-sm">
            <span className="bg-white/20 px-2 py-1 rounded">{lessonConfig.currentPage} / {lessonConfig.totalPages}</span>
            <ZoomOut className="w-4 h-4 cursor-pointer" onClick={zoomOut} />
            <span>{zoom}%</span>
            <ZoomIn className="w-4 h-4 cursor-pointer" onClick={zoomIn} />
            {/* <FileText className="w-4 h-4 cursor-pointer" /> */}
            {/* <Share2 className="w-4 h-4 cursor-pointer" /> */}
            {/* <MoreVertical className="w-4 h-4 cursor-pointer" /> */}
          </div>
        </div>
        {/* Document Viewer */}
        <div ref={pdfContainerRef} className="bg-gray-300 p-4 flex justify-center relative">
          {lessonConfig.bookSrc ? (
            <iframe
              src={pdfUrl}
              title={lessonConfig.lessonTitle}
              className="w-full h-[800px] border-none"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
            />
          ) : (
            <div className="bg-white w-[600px] min-h-[800px] p-6 shadow-lg text-sm text-gray-800 flex items-center justify-center">
              <p className="text-gray-600">No PDF resource available for this lesson.</p>
            </div>
          )}
          {/* Fullscreen */}
          <div className="absolute bottom-4 right-4 bg-purple-600 text-white p-2 rounded-full shadow-lg cursor-pointer">
            <Maximize2 className="w-4 h-4" onClick={toggleFullscreen} />
          </div>
        </div>
      </div>
      {/* Course Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">About this course</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{lessonConfig.aboutCourse}</p>
      </section>
      <hr />
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{lessonConfig.courseDescription}</p>
      </section>
    </div>
  );
}
