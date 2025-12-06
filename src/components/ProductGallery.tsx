import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const images = [
  '/images/photo-1517245480009-64056ebabb49.avif',
  '/images/photo-1626836937739-3037bda1b661.avif',
  '/images/premium_photo-1683134595771-75d06162b646.avif'
]

const ProductGallery: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // AUTO-SLIDE: change image every 3 seconds
  useEffect(() => {
    if (isHovered) return // PAUSE sliding when hovered

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <motion.div
      className="flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Thumbnails */}
      <div className="hidden md:flex flex-col gap-3 w-20">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            key={i}
            src={src}
            alt={`thumb-${i}`}
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`w-20 h-20 object-cover rounded cursor-pointer border transition-all ${
              i === index ? 'ring-2 ring-amber-400 shadow-glow' : 'opacity-80 hover:opacity-100'
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <motion.div
        className="flex-1 rounded-2xl overflow-hidden shadow-soft-lg"
        whileHover={{
          scale: 1.01,
          boxShadow: '0 20px 40px rgba(0,0,0,0.18)'
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={index} // Re-run animation on change
          src={images[index]}
          alt="main"
          className="w-full h-[520px] object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ProductGallery
