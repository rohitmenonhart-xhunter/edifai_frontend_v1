import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import check from "../Assets/check.gif";


const PurpleBox: React.FC = () => {

  // const[inputValue setInputValue]=useState();

  // const handleValue= () =>{
  //   setInputValue(()=>());
  // };


  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wrongSubmitted, setWrongSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setWrongSubmitted(false);
        setEmail("");
      }, 3000);
    } else {
      setWrongSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setWrongSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };
  return (
    <section className="lg:py-10 xl:py-14 2xl:py-20 text-white text-center relative overflow-hidden purple-box bg-[#8A63FF] rounded-3xl w-[70%] shadow-2xl"

    >
      <div className="w-[60%] mx-auto px-4">


        {/* Heading and Subtext */}
        <h2 className="lg:text-2xl xl:text-3xl 2xl:text-4xl font-mont font-medium mb-4 leading-tight">
          Join ambitious professionals and unlock your dream career today
        </h2>
        <p className="lg:text-xs xl:text-sm 2xl:text-base mb-8 leading-relaxed">
          Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations
        </p> {/* Sparkles Icon */}

        {/* Input and Button */}


        <div className="flex justify-center items-center gap-4 flex-wrap">
          {/* Email Input */}
          <div className="flex items-center bg-white text-gray-600 rounded-full px-4 py-2 shadow-md w-[50%]">
            <Mail className="w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Your mail address"
              className="bg-transparent outline-none text-black placeholder-[#8A63FF] lg:text-sm xl:text-base 2xl:text-xl lg:w-36 xl:w-48 2xl:w-56 3xl:w-72"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleSubmit}
            className="bg-white text-[#8A63FF] font-mont font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 flex items-center gap-2 lg:text-sm xl:text-base 2xl:text-xl"
          >
            Join Us
            {/* Submitted Message */}
            {isSubmitted && (
              <div className="flex justify-center items-center gap-2">
                <img src={check} alt="check" className="w-[2rem]" />
                {/* <span className="text-center text-white font-semibold">Submit</span> */}
              </div>
            )}
            {wrongSubmitted && (
              <div className="flex justify-center items-center gap-2">

                {/* <span className="text-center text-red-600 font-semibold">invalid</span> */}
              </div>
            )}
          </Button>

          {/* Submitted Message */}
          {/* {isSubmitted && (
            <div className="flex justify-center items-center gap-2">
              <img src={check} alt="check" className="w-[3rem]" />
              <span className="text-center text-white font-semibold">Submit</span>
            </div>
          )} */}
          {wrongSubmitted && (
            <div className="flex justify-center items-center gap-2">

              <span className="text-center text-red-600 font-semibold">invalid</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default PurpleBox;
