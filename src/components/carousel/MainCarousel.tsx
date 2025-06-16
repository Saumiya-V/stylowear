import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const images = ["/carousel1.png", "/carousel4.png", "/carousel5.png"]

export function MainCarousel() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

 useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide()
    }, 3000) 

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [nextSlide])

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-full shrink-0 object-cover h-[355px]"
            alt={`Slide ${i}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button onClick={prevSlide} variant="ghost" className="bg-white/50 hover:bg-white/80 text-black">
          <ChevronLeft/>
        </Button>
        <Button onClick={nextSlide} variant="ghost" className="bg-white/50 hover:bg-white/80 text-black">
         <ChevronRight/>
        </Button>
      </div>
    </div>
  )
}
