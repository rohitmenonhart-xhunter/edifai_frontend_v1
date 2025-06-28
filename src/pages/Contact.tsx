import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react"; // Removed Check as it's not used in the form
import heros from "../Assets/hero.png";
import PurpleBox from "@/components/PurpleBox";
import WallOfLove from "../components/WallOfLove";
import contactProfie from "../Assets/sarabesh.png";
const Contact = () => {
  return (
    <div className="2xl:h-sreen w-full bg-white">
      <div className="2xl:w-full ">
        <Navbar />
      </div>
      {/* Hero Section */}
      <section className="relative from-purple-50 to-white overflow-hidden xl:h-[520px] 2xl:h-[630px] 3xl:h-[738px] ">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Optional: Subtle noise texture or pattern */}
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgeT0iMSIgcj0iMSIgZmlsbD0iIzAwMDAwMDMzIi8+PC9zdmc+')] bg-repeat"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center lg:pt-5 xl:pt-5 2xl:pt-5 3xl:pt-10">
          <div className="lg:w-[628px] lg:h-[424px] xl:w-[728px] xl:h-[504px] 2xl:w-[828px] 2xl:h-[604px] 3xl:w-[1028px] 3xl:h-[694px] flex flex-col justify-center  ">
            <div className="flex justify-center w-full">
              <img
                src={heros}
                alt="Hero"
                className="lg:w-[60%] xl:w-[56%] 2xl:w-[53%] 3xl:w-[50%] absolute top-[10px] lg:pt-6 xl:pt-12  2xl:pt-10 3xl:pt-8"
              />
            </div>
            <div className=" flex flex-col justify-center items-center mx-auto lg:mt-32 xl:mt-36 2xl:mt-32 3xl:mt-20 text-center lg:h-[160px] xl:h-[160px]  2xl:h-[223px] xl:w-[100%] 2xl:w-[100%] 3xl:w-[100%] ">
              <span className="lg:w-[100px] lg:h-[20px] xl:w-[115px] xl:h-[25px] 2xl:w-[120px] 2xl:h-[32px] 3xl:w-[123px] 3xl:h-[35px]  flex justify-center items-center bg-[#8A63FF] text-white lg:text-[7px] xl:text-[8px]  2xl:text-[10px] 3xl:text-xs font-semibold  rounded-full mb-2 ">
                EDIFAI COURSE
              </span>
              <h1 className=" xl:text-4xl 2xl:text-5xl lg:text-3xl font-bold text-gray-900 mb-4 ">
                Contact Us
              </h1>
              <p className="lg:text-[12px] xl:text-sm 2xl:text-base 3xl:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto ">
                Connect with the Edifai team for personalized assistance. Whether
                you have questions about our programs, need technical support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full lg:h-[598px] xl:h-[698px] 2xl:h-[798px] 3xl:h-[70vh] items-center flex justify-center">
        <div className="flex w-full justify-around">
          {/* Left: Contact Info */}
          <div className="lg:w-[370px] lg:h-[550px] xl:w-[398px] xl:h-[650px] xl:mx-16 2xl:w-[458px] 2xl:h-[700px] 3xl:w-[558px] 3xl:h-[740px]  3xl:mx-10 ">
            <span className="2xl:w-[97px] 2xl:h-[20px]">
              <p className="text-[#8A63FF] mb-5 lg:text-[1.5rem]  font-semibold xl:text-xs 2xl:text-sm">
                Edifai
              </p>
            </span>
            <h2 className="lg:text-2xl xl:text-3xl 2xl:text-5xl font-normal text-black mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 mb-8 lg:text-sm xl:text-sm 2xl:text-lg">
              Have questions or need assistance with our courses? We're here to
              help you every step of the way. Reach out to us for any inquiries,
              and our team will be glad to provide the support you need promptly
              and efficiently.
            </p>

            <h3 className=" lg:texl-base xl:text-lg  2xl:text-xl 3xl:text-2xl font-mont text-gray-900 mb-4">
              How we can help
            </h3>

            <ul className="space-y-4 text-gray-700 text-lg  pl-5">
              <li className="flex items-center gap-2 lg:text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8A63FF]">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>{" "}
                Answer your course-related questions
              </li>
              <li className="flex items-center gap-2 lg:text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8A63FF]">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>{" "}
                Provide technical support and troubleshooting
              </li>
              <li className="flex items-center gap-2 lg:text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#8A63FF]">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>{" "}
                Assist with enrollment and program details
              </li>
            </ul>

            <div className=" lg:mt-8 xl:mt-16 pl-2 gap-x-2  flex ">
              <img
                src={contactProfie}
                alt=""
                className="lg:h-10 lg:w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 3xl:h-16 3xl:w-16 rounded-[50%]"
              />
              <div className="flex flex-col w-[50%]">
                <p className="lg:text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg ">
                  Name
                </p>
                <p className="lg:text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg">
                  Mr Sarabesh Sriram, CEO at <span className="text-blue-500">Stacia</span>
                </p>
              </div>
            </div>

            {/* <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pl-2">Note</h3> */}
            <p className="text-gray-600 lg:text-[13px]  xl:text-sm 2xl:text-base 3xl:text-lg mt-12">
              We are committed to ensuring your learning experience is smooth
              and successful. Our dedicated support staff is available to
              address all your concerns, providing timely and helpful solutions
              to help you thrive in your journey.
            </p>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:justify-start xl:justify-center flex flex-col justify-center items-center bg-white p-4 rounded-xl  lg:h-[288px] lg:w-[288px] xl:mx-16 xl:h-[350px] xl:w-[350px] 2xl:w-[458px] 2xl:h-[420px] 3xl:mx-10  3xl:w-[558px] 3xl:h-[498px]  shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            {" "}
            {/* Changed bg-gray-50 to bg-white */}
            <div className="flex justify-start  lg:h-[35px] lg:w-[255px] xl:w-[300px] 2xl:w-[400px] 3xl:w-[496px]">
              <h3 className="lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl font-mont text-gray-900 mb-6">
                Access the Edifai Template:
              </h3>{" "}
            </div>
            {/* Updated title */}
            <form className="lg:space-y-3  xl:space-y-6  lg:h-[187px] lg:w-[255px] xl:h-[237px] xl:w-[300px] 2xl:w-[400px] 2xl:h-[287px] 3xl:h-[337px] 3xl:w-[496px] ">
              <div className="flex justify-center lg:h-[30px] xl:h-[40px] 2xl:h-[43px] 3xl:h-[47px] w-full ">
                {" "}
                {/* Added grid for side-by-side inputs */}
                <div className="mx-1 w-[50%] h-full  rounded-xl">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="w-full h-full p-3 lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg border-none outline-none bg-[#F7F8FA] font-mont rounded-xl focus:ring-2 focus:ring-purple-600 "
                  />
                  {/* Removed Check icon */}
                </div>
                <div className="mx-1 w-[50%] h-full  rounded-xl">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full h-full p-3 lg:text-[10px] xl:text-xs 2xl:text-sm 3xl:text-lg border-none outline-none font-mont bg-[#F7F8FA] rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  {/* Removed Check icon */}
                </div>
              </div>
              <Textarea
                placeholder="" // Placeholder in image looks like a general message or larger input area
                rows={5}
                className="w-full lg:h-[105px] xl:h-[105px] 2xl:h-[125px] 3xl:h-[146px] p-3 border-none outline-none font-mont bg-[#F7F8FA] rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              ></Textarea>
              <Button
                type="submit"
                className="w-full lg:h-[22px] xl:h-[32px] 2xl:h-[43px] 3xl:h-[47px] bg-[#8A63FF] hover:bg-purple-700 text-white py-3 rounded-xl text-xs font-mont"
              >
                Sign Up
              </Button>
              <p className="lg:text-[10px] xl:text-xs 2xl:text-sm font-mont text-gray-500 lg:mt-0 xl:mt-4 text-center">
                Section can be added here (description or information){" "}
                {/* Updated text */}
              </p>
            </form>
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 w-full lg:h-[350px] xl:h-[380px] 2xl:h-[420px] flex ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:w-[80%] 2xl:w-[80%] flex items-center justify-between ">
          <div className="bg-white p-1 border rounded-xl h-[256px] flex justify-center items-center lg:w-[30%] lg:h-[90%] xl:w-[30%] xl:h-[90%] 2xl:h-[90%] 2xl:w-[30%]">
            <div className="bg-[#F7F8FA]  p-6 rounded-xl  text-center h-full w-full flex  flex-col justify-center items-center">
              <div className="bg-white w-fit p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Mail className="lg:w-5 lg:h-8 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8  text-purple-600" />
              </div>
              <h3 className="lg:text-base xl:text-lg 2xl:text-[21px]  font-medium text-gray-900 mb-2">
                Message Us
              </h3>
              <p className="text-gray-600 lg:text-sm xl:text-base 2xl:text-[16px]   3xl:text-xl">
                contactus@staciacorp.com
              </p>
            </div>
          </div>

          <div className="bg-white p-1 border rounded-xl h-[256px] flex justify-center items-center lg:w-[30%] lg:h-[90%] xl:w-[30%] xl:h-[90%] 2xl:h-[90%] 2xl:w-[30%]">
            <div className="bg-[#F7F8FA]  p-6 rounded-xl  text-center h-full w-full flex  flex-col justify-center items-center">
              <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Phone className="lg:w-5 lg:h-8 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-purple-600" />
              </div>
              <h3 className="lg:text-base xl:text-lg 2xl:text-[21px] font-medium text-gray-900 mb-2">
                Call Us!
              </h3>
              <p className="text-gray-600 lg:text-sm xl:text-base 2xl:text-[16px]  3xl:text-xl">
                +91 936-303-4150
              </p>
            </div>
          </div>

          <div className="bg-white p-1 border rounded-xl h-[256px] flex justify-center items-center lg:w-[30%] lg:h-[90%] xl:w-[30%] xl:h-[90%] 2xl:h-[90%] 2xl:w-[30%]">
            <div className="bg-[#F7F8FA]  p-6 rounded-xl  text-center h-full w-full flex  flex-col justify-center items-center">
              <div className="bg-white p-4 rounded-full inline-flex items-center justify-center mb-4">
                <MapPin className="lg:w-5 lg:h-8 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 text-purple-600" />
              </div>
              <h3 className="lg:text-base xl:text-lg 2xl:text-[21px] font-medium text-gray-900 mb-2">
                Address
              </h3>
              <p className="text-gray-600 lg:text-sm xl:text-base 2xl:text-[16px]   3xl:text-xl">
                Ground Floor, C-53, Guindy Industrial Estate, Chennai
              </p>
            </div>
          </div>
        </div>
      </section>

      <WallOfLove />
      {/* CTA Section */}
      <div className="flex justify-center items-center h-[450px] ">
        <PurpleBox />
      </div>
      <Footer />
    </div>
  );
};
export default Contact;
