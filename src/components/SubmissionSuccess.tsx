// src/components/SubmissionSuccess.tsx
import React from 'react';
import tick from '../Assets/tick.png';

const SubmissionSuccess: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto my-10 text-center flex flex-col items-center justify-center min-h-[500px]">
      <div className="relative w-40 h-40 mb-6">
        {/* Outer circle (light purple) */}
        <div className="absolute inset-2 bg-[#8A63FF4D] rounded-full flex items-center justify-center animate-pop-out" style={{ animationDelay: '0s' }}></div>
        {/* Middle circle (medium purple) */}
        <div className="absolute inset-6 bg-[#8A63FF99] rounded-full flex items-center justify-center animate-pop-out" style={{ animationDelay: '0.5s' }}></div>
        {/* Inner circle (darker purple) */}
        <div className="absolute inset-10 bg-[#8A63FF] rounded-full flex items-center justify-center animate-pop-out" style={{ animationDelay: '0.8s' }}>
          {/* Double tick path */}
          <div className="flex items-end pl-0">
            <img src={tick} alt="Success tick" className="w-7 h-4" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl space-y-3 font-bold text-[#8A63FF] mb-2">
        Thank You for showing your Interest
      </h3>
      <p className="text-gray-600 space-y-8">Our team will get back to you soon</p>

      {/* CSS for animation */}
      <style>{`
        @keyframes pop-out {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pop-out {
          animation: pop-out 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SubmissionSuccess;