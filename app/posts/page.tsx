import type { Metadata } from "next"
import PostList from "@/components/post-list"

export const metadata: Metadata = {
  title: "Posts | Dynamic Analytics",
  description: "List of posts from JSON Placeholder",
}

export default function PostsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Posts</h1>
      <PostList />
    </div>
  )
}
