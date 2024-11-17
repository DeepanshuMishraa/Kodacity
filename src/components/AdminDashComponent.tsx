'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, ChevronDown, Code, FileText, Layout, PlusCircle, Settings, Users } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { useSession } from 'next-auth/react'

export default function AdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('overview')
  const session  = useSession()

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Kodacity Admin</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-3">
                    <span className="sr-only">Open user menu</span><img
                      className="h-8 w-8 rounded-full"
                      src={session?.data?.user?.image }
                      alt=""
                    />
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Your Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="ai">AI Tools</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <motion.div {...fadeIn} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">10,482</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23,145</div>
                    <p className="text-xs text-muted-foreground">+15% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
                    <Layout className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground">+35% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="problems">
              <motion.div {...fadeIn} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Problem List</h2>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Problem
                  </Button>
                </div>
                <Input placeholder="Search problems..." />
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-4 text-left">ID</th>
                          <th className="p-4 text-left">Title</th>
                          <th className="p-4 text-left">Difficulty</th>
                          <th className="p-4 text-left">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays" },
                          { id: 2, title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked Lists" },
                          { id: 3, title: "Valid Parentheses", difficulty: "Medium", category: "Stacks" },
                        ].map((problem) => (
                          <tr key={problem.id} className="border-b last:border-b-0">
                            <td className="p-4">{problem.id}</td>
                            <td className="p-4">{problem.title}</td>
                            <td className="p-4">{problem.difficulty}</td>
                            <td className="p-4">{problem.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="users">
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold mb-4">User Management</h2>
                <Card>
                  <CardContent>
                    <p className="text-muted-foreground">User management content goes here.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="ai">
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold mb-4">AI Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Project Generator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Generate project ideas based on user skills and interests.</p>
                      <Button>Generate Project</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Creator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Create personalized quizzes for users.</p>
                      <Button>Create Quiz</Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
