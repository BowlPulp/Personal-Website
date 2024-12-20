import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function EmojiDisplay() {
  const [emoji, setEmoji] = useState('');  // State to store the emoji

  // Calculate time and determine emoji (morning or night)
  useEffect(() => {
    // Get the current hour of the day
    const currentHour = new Date().getHours();

    // Determine if it's morning or night
    const isMorning = currentHour >= 6 && currentHour < 18;  // Morning from 6 AM to 6 PM
    const emojiData = isMorning ? "I can do it!" : "am tired.";  // Sun for morning, Moon for night

    setEmoji(emojiData);  // Set the emoji based on the time
  }, []);  // Only run once when the component mounts

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <WetPaintButton emoji={emoji} />
    </div>
  );
}

const WetPaintButton = ({ emoji }) => {
  return (
    <button className="group relative rounded bg-green-300 px-4 py-2.5 font-semibold text-inherit transition-colors hover:bg-green-400">
      {emoji} {/* Display the emoji here */}
      <Drip left="10%" height={24} delay={0.5} />
      <Drip left="30%" height={20} delay={3} />
      <Drip left="57%" height={10} delay={4.25} />
      <Drip left="85%" height={16} delay={1.5} />
    </button>
  );
};

const Drip = ({ left, height, delay }) => {
  return (
    <motion.div
      className="absolute top-[99%] origin-top"
      style={{
        left,
      }}
      initial={{ scaleY: 0.75 }}
      animate={{ scaleY: [0.75, 1, 0.75] }}
      transition={{
        duration: 2,
        times: [0, 0.25, 1],
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 2,
      }}
    >
      <div
        style={{ height }}
        className="w-2 rounded-b-full bg-green-300 transition-colors group-hover:bg-green-400"
      />
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-full top-0"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-green-300 transition-colors group-hover:fill-green-400"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41766 0 5.4 0Z"
            className="fill-green-300 transition-colors group-hover:fill-green-400"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-full top-0 rotate-90"
      >
        <g clipPath="url(#clip0_1077_28)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41765 2.41766 0 5.4 0Z"
            className="fill-green-300 transition-colors group-hover:fill-green-400"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.4 0H0V5.4C0 2.41766 0 5.4 0Z"
            className="fill-green-300 transition-colors group-hover:fill-green-400"
          />
        </g>
        <defs>
          <clipPath id="clip0_1077_28">
            <rect width="6" height="6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: [-8, 50], opacity: [1, 0] }}
        transition={{
          duration: 2,
          times: [0, 1],
          delay,
          ease: 'easeIn',
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="absolute top-full h-2 w-2 rounded-full bg-green-300 transition-colors group-hover:bg-green-400"
      />
    </motion.div>
  );
};

export default EmojiDisplay;
