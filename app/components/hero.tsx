"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Hero() {
  const images = ['images/hero/accelerator.jpg', 'images/hero/source.jpg', 'images/hero/Luna-5218.jpg']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images and track loading status
  useEffect(() => {
    let loadedCount = 0
    const totalImages = images.length

    images.forEach(imageUrl => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
      img.src = imageUrl
    })
  }, [])

  useEffect(() => {
    if (!imagesLoaded) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      setNextImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [imagesLoaded])

  if (!imagesLoaded) {
    return (
      <section className="relative h-[80vh] bg-gray-900">
        {/* Loading state content */}
      </section>
    )
  }

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-50 z-[2]"></div>
      <div className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Understanding the stars from deep underground
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The Laboratory for Nuclear Astrophysics study charged-particle induced reactions of astrophysical interest
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/about'}>
            Know more...
            </Button>
        </motion.div>
      </div>
    </section>
  )
}

