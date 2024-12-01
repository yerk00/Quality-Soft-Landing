import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TechnologiesCarousel = () => {
  const technologies = [
    { 
      src: 'https://qualitysoft-1f745.web.app/img/python.png', 
      name: 'Python',
      color: 'bg-blue-100',
      description: 'Potente lenguaje de programación para desarrollo Backend y análisis de datos'
    },
    { 
      src: 'https://qualitysoft-1f745.web.app/img/word.png', 
      name: 'Microsoft Word',
      color: 'bg-blue-200',
      description: 'Herramienta esencial para documentación y gestión de proyectos'
    },
    { 
      src: 'https://qualitysoft-1f745.web.app/img/angular.png', 
      name: 'Angular',
      color: 'bg-red-100',
      description: 'Framework robusto para desarrollo de aplicaciones web escalables'
    },
    { 
      src: 'https://qualitysoft-1f745.web.app/img/js.png', 
      name: 'JavaScript',
      color: 'bg-yellow-100',
      description: 'Lenguaje de programación fundamental para desarrollo web interactivo'
    },
    { 
      src: 'https://qualitysoft-1f745.web.app/img/post.png', 
      name: 'PostgreSQL',
      color: 'bg-blue-300',
      description: 'Sistema de gestión de bases de datos objeto-relacional avanzado'
    },
    { 
      src: 'https://qualitysoft-1f745.web.app/img/mysql.png', 
      name: 'MySQL',
      color: 'bg-orange-100',
      description: 'Base de datos de código abierto altamente eficiente y confiable'
    },
    { 
      src: 'https://cdn.worldvectorlogo.com/logos/astrojs.svg', 
      name: 'Astro.js',
      color: 'bg-purple-100',
      description: 'Framework moderno para construcción de sitios web estáticos y dinámicos'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % technologies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + technologies.length) % technologies.length)
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
      <AnimatePresence>
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className={`
            relative flex flex-col md:flex-row items-center justify-between 
            p-8 rounded-2xl shadow-2xl 
            ${technologies[currentIndex].color}
            transform transition-all duration-500 ease-in-out
            space-y-6 md:space-y-0 md:space-x-8
          `}
        >
          <div className="w-64 h-64 flex items-center justify-center">
            <img 
              src={technologies[currentIndex].src} 
              alt={technologies[currentIndex].name}
              className="max-w-full max-h-full object-contain 
                transition-transform duration-300 
                hover:scale-110 hover:rotate-6"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {technologies[currentIndex].name}
            </h3>
            <p className="text-gray-700 text-lg">
              {technologies[currentIndex].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={prevSlide}
          className="
            bg-gray-800 text-white 
            p-3 rounded-full 
            hover:bg-gray-700 
            transition-colors 
            shadow-lg
            transform hover:scale-110
          "
        >
          ← Anterior
        </button>
        <button 
          onClick={nextSlide}
          className="
            bg-gray-800 text-white 
            p-3 rounded-full 
            hover:bg-gray-700 
            transition-colors 
            shadow-lg
            transform hover:scale-110
          "
        >
          Siguiente →
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {technologies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full 
              transition-all duration-300
              ${index === currentIndex 
                ? 'bg-gray-800 scale-150' 
                : 'bg-gray-300 hover:bg-gray-500'}
            `}
          />
        ))}
      </div>
    </div>
  )
}

export default TechnologiesCarousel