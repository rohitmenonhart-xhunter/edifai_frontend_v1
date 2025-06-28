import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Books from "../Assets/Books.png";
import { LoginSocialGoogle } from "reactjs-social-login";

const ResetLinkSent: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-screen p-6 flex items-center justify-center">
        <div className="w-full max-w-xs">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-mont">
            Reset Link Sent
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2 pb-2 font-mont">
                A password reset link has been sent to your <br /> registered
                email.
              </p>
            </div>
            <div className="">
              <img
                src={Books}
                alt=""
                className=""
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="flex items-center justify-center my-2">
              <div className="flex-1 h-px bg-gray-200 max-w-[140px]"></div>
              <span className="text-gray-300 text-xs mx-1.5 font-mont">Or</span>
              <div className="flex-1 h-px bg-gray-200 max-w-[140px]"></div>
            </div>
            <div className="flex space-x-2">
              <LoginSocialGoogle
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
                  className="w-22 h-10 border border-gray-300 text-gray-700 rounded-sm text-xs font-semibold font-mont flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              </LoginSocialGoogle>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-30 h-10 border border-gray-300 text-gray-700 rounded-sm text-xs font-semibold font-mont"
                >
                  Continue as Guest
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-8 text-left">
            <p className="text-black text-sm font-bold font-mont pt-3">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-black underline font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetLinkSent;
