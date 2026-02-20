import { useState } from "react";
import { useForm } from "react-hook-form";

const EmailSection = ({ setStep, setEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const emailHandler = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail(data.email); // email save
      setStep("password"); // step change
    }, 1500);
  };

  return (
    <div
      className="relative overflow-hidden w-full max-w-245 mx-auto bg-white rounded-3xl shadow-sm 
                  p-6 sm:p-8 md:p-12 
                  flex flex-col md:flex-row gap-8 md:gap-16"
    >
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
            className="w-7 h-7 sm:w-8 sm:h-8"
          />
        </div>

        <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-normal text-gray-900 mb-3">
          Sign in to Chrome
        </h1>

        <p className="text-gray-600 text-sm sm:text-[16px]">
          Use your Google Account
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col justify-between">
        <form onSubmit={handleSubmit(emailHandler)}>
          <div>
            <label className="text-sm text-blue-600">Email or phone</label>

            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full border border-blue-500 rounded-md px-3 py-3 outline-none 
                       focus:ring-1 focus:ring-blue-500"
            />

            <p className="text-blue-600 text-sm mt-3 cursor-pointer">
              Forgot email?
            </p>

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

            <p className="text-gray-500 text-sm mt-6 leading-relaxed">
              Not your computer? Use Guest mode to sign in privately.
              <span className="text-blue-600 cursor-pointer">
                Learn more about using Guest mode
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 sm:gap-6 mt-10">
            <button className="text-blue-600 font-medium text-left sm:text-center">
              Create account
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition w-full sm:w-auto">
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

export default EmailSection;
