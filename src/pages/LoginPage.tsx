import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { LoginSocialGoogle } from "reactjs-social-login";
import Vector from "../Assets/Vector-3.png";
import Star from "../Assets/star.png";
import ForgotPassword from "../components/ForgotPassword";
import authService from "@/services/authService";
import { toast } from "sonner";

interface Slide {
  title: string;
  description: string;
}

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isEmailValid: boolean;
  setIsEmailValid: (value: boolean) => void;
  isPasswordValid: boolean;
  setIsPasswordValid: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  setView: (view: "login" | "forgot") => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isEmailValid,
  setIsEmailValid,
  isPasswordValid,
  setIsPasswordValid,
  showPassword,
  setShowPassword,
  handleLogin,
  setView,
  isLoading
}) => {
  return (
    <div className="w-full h-screen flex items-start justify-center ">
      <div className="w-full xl:mt-20 2xl:mt-28 xl:h-[508px] xl:w-[281px] 2xl:h-[608px] 2xl:w-[337px]  3xl:h-[708px] 3xl:w-[428px] ">
        <h2 className="2xl:text-[27px] 3xl:text-[30px] font-bold text-gray-900 mb-6 font-mont">
          Welcome Back! 👋
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
           <p className="xl:text-[16px] 2xl:text-[18px] text-gray-600 mb-2 pb-6 font-mont">
              Sign Up Now—Discover 500+ Courses are
              <br /> waiting for your Learning
            </p>
            <label className="xl:text-[14px] 2xl:text-[16px] 3xl:text-[18px] block  font-medium text-gray-700 mb-1 font-mont">
              Email address/Phone Number*
            </label>
            <Input
              type="text"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
                className={`2xl:h-[58px] 2xl:w-[335px] 3xl:h-[64px] 3xl:w-[426px] px-3 rounded-lg border ${isEmailValid ? "border-gray-300" : "border-red-500"
                } focus:ring-purple-500 focus:border-purple-500 text-sm`}
            />
            {!isEmailValid && (
              <p className="text-red-500 text-xs mt-1 font-mont">
                Please enter a valid email address
              </p>
            )}
          </div>
          <div>
            <label className="xl:text-[14px] 2xl:text-[16px] block text-sm font-medium text-gray-700 mb-1 font-mont">
              Password*
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className={`2xl:h-[58px] 2xl:w-[335px] 3xl:h-[64px] 3xl:w-[426px] px-3 rounded-lg border ${isPasswordValid ? "border-gray-300" : "border-red-500"
                  } focus:ring-purple-500 focus:border-purple-500 pr-10 text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mt-1 font-mont">
                Password must be at least 8 characters with a letter and a
                number
              </p>
            )}
            {/* <div className="text-right mt-1">
              <button
                type="button"
                onClick={() => setView("forgot")}
                className="xl:text-[14px] 2xl:text-[16px] text-black font-medium font-mont underline"
              >
                Forgot password?
              </button>
            </div> */}
          </div>
          <Button
            type="submit"
                       style={{ backgroundColor: "#8A63FF" }}
            className="w-full xl:h-[54px] 2xl:h-[60px] 3xl:h-[64px] text-white rounded-lg xl:text-[18px] 2xl:text-[20px] font-mont font-semibold"

            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="flex items-center justify-center my-2">
            <div className="flex-1 h-px bg-gray-200 max-w-[140px]"></div>
            <span className="text-gray-300 text-xs mx-1.5 font-mont">Or</span>
            <div className="flex-1 h-px bg-gray-200 max-w-[140px]"></div>
          </div>
          <div className="flex space-x-2  justify-between">
            {/* <LoginSocialGoogle
              client_id={
                import.meta.env.VITE_GOOGLE_CLIENT_ID ||
                "897120726098-hjj58tfkldj1j9rhvh0nmed98hb16hbo.apps.googleusercontent.com"
              }
              access_type="offline"
              onResolve={({ provider, data }) => {
                console.log(provider, data);
              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <Button
                variant="outline"
                className="xl:w-[135px] xl:h-[48px] 2xl:w-[160px] 2xl:h-[58px]  3xl:w-[203px] 3xl:h-[64px] border border-gray-300 text-gray-700 rounded-sm xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] font-semibold font-mont flex items-center justify-center gap-1"
              >
                <svg className="xl:w-[20px] xl:h-[20px] 2xl:w-[22px] 2xl:h-[22px] 3xl:w-[24px] 3xl:h-[24px]" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>
            </LoginSocialGoogle> */}
            <Link to="/">
              <Button
                variant="outline"
                className="xl:w-[135px] xl:h-[48px] 2xl:w-[160px] 2xl:h-[58px]  3xl:w-[203px] 3xl:h-[64px] border border-gray-300 text-gray-700 rounded-sm xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] font-semibold font-mont"
              >
                Continue to Home
              </Button>
            </Link>
          </div>
        </form>
        {/* <div className="mt-8 text-left">
          <p className="text-black text-sm font-bold font-mont pt-3">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-black underline font-bold cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [view, setView] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const validEmail: boolean = emailRegex.test(email);
    const validPassword: boolean = passwordRegex.test(password);

    setIsEmailValid(validEmail);
    setIsPasswordValid(validPassword);

    if (validEmail && validPassword) {
      try {
        setIsLoading(true);
        
        // Log the credentials being used
        console.log("Attempting login with:", { email, password });
        
        const response = await authService.login({ email, password });
        
        console.log("Login response:", response);
        
        // The login was successful if we got here without an exception
        // since the response doesn't have a success property
        toast.success("Login successful!");
        navigate("/profile"); // Redirect to profile page after successful login
      } catch (error: any) {
        console.error("Login error:", error);
        
        // Display more specific error messages based on the error
        if (error.response && error.response.status === 401) {
          toast.error("Invalid email or password. Please try again.");
        } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (view === "forgot") {
    return <ForgotPassword />;
  }

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isEmailValid={isEmailValid}
      setIsEmailValid={setIsEmailValid}
      isPasswordValid={isPasswordValid}
      setIsPasswordValid={setIsPasswordValid}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleLogin={handleLogin}
      setView={setView}
      isLoading={isLoading}
    />
  );
};

const Signup: React.FC = () => {
  const slides: Slide[] = [
    {
      title: "Discover New Learning Paths Today",
      description:
        "Unlock your potential with our curated courses. Learn at your own pace with expert guidance and support.",
    },
    {
      title: "Master Skills with Expert Mentors",
      description:
        "Join thousands of learners and gain skills that matter. Start your journey with hands-on projects.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);

  useEffect(() => {
    const interval = 3000;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (prevSlide === slides.length - 1) {
          setSkipTransition(true);
          setTimeout(() => setSkipTransition(false), 0);
          return 0;
        }
        return (prevSlide + 1) % slides.length;
      });
    }, interval);

    return () => clearInterval(slideTimer);
  }, [slides.length]);

  return (
    <div className="w-full flex items-start justify-center ">
      <div className="w-[60%] mt-5 flex flex-col ">
        <div className="flex justify-center xl:ml-10 xl:mb-4 2xl:ml-10 2xl:mb-10 items-center xl:h-[70px] xl:w-[220px] 2xl:h-[80px] 2xl:w-[258px]  bg-white rounded-full" style={{ lineHeight: '1' }}>
          <img src={Star} alt="" className="w-4" />
          <div className="pl-3 ">
            <span className="xl:text-[16px]  2xl:text-[20px] font-medium text-gray-600 font-mont">
              Discover More, Learn <br />
              More - 500+ Courses <br />
              Inside
            </span>
          </div>
        </div>
        <div className="relative flex justify-center w-full bg-white overflow-hidden">
          <div className="bg-white flex place-items-center items-center relative">
            <img
              src={Vector}
              alt=""
              className="absolute z-0 3xl:w-[1000px]"
            />
            <div className="relative z-10 text-center flex flex-col justify-center mt-64 w-[100%]">
              <div className="flex justify-center">
                <div className="flex justify-center items-center 2xl:text-[10px] 2xl:w-[150px] 3xl:w-[150px] 3xl:text-[12px] bg-[#8A63FF] text-white text-[52%] w-[22%] h-6 rounded-full text-sm font-medium font-mont">
                  SUPERVISED COURSES
                </div>
              </div>
              <div className="overflow-hidden h-[220px] flex items-center justify-center">
                <div key={currentSlide} className="w-full">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight font-mont w-50 animate-pop-slide">
                    {slides[currentSlide].title
                      .split(" ")
                      .map((word, index) => (
                        <span key={index}>
                          {word} {index === 4 && <br />}
                        </span>
                      ))}
                  </h1>

                  <p className=" w-full lg:text-[10px] lg:h-[36px] xl:text-[12px] xl:h-[42px] 2xl:text-[14px] 2xl:h-[52px] 3xl:text-[16px] 3xl:h-[62px] text-gray-600  leading-relaxed font-mont flex items-center animate-pop-slide  ">
                    {slides[currentSlide].description}
                  </p>
                </div>
                {/* Description */}

              </div>

              {/* horizontal purple bar */}
              <div className="flex  items-center justify-center gap-4 lg:mt-4 lg:mb-5 xl:mt-2 xl:mb-8 2xl:mt-6 2xl:mb-10  ">
                {currentSlide === 0 ? (
                  <>
                    <Button
                      style={{
                        backgroundColor: "#8A63FF",
                        boxShadow: "0px 10px 16px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-sm px-6 py-2 lg:text-[10px] lg:h-[30px] lg:w-[155px] xl:text-[11px] xl:h-[40px] xl:w-[175px] 2xl:text-[12px] 2xl:h-[44px] 2xl:w-[175px] font-mont"
                    >
                      Start learning Now
                    </Button>
                    {/* <div className="flex items-center  ">
                      <div className="flex ">
                        {[1, 2, 3, 4].map((i) => (
                          <img
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-white"
                            src={`https://i.pravatar.cc/32?img=${i}`}
                            alt={`Student ${i}`}
                          />
                        ))}
                      </div>
                      <span className="lg:text-[9px] xl:text-[9px] 2xl:text-[10px] text-gray-600 font-mont">
                        1k+ students
                      </span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <img
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            src={`https://i.pravatar.cc/32?img=${i}`}
                            alt={`Student ${i}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">1k+ students</span>
                    </div>
                  </>
                ) : currentSlide === 1 ? (
                  <Button
                    style={{
                      backgroundColor: "#8A63FF",
                      boxShadow: "0px 10px 16px 0px rgba(0, 0, 0, 0.2)",
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-sm px-6 py-2 lg:text-[10px] lg:h-[30px] lg:w-[155px] xl:text-[11px] xl:h-[40px] xl:w-[175px] 2xl:text-[12px] 2xl:h-[44px] 2xl:w-[175px]  font-mont"
                  >
                    Express Your Interest Now
                  </Button>
                ) : (
                  <div className="flex items-center gap-4">
                    <Button
                      style={{
                        backgroundColor: "#8A63FF",
                        boxShadow: "0px 10px 16px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-sm px-6 py-2 text-sm font-mont"
                    >
                      Explore Courses Now
                    </Button>
                    <div className="flex items-center gap-1 text-sm text-gray-600 font-mont">
                      <span>📚</span>
                      <span>300+ Modules & 30+ Courses</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <div className="lg:w-[115px] lg:h-[4px] xl:w-[125px] 2xl:w-[145px] xl:h-[5px] bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full  bg-purple-600 rounded-full"
                    style={{
                      width: `${100 / slides.length}%`,
                      transform: `translateX(${currentSlide * 100}%)`,
                      transition: skipTransition
                        ? "none"
                        : "transform 0.5s ease-in-out",
                    }}
                  />
                </div>
              </div>
              <style>
                {`
                @keyframes popSlide {
                  from {
                    opacity: 0;
                    transform: translateY(10px) scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
                .animate-pop-slide {
                  animation: popSlide 0.5s ease-in-out forwards;
                }

                @media (min-width: 1920px) {
                  .large-screen\\:pb-\\[60\\%\\] {
                    padding-bottom: 60%;
                  }
                  .large-screen\\:pl-14 {
                    padding-left: 3.5rem;
                  }
                  .large-screen\\:pl-32 {
                    padding-left: 8rem;
                  }
                  .vector {
                    max-width: 1000px !important;
                  }
                }
              `}
              </style>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%]">
        <Login />
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default LoginPage;
