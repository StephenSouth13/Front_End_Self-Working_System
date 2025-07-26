"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Settings, X, Coffee, BookOpen, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface StudySession {
  studyTime: number // minutes
  breakTime: number // minutes
  cycles: number
}

const presetSessions: Record<string, StudySession> = {
  pomodoro: { studyTime: 25, breakTime: 5, cycles: 4 },
  deep: { studyTime: 90, breakTime: 20, cycles: 2 },
  short: { studyTime: 15, breakTime: 3, cycles: 6 },
  custom: { studyTime: 30, breakTime: 10, cycles: 3 },
}

export function FloatingStudyTimer() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false)
  const [currentCycle, setCurrentCycle] = useState(1)
  const [session, setSession] = useState<StudySession>(presetSessions.pomodoro)
  const [selectedPreset, setSelectedPreset] = useState("pomodoro")
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const timerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)


  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      // Timer finished
      if (isBreak) {
        // Break finished, start next study session
        if (currentCycle < session.cycles) {
          setCurrentCycle((prev) => prev + 1)
          setTimeLeft(session.studyTime * 60)
          setIsBreak(false)
        } else {
          // All cycles completed
          setIsRunning(false)
          setCurrentCycle(1)
          setTimeLeft(session.studyTime * 60)
          setIsBreak(false)
        }
      } else {
        // Study session finished, start break
        setTimeLeft(session.breakTime * 60)
        setIsBreak(true)
      }
    }
  }, [timeLeft, isBreak, currentCycle, session])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(session.studyTime * 60)
    setIsBreak(false)
    setCurrentCycle(1)
  }

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset)
    setSession(presetSessions[preset])
    setTimeLeft(presetSessions[preset].studyTime * 60)
    setIsBreak(false)
    setCurrentCycle(1)
    setIsRunning(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = timerRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl animate-bounce-gentle"
      >
        <Timer className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <div
      ref={timerRef}
      className="floating-element p-4 cursor-move select-none"
      style={{
        left: position.x,
        top: position.y,
        minWidth: "280px",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isBreak ? <Coffee className="w-5 h-5 text-orange-500" /> : <BookOpen className="w-5 h-5 text-blue-500" />}
          <h3 className="font-semibold text-gray-900 dark:text-white">{isBreak ? "Giờ nghỉ" : "Giờ học"}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cài đặt đồng hồ học tập</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Chế độ học tập</Label>
                  <Select value={selectedPreset} onValueChange={handlePresetChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pomodoro">Pomodoro (25/5 phút)</SelectItem>
                      <SelectItem value="deep">Deep Work (90/20 phút)</SelectItem>
                      <SelectItem value="short">Short Burst (15/3 phút)</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedPreset === "custom" && (
                  <>
                    <div>
                      <Label>Thời gian học (phút)</Label>
                      <Input
                        type="number"
                        value={session.studyTime}
                        onChange={(e) => setSession({ ...session, studyTime: Number.parseInt(e.target.value) || 30 })}
                      />
                    </div>
                    <div>
                      <Label>Thời gian nghỉ (phút)</Label>
                      <Input
                        type="number"
                        value={session.breakTime}
                        onChange={(e) => setSession({ ...session, breakTime: Number.parseInt(e.target.value) || 10 })}
                      />
                    </div>
                    <div>
                      <Label>Số chu kì</Label>
                      <Input
                        type="number"
                        value={session.cycles}
                        onChange={(e) => setSession({ ...session, cycles: Number.parseInt(e.target.value) || 3 })}
                      />
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-mono font-bold text-gray-900 dark:text-white mb-2">{formatTime(timeLeft)}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant={isBreak ? "secondary" : "default"}>
            Chu kì {currentCycle}/{session.cycles}
          </Badge>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${isBreak ? "bg-orange-500" : "bg-blue-500"}`}
            style={{
              width: `${
                (((isBreak ? session.breakTime * 60 : session.studyTime * 60) - timeLeft) /
                  (isBreak ? session.breakTime * 60 : session.studyTime * 60)) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={handleStart} size="sm" className="flex-1">
          {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isRunning ? "Tạm dừng" : "Bắt đầu"}
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
