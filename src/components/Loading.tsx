import React from "react";

interface LoadingProps {
    message?: string;
    showLogo?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
    message = "Please wait we are loading content",
    showLogo = true,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
                    }}
                ></div>
            </div>

            {/* Loading Content */}
            <div className="relative z-10">
                <div className="flex flex-col items-center space-y-6">
                    {showLogo && (
                        <div className="text-4xl font-extrabold tracking-wide mb-2">
                            <span className="text-indigo-400">Edu</span>
                            <span className="text-white">LMS</span>
                        </div>
                    )}

                    {/* Spinning Ring Loader */}
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-700 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>

                    <div className="flex items-center space-y-2 gap-1">
                        <p className="text-white text-lg font-medium">
                            {message}
                        </p>
                        <div className="flex space-x-1">
                            <div
                                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                                style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                                style={{ animationDelay: "200ms" }}
                            ></div>
                            <div
                                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                                style={{ animationDelay: "400ms" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
