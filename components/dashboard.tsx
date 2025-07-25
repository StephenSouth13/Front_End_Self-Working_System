"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Clock, Target, TrendingUp, Zap, Award, Calendar, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarWidget } from "@/components/calendar-widget"
import { FloatingStudyTimer } from "@/components/floating-study-timer"

const motivationalQuotes = [
  "Hôm nay là một ngày tuyệt vời để bắt đầu! 🌟",
  "Mỗi bước nhỏ đều dẫn đến thành công lớn. 🚀",
  "Hãy tập trung vào những gì bạn có thể kiểm soát. 💪",
  "Thành công bắt đầu từ việc hành động. ⚡",
  "Hôm nay tốt hơn hôm qua, ngày mai tốt hơn hôm nay! 🌈",
  "Dù chậm cũng không sao, miễn là bạn không dừng lại. 🐢",

"Bạn mạnh mẽ hơn những gì bạn nghĩ. 🧠💪",

"Từng ngày trôi qua là một cơ hội mới để bắt đầu lại. 🌅",
"Cứ tiến lên, dù là từng bước nhỏ. 🐾",

"Mỗi ngày là một món quà – hãy trân trọng nó. 🎁",

"Tương lai được tạo nên từ những việc bạn làm hôm nay. ⏳",

"Hãy là nguồn cảm hứng mà bạn đang tìm kiếm. 🔍✨",

"Đừng đợi cơ hội, hãy tạo ra nó. 🛠️",

"Niềm tin nhỏ hôm nay có thể dẫn đến điều kỳ diệu ngày mai. 🌱",

"Hãy tự hào về từng nỗ lực của chính mình. 🏆",

"Ánh sáng luôn chờ bạn ở cuối con đường. 🔦",

"Không ai hoàn hảo – điều quan trọng là bạn không ngừng cố gắng. 💖",

"Chính những điều nhỏ bé tạo nên sự khác biệt lớn. ✨",

"Mỗi ngày là một trang giấy trắng – bạn là người cầm bút. ✍️",

"Nụ cười là ngôn ngữ của hy vọng. 😊",

"Tình yêu và sự tử tế luôn là những lựa chọn đúng đắn. 💛",

"Cứ mơ đi, và hành động để giấc mơ thành hiện thực. ☁️🚶",

"Dù trời có mưa, bạn vẫn có thể là cầu vồng. 🌧️🌈",

"Giữ cho trái tim bạn ấm và tâm hồn bạn nhẹ. 🔥🕊️",

"Một lời động viên nhỏ có thể thay đổi cả ngày của ai đó. 💌"
]

const todayTasks = [
  { id: "1", title: "Hoàn thành báo cáo tháng", space: "Công ty", completed: false, priority: "high" },
  { id: "2", title: "Gọi điện cho khách hàng ABC", space: "Công ty", completed: true, priority: "medium" },
  { id: "3", title: "Học React hooks", space: "Học tập", completed: false, priority: "low" },
  { id: "4", title: "Cập nhật portfolio", space: "Dự án ngoài", completed: false, priority: "medium" },
  { id: "5", title: "Review code team", space: "Công ty", completed: true, priority: "high" },
]

const todaySchedule = [
  { time: "09:00", title: "Họp team weekly", type: "meeting", status: "upcoming" },
  { time: "14:00", title: "Phỏng vấn ứng viên", type: "interview", status: "current" },
  { time: "16:30", title: "Review code với senior", type: "review", status: "upcoming" },
  { time: "18:00", title: "Học online course", type: "learning", status: "upcoming" },
]

const habits = [
  { id: "1", name: "Tập gym", completed: true, streak: 7 },
  { id: "2", name: "Đọc sách 30 phút", completed: false, streak: 3 },
  { id: "3", name: "Thiền 10 phút", completed: false, streak: 5 },
  { id: "4", name: "Uống 8 ly nước", completed: true, streak: 12 },
  { id: "5", name: "Viết nhật ký", completed: false, streak: 2 },
]

export function Dashboard() {
  const [tasks, setTasks] = useState(todayTasks)
  const [userHabits, setUserHabits] = useState(habits)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentHour = currentTime.getHours()
  const greeting = currentHour < 12 ? "Chào buổi sáng" : currentHour < 18 ? "Chào buổi chiều" : "Chào buổi tối"
  const greetingEmoji = currentHour < 12 ? "🌅" : currentHour < 18 ? "☀️" : "🌙"
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  const completedTasks = tasks.filter((task) => task.completed).length
  const completedHabits = userHabits.filter((habit) => habit.completed).length
  const totalProductivity = Math.round((completedTasks / tasks.length + completedHabits / userHabits.length) * 50)

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleHabit = (habitId: string) => {
    setUserHabits(userHabits.map((habit) => (habit.id === habitId ? { ...habit, completed: !habit.completed } : habit)))
  }

  const getScheduleStatus = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="mb-8 animate-fade-in">
          <div className="glass-effect rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:!text-white mb-3">
              {greeting}, Quách Thành Long! {greetingEmoji}
            </h1>
            <p className="text-gray-600 dark:!text-gray-300 text-base sm:text-lg italic font-medium">"{randomQuote}"</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:!text-green-300"
              >
                <Activity className="w-3 h-3 mr-1" />
                Năng suất: {totalProductivity}%
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:!text-blue-300">
                <Zap className="w-3 h-3 mr-1" />
                Streak: {Math.max(...userHabits.map((h) => h.streak))} ngày
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-slide-up">
          <Card className="card-hover glass-effect border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:!text-gray-400">Công việc hôm nay</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:!text-white">
                    {completedTasks}/{tasks.length}
                  </p>
                  <Progress value={(completedTasks / tasks.length) * 100} className="mt-2 h-2" />
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0 ml-4">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover glass-effect border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:!text-gray-400">Thói quen</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:!text-white">
                    {completedHabits}/{userHabits.length}
                  </p>
                  <Progress value={(completedHabits / userHabits.length) * 100} className="mt-2 h-2" />
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0 ml-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover glass-effect border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:!text-gray-400">Cuộc họp</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:!text-white">
                    {todaySchedule.length}
                  </p>
                  <p className="text-xs text-gray-500 dark:!text-gray-400 mt-1 truncate">
                    Tiếp theo: {todaySchedule.find((s) => s.status === "upcoming")?.time || "Không có"}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex-shrink-0 ml-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover glass-effect border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 dark:!text-gray-400">Hiệu suất</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:!text-white">{totalProductivity}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-green-600 dark:text-green-400 truncate">+12% từ hôm qua</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex-shrink-0 ml-4">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Priority Tasks */}
          <Card className="xl:col-span-2 glass-effect border-0 card-hover">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-900 dark:!text-white">Ưu Tiên Hôm Nay</span>
                <Badge variant="secondary" className="ml-auto">
                  {tasks.length} công việc
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm sm:text-base transition-all duration-300 line-clamp-1 ${
                        task.completed
                          ? "line-through text-gray-500 dark:!text-gray-400"
                          : "text-gray-900 dark:!text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {task.space}
                      </Badge>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {task.priority === "high" ? "🔥 Cao" : task.priority === "medium" ? "⚡ Trung bình" : "📝 Thấp"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="glass-effect border-0 card-hover">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Lịch Trình Hôm Nay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-3 rounded-xl border transition-all duration-300 animate-fade-in ${getScheduleStatus(event.status)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-sm font-bold min-w-[50px]">{event.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {event.type === "meeting"
                          ? "📅 Họp"
                          : event.type === "interview"
                            ? "👥 Phỏng vấn"
                            : event.type === "review"
                              ? "🔍 Review"
                              : "📚 Học tập"}
                      </Badge>
                      {event.status === "current" && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs font-medium">Đang diễn ra</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Habits Tracking */}
        <Card className="mt-8 glass-effect border-0 card-hover">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              Theo Dõi Thói Quen
              <Badge variant="secondary" className="ml-auto">
                {completedHabits}/{userHabits.length} hoàn thành
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
              {userHabits.map((habit, index) => (
                <div
                  key={habit.id}
                  className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={habit.completed}
                      onCheckedChange={() => toggleHabit(habit.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span
                      className={`text-sm font-medium flex-1 transition-all duration-300 ${
                        habit.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {habit.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      🔥 {habit.streak} ngày
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiến độ hôm nay</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {completedHabits}/{userHabits.length} ({Math.round((completedHabits / userHabits.length) * 100)}%)
                </span>
              </div>
              <Progress value={(completedHabits / userHabits.length) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Calendar Widget */}
        <div className="mt-8">
          <CalendarWidget />
        </div>
      </div>
      <FloatingStudyTimer />
    </div>
  )
}
