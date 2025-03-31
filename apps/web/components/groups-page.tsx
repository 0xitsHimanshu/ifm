"use client"

import { useState } from "react"
import {
  Users,
  Shield,
  Award,
  Key,
  Lock,
  UserPlus,
  Check,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  AlertCircle,
  Info,
  Mail,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for cults, clans, and clubs
const cults = [
  {
    id: 1,
    name: "Strava Cult",
    description: "For fitness enthusiasts who track their activities with Strava",
    members: 12500,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-green-600 to-emerald-400",
    joined: true,
    geekey: true,
    requirements: {
      age: 30,
      xps: 500,
      rpg: 200,
    },
    benefits: ["Access to fitness-related campaigns", "Fitness stats integration", "Community challenges"],
  },
  {
    id: 2,
    name: "Spotify Cult",
    description: "For streamers who love music and share playlists",
    members: 18700,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-green-600 to-green-400",
    joined: false,
    geekey: false,
    requirements: {
      age: 15,
      xps: 300,
      rpg: 150,
    },
    benefits: ["Access to music-related campaigns", "Playlist integration", "Music recommendations"],
  },
  {
    id: 3,
    name: "Discord Cult",
    description: "For streamers with active Discord communities",
    members: 22300,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-indigo-600 to-purple-400",
    joined: false,
    geekey: false,
    requirements: {
      age: 20,
      xps: 400,
      rpg: 180,
    },
    benefits: ["Access to community-focused campaigns", "Discord integration", "Community management tools"],
  },
]

const clans = [
  {
    id: 1,
    name: "Runner's Clan",
    description: "For streamers who are passionate about running and fitness",
    members: 4787,
    maxMembers: 5000,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-blue-600 to-cyan-400",
    joined: false,
    geekey: false,
    openMembership: true,
    requirements: {
      age: 30,
      xps: 800,
      rpg: 300,
    },
    benefits: ["Access to fitness brand campaigns", "Running challenges", "Fitness community"],
  },
  {
    id: 2,
    name: "FPS Masters Clan",
    description: "Elite clan for first-person shooter game streamers",
    members: 3250,
    maxMembers: 4000,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-red-600 to-orange-400",
    joined: true,
    geekey: true,
    openMembership: false,
    requirements: {
      age: 45,
      xps: 1200,
      rpg: 500,
    },
    benefits: ["Access to gaming hardware campaigns", "Tournament invites", "Coaching sessions"],
  },
  {
    id: 3,
    name: "Creative Streamers Clan",
    description: "For art, design, and creative content streamers",
    members: 2890,
    maxMembers: 3500,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-purple-600 to-pink-400",
    joined: false,
    geekey: false,
    openMembership: true,
    requirements: {
      age: 20,
      xps: 600,
      rpg: 250,
    },
    benefits: ["Access to creative tool campaigns", "Art challenges", "Portfolio showcases"],
  },
]

const clubs = [
  {
    id: 1,
    name: "Nike Sports Club",
    description: "Exclusive club for Nike brand ambassadors and sports enthusiasts",
    members: 850,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-black to-gray-700",
    joined: false,
    geekey: false,
    inviteOnly: true,
    requirements: {
      age: 55,
      xps: 3000,
      rpg: 1000,
    },
    benefits: ["Exclusive Nike campaigns", "Product testing opportunities", "Sports event invitations"],
    incompatibleWith: ["Reebok Players Club", "Adidas Creators Club"],
  },
  {
    id: 2,
    name: "Redbull Club",
    description: "For high-energy streamers and extreme sports enthusiasts",
    members: 720,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-blue-600 to-red-600",
    joined: false,
    geekey: false,
    inviteOnly: true,
    requirements: {
      age: 60,
      xps: 3500,
      rpg: 1200,
    },
    benefits: ["Exclusive Redbull campaigns", "Event sponsorships", "Energy drink supplies"],
    incompatibleWith: ["Monster Energy Squad"],
  },
  {
    id: 3,
    name: "Reebok Players Club",
    description: "For fitness streamers and sports enthusiasts",
    members: 680,
    icon: "/placeholder.svg?height=50&width=50",
    color: "from-red-600 to-gray-700",
    joined: false,
    geekey: false,
    inviteOnly: true,
    requirements: {
      age: 50,
      xps: 2800,
      rpg: 950,
    },
    benefits: ["Exclusive Reebok campaigns", "Product testing", "Fitness event invitations"],
    incompatibleWith: ["Nike Sports Club", "Adidas Creators Club"],
  },
]

// User stats for checking eligibility
const userStats = {
  age: 60, // days on platform
  xps: 1150,
  rpg: 410,
  level: 4,
}

export function GroupsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("cults")
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [requestMessage, setRequestMessage] = useState("")
  const [showConfirmLeaveDialog, setShowConfirmLeaveDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Filter groups based on search
  const filteredCults = cults.filter((cult) => {
    if (searchQuery && !cult.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const filteredClans = clans.filter((clan) => {
    if (searchQuery && !clan.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  const filteredClubs = clubs.filter((club) => {
    if (searchQuery && !club.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  // Check if user meets requirements
  const meetsRequirements = (group: any) => {
    return (
      userStats.age >= group.requirements.age &&
      userStats.xps >= group.requirements.xps &&
      userStats.rpg >= group.requirements.rpg
    )
  }

  // Handle join group
  const handleJoinGroup = () => {
    setShowJoinDialog(false)
    setSuccessMessage(`You have successfully joined ${selectedGroup.name}!`)
    setShowSuccessDialog(true)
  }

  // Handle request invite
  const handleRequestInvite = () => {
    setShowRequestDialog(false)
    setSuccessMessage(`Your request to join ${selectedGroup.name} has been sent!`)
    setShowSuccessDialog(true)
  }

  // Handle leave group
  const handleLeaveGroup = () => {
    setShowConfirmLeaveDialog(false)
    setSuccessMessage(`You have left ${selectedGroup.name}.`)
    setShowSuccessDialog(true)
  }

  // Render group card
  const renderGroupCard = (group: any) => {
    if (viewMode === "grid") {
      return (
        <Card
          key={group.id}
          className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 cyber-grid-bg"
        >
          <div className="h-[80px] bg-gradient-to-r relative flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-r ${group.color} opacity-20`}></div>
            <img
              src={group.icon || "/placeholder.svg"}
              alt={group.name}
              className="h-16 w-16 rounded-full object-cover z-10"
            />
            {group.geekey && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-yellow-300 p-1 rounded-full">
                <Key className="h-4 w-4 text-gray-900" />
              </div>
            )}
          </div>
          <CardHeader className="pb-2 text-gray-100">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">{group.name}</CardTitle>
              {group.joined ? <Badge variant="secondary">Joined</Badge> : <Badge variant="outline">Not Joined</Badge>}
            </div>
            <CardDescription className="text-gray-300 line-clamp-2">{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-gray-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Members:</span>
                <span className="font-medium stat-value-blue">{group.members.toLocaleString()}</span>
              </div>

              {group.maxMembers && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Capacity:</span>
                    <span>
                      {group.members}/{group.maxMembers}
                    </span>
                  </div>
                  <Progress value={(group.members / group.maxMembers) * 100} className="h-1.5" />
                </div>
              )}

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Requirements:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span>{group.requirements.age} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-purple-500" />
                    <span>{group.requirements.xps} XPS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{group.requirements.rpg} RPG</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            {group.joined ? (
              <Button
                variant="outline"
                className="w-full border-red-700 hover:bg-red-900 hover:text-white"
                onClick={() => {
                  setSelectedGroup(group)
                  setShowConfirmLeaveDialog(true)
                }}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Leave
              </Button>
            ) : meetsRequirements(group) ? (
              selectedTab === "clubs" || (selectedTab === "clans" && !group.openMembership) ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedGroup(group)
                    setShowRequestDialog(true)
                  }}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Request Invite
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedGroup(group)
                    setShowJoinDialog(true)
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Join
                </Button>
              )
            ) : (
              <Button variant="outline" className="w-full" disabled>
                <Lock className="h-4 w-4 mr-1" />
                Requirements Not Met
              </Button>
            )}
          </CardFooter>
        </Card>
      )
    } else {
      return (
        <Card
          key={group.id}
          className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <div className="flex">
            <div
              className={`w-[80px] h-auto flex items-center justify-center bg-gradient-to-r ${group.color} bg-opacity-20`}
            >
              <img
                src={group.icon || "/placeholder.svg"}
                alt={group.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium flex items-center text-gray-100">
                    {group.name}
                    {group.geekey && (
                      <div className="ml-2 bg-gradient-to-r from-amber-400 to-yellow-300 p-1 rounded-full">
                        <Key className="h-3 w-3 text-gray-900" />
                      </div>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                {group.joined ? <Badge variant="secondary">Joined</Badge> : <Badge variant="outline">Not Joined</Badge>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Members</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm stat-value-blue">{group.members.toLocaleString()}</span>
                    {group.maxMembers && (
                      <span className="text-xs text-muted-foreground">/ {group.maxMembers.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Age Req.</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{group.requirements.age} days</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">XPS Req.</span>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">{group.requirements.xps}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">RPG Req.</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{group.requirements.rpg}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                {group.joined ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-700 hover:bg-red-900 hover:text-white"
                    onClick={() => {
                      setSelectedGroup(group)
                      setShowConfirmLeaveDialog(true)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Leave
                  </Button>
                ) : meetsRequirements(group) ? (
                  selectedTab === "clubs" || (selectedTab === "clans" && !group.openMembership) ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedGroup(group)
                        setShowRequestDialog(true)
                      }}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Request Invite
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedGroup(group)
                        setShowJoinDialog(true)
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  )
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <Lock className="h-4 w-4 mr-1" />
                    Requirements Not Met
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Groups</h1>
          <p className="text-muted-foreground">
            Join cults, clans, and clubs to access exclusive campaigns and benefits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search groups..."
            className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="joined">Joined</SelectItem>
              <SelectItem value="eligible">Eligible</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-1 border-gray-700 text-gray-100">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Group Types */}
      <Tabs defaultValue="cults" onValueChange={setSelectedTab} className="text-gray-100">
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="cults" className="flex items-center gap-1 data-[state=active]:bg-gray-700">
            <Shield className="h-4 w-4" />
            Cults
            <Badge variant="secondary" className="ml-1 bg-blue-900 text-blue-100">
              {filteredCults.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="clans" className="flex items-center gap-1 data-[state=active]:bg-gray-700">
            <Users className="h-4 w-4" />
            Clans
            <Badge variant="secondary" className="ml-1 bg-green-900 text-green-100">
              {filteredClans.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="clubs" className="flex items-center gap-1 data-[state=active]:bg-gray-700">
            <Award className="h-4 w-4" />
            Clubs
            <Badge variant="secondary" className="ml-1 bg-purple-900 text-purple-100">
              {filteredClubs.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cults">
          <div className="mb-4 bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-400 mb-1">About Cults</h3>
              <p className="text-sm text-blue-300">
                Cults are open communities based on shared interests or platforms. Joining a cult grants you a Geekey
                that unlocks access to related campaigns. You can join multiple cults without restrictions.
              </p>
            </div>
          </div>

          {filteredCults.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <Shield className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No cults found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No cults match your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCults.map((cult) => renderGroupCard(cult))}
            </div>
          ) : (
            <div className="space-y-3">{filteredCults.map((cult) => renderGroupCard(cult))}</div>
          )}
        </TabsContent>

        <TabsContent value="clans">
          <div className="mb-4 bg-green-900/20 border border-green-800 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-400 mb-1">About Clans</h3>
              <p className="text-sm text-green-300">
                Clans are communities with limited membership. Some clans have open membership, while others require an
                invitation. Joining a clan grants you a Geekey that unlocks access to related campaigns.
              </p>
            </div>
          </div>

          {filteredClans.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <Users className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No clans found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No clans match your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClans.map((clan) => renderGroupCard(clan))}
            </div>
          ) : (
            <div className="space-y-3">{filteredClans.map((clan) => renderGroupCard(clan))}</div>
          )}
        </TabsContent>

        <TabsContent value="clubs">
          <div className="mb-4 bg-purple-900/20 border border-purple-800 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-purple-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-purple-400 mb-1">About Clubs</h3>
              <p className="text-sm text-purple-300">
                Clubs are exclusive brand-specific groups that require an invitation. Joining a club grants you a Geekey
                that unlocks access to exclusive brand campaigns. Some clubs have non-compete requirements that prevent
                you from joining competing clubs.
              </p>
            </div>
          </div>

          {filteredClubs.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
              <Award className="h-12 w-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No clubs found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                No clubs match your search criteria. Try adjusting your filters or search query.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClubs.map((club) => renderGroupCard(club))}
            </div>
          ) : (
            <div className="space-y-3">{filteredClubs.map((club) => renderGroupCard(club))}</div>
          )}
        </TabsContent>
      </Tabs>

      {/* Join Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Join {selectedGroup?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to join this {selectedTab === "cults" ? "cult" : "clan"}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Benefits:</h4>
              <ul className="space-y-1">
                {selectedGroup?.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedTab === "clans" && selectedGroup?.maxMembers && (
              <div className="bg-blue-900/20 p-4 rounded-lg flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-300">
                    This clan has a membership limit of {selectedGroup.maxMembers.toLocaleString()} members. You will be
                    member #{selectedGroup.members + 1} if you join now.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowJoinDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleJoinGroup} className="bg-purple-600 hover:bg-purple-700">
              Join {selectedGroup?.name}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Invite Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Request Invite to {selectedGroup?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedTab === "clubs"
                ? "This club requires an invitation. Send a request to the club administrators."
                : "This clan requires an invitation. Send a request to the clan administrators."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Benefits:</h4>
              <ul className="space-y-1">
                {selectedGroup?.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedTab === "clubs" && selectedGroup?.incompatibleWith && (
              <div className="bg-amber-900/20 p-4 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-300">
                    This club has non-compete requirements. If accepted, you cannot join:{" "}
                    {selectedGroup.incompatibleWith.join(", ")}.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="request-message" className="text-sm font-medium">
                Message (Optional)
              </label>
              <textarea
                id="request-message"
                className="w-full h-24 rounded-md bg-gray-800 border border-gray-700 p-2 text-sm"
                placeholder="Tell the administrators why you want to join..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRequestDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleRequestInvite} className="bg-purple-600 hover:bg-purple-700">
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Leave Dialog */}
      <Dialog open={showConfirmLeaveDialog} onOpenChange={setShowConfirmLeaveDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Leave {selectedGroup?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to leave this{" "}
              {selectedTab === "cults" ? "cult" : selectedTab === "clans" ? "clan" : "club"}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-amber-900/20 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="text-amber-300">
                  {selectedTab === "clubs"
                    ? "If you leave this club, you may not be able to rejoin in the future. Any bonus Blo-Coins received during your membership may be forfeited."
                    : selectedTab === "clans"
                      ? "If you leave this clan, you may lose access to exclusive campaigns and benefits."
                      : "If you leave this cult, you will lose the associated Geekey and access to related campaigns."}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmLeaveDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLeaveGroup}>
              Leave {selectedGroup?.name}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="h-16 w-16 rounded-full bg-green-900/30 flex items-center justify-center border border-green-700">
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <p className="text-center">{successMessage}</p>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="bg-purple-600 hover:bg-purple-700">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

