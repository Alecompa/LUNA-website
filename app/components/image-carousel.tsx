"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselImage {
  src: string
  alt: string
  description: string
}

export default function ImageCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const images: CarouselImage[] = [
    {
      src: "/images/hero/accelerator.jpg",
      alt: "LUNA Accelerator",
      description: "The 400kV LUNA accelerator - our underground particle accelerator for nuclear astrophysics research"
    },
    {
      src: "/images/hero/source.jpg",
      alt: "Ion Source",
      description: "High-precision ion source generating particle beams for stellar reaction studies"
    },
    {
      src: "/images/LUNA_collab-2.jpg",
      alt: "LUNA Collaboration",
      description: "Our international team of scientists working together on groundbreaking research"
    },
    {
      src: "/images/experiments/12C_12C.jpg",
      alt: "Carbon-Carbon Fusion",
      description: "Experimental setup for studying the crucial carbon-carbon fusion reaction"
    },
    {
      src: "/images/experiments/14N_pg_MV.jpeg",
      alt: "Nitrogen Reaction Chamber",
      description: "Detection system for nitrogen-proton reactions relevant to stellar nucleosynthesis"
    },
    {
      src: "/images/LUNA_collab-3.jpg",
      alt: "Laboratory Equipment",
      description: "State-of-the-art equipment deep underground at Gran Sasso National Laboratory"
    },
  ]

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFullscreenIndex((prev) => 
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFullscreenIndex((prev) => 
      prev === null ? null : (prev + 1) % images.length
    )
  }

  // Keyboard navigation in fullscreen mode
  useEffect(() => {
    if (fullscreenIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setFullscreenIndex((prev) => 
          prev === null ? null : prev === 0 ? images.length - 1 : prev - 1
        )
      } else if (e.key === 'ArrowRight') {
        setFullscreenIndex((prev) => 
          prev === null ? null : (prev + 1) % images.length
        )
      } else if (e.key === 'Escape') {
        setFullscreenIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreenIndex, images.length])

  return (
    <>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Inside LUNA</h2>
            <p className="text-muted-foreground">Explore our laboratory and research facilities</p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div 
                    className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setFullscreenIndex(index)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-all duration-300 ${
                        hoveredIndex === index ? 'brightness-50 scale-105' : 'brightness-100'
                      }`}
                    />
                    <div 
                      className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p className="text-white text-center font-medium text-lg leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFullscreenIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setFullscreenIndex(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Fullscreen Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[fullscreenIndex].src}
                alt={images[fullscreenIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
                priority
              />
              
              {/* Description overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-center text-xl font-medium">
                  {images[fullscreenIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

