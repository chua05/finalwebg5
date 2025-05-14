import type { Metadata } from "next"
import UserProfile from "@/components/user-profile"

export const metadata: Metadata = {
  title: "User Profile | Dynamic Analytics",
  description: "User profile from JSON Placeholder",
}

export default function UserPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <UserProfile userId={params.id} />
    </div>
  )
}
