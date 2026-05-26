/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Scene from './Scene';
import { PRODUCTS, COLORS } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Menu } from 'lucide-react';

export default function App() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeColor, setActiveColor] = useState(COLORS[0].hex);
  const [lightIntensity, setLightIntensity] = useState(1);

  const nextModel = () => setActiveModel((prev) => (prev + 1) % PRODUCTS.length);
  const prevModel = () => setActiveModel((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);

  const product = PRODUCTS[activeModel];

  return (
    <div className="relative w-full h-screen bg-[#f7f7f8] overflow-hidden text-gray-900">
      
      {/* 3D Canvas wrapper */}
      <div className="absolute inset-0 z-10">
         <Scene activeModel={activeModel} color={activeColor} lightIntensity={lightIntensity} />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 pointer-events-none">
         <div className="pointer-events-auto">
           <h1 className="text-2xl font-display font-bold tracking-tighter">CHROMA™</h1>
         </div>
         <div className="flex gap-6 pointer-events-auto items-center">
            <button className="hover:opacity-60 transition-opacity cursor-pointer"><Menu size={24} strokeWidth={1.5} /></button>
            <button className="hover:opacity-60 transition-opacity cursor-pointer"><ShoppingBag size={24} strokeWidth={1.5} /></button>
         </div>
      </header>

      {/* Product Foreground Info Overlay */}
      <div className="absolute w-full left-0 top-[12%] md:top-[15%] md:left-20 md:w-auto z-20 pointer-events-none flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col items-center md:items-start"
          >
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight max-w-[320px] md:max-w-md drop-shadow-sm text-black">
               {product.name}
             </h2>
             <div className="flex items-center gap-3 mt-4">
               <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-gray-500 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full inline-block border border-black/5 shadow-sm">
                 {product.category}
               </p>
               <p className="text-xl md:text-2xl font-sans font-medium text-gray-800 drop-shadow-sm">{product.price}</p>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Color Picker & Navigation Bottom */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-20 md:right-20 flex flex-col md:flex-row justify-between items-end md:items-center z-20 pointer-events-none">
        
        {/* Controls */}
        <div className="pointer-events-auto flex flex-col sm:flex-row md:flex-col gap-6 mb-8 md:mb-0 self-start md:self-auto">
          {/* Lighting Control */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gray-400">Lighting</p>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1" 
              value={lightIntensity} 
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))} 
              className="w-32 sm:w-40 md:w-48 accent-gray-800 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              aria-label="Light Intensity"
            />
          </div>
          
          {/* Colors */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gray-400">Select Color</p>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
             {COLORS.map((c) => (
                <button
                   key={c.hex}
                   onClick={() => setActiveColor(c.hex)}
                   className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full outline-none transition-all duration-300 cursor-pointer ${activeColor === c.hex ? 'scale-110 ring-2 ring-offset-2 ring-gray-800 ring-offset-[#f7f7f8]' : 'hover:scale-110 border border-black/10'}`}
                   style={{ backgroundColor: c.hex }}
                   aria-label={`Select ${c.name}`}
                   title={c.name}
                />
             ))}
          </div>
        </div>
        </div>

        {/* Carousel Prev/Next */}
        <div className="pointer-events-auto flex gap-4 self-end md:self-auto">
           <button 
             onClick={prevModel}
             className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
             aria-label="Previous product"
           >
             <ChevronLeft size={24} />
           </button>
           <button 
             onClick={nextModel}
             className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
             aria-label="Next product"
           >
             <ChevronRight size={24} />
           </button>
        </div>

      </div>
    </div>
  );
}
