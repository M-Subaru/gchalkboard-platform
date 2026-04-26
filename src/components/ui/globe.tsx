'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { cn } from '@/lib/utils'

const MOVEMENT_DAMPING = 60

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // cobe's phi=0 faces the prime meridian (0°E / UK / Africa).
    // Each radian = 57.3° of longitude. Gulf region is at ~50°E.
    // phi = 50 / 57.3 = 0.87 centres the globe on the Arabian Peninsula / Gulf.
    let phi = 0.87
    let width = 0
    let isDragging = false
    let lastX = 0
    let velocity = 0
    let rafId: number

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.25,          // slight southward tilt
      dark: 0,
      diffuse: 0.45,
      mapSamples: 16000,
      mapBrightness: 1.1,
      baseColor: [1, 1, 1],
      markerColor: [14 / 255, 164 / 255, 114 / 255],
      glowColor: [0.9, 0.97, 0.95],
      markers: [],           // no dots — locations listed below the globe
    })

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (!isDragging) {
        phi += 0.002           // slow auto-rotate eastward
        velocity *= 0.9
      } else {
        phi += velocity / MOVEMENT_DAMPING
      }
      globe.update({
        phi,
        width: width * 2,
        height: width * 2,
      })
    }

    animate()
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    }, 0)

    const canvas = canvasRef.current!

    const onDown = (clientX: number) => {
      isDragging = true
      lastX = clientX
      if (canvas) canvas.style.cursor = 'grabbing'
    }
    const onMove = (clientX: number) => {
      if (!isDragging) return
      const delta = clientX - lastX
      velocity = delta
      phi += delta / MOVEMENT_DAMPING
      lastX = clientX
    }
    const onUp = () => {
      isDragging = false
      if (canvas) canvas.style.cursor = 'grab'
    }

    const onMouseDown = (e: MouseEvent) => onDown(e.clientX)
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX)
    const onTouchStart = (e: TouchEvent) => e.touches[0] && onDown(e.touches[0].clientX)
    const onTouchMove = (e: TouchEvent) => e.touches[0] && onMove(e.touches[0].clientX)

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onUp)

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  return (
    <div className={cn('relative mx-auto aspect-square w-full', className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500"
        style={{ cursor: 'grab' }}
      />
    </div>
  )
}
