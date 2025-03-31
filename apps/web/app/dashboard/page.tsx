import Link from "next/link"
import { ArrowRight, ShoppingBag, Users, Zap, Trophy, Star, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your GameTriggers dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Total Earnings</CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              <span className="stat-value-amber">12,450</span>
            </div>
            <p className="text-xs text-muted-foreground">+16% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Active Campaigns</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              <span className="stat-value-blue">4</span>
            </div>
            <p className="text-xs text-muted-foreground">2 pending approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Energy Packs</CardTitle>
            <Zap className="h-4 w-4 text-teal-500 neon-teal-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              <span className="stat-value-teal">8</span>
            </div>
            <p className="text-xs text-muted-foreground">+2 regenerating tomorrow</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Group Memberships</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              <span className="stat-value-purple">2</span>
            </div>
            <p className="text-xs text-muted-foreground">1 invitation pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Featured Campaigns</CardTitle>
            <CardDescription>Exclusive campaigns available for your level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-blue-900/30 flex items-center justify-center">
                  <Star className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Mobile Legends Tournament</p>
                  <p className="text-xs text-muted-foreground">1,500 Glo-Coins</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-purple-900/30 flex items-center justify-center">
                  <Star className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Gaming Chair Promotion</p>
                  <p className="text-xs text-muted-foreground">3,000 Glo-Coins</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                View
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/marketplace">
              <Button variant="ghost" className="w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100">
                View All Campaigns <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-100">Your Groups</CardTitle>
            <CardDescription>Cults, clans, and clubs you've joined</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-green-900/30 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Strava Cult</p>
                  <p className="text-xs text-muted-foreground">12,500 members</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                View
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-red-900/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">FPS Masters Clan</p>
                  <p className="text-xs text-muted-foreground">3,250 members</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                View
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/groups">
              <Button variant="ghost" className="w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100">
                View All Groups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

