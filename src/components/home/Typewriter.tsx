"use client"
import React, { useState, useEffect } from 'react';


export default function Typewriter ({ text, delay = 50 }: { text: string, delay: number }){
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [currentIndex, text, delay]);

  return (
    <div className="typewriter-text">
      {displayText}
    </div>
  );
};

