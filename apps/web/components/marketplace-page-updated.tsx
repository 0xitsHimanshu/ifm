"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Zap,
  Star,
  Trophy,
  Clock,
  Tag,
  CheckCircle2,
  Key,
  Lock,
  Shield,
  Users,
  Award,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample campaign data with Geekey requirements
const campaigns = [
  {
    id: 1,
    name: "BGMI Blitz Promotion",
    type: "CPI",
    earnings: { gloCoins: 750, bloCoins: 150 },
    requirements: {
      impressions: 750,
      level: 1,
      rpg: 25,
      xps: 25,
      energyPacks: 1,
    },
    deadline: "April 10th",
    details: "Display this ad during streams. Terms: Organic impressions only, no NSFW content.",
    image: "/placeholder.svg?height=100&width=200",
    status: "available",
    multiplier: 1.5,
    category: "Gaming",
    advertiser: "GameBlitz Inc.",
    verified: true,
  },
  {
    id: 2,
    name: "Mobile Legends Tournament",
    type: "CPI",
    earnings: { gloCoins: 1500, bloCoins: 300 },
    requirements: {
      impressions: 1500,
      level: 1,
      rpg: 40,
      xps: 40,
      energyPacks: 2,
    },
    deadline: "April 15th",
    details: "Promote our Mobile Legends tournament during your streams. Must mention key tournament details.",
    image: "/placeholder.svg?height=100&width=200",
    status: "available",
    multiplier: 1.5,
    category: "Gaming",
    advertiser: "MobileMasters",
    verified: true,
  },
  {
    id: 3,
    name: "Gaming Headset Promo",
    type: "CPA",
    earnings: { gloCoins: 2000, bloCoins: 400 },
    requirements: {
      impressions: 2000,
      level: 2,
      rpg: 60,
      xps: 200,
      energyPacks: 2,
      keyRequired: "Gate Key",
    },
    deadline: "April 20th",
    details: "Promote our new gaming headset. Provide a review of features during stream.",
    image: "/placeholder.svg?height=100&width=200",
    status: "locked",
    multiplier: 1.2,
    category: "Hardware",
    advertiser: "TechGear",
    verified: true,
  },
  {
    id: 4,
    name: "Gaming Energy Drink",
    type: "CPI",
    earnings: { gloCoins: 5000, bloCoins: 1000 },
    requirements: {
      impressions: 5000,
      level: 3,
      rpg: 80,
      xps: 400,
      energyPacks: 3,
      keyRequired: "Pro Key",
    },
    deadline: "April 25th",
    details: "Promote our energy drink designed for gamers. Must show product on stream.",
    image: "/placeholder.svg?height=100&width=200",
    status: "locked",
    multiplier: 1.0,
    category: "Food & Beverage",
    advertiser: "PowerUp Drinks",
    verified: true,
  },
  {
    id: 5,
    name: "Indie Game Launch",
    type: "CPI",
    earnings: { gloCoins: 1200, bloCoins: 250 },
    requirements: {
      impressions: 1200,
      level: 1,
      rpg: 30,
      xps: 30,
      energyPacks: 1,
    },
    deadline: "April 18th",
    details: "Help promote our indie game launch. Must play the game for at least 30 minutes.",
    image: "/placeholder.svg?height=100&width=200",
    status: "available",
    multiplier: 1.5,
    category: "Gaming",
    advertiser: "IndieDevs Studio",
    verified: false,
  },
  {
    id: 6,
    name: "Gaming Chair Promotion",
    type: "CPA",
    earnings: { gloCoins: 3000, bloCoins: 600 },
    requirements: {
      impressions: 3000,
      level: 2,
      rpg: 70,
      xps: 250,
      energyPacks: 2,
    },
    deadline: "April 22nd",
    details: "Promote our ergonomic gaming chair. Mention key features and comfort benefits.",
    image: "/placeholder.svg?height=100&width=200",
    status: "available",
    multiplier: 1.2,
    category: "Hardware",
    advertiser: "ComfortGaming",
    verified: true,
  },
  {
    id: 7,
    name: "Nike Pro Motion",
    type: "CPI",
    earnings: { gloCoins: 12000, bloCoins: 2400 },
    requirements: {
      impressions: 9000,
      level: 4,
      rpg: 400,
      xps: 1000,
      energyPacks: 5,
      geekeys: [
        { name: "Strava Cult", active: true },
        { name: "Runner's Clan", active: false },
        { name: "Nike Sports Club", active: false },
      ],
      bloCoinsDeposit: 6000,
    },
    deadline: "June 25th",
    details: "Exclusive Nike campaign for sports enthusiasts. Promote Nike Pro running gear during your streams.",
    image: "/placeholder.svg?height=100&width=200",
    status: "exclusive",
    multiplier: 1.0,
    category: "Sports",
    advertiser: "Nike",
    verified: true,
  },
  {
    id: 8,
    name: "Redbull Energy Boost",
    type: "CPI",
    earnings: { gloCoins: 10000, bloCoins: 2000 },
    requirements: {
      impressions: 8000,
      level: 4,
      rpg: 350,
      xps: 900,
      energyPacks: 4,
      geekeys: [
        { name: "FPS Masters Clan", active: true },
        { name: "Redbull Club", active: false },
      ],
      bloCoinsDeposit: 5000,
    },
    deadline: "June 20th",
    details:
      "Exclusive Redbull campaign for gaming streamers. Promote Redbull energy drinks during intense gaming sessions.",
    image: "/placeholder.svg?height=100&width=200",
    status: "exclusive",
    multiplier: 1.0,
    category: "Food & Beverage",
    advertiser: "Redbull",
    verified: true,
  },
]

// User stats for filtering available campaigns
const userStats = {
  level: 4,
  rpg: 410,
  xps: 1150,
  energyPacks: 8,
  bloCoins: 3800,
  geekeys: [
    { name: "Strava Cult", active: true },
    { name: "FPS Masters Clan", active: true },
  ],
}

export function MarketplacePageUpdated() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [showGeeKeyInfo, setShowGeeKeyInfo] = useState(false)
  const [selectedGeeKey, setSelectedGeeKey] = useState<any>(null)

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    // Search filter
    if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Level filter
    if (levelFilter !== "all" && campaign.requirements.level !== Number.parseInt(levelFilter)) {
      return false
    }

    // Category filter
    if (categoryFilter !== "all" && campaign.category !== categoryFilter) {
      return false
    }

    return true
  })

  // Check if user meets requirements for a campaign
  const meetsRequirements = (campaign: any) => {
    // Basic requirements
    const basicRequirements =
      userStats.level >= campaign.requirements.level &&
      userStats.rpg >= campaign.requirements.rpg &&
      userStats.xps >= campaign.requirements.xps &&
      userStats.energyPacks >= campaign.requirements.energyPacks

    // Check for key requirements
    if (campaign.requirements.keyRequired) {
      return false // For simplicity, assume user doesn't have Gate Key or Pro Key
    }

    // Check for Geekey requirements
    if (campaign.requirements.geekeys) {
      const hasAllGeekeys = campaign.requirements.geekeys.every((geekey: any) => {
        if (!geekey.active) return true // Skip inactive geekeys
        return userStats.geekeys.some((userGeekey) => userGeekey.name === geekey.name && userGeekey.active)
      })

      if (!hasAllGeekeys) return false
    }

    // Check for Blo-Coins deposit
    if (campaign.requirements.bloCoinsDeposit && userStats.bloCoins < campaign.requirements.bloCoinsDeposit) {
      return false
    }

    return basicRequirements
  }

  // Get status badge for campaign
  const getCampaignStatusBadge = (campaign: any) => {
    if (campaign.status === "locked") {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
          Locked
        </Badge>
      )
    }

    if (campaign.status === "exclusive") {
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
          Exclusive
        </Badge>
      )
    }

    if (!meetsRequirements(campaign)) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          Requirements Not Met
        </Badge>
      )
    }

    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Available
      </Badge>
    )
  }

  // Render Geekey requirements
  const renderGeeKeyRequirements = (campaign: any) => {
    if (!campaign.requirements.geekeys) return null

    return (
      <div className="mt-2">
        <div className="text-xs text-muted-foreground mb-1">Required Geekeys:</div>
        <div className="flex flex-wrap gap-1">
          {campaign.requirements.geekeys.map((geekey: any, index: number) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs cursor-pointer ${
                      userStats.geekeys.some((g) => g.name === geekey.name && g.active)
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedGeeKey(geekey)
                      setShowGeeKeyInfo(true)
                    }}
                  >
                    <Key className="h-3 w-3" />
                    {geekey.name}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {userStats.geekeys.some((g) => g.name === geekey.name && g.active)
                      ? "You have this Geekey"
                      : "You need this Geekey"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    )
  }

  // Get icon for group type
  const getGroupIcon = (groupName: string) => {
    if (groupName.includes("Cult")) return <Shield className="h-4 w-4 text-blue-500" />
    if (groupName.includes("Clan")) return <Users className="h-4 w-4 text-green-500" />
    if (groupName.includes("Club")) return <Award className="h-4 w-4 text-purple-500" />
    return <Key className="h-4 w-4 text-amber-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Campaign Marketplace</h1>
          <p className="text-muted-foreground">Find and bid on campaigns that match your audience and level</p>
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
            placeholder="Search campaigns..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3+</SelectItem>
              <SelectItem value="4">Level 4+</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Gaming">Gaming</SelectItem>
              <SelectItem value="Hardware">Hardware</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Seasonal Multiplier Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Zap className="h-5 w-5 text-blue-600 neon-teal-glow" />
        </div>
        <div>
          <h3 className="font-medium text-blue-800">Seasonal Campaign Multiplier Active!</h3>
          <p className="text-sm text-blue-600">
            Complete campaigns before April 15th to receive a 1.5x Glo-Coins bonus!
          </p>
        </div>
      </div>

      {/* Campaign Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div className="h-[100px] bg-gray-100 relative">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
                {campaign.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Advertiser</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {campaign.status === "exclusive" && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-0.5 rounded-md text-xs font-medium">
                    Exclusive
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  {getCampaignStatusBadge(campaign)}
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {campaign.type} • {campaign.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">G</span>
                      </div>
                      <span className="font-medium">{campaign.earnings.gloCoins}</span>
                      {campaign.multiplier > 1 && (
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                          {campaign.multiplier}x
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[10px]">B</span>
                      </div>
                      <span className="font-medium">{campaign.earnings.bloCoins}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-purple-500 neon-teal-glow" />
                      <span>{campaign.requirements.energyPacks} Energy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-amber-500" />
                      <span>Level {campaign.requirements.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-blue-500" />
                      <span>{campaign.requirements.rpg} RPG</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-red-500" />
                      <span>{campaign.deadline}</span>
                    </div>
                  </div>

                  {campaign.requirements.keyRequired && (
                    <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 p-1.5 rounded-md">
                      <Key className="h-3 w-3" />
                      <span>Requires {campaign.requirements.keyRequired}</span>
                    </div>
                  )}

                  {campaign.requirements.bloCoinsDeposit && (
                    <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 p-1.5 rounded-md">
                      <Lock className="h-3 w-3" />
                      <span>Requires {campaign.requirements.bloCoinsDeposit} Blo-Coins deposit</span>
                    </div>
                  )}

                  {campaign.requirements.geekeys && renderGeeKeyRequirements(campaign)}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      variant={meetsRequirements(campaign) ? "default" : "outline"}
                      disabled={campaign.status === "locked" || !meetsRequirements(campaign)}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      {meetsRequirements(campaign) ? "View Details" : "Requirements Not Met"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{campaign.name}</DialogTitle>
                      <DialogDescription>
                        {campaign.type} Campaign by {campaign.advertiser}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="h-[120px] bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">Glo-Coins</span>
                          <div className="flex items-center gap-1">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">G</span>
                            </div>
                            <span className="font-medium">{campaign.earnings.gloCoins}</span>
                            {campaign.multiplier > 1 && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
                              >
                                {campaign.multiplier}x
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">Blo-Coins</span>
                          <div className="flex items-center gap-1">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                              <span className="text-white font-bold text-[10px]">B</span>
                            </div>
                            <span className="font-medium">{campaign.earnings.bloCoins}</span>
                          </div>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="requirements">
                          <AccordionTrigger>Requirements</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Impressions:</span>
                                <span className="font-medium">{campaign.requirements.impressions}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Level Required:</span>
                                <span className="font-medium">{campaign.requirements.level}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>RPG Required:</span>
                                <span className="font-medium">{campaign.requirements.rpg}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>XPS Required:</span>
                                <span className="font-medium">{campaign.requirements.xps}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Energy Packs:</span>
                                <span className="font-medium">{campaign.requirements.energyPacks}</span>
                              </div>
                              {campaign.requirements.keyRequired && (
                                <div className="flex justify-between text-sm">
                                  <span>Key Required:</span>
                                  <span className="font-medium">{campaign.requirements.keyRequired}</span>
                                </div>
                              )}
                              {campaign.requirements.bloCoinsDeposit && (
                                <div className="flex justify-between text-sm">
                                  <span>Blo-Coins Deposit:</span>
                                  <span className="font-medium">{campaign.requirements.bloCoinsDeposit}</span>
                                </div>
                              )}
                              {campaign.requirements.geekeys && (
                                <div className="space-y-1">
                                  <div className="text-sm font-medium">Geekeys Required:</div>
                                  {campaign.requirements.geekeys.map((geekey: any, index: number) => (
                                    <div key={index} className="flex justify-between text-sm">
                                      <div className="flex items-center gap-1">
                                        {getGroupIcon(geekey.name)}
                                        <span>{geekey.name}</span>
                                      </div>
                                      <span
                                        className={
                                          userStats.geekeys.some((g) => g.name === geekey.name && g.active)
                                            ? "text-green-600"
                                            : "text-amber-600"
                                        }
                                      >
                                        {userStats.geekeys.some((g) => g.name === geekey.name && g.active)
                                          ? "✓ Obtained"
                                          : "✗ Missing"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="details">
                          <AccordionTrigger>Campaign Details</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm">{campaign.details}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                        Cancel
                      </Button>
                      <Button disabled={!meetsRequirements(campaign)}>Bid on Campaign</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[200px] h-[100px] md:h-auto bg-gray-100 relative">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                  {campaign.verified && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                  {campaign.status === "exclusive" && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-0.5 rounded-md text-xs font-medium">
                      Exclusive
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {campaign.type} • {campaign.category}
                      </p>
                    </div>
                    {getCampaignStatusBadge(campaign)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Earnings</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className="h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">G</span>
                          </div>
                          <span className="font-medium">{campaign.earnings.gloCoins}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px]">B</span>
                          </div>
                          <span className="font-medium">{campaign.earnings.bloCoins}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Requirements</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Level {campaign.requirements.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-purple-500 neon-teal-glow" />
                          <span className="text-sm">{campaign.requirements.energyPacks}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Impressions</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{campaign.requirements.impressions.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Deadline</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{campaign.deadline}</span>
                      </div>
                    </div>
                  </div>

                  {(campaign.requirements.geekeys || campaign.requirements.bloCoinsDeposit) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {campaign.requirements.bloCoinsDeposit && (
                        <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 p-1.5 rounded-md">
                          <Lock className="h-3 w-3" />
                          <span>{campaign.requirements.bloCoinsDeposit} Blo-Coins deposit</span>
                        </div>
                      )}

                      {campaign.requirements.geekeys &&
                        campaign.requirements.geekeys.map((geekey: any, index: number) => (
                          <div
                            key={index}
                            className={`flex items-center gap-1 text-xs p-1.5 rounded-md ${
                              userStats.geekeys.some((g) => g.name === geekey.name && g.active)
                                ? "bg-green-50 text-green-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            <Key className="h-3 w-3" />
                            <span>{geekey.name}</span>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={meetsRequirements(campaign) ? "default" : "outline"}
                          disabled={campaign.status === "locked" || !meetsRequirements(campaign)}
                          onClick={() => setSelectedCampaign(campaign)}
                          size="sm"
                        >
                          {meetsRequirements(campaign) ? "View Details" : "Requirements Not Met"}
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* GeeKey Info Dialog */}
      <Dialog open={showGeeKeyInfo} onOpenChange={setShowGeeKeyInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Geekey Information</DialogTitle>
            <DialogDescription>Learn how to obtain this Geekey to unlock exclusive campaigns</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedGeeKey && (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center">
                    <Key className="h-6 w-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedGeeKey.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedGeeKey.name.includes("Cult")
                        ? "Cult Geekey"
                        : selectedGeeKey.name.includes("Clan")
                          ? "Clan Geekey"
                          : "Club Geekey"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to obtain this Geekey:</h4>
                  <p className="text-sm">
                    {selectedGeeKey.name.includes("Cult")
                      ? `Join the ${selectedGeeKey.name} by visiting the Groups page and selecting the Cults tab.`
                      : selectedGeeKey.name.includes("Clan")
                        ? `Join the ${selectedGeeKey.name} by visiting the Groups page and selecting the Clans tab. Some clans require an invitation.`
                        : `Request an invitation to the ${selectedGeeKey.name} by visiting the Groups page and selecting the Clubs tab. Club memberships are exclusive and require approval.`}
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setShowGeeKeyInfo(false)
                    // In a real app, this would navigate to the Groups page
                  }}
                >
                  Go to Groups
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

