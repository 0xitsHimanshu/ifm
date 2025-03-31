"use client"

import { useState } from "react"
import { Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add exclusive campaigns with Geekey requirements
const exclusiveCampaigns = [
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

// User stats for checking Geekey requirements
const userGeekeys = [
  { name: "Strava Cult", active: true },
  { name: "FPS Masters Clan", active: true },
]

export function MarketplacePageEnhanced() {
  // We'll extend the existing MarketplacePage component
  // This is a simplified version to show the Geekey integration

  const [showGeeKeyInfo, setShowGeeKeyInfo] = useState(false)
  const [selectedGeeKey, setSelectedGeeKey] = useState<any>(null)

  // Render Geekey requirements for a campaign
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
                      userGeekeys.some((g) => g.name === geekey.name && g.active)
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
                    {userGeekeys.some((g) => g.name === geekey.name && g.active)
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

  // GeeKey Info Dialog
  const renderGeeKeyInfoDialog = () => {
    return (
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
    )
  }

  return (
    <>
      {/* This component would be integrated with the existing MarketplacePage */}
      {/* The renderGeeKeyRequirements function would be called within the campaign card rendering */}
      {/* The renderGeeKeyInfoDialog function would be added to the component's return statement */}
      {renderGeeKeyInfoDialog()}
    </>
  )
}

