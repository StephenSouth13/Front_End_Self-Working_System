"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function LiveClock() {
  const [time, setTime] = useState(new Date())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Tránh render trên server
  if (!isClient) return null

  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-100 dark:border-blue-800/30 backdrop-blur-sm">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
        <Clock className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-wider">
          {formatTime(time)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">{formatDate(time)}</div>
      </div>
    </div>
  )
}
