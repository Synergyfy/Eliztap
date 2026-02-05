'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthSidePanelProps {
    features: {
        title: string;
        description: string;
        icon?: string;
    }[];
}

export default function AuthSidePanel({ features }: AuthSidePanelProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setCurrentSlide(0);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % features.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [features.length]);

    const currentFeature = features[currentSlide];

    return (
        <div className="relative w-full h-full overflow-hidden bg-white font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/auth_bg_light.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/70 to-primary/50"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-end p-12 lg:p-16">
                {/* Carousel Content */}
                <div className="mb-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            {currentFeature?.icon && (
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 text-white">
                                    <span className="material-icons-round text-3xl">{currentFeature.icon}</span>
                                </div>
                            )}
                            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                                {currentFeature?.title}
                            </h2>
                            <p className="text-lg text-white/90 font-medium leading-relaxed max-w-md">
                                {currentFeature?.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                    {features.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            onClick={() => setCurrentSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
