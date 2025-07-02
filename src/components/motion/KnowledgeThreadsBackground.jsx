import React from "react";
import flower from "../../assets/flower.png";
import creativity from "../../assets/creativity.png";
import pencil from "../../assets/pencil.png";

// Component for fixed PNG elements
const FixedPngElement = ({ imageUrl, style, size, position }) => {
  return (
    <div
      className="fixed-png"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size || "90px",
        height: size || "90px",
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <img
        src={imageUrl}
        alt="Fixed element"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: style?.opacity || 0.15,
        }}
      />
    </div>
  );
};

const FixedPngBackground = ({ images, positions, containerStyle }) => {
  return (
    <div
      className="fixed-png-background"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      {/* Add fixed PNG elements */}
      {images.map((imageUrl, index) => (
        <FixedPngElement
          key={index}
          imageUrl={imageUrl}
          size={`${Math.floor(40 + Math.random() * 90)}px`}
          position={positions[index]}
          style={{
            opacity: 1,
          }}
        />
      ))}
    </div>
  );
};

// Example usage component
const BackgroundWithFixedImages = ({ children }) => {
  const pngImages = [creativity, pencil];

  // Define fixed positions for each image
  const positions = [
    { x: "10%", y: "10%" },
    { x: "80%", y: "40%" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Fixed PNG Background */}
      <FixedPngBackground images={pngImages} positions={positions} />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
};

export { FixedPngElement, FixedPngBackground, BackgroundWithFixedImages };
