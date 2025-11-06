import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RangeSliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  value: valueProp = 50,
  onChange,
  className = '',
}) => {
  const [value, setValue] = useState(valueProp);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const updateValue = useCallback((clientX: number) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((percentage / 100) * (max - min) + min);
      setValue(newValue);
      onChange?.(newValue);
    }
  }, [min, max, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  }, [updateValue]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  }, [updateValue]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      updateValue(e.touches[0].clientX);
    }
  }, [isDragging, updateValue]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`relative py-2 ${className}`}>
      {/* Track */}
      <div 
        ref={trackRef}
        className="w-full h-1 rounded-full cursor-pointer bg-dark-light"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Progress with Gradient */}
        <motion.div 
          className="h-full rounded-full pointer-events-none bg-gradient-to-r from-[#06d6a0] to-[#00b4d8]"
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: isDragging ? 0 : 0.2, 
            ease: "easeOut" 
          }}
        />
      </div>

      {/* Thumb */}
      <motion.div
        className="absolute top-0 w-6 h-6 rounded-full shadow-lg cursor-grab active:cursor-grabbing bg-[#06d6a0]"
        style={{ 
          left: `calc(${percentage}% - 12px)`,
        }}
        animate={{ 
          scale: isDragging ? 1.2 : 1,
        }}
        transition={{ 
          duration: isDragging ? 0.1 : 0.2,
          ease: "easeOut"
        }}
        whileHover={{ scale: 1.1 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

export default RangeSlider;

