import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Volume2, Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const selectingOptionWithAudio = () => {
  // Memoize the words array to prevent unnecessary re-renders
  const words = useMemo(
    () => [
      "cat",
      "dog",
      "ship",
      "frog",
      "milk",
      "train",
      "fish",
      "chat",
      "light",
      "beach",
    ],
    []
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioCache, setAudioCache] = useState({});
  const [selectedVoice, setSelectedVoice] = useState("en-US-Standard-A");

  // Memoize the available voices array
  const availableVoices = useMemo(
    () => [
      { id: "en-US-Standard-A", name: "Female (A)", language: "English (US)" },
      { id: "en-US-Standard-B", name: "Male (B)", language: "English (US)" },
      {
        id: "en-US-Wavenet-C",
        name: "Female (C) - WaveNet",
        language: "English (US)",
      },
      {
        id: "en-US-Wavenet-D",
        name: "Male (D) - WaveNet",
        language: "English (US)",
      },
      { id: "en-GB-Standard-A", name: "Female (A)", language: "English (UK)" },
      { id: "en-GB-Standard-B", name: "Male (B)", language: "English (UK)" },
    ],
    []
  );

  // Generate 3 random options plus the correct answer
  useEffect(() => {
    if (currentWordIndex < words.length) {
      const correctWord = words[currentWordIndex];
      const otherWords = words.filter((word) => word !== correctWord);
      const shuffledWords = [...otherWords].sort(() => 0.5 - Math.random());
      const testOptions = [correctWord, ...shuffledWords.slice(0, 3)].sort(
        () => 0.5 - Math.random()
      );
      setOptions(testOptions);
    }
  }, [currentWordIndex, words]);

  // Memoize the getGoogleTTSAudio function to prevent recreation on each render
  const getGoogleTTSAudio = useCallback(async (text, voice) => {
    if (!text) {
      throw new Error("Text is required for TTS");
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Make sure we're using the voice parameter passed to the function
    const voiceToUse = voice || "en-US-Standard-A";

    console.log(`Getting TTS for "${text}" with voice "${voiceToUse}"`);

    // Return a placeholder URL that includes the voice parameter
    return `https://example.com/tts-audio/${encodeURIComponent(
      text
    )}?voice=${encodeURIComponent(voiceToUse)}.mp3`;
  }, []);

  // Play audio for the current word
  const playWordAudio = () => {
    if (audioPlaying || !sentences[currentSentenceIndex]) return;

    // Use the Web Speech API to speak the sentence
    const sentence = sentences[currentSentenceIndex];
    setAudioPlaying(true);

    // Use Speech Synthesis API
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 0.8; // Slightly slower for clearer pronunciation
    utterance.pitch = 1.2; // Slightly higher pitch for child-friendly voice

    // Handle when speech ends
    utterance.onend = () => {
      setAudioPlaying(false);
    };

    // Handle errors
    utterance.onerror = () => {
      console.error("Speech synthesis error");
      setAudioPlaying(false);
    };

    // Speak the sentence
    window.speechSynthesis.speak(utterance);
  };

  // Preload audio for all words when component mounts or voice changes
  useEffect(() => {
    // Create a flag to track if the component is still mounted
    let isMounted = true;

    const preloadAudio = async () => {
      // Only proceed if still mounted
      if (!isMounted) return;

      setIsLoading(true);
      const cache = {};
      let loadedCount = 0;

      for (const word of words) {
        // Check if still mounted before each word processing
        if (!isMounted) break;

        try {
          // Make sure we're explicitly passing selectedVoice to the function
          const audioUrl = await getGoogleTTSAudio(word, selectedVoice);

          // Since we're simulating, let's just create an audio object without actually loading
          const audio = new Audio();

          // Simulate successful loading by storing the URL
          audio._simulatedSrc = audioUrl;

          // Store the word and voice for reference
          audio._word = word;
          audio._voice = selectedVoice;

          cache[word] = audio;
          loadedCount++;
        } catch (error) {
          console.error(`Failed to load audio for word: ${word}`, error);
        }
      }

      // Only update state if still mounted
      if (isMounted) {
        console.log(
          `Successfully prepared ${loadedCount}/${words.length} audio items`
        );
        setAudioCache(cache);
        setIsLoading(false);
      }
    };

    preloadAudio();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [selectedVoice, words, getGoogleTTSAudio]);

  // Voice selector component (memoized)
  const VoiceSelector = useCallback(() => {
    return (
      <div className="voice-selector flex items-center justify-between">
        <label htmlFor="voice-select" className="mr-2">
          Voice:{" "}
        </label>
        <div className="flex items-center">
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            disabled={isLoading}
            className="mr-2"
          >
            {availableVoices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.language} - {voice.name}
              </option>
            ))}
          </select>
          {isLoading && (
            <span className="text-sm text-gray-500">Loading...</span>
          )}
        </div>
      </div>
    );
  }, [selectedVoice, isLoading, availableVoices]);

  // Memoize the speakWord function
  const speakWord = useCallback(() => {
    const word = words[currentWordIndex];

    if (audioCache[word]) {
      // Since we're simulating, let's just use the browser's TTS
      console.log(
        `Simulating playback for: ${word} with voice ${audioCache[word]._voice}`
      );
      fallbackToBrowserTTS(word);
    } else {
      console.warn(`Audio not cached for word: ${word}, using fallback`);
      fallbackToBrowserTTS(word);
    }
  }, [currentWordIndex, words, audioCache]);

  // Memoize the fallbackToBrowserTTS function
  const fallbackToBrowserTTS = useCallback(
    (text) => {
      if ("speechSynthesis" in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slightly slower for clarity

        // Try to match the selected voice if possible
        if (selectedVoice.includes("en-GB")) {
          // Try to find a British English voice
          const voices = speechSynthesis.getVoices();
          const britishVoice = voices.find(
            (v) =>
              v.lang.includes("en-GB") &&
              (selectedVoice.includes("Female")
                ? v.name.includes("Female")
                : v.name.includes("Male"))
          );
          if (britishVoice) utterance.voice = britishVoice;
        } else if (selectedVoice.includes("en-US")) {
          // Try to find an American English voice
          const voices = speechSynthesis.getVoices();
          const americanVoice = voices.find(
            (v) =>
              v.lang.includes("en-US") &&
              (selectedVoice.includes("Female")
                ? v.name.includes("Female")
                : v.name.includes("Male"))
          );
          if (americanVoice) utterance.voice = americanVoice;
        }

        speechSynthesis.speak(utterance);
      }
    },
    [selectedVoice]
  );

  const handleOptionSelect = useCallback(
    (option) => {
      setSelectedOption(option);
      setShowResult(true);

      if (option === words[currentWordIndex]) {
        setCorrectAnswers((prev) => prev + 1);
      }
    },
    [currentWordIndex, words]
  );

  const handleNext = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setShowResult(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  }, [currentWordIndex, words.length]);

  const resetTest = useCallback(() => {
    setCurrentWordIndex(0);
    setShowResult(false);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setCompleted(false);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Reading Test</h2>

      {/* Add the voice selector here */}
      <Card className="p-4 mb-4">
        <VoiceSelector />
      </Card>

      {isLoading ? (
        <Card className="p-6 text-center">
          <p>Loading audio resources...</p>
          <Progress className="mt-4" value={undefined} />
        </Card>
      ) : !completed ? (
        <Card className="p-6">
          <div className="mb-4">
            <Progress
              value={(currentWordIndex / words.length) * 100}
              className="h-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Word {currentWordIndex + 1} of {words.length}
            </p>
          </div>

          <div className="text-center mb-6">
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={playWordAudio}
            >
              <Volume2 className="h-6 w-6" />
            </Button>
            <p className="mt-2 text-sm text-gray-500">Click to hear the word</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedOption === option
                    ? option === words[currentWordIndex]
                      ? "success"
                      : "destructive"
                    : "outline"
                }
                className="p-4 text-lg"
                onClick={() => handleOptionSelect(option)}
                disabled={showResult}
              >
                {option}
                {showResult &&
                  selectedOption === option &&
                  (option === words[currentWordIndex] ? (
                    <Check className="ml-2 h-4 w-4" />
                  ) : (
                    <X className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 text-center">
              <p
                className={
                  selectedOption === words[currentWordIndex]
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {selectedOption === words[currentWordIndex]
                  ? "Correct! Well done!"
                  : `Incorrect. The correct word is "${words[currentWordIndex]}".`}
              </p>
              <Button className="mt-3" onClick={handleNext}>
                {currentWordIndex < words.length - 1
                  ? "Next Word"
                  : "See Results"}
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Test Complete!</h3>
          <p className="text-lg mb-4">
            You scored {correctAnswers} out of {words.length}
          </p>
          <div className="mb-4">
            <Progress
              value={(correctAnswers / words.length) * 100}
              className="h-4"
            />
          </div>
          <Button onClick={resetTest} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </Card>
      )}
    </div>
  );
};

export default selectingOptionWithAudio;
