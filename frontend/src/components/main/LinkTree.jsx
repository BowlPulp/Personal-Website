import React from 'react';
import { FiLogIn } from "react-icons/fi";

const links = [
    { name: 'Bowlpulp - Brand Website', url: 'https://bowlpulp.com' },
    { name: 'Github Profile Viewer', url: 'https://bowlpulp.github.io/Github-Profile-Viewer/' },
    { name: 'Image Tweak - Image Formatting Tool', url: 'https://image-tweak.vercel.app/' },
    // Add more links here
];

export default function LinkTree() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md text-center space-y-4 bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-xl">
                <h1 className="text-5xl font-extrabold text-white mb-8 tracking-wide">
                    Kartik Arora's <span className="text-green-300">Projects</span>
                </h1>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RoundedSlideButton text={link.name} />
                    </a>
                ))}
            </div>
        </div>
    );
}

const RoundedSlideButton = ({ text }) => {
    return (
        <button
            className={` w-full
        relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        border-green-300 px-4 py-2 font-semibold
        uppercase text-green-300 transition-all duration-500

        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-green-300
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-neutral-900
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95 mb-4` }
        >
            <FiLogIn />
            <span>{text}</span>
        </button>
    );
};