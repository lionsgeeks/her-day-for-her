import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: string
  trend?: "up" | "down" | "neutral"
  bgColor?: string
}

export function StatCard({ title, value, icon, change, trend, bgColor = "bg-white" }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 flex items-center`}>
      <div className="mr-4">
        <div className="p-3 rounded-full bg-[#03329b]/10 text-[#03329b]">{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p
            className={`text-xs flex items-center mt-1 
            ${trend === "up" ? "text-green-600" : ""} 
            ${trend === "down" ? "text-red-600" : ""}
            ${trend === "neutral" ? "text-gray-500" : ""}`}
          >
            {trend === "up" && (
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {trend === "down" && (
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {change}
          </p>
        )}
      </div>
    </div>
  )
}

