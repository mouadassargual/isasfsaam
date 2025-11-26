"use client"

import { useEffect, useState } from "react"

interface Leaf {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  rotation: number
  type: number
  opacity: number
}

function LeafSVG({ type, size }: { type: number; size: number }) {
  const colors = ["#d97706", "#ea580c", "#b45309", "#ca8a04", "#c2410c"]
  const color = colors[type % colors.length]

  if (type % 4 === 0) {
    // Maple leaf
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L9 9H5l3 5-2 6h4l2 2 2-2h4l-2-6 3-5h-4L12 2z" />
      </svg>
    )
  } else if (type % 4 === 1) {
    // Oak leaf
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <ellipse cx="12" cy="10" rx="5" ry="7" />
        <rect x="11" y="15" width="2" height="6" />
      </svg>
    )
  } else if (type % 4 === 2) {
    // Birch leaf
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2C8 6 6 10 6 14c0 4 2.7 6 6 6s6-2 6-6c0-4-2-8-6-12z" />
        <rect x="11" y="18" width="2" height="4" />
      </svg>
    )
  } else {
    // Simple leaf
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.09-.24C7.29 17.58 9.14 13.14 17 11v3l4-5-4-5v4z" />
      </svg>
    )
  }
}

export function FallingLeaves() {
  const [leafElements, setLeafElements] = useState<Leaf[]>([])

  useEffect(() => {
    const newLeaves: Leaf[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 25 + Math.random() * 20,
      size: 16 + Math.random() * 12,
      rotation: Math.random() * 360,
      type: Math.floor(Math.random() * 5),
      opacity: 0.4 + Math.random() * 0.3,
    }))
    setLeafElements(newLeaves)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {leafElements.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf absolute"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            transform: `rotate(${leaf.rotation}deg)`,
            opacity: leaf.opacity,
          }}
        >
          <LeafSVG type={leaf.type} size={leaf.size} />
        </div>
      ))}
    </div>
  )
}
