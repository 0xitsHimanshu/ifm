"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Zap, Trophy, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [userStats, setUserStats] = useState({
    name: "Aarav Sharma",
    level: 1,
    xps: 125,
    maxXps: 200,
    gloCoins: 1125,
    bloCoins: 425,
    energyPacks: 4,
    streak: 4,
  });

  const levelProgress = (userStats.xps / userStats.maxXps) * 100;

  return (
    <header className="h-16 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800 px-4 flex items-center justify-between">
      {/* Left side - empty or can contain page title */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-100">Dashboard</h1>
      </div>

      {/* Right side - User profile and actions */}
      <div className="flex items-center space-x-4">
        {/* Quick actions */}
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-800 border-gray-700 hover:bg-gray-700"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="bg-gray-800 border-gray-700 hover:bg-gray-700"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Currency and resources */}
        <div className="hidden md:flex items-center space-x-3 mr-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md border border-gray-700">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
              <span className="text-white font-bold text-[8px]">G</span>
            </div>
            <span className="text-xs font-medium stat-value-amber">
              {userStats.gloCoins}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md border border-gray-700">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-[8px]">B</span>
            </div>
            <span className="text-xs font-medium stat-value-blue">
              {userStats.bloCoins}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded-md border border-gray-700">
            <Zap className="h-3 w-3 text-teal-500 neon-teal-glow" />
            <span className="text-xs font-medium stat-value-teal">
              {userStats.energyPacks}
            </span>
          </div>
        </div>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-100">
                    {userStats.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-gray-300">
                      Level{" "}
                      <span className="stat-value-amber">
                        {userStats.level}
                      </span>
                    </span>
                  </div>
                </div>

                <Avatar className="h-8 w-8 border-2 border-purple-500">
                  <AvatarFallback className="bg-gradient-to-br from-gray-800 to-gray-700 text-white">
                    {userStats.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-gray-800 border-gray-700 text-gray-100"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />

            {/* XP Progress */}
            <div className="px-2 py-1.5">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>
                  XPS: <span className="stat-value-teal">{userStats.xps}</span>
                </span>
                <span>
                  <span className="stat-value-teal">{userStats.maxXps}</span>
                </span>
              </div>
              <Progress
                value={levelProgress}
                className="h-1.5 bg-gray-700"
                style={{
                  background: "rgba(55, 65, 81, 0.5)",
                  overflow: "hidden",
                  position: "relative",
                }}
              />
            </div>

            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem>
              <Link
                href="/dashboard/profile"
                className="flex items-center w-full"
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem>
              <Link
                href="/dashboard/settings"
                className="flex items-center w-full"
              >
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
