import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Life OS - Hệ Điều Hành Cuộc Sống",
  description: "Quản lý toàn diện công việc và cuộc sống của bạn",
    generator: 'Quách Thành Long',
  applicationName: "Life OS",
  keywords: [
    "quản lý công việc",
    "quản lý cuộc sống",
    "năng suất",
    "lập kế hoạch",
    "tổ chức",
    "cuộc sống",
    "hệ điều hành cuộc sống",
    "quản lý thời gian",
    "tối ưu hóa",
    "tự động hóa",
    "quản lý dự án",
    "quản lý nhiệm vụ",
    "quản lý lịch trình",
    "quản lý mục tiêu",
    "quản lý thói quen",
    "quản lý tài chính",
    "quản lý sức khỏe",
    "quản lý gia đình",
    "quản lý công việc nhóm",
    "quản lý công việc cá nhân",
    "quản lý công việc hàng ngày",
    "quản lý công việc định kỳ",
    "quản lý công việc theo dự án"],
  authors: [
    {
      name: "Quách Thành Long",
      url: "https://quachthanhlong.com",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
