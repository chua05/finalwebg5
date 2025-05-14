import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Dynamic Analytics",
  description: "Data visualization dashboard for Analytics data",
}

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Home</h1>
      <Dashboard />
    </div>
  )
}
