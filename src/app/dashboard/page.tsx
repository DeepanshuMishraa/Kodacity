"use client"

import { BarChart, BookOpen, CreditCard, Flame, PenTool } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { SidebarComponent } from "~/components/app-sidebar"

const data = {
  user: {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    credits: 50,
  },
  categories: [
    { title: "Languages", icon: BookOpen },
    { title: "Frameworks", icon: PenTool },
    { title: "DSA", icon: BarChart },
    { title: "CP", icon: Flame },
  ],
  recentProblems: [
    { title: "Two Sum", category: "Arrays", difficulty: "Easy" },
    { title: "Merge K Sorted Lists", category: "Linked Lists", difficulty: "Hard" },
    { title: "Valid Parentheses", category: "Stacks", difficulty: "Medium" },
  ],
  upcomingQuizzes: [
    { title: "JavaScript Fundamentals", questions: 15, duration: "30 min" },
    { title: "Python Data Structures", questions: 20, duration: "45 min" },
    { title: "React Hooks Deep Dive", questions: 10, duration: "20 min" },
  ],
  dailyProjects: [
    {
      title: "Weather App",
      description: "Build a weather app using React and a weather API",
      difficulty: "Intermediate",
    },
    {
      title: "Todo List",
      description: "Create a todo list application with local storage",
      difficulty: "Beginner",
    },
    {
      title: "Blog Platform",
      description: "Develop a full-stack blog platform with user authentication",
      difficulty: "Advanced",
    },
  ],
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <SidebarComponent />
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Problems Solved</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">245</div>
                    <p className="text-xs text-muted-foreground">+20 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    <Flame className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7 days</div>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.user.credits}</div>
                    <Progress value={data.user.credits} max={100} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Problems</CardTitle>
                    <CardDescription>Your recently attempted problems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {data.recentProblems.map((problem, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-sm">{problem.title}</span>
                          <Badge variant={problem.difficulty === "Easy" ? "secondary" : problem.difficulty === "Medium" ? "default" : "destructive"}>
                            {problem.difficulty}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Quizzes</CardTitle>
                    <CardDescription>Quizzes available for you to take</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {data.upcomingQuizzes.map((quiz, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-sm">{quiz.title}</span>
                          <span className="text-xs text-muted-foreground">{quiz.questions} Q / {quiz.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Projects</CardTitle>
                    <CardDescription>AI-generated project ideas for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {data.dailyProjects.map((project, index) => (
                        <li key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{project.title}</span>
                            <Badge variant={project.difficulty === "Beginner" ? "secondary" : project.difficulty === "Intermediate" ? "default" : "destructive"}>
                              {project.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{project.description}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your progress across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <category.icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{category.title}</p>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
