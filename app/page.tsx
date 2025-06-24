"use client";
import React, { useState } from "react";

function isColorDark(hexColor: string): boolean {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

const ColorGeneratorPage = () => {
  const [color, setColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const generateRandomNumber = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <main
      className="h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1
        className="text-3xl font-bold mb-6 cursor-pointer select-none"
        onClick={copyToClipboard}
        title="Click to copy"
      >
        {color}
      </h1>
      {copied && (
        <p
          className={`text-sm mb-3 ${
            isColorDark(color) ? "text-white" : "text-black"
          }`}
        >
          ✅ Copied!
        </p>
      )}

      <button
        onClick={generateRandomNumber}
        className="bg-white text-black px-6 py-2 rounded shadow hover:scale-105 transition-transform"
      >
        Generate Color
      </button>
    </main>
  );
};

export default ColorGeneratorPage;
