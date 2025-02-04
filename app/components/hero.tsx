"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Hero() {
  const images = ['/Luna-5258.jpg', '/Luna-5256.jpg'] // Replace with your actual image paths
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative h-[80vh] bg-cover bg-center bg-scroll md:bg-fixed flex items-center transition-all duration-1000 ease-in-out"
      style={{ 
        backgroundImage: `url('${images[currentImageIndex]}')`
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
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

