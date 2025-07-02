// src/features/modules/components/activities/ConsonantSounds.jsx
import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * ConsonantSounds activity component
 *
 * @param {Object} props - Component props
 * @param {Object} props.activity - Activity data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */
function ConsonantSounds({ activity, className, ...props }) {
  const [selectedSound, setSelectedSound] = useState(null);

  // Sample consonant sounds data
  const consonants = [
    { letter: "B", sound: "/b/", example: "ball", color: "bg-blue-100" },
    { letter: "C", sound: "/k/", example: "cat", color: "bg-green-100" },
    { letter: "D", sound: "/d/", example: "dog", color: "bg-yellow-100" },
    { letter: "F", sound: "/f/", example: "fish", color: "bg-red-100" },
    { letter: "G", sound: "/g/", example: "goat", color: "bg-purple-100" },
    { letter: "H", sound: "/h/", example: "hat", color: "bg-pink-100" },
    { letter: "J", sound: "/j/", example: "jump", color: "bg-indigo-100" },
    { letter: "K", sound: "/k/", example: "kite", color: "bg-green-100" },
    { letter: "L", sound: "/l/", example: "lion", color: "bg-yellow-100" },
    { letter: "M", sound: "/m/", example: "mouse", color: "bg-blue-100" },
    { letter: "N", sound: "/n/", example: "nest", color: "bg-purple-100" },
    { letter: "P", sound: "/p/", example: "pig", color: "bg-pink-100" },
    { letter: "Q", sound: "/kw/", example: "queen", color: "bg-indigo-100" },
    { letter: "R", sound: "/r/", example: "rabbit", color: "bg-red-100" },
    { letter: "S", sound: "/s/", example: "sun", color: "bg-yellow-100" },
    { letter: "T", sound: "/t/", example: "tiger", color: "bg-green-100" },
    { letter: "V", sound: "/v/", example: "van", color: "bg-blue-100" },
    { letter: "W", sound: "/w/", example: "water", color: "bg-purple-100" },
    { letter: "X", sound: "/ks/", example: "fox", color: "bg-pink-100" },
    { letter: "Y", sound: "/y/", example: "yellow", color: "bg-yellow-100" },
    { letter: "Z", sound: "/z/", example: "zebra", color: "bg-indigo-100" },
  ];

  return (
    <div className={cn("mt-8", className)} {...props}>
      <h2 className="text-xl font-semibold mb-4">Consonant Sounds</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 mb-8">
        {consonants.map((consonant) => (
          <button
            key={consonant.letter}
            className={cn(
              consonant.color,
              "w-full h-24 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105",
              selectedSound?.letter === consonant.letter
                ? "ring-2 ring-blue-500"
                : ""
            )}
            onClick={() => setSelectedSound(consonant)}
          >
            <span className="text-3xl font-bold">{consonant.letter}</span>
            <span className="text-sm mt-1">{consonant.sound}</span>
          </button>
        ))}
      </div>

      {selectedSound && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            <span className="text-2xl mr-2">{selectedSound.letter}</span>
            {selectedSound.sound}
          </h3>
          <p className="mb-4">
            Example word: <strong>{selectedSound.example}</strong>
          </p>
          <p className="text-gray-600">
            Click on the letter to hear the sound and see how to pronounce it.
          </p>
        </div>
      )}
    </div>
  );
}

export default ConsonantSounds;
