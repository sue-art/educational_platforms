import React, { useState, useEffect, useRef } from "react";

const WordCard = ({ letters, isVisible }) => {
  const [displayedLetters, setDisplayedLetters] = useState([]);
  const timeoutsRef = useRef([]);
  const mountedRef = useRef(false);

  const letterWidth = 80; // Width of each letter image (in pixels)
  const letterGap = 10; // Gap between letters (in pixels)

  // Clear all timeouts to prevent memory leaks
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  // Reset animation and start displaying letters
  const startLetterAnimation = () => {
    clearAllTimeouts();

    if (!letters || letters.length === 0) {
      setDisplayedLetters([]);
      return;
    }

    setDisplayedLetters(Array(letters.length).fill(null));

    const newTimeouts = [];
    for (let i = 0; i < letters.length; i++) {
      const timeoutId = setTimeout(() => {
        if (mountedRef.current) {
          setDisplayedLetters((prev) => {
            const newLetters = [...prev];
            newLetters[i] = letters[i];
            return newLetters;
          });
        }
      }, i * 600); // 600ms delay between each letter

      newTimeouts.push(timeoutId);
    }

    timeoutsRef.current = newTimeouts;
  };

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    if (isVisible && letters) {
      setDisplayedLetters([]);

      const timeoutId = setTimeout(() => {
        if (mountedRef.current) {
          startLetterAnimation();
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (!isVisible) {
      clearAllTimeouts();
      setDisplayedLetters([]);
    }
  }, [isVisible, letters]);

  // Calculate the width of the container dynamically
  const containerWidth = letters
    ? letters.length * (letterWidth + letterGap) - letterGap
    : 0;

  return (
    <div className="flex justify-center space-x-2 h-50">
      <div>
        <div
          className="rounded-lg p-4 text-center text-white"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            gap: `${letterGap}px`,
            borderRadius: "5px",
            width: `${containerWidth}px`, // Set the width dynamically
            minHeight: "70px", // Adjust height to match letter height
          }}
        >
          {letters.map((letter, index) => (
            <div
              key={`letter-${index}`}
              style={{
                width: `${letterWidth}px`,
                height: "120px",
                display: "flex",
                margin: "-25px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {displayedLetters[index] ? (
                <img
                  src={`/images/letter-${letter}.png`}
                  alt={`Letter ${letter}`}
                  style={{
                    width: `${letterWidth}px`,
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                // Placeholder div to reserve space
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
