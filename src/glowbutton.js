import React from 'react';

const GlowingButton = ({ClickEvent}) => {
  return (
    <button 
    onClick={ClickEvent}
      className="
        relative 
        w-40 
        h-40 
        rounded-full 
        bg-orange-600 
        border-8 
        border-orange-700 
        shadow-[0_8px_15px_rgba(0,0,0,0.3)] 
        transition-all 
        duration-300 
        hover:scale-105 
        active:scale-95 
        transform 
        overflow-hidden 
        group
        hover:shadow-[0_0_30px_rgba(255,90,0,0.6)]
      "
    >
      {/* Inner gradient for depth */}
      <div 
        className="
          absolute 
          inset-0 
          bg-gradient-to-br 
          from-orange-700 
          to-orange-500 
          rounded-full 
          opacity-90
        "
      />
      
      {/* Highlight effect */}
      <div 
        className="
          absolute 
          top-2 
          left-2 
          right-2 
          bottom-2 
          bg-white 
          opacity-20 
          rounded-full 
          group-hover:opacity-10 
          transition-opacity 
          duration-300
        "
      />
      
      {/* Emboss and bevel simulation */}
      <div 
        className="
          absolute 
          inset-0 
          border-4 
          border-orange-600 
          rounded-full 
          opacity-50 
          shadow-[inset_0_-4px_6px_rgba(0,0,0,0.2)]
        "
      />
      
      {/* Hover glow effect */}
      <div 
        className="
          absolute 
          inset-0 
          bg-orange-400 
          rounded-full 
          opacity-0 
          group-hover:opacity-30 
          transition-opacity 
          duration-300 
          group-hover:animate-ping
        "
      />

      {/* Intense glow on hover */}
      <div 
        className="
          absolute 
          inset-0 
          bg-orange-300 
          rounded-full 
          opacity-0 
          group-hover:opacity-20 
          transition-opacity 
          duration-300 
          blur-2xl 
          group-hover:animate-pulse
        "
      />
    </button>
  );
};

export default GlowingButton;