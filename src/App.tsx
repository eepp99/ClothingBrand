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
    <div className="relative w-full min-h-[100dvh] md:h-screen bg-[#f7f7f8] overflow-x-hidden md:overflow-hidden text-gray-900 flex flex-col md:block">
      
      {/* 3D Canvas wrapper */}
      <div className="relative md:absolute w-full h-[40vh] min-h-[300px] md:h-auto md:min-h-0 md:inset-0 z-10 shrink-0 order-3 md:order-none touch-pan-y">
         <Scene activeModel={activeModel} color={activeColor} lightIntensity={lightIntensity} />
      </div>

      {/* Header */}
      <header className="relative md:absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-20 pointer-events-none shrink-0 order-1 md:order-none">
         <div className="pointer-events-auto">
           <h1 className="text-xl md:text-2xl font-display font-bold tracking-tighter">CHROMA™</h1>
         </div>
         <div className="flex gap-4 md:gap-6 pointer-events-auto items-center">
            <button className="hover:opacity-60 transition-opacity cursor-pointer"><Menu size={20} className="md:w-6 md:h-6" strokeWidth={1.5} /></button>
            <button className="hover:opacity-60 transition-opacity cursor-pointer"><ShoppingBag size={20} className="md:w-6 md:h-6" strokeWidth={1.5} /></button>
         </div>
      </header>

      {/* Product Foreground Info Overlay */}
      <div className="relative md:absolute w-full left-0 md:top-[15%] md:left-20 md:w-auto z-20 pointer-events-none flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-0 mt-0 md:mt-0 shrink-0 order-2 md:order-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col items-center md:items-start"
          >
             <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight max-w-[320px] md:max-w-md drop-shadow-sm text-black">
               {product.name}
             </h2>
             <div className="flex items-center gap-3 mt-2 md:mt-4">
               <p className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-gray-500 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full inline-block border border-black/5 shadow-sm">
                 {product.category}
               </p>
               <p className="text-lg md:text-2xl font-sans font-medium text-gray-800 drop-shadow-sm">{product.price}</p>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Color Picker & Navigation Bottom */}
      <div className="relative md:absolute md:bottom-12 md:left-20 md:right-20 flex flex-col md:flex-row justify-between items-center md:items-end z-20 pointer-events-none shrink-0 px-4 pb-6 pt-2 md:p-0 order-4 md:order-none gap-6 md:gap-0">
        
        {/* Controls */}
        <div className="pointer-events-auto flex flex-col sm:flex-row md:flex-col gap-6 md:gap-6 w-full md:w-auto justify-center md:justify-start items-center md:items-start md:self-auto">
          {/* Lighting Control */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gray-400">Lighting</p>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1" 
              value={lightIntensity} 
              onChange={(e) => setLightIntensity(parseFloat(e.target.value))} 
              className="w-48 sm:w-56 md:w-48 accent-gray-800 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
              aria-label="Light Intensity"
            />
          </div>
          
          {/* Colors */}
          <div className="flex flex-col gap-3 items-center md:items-start">
            <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest text-gray-400">Select Color</p>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start max-w-[280px] md:max-w-none">
             {COLORS.map((c) => (
                <button
                   key={c.hex}
                   onClick={() => setActiveColor(c.hex)}
                   className={`w-10 h-10 rounded-full outline-none transition-all duration-300 cursor-pointer ${activeColor === c.hex ? 'scale-110 ring-2 ring-offset-2 ring-gray-800 ring-offset-[#f7f7f8]' : 'hover:scale-110 border border-black/10'}`}
                   style={{ backgroundColor: c.hex }}
                   aria-label={`Select ${c.name}`}
                   title={c.name}
                />
             ))}
          </div>
        </div>
        </div>

        {/* Carousel Prev/Next */}
        <div className="pointer-events-auto flex gap-4 w-full md:w-auto justify-center md:justify-end md:self-auto mt-4 md:mt-0">
           <button 
             onClick={prevModel}
             className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
             aria-label="Previous product"
           >
             <ChevronLeft size={24} />
           </button>
           <button 
             onClick={nextModel}
             className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
             aria-label="Next product"
           >
             <ChevronRight size={24} />
           </button>
        </div>

      </div>
    </div>
  );
}
