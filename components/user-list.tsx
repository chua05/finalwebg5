"use client"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, User } from "lucide-react"

interface UserType {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json() as Promise<UserType[]>
}

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "" })

  const queryClient = useQueryClient()

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
  const handleEdit = (user: UserType) => {
    setEditingUserId(user.id)
    setFormData({ name: user.name, email: user.email })
  }
  const handleSave = async (userId: number) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ ...formData }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) throw new Error("Failed to update user")
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setEditingUserId(null)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }


  // Filter users based on search query
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to fetch users. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : 
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers?.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Username:</span> @{user.username}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Email:</span> {user.email}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Company:</span> {user.company.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      }
      
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers?.map((user) => (
            <Card key={user.id} className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      className="border px-2 py-1 text-sm rounded"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Username:</span> @{user.username}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      className="border px-2 py-1 text-sm rounded"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Company:</span> {user.company.name}
                </div>

                <div className="pt-2">
                  {editingUserId === user.id ? (
                    <button
                      className="text-sm px-3 py-1 bg-green-600 text-white rounded"
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      

      {filteredUsers?.length === 0 && !isLoading && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-lg font-medium">No users found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
