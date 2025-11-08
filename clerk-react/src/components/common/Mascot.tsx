import { useState, useRef, useEffect } from 'react';

interface MascotProps {
  happiness?: number; // 0-100
}

export const Mascot = ({ happiness = 100 }: MascotProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit the movement range
      const maxMove = 15;
      const x = Math.max(-maxMove, Math.min(maxMove, deltaX / 10));
      const y = Math.max(-maxMove, Math.min(maxMove, deltaY / 10));
      
      setMousePosition({ x, y });
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      // Reset to center when hover stops
      setMousePosition({ x: 0, y: 0 });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  // Determine emotion based on happiness level
  const getEmotion = () => {
    if (happiness >= 80) return 'very-happy';
    if (happiness >= 60) return 'happy';
    if (happiness >= 40) return 'neutral';
    if (happiness >= 20) return 'sad';
    return 'very-sad';
  };

  const emotion = getEmotion();

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mascot Character */}
      <div className="relative w-28 h-28">
        {/* Body */}
        <div 
          className="absolute inset-0 bg-[#6b4423] rounded-full border-4 border-[#5a3a1f] transition-transform duration-200"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        >
          {/* Face Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-8 left-7">
              <div className="w-5 h-5 bg-[#fdfbf7] rounded-full border-3 border-[#3a2414]">
                <div 
                  className="w-3 h-3 bg-[#3a2414] rounded-full absolute transition-all duration-200"
                  style={{
                    top: `${4 + mousePosition.y / 3}px`,
                    left: `${4 + mousePosition.x / 3}px`
                  }}
                ></div>
              </div>
            </div>
            <div className="absolute top-8 right-7">
              <div className="w-5 h-5 bg-[#fdfbf7] rounded-full border-3 border-[#3a2414]">
                <div 
                  className="w-3 h-3 bg-[#3a2414] rounded-full absolute transition-all duration-200"
                  style={{
                    top: `${4 + mousePosition.y / 3}px`,
                    left: `${4 + mousePosition.x / 3}px`
                  }}
                ></div>
              </div>
            </div>

            {/* Mouth */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              {emotion === 'very-happy' && (
                <div className="w-10 h-5 border-[#3a2414] border-b-4 border-l-4 border-r-4 rounded-b-full transition-all"></div>
              )}
              {emotion === 'happy' && (
                <div className="w-9 h-4 border-[#3a2414] border-b-4 border-l-4 border-r-4 rounded-b-full transition-all"></div>
              )}
              {emotion === 'neutral' && (
                <div className="w-7 h-1.5 bg-[#3a2414] rounded-full"></div>
              )}
              {emotion === 'sad' && (
                <div className="w-9 h-4 border-[#3a2414] border-t-4 border-l-4 border-r-4 rounded-t-full"></div>
              )}
              {emotion === 'very-sad' && (
                <div className="w-10 h-5 border-[#3a2414] border-t-4 border-l-4 border-r-4 rounded-t-full"></div>
              )}
            </div>

            {/* Cheeks for happy states */}
            {(emotion === 'very-happy' || emotion === 'happy') && (
              <>
                <div className="absolute top-12 left-3 w-4 h-3 bg-[#a07856] rounded-full opacity-50"></div>
                <div className="absolute top-12 right-3 w-4 h-3 bg-[#a07856] rounded-full opacity-50"></div>
              </>
            )}
          </div>

          {/* Arms - thicker and more visible */}
          <div 
            className="absolute -left-8 top-12 w-10 h-3 bg-[#6b4423] border-3 border-[#5a3a1f] rounded-full transform origin-right transition-transform duration-300"
            style={{
              rotate: isHovering ? '20deg' : '45deg'
            }}
          ></div>
          <div 
            className="absolute -right-8 top-12 w-10 h-3 bg-[#6b4423] border-3 border-[#5a3a1f] rounded-full transform origin-left transition-transform duration-300"
            style={{
              rotate: isHovering ? '-20deg' : '-45deg'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
