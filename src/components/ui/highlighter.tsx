'use client'

import { useEffect, useRef } from 'react'
import type React from 'react'
import { useInView } from 'framer-motion'
import { annotate } from 'rough-notation'
import type { RoughAnnotation } from 'rough-notation/lib/model'

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  /** Wait for element to scroll into view before drawing */
  isView?: boolean
  /**
   * Extra delay in ms before drawing the annotation.
   * Use when the parent has an enter animation (e.g. Framer Motion) so the
   * bounding box is measured after the element has settled.
   */
  delay?: number
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#0ea47230',
  strokeWidth = 1.5,
  animationDuration = 700,
  iterations = 1,
  padding = 3,
  multiline = true,
  isView = true,
  delay = 0,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, { once: true, margin: '-5%' })
  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let timer: ReturnType<typeof setTimeout>

    timer = setTimeout(() => {
      if (!element) return
      const currentAnnotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })
      annotation = currentAnnotation
      currentAnnotation.show()

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide()
        currentAnnotation.show()
      })
      resizeObserver.observe(element)
      resizeObserver.observe(document.body)
    }, delay)

    return () => {
      clearTimeout(timer)
      annotation?.remove()
      resizeObserver?.disconnect()
    }
  }, [shouldShow, action, color, strokeWidth, animationDuration, iterations, padding, multiline, delay])

  return (
    <span ref={elementRef} className="relative inline">
      {children}
    </span>
  )
}
