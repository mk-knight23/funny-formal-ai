"use client";

import { useState, useEffect, useRef } from "react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  darkMode: boolean;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionType {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function VoiceInput({ onTranscript, darkMode }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as Window & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition || (window as Window & { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        const recognition = new (SpeechRecognition as new () => SpeechRecognitionType)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-lg font-semibold transition-all ${
        isListening
          ? 'bg-red-500 text-white animate-pulse'
          : darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
      title={isListening ? 'Stop recording' : 'Voice input'}
    >
      {isListening ? '🔴' : '🎤'}
    </button>
  );
}
