import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { images } from "@/assets/imageArr"
import { btn, Container, ControlsDiv, ImageStyles, ImgContainer } from "@/styles/carouselStyles"


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
    <div className={Container}>
      <div
        className={ImgContainer}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={ImageStyles}
            alt={`Slide ${i}`}
          />
        ))}
      </div>

      <div className={ControlsDiv}>
        <Button onClick={prevSlide} variant="ghost" className={btn}>
          <ChevronLeft/>
        </Button>
        <Button onClick={nextSlide} variant="ghost" className={btn}>
         <ChevronRight/>
        </Button>
      </div>
    </div>
  )
}
