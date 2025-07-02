import React, { useEffect, useState } from "react";

const withAudioSupport = (WrappedComponent) => {
  return function WithAudioSupport(props) {
    const [audioSupported, setAudioSupported] = useState(true);
    const [audioPermission, setAudioPermission] = useState(null);

    useEffect(() => {
      // Check if browser supports audio
      const audioContext = window.AudioContext || window.webkitAudioContext;
      setAudioSupported(!!audioContext);

      // Check for microphone permissions if needed
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(() => setAudioPermission("granted"))
          .catch((error) => {
            console.error("Audio permission error:", error);
            setAudioPermission("denied");
          });
      }
    }, []);

    // Enhanced props with audio support information
    const enhancedProps = {
      ...props,
      audioSupported,
      audioPermission,
      requestAudioPermission: async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setAudioPermission("granted");
          return true;
        } catch (error) {
          console.error("Failed to get audio permission:", error);
          setAudioPermission("denied");
          return false;
        }
      },
    };

    return <WrappedComponent {...enhancedProps} />;
  };
};

export default withAudioSupport;
