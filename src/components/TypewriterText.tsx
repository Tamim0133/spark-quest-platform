import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  highlightText: string;
  speed?: number;
  className?: string;
}

const TypewriterText = ({ text, highlightText, speed = 50, className = '' }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = `${text} ${highlightText}`;
  const highlightStartIndex = text.length + 1;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const beforeHighlight = displayedText.slice(0, highlightStartIndex);
  const highlightPart = displayedText.slice(highlightStartIndex);

  return (
    <h1 className={className}>
      {beforeHighlight}
      {highlightPart && (
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {highlightPart}
        </span>
      )}
      {currentIndex < fullText.length && showCursor && (
        <span className="inline-block w-1 h-12 bg-primary ml-1 animate-pulse" />
      )}
    </h1>
  );
};

export default TypewriterText;
