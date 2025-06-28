import { useRef, useState } from "react";
import aboutvideo from "../Assets/about-video/Backend web development - a complete overview.mp4";
export default function TeamShipSection() {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const defaultVideoURL = { aboutvideo }; // Default video URL

  const handlePlay = () => {
    setShowVideo(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <section className="px-6 md:px-20 py-16 bg-white text-gray-800 ">
      <div className="w-[100%] items-center justify-center ">
        {/* Text Block */}
        <div className="flex justify-between gap-10  m-auto w-[80%]  ">
          <h2 className="lg:text-xl xl:text-xl 3xl:text-4xl md:text-4xl font-mont font-medium leading-tight">
            The best software <br></br>teams ship quickly and often.
          </h2>
          <div className="px-20 items-start lg:w-[70%] 3xl:w-[50%] flex justify-center flex-col  ">
            <p className="text-gray-900 font-mont lg:text-sm 3xl:text-lg pr-10 pb-2">
              With its intuitive interface and powerful features, Stellar
              empowers businesses to leverage technology for growth.
            </p>
            <div className=" gap-4 items-center pt-5 lg:text-sm">
              <button
                onClick={handlePlay}
                className="bg-[#8A63FF] text-white font-mont py-2 px-5 rounded-full hover:bg-[#7A53EF] transition"
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* Video Block */}
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col space-y-4 relative rounded-2xl overflow-hidden shadow-lg xl:h-[60vh] 2xl:h-[50vh] 3xl:h-[70vh] 
          w-[80%]   ">
            {!showVideo && (
              <div className="relative w-full h-full  flex justify-center  border border-black  ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0uO6brHoskULOyasOMXWHXxK_f83yTTCfQ&s"
                  alt="Team Thumbnail"
                  className="object-cover rounded-xl w-full"
                />

                <button
                  onClick={handlePlay}
                  className="absolute inset-0  lg:text-sm xl:text-xl 2xl:text-3xl 3xl:text-4xl flex items-center justify-center bg-black/40 text-white font-medium  rounded-xl"
                >
                  ▶ Play Video
                </button>
              </div>
            )}
            {showVideo && (
              <div>
                <video
                  ref={videoRef}
                  src={aboutvideo}
                  controls
                  className="w-full  object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-900 font-mont mt-10 text-lg">
        Experience the Stellar difference and unlock the true potential of your
        online
      </p>
    </section>
  );
}