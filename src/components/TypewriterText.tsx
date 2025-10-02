import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  highlightText: string;
  speed?: number;
  className?: string;
  infinite?: boolean;
  pauseDuration?: number;
}

const TypewriterText = ({ 
  text, 
  highlightText, 
  speed = 50, 
  className = '',
  infinite = false,
  pauseDuration = 2000
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fullText = `${text} ${highlightText}`;
  const highlightStartIndex = text.length + 1;

  useEffect(() => {
    if (!infinite) {
      if (currentIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    } else {
      // Infinite loop logic
      if (!isDeleting && currentIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (!isDeleting && currentIndex === fullText.length) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      } else if (isDeleting && currentIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
      }
    }
  }, [currentIndex, fullText, speed, infinite, isDeleting, pauseDuration]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const beforeHighlight = displayedText.slice(0, highlightStartIndex);
  const highlightPart = displayedText.slice(highlightStartIndex);

  return (
    <span className={className}>
      {beforeHighlight}
      {highlightPart && (
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {highlightPart}
        </span>
      )}
      {(infinite || currentIndex < fullText.length) && showCursor && (
        <span className="inline-block w-1 h-12 bg-primary ml-1 animate-pulse" />
      )}
    </span>
  );
};

export default TypewriterText;
