'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { cn } from '@/lib/utils'

const MOVEMENT_DAMPING = 60

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0.87 // start centred ~50°E (Gulf region)
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
      theta: 0.28,
      dark: 0,
      diffuse: 0.5,
      mapSamples: 16000,
      mapBrightness: 1.1,
      baseColor: [1, 1, 1],
      markerColor: [14 / 255, 164 / 255, 114 / 255],
      glowColor: [0.9, 0.97, 0.95],
      markers: [
        { location: [51.5074, -0.1278], size: 0.06 },   // UK
        { location: [24.7136, 46.6753], size: 0.08 },   // Saudi Arabia
        { location: [29.3759, 47.9774], size: 0.05 },   // Kuwait
        { location: [25.2854, 51.531],  size: 0.05 },   // Qatar
        { location: [26.0667, 50.5577], size: 0.04 },   // Bahrain
        { location: [23.614, 58.5922],  size: 0.06 },   // Oman
      ],
    })

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (!isDragging) {
        phi += 0.003
        velocity *= 0.95
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
