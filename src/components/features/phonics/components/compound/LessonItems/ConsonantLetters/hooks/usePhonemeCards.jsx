import { useState, useEffect } from "react";
import { fetchPhonemeCards } from "../../api/phonemicApi";

export const usePhonemeCards = () => {
  const [phonemeCards, setPhonemeCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhonemeCards = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPhonemeCards();
        setPhonemeCards(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading phoneme cards:", err);
        setError("Failed to load phoneme cards");
        setIsLoading(false);
      }
    };
    
    loadPhonemeCards();
  }, []);

  return { phonemeCards, isLoading, error };
};
