"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Mail,
  CreditCard,
  Shield,
  Globe,
  Settings,
  Zap,
  Trophy,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  LogOut,
  Twitch,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  BarChart3,
  Clock,
  Wallet,
  BadgeCheck,
  Key,
  Smartphone,
  ExternalLink,
  HelpCircle,
  FileText,
  Award,
  Users,
  Play,
  MoreHorizontal,
  Plus,
  Laptop,
  Laptop2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample user data
const userData = {
  profile: {
    id: "user123",
    username: "AaravSharma",
    displayName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    coverImage: "/placeholder.svg?height=300&width=1200",
    bio: "Gaming content creator and streamer. Specializing in mobile gaming and esports commentary.",
    location: "Mumbai, India",
    joinDate: "January 15, 2023",
    verified: true,
    level: 4,
    xps: 1150,
    maxXps: 2000,
    rpg: 410,
    energyPacks: 8,
    gloCoins: 12450,
    bloCoins: 3800,
    tags: ["mobile gaming", "esports", "commentary", "BGMI", "Mobile Legends"],
    socialLinks: {
      twitch: "https://twitch.tv/aaravsharma",
      youtube: "https://youtube.com/c/aaravsharma",
      instagram: "https://instagram.com/aaravsharma",
      twitter: "https://twitter.com/aaravsharma",
      facebook: "https://facebook.com/aaravsharma",
    },
    streamingPlatforms: [
      {
        name: "Twitch",
        username: "aaravsharma",
        followers: 12500,
        verified: true,
        connected: true,
      },
      {
        name: "YouTube",
        username: "Aarav Sharma",
        followers: 25000,
        verified: true,
        connected: true,
      },
      {
        name: "Instagram",
        username: "aaravsharma",
        followers: 8500,
        verified: false,
        connected: true,
      },
    ],
    achievements: [
      {
        id: 1,
        name: "Early Adopter",
        description: "Joined during the platform's beta phase",
        icon: "Trophy",
        date: "January 15, 2023",
      },
      {
        id: 2,
        name: "Campaign Master",
        description: "Completed 10 campaigns successfully",
        icon: "Star",
        date: "March 20, 2023",
      },
      {
        id: 3,
        name: "Engagement Expert",
        description: "Achieved 15% CTR on 5 consecutive campaigns",
        icon: "Zap",
        date: "April 5, 2023",
      },
    ],
    groups: [
      {
        name: "Strava Cult",
        type: "cult",
        icon: "Shield",
        joined: "February 10, 2023",
      },
      {
        name: "FPS Masters Clan",
        type: "clan",
        icon: "Users",
        joined: "March 5, 2023",
      },
    ],
  },
  account: {
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    language: "English",
    timezone: "Asia/Kolkata (GMT+5:30)",
    twoFactorEnabled: true,
    notifications: {
      email: true,
      push: true,
      campaigns: true,
      payments: true,
      platform: true,
      marketing: false,
    },
  },
  security: {
    lastPasswordChange: "March 10, 2023",
    loginHistory: [
      {
        device: "Windows PC - Chrome",
        location: "Mumbai, India",
        ip: "203.0.113.1",
        time: "April 10, 2023 - 14:25",
        status: "success",
      },
      {
        device: "iPhone 13 - Safari",
        location: "Mumbai, India",
        ip: "203.0.113.42",
        time: "April 9, 2023 - 19:12",
        status: "success",
      },
      {
        device: "Android - Chrome",
        location: "Delhi, India",
        ip: "198.51.100.23",
        time: "April 7, 2023 - 10:45",
        status: "failed",
      },
    ],
    connectedDevices: [
      {
        name: "Windows PC",
        browser: "Chrome",
        lastActive: "Now",
        current: true,
      },
      {
        name: "iPhone 13",
        browser: "Safari",
        lastActive: "1 day ago",
        current: false,
      },
    ],
  },
  payment: {
    paymentMethods: [
      {
        id: 1,
        type: "bank",
        name: "HDFC Bank",
        accountNumber: "XXXX-XXXX-4567",
        primary: true,
      },
      {
        id: 2,
        type: "upi",
        name: "Google Pay",
        accountNumber: "aarav@upi",
        primary: false,
      },
    ],
    payoutHistory: [
      {
        id: "P12345",
        amount: 15000,
        date: "April 1, 2023",
        status: "completed",
        method: "Bank Transfer",
      },
      {
        id: "P12346",
        amount: 12500,
        date: "March 1, 2023",
        status: "completed",
        method: "Bank Transfer",
      },
      {
        id: "P12347",
        amount: 8000,
        date: "February 1, 2023",
        status: "completed",
        method: "UPI",
      },
    ],
    payoutSettings: {
      minimumPayout: 5000,
      payoutFrequency: "monthly",
      autoPayouts: true,
      taxInformation: {
        panCard: "ABCDE1234F",
        gstNumber: "22AAAAA0000A1Z5",
        verified: true,
      },
    },
  },
  analytics: {
    campaignStats: {
      total: 15,
      active: 4,
      completed: 10,
      pending: 1,
      successRate: 92,
    },
    earnings: {
      total: 35500,
      monthly: [
        { month: "Jan", amount: 8000 },
        { month: "Feb", amount: 12500 },
        { month: "Mar", amount: 15000 },
      ],
      byCategory: [
        { category: "Gaming", percentage: 65, amount: 23075 },
        { category: "Hardware", percentage: 25, amount: 8875 },
        { category: "Food & Beverage", percentage: 10, amount: 3550 },
      ],
    },
    performance: {
      impressions: 250000,
      clicks: 27500,
      ctr: 11,
      conversions: 2750,
      cvr: 10,
    },
    recentActivity: [
      {
        type: "campaign_completed",
        name: "BGMI Blitz Promotion",
        date: "April 5, 2023",
        earnings: 750,
      },
      {
        type: "level_up",
        level: 4,
        date: "April 2, 2023",
      },
      {
        type: "payout_processed",
        amount: 15000,
        date: "April 1, 2023",
      },
      {
        type: "campaign_started",
        name: "Mobile Legends Tournament",
        date: "March 25, 2023",
      },
    ],
  },
  verification: {
    status: "verified",
    documents: [
      {
        type: "identity",
        name: "Aadhaar Card",
        submitted: "January 20, 2023",
        verified: true,
      },
      {
        type: "address",
        name: "Utility Bill",
        submitted: "January 20, 2023",
        verified: true,
      },
    ],
    contentVerification: {
      contentType: "Gaming & Esports",
      audienceAge: "13-25",
      contentRating: "PG-13",
      languages: ["English", "Hindi"],
      verified: true,
    },
  },
  subscription: {
    plan: "Pro Creator",
    status: "active",
    renewalDate: "January 15, 2024",
    features: [
      "Priority campaign access",
      "Higher campaign payouts (10% bonus)",
      "Advanced analytics",
      "Dedicated account manager",
      "Early access to new features",
    ],
    price: 2999,
    billingCycle: "yearly",
  },
}

// Activity type icons
const getActivityIcon = (type: string) => {
  switch (type) {
    case "campaign_completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "campaign_started":
      return <Play className="h-4 w-4 text-blue-500" />
    case "level_up":
      return <Trophy className="h-4 w-4 text-amber-500" />
    case "payout_processed":
      return <CreditCard className="h-4 w-4 text-purple-500" />
    default:
      return <Info className="h-4 w-4 text-gray-500" />
  }
}

// Platform icons
const getPlatformIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "twitch":
      return <Twitch className="h-4 w-4 text-purple-500" />
    case "youtube":
      return <Youtube className="h-4 w-4 text-red-500" />
    case "instagram":
      return <Instagram className="h-4 w-4 text-pink-500" />
    case "twitter":
      return <Twitter className="h-4 w-4 text-blue-500" />
    case "facebook":
      return <Facebook className="h-4 w-4 text-blue-700" />
    default:
      return <Globe className="h-4 w-4 text-gray-500" />
  }
}

// Group type icons
const getGroupIcon = (type: string) => {
  switch (type) {
    case "cult":
      return <Shield className="h-4 w-4 text-blue-500" />
    case "clan":
      return <Users className="h-4 w-4 text-green-500" />
    case "club":
      return <Award className="h-4 w-4 text-purple-500" />
    default:
      return <Users className="h-4 w-4 text-gray-500" />
  }
}

// Achievement icons
const getAchievementIcon = (icon: string) => {
  switch (icon) {
    case "Trophy":
      return <Trophy className="h-5 w-5 text-amber-500" />
    case "Star":
      return <Star className="h-5 w-5 text-blue-500" />
    case "Zap":
      return <Zap className="h-5 w-5 text-purple-500 neon-teal-glow" />
    default:
      return <Award className="h-5 w-5 text-gray-500" />
  }
}

// Payment method icons
const getPaymentMethodIcon = (type: string) => {
  switch (type) {
    case "bank":
      return <CreditCard className="h-4 w-4 text-blue-500" />
    case "upi":
      return <Smartphone className="h-4 w-4 text-green-500" />
    default:
      return <Wallet className="h-4 w-4 text-gray-500" />
  }
}

// Status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
    case "completed":
    case "verified":
    case "active":
      return (
        <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
          Pending
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-800">
          Failed
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
  }
}

// Function to play a 3D animation effect

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [editProfile, setEditProfile] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null)
  const [showAvatarUploadDialog, setShowAvatarUploadDialog] = useState(false)
  const [showCoverUploadDialog, setShowCoverUploadDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false)

  // Form states
  const [profileForm, setProfileForm] = useState({
    displayName: userData.profile.displayName,
    username: userData.profile.username,
    bio: userData.profile.bio,
    location: userData.profile.location,
    tags: userData.profile.tags.join(", "),
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle profile save
  const handleProfileSave = () => {
    // In a real app, this would save the profile data
    setEditProfile(false)
  }

  // Handle password change
  const handlePasswordChange2 = () => {
    // In a real app, this would change the password
    setShowPasswordDialog(false)
  }

  // Handle disconnect platform
  const handleDisconnectPlatform = () => {
    // In a real app, this would disconnect the platform
    setShowDisconnectDialog(false)
  }

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would log the user out
    setShowLogoutDialog(false)
  }

  // Handle delete account
  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    setShowDeleteAccountDialog(false)
  }

  // Calculate level progress
  const levelProgress = (userData.profile.xps / userData.profile.maxXps) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setShowUpgradeDialog(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="text-gray-100">
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gray-700">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-gray-700">
            <Settings className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-gray-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-gray-700">
            <BadgeCheck className="h-4 w-4 mr-2" />
            Verification
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            {/* Cover Image */}
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
              <img
                src={userData.profile.coverImage || "/placeholder.svg"}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

              {/* Edit Cover Button */}
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-gray-900/50 border-gray-700 hover:bg-gray-800"
                onClick={() => setShowCoverUploadDialog(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Change Cover
              </Button>

              {/* Profile Info Overlay */}
              <div className="absolute bottom-4 left-4 md:left-6 flex items-end gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-gray-900 shadow-lg">
                    <AvatarImage src={userData.profile.avatar} alt={userData.profile.displayName} />
                    <AvatarFallback className="bg-gray-800 text-gray-100 text-xl">
                      {userData.profile.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gray-900 border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowAvatarUploadDialog(true)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-100">{userData.profile.displayName}</h2>
                    {userData.profile.verified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-blue-500/20 p-1 rounded-full">
                              <BadgeCheck className="h-4 w-4 text-blue-500" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 border-gray-700 text-gray-100">
                            <p>Verified Creator</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-sm text-gray-300">@{userData.profile.username}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Profile Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Profile Info Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Your public profile details</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={() => setEditProfile(!editProfile)}
                    >
                      {editProfile ? (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {editProfile ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input
                              id="displayName"
                              name="displayName"
                              value={profileForm.displayName}
                              onChange={handleProfileChange}
                              className="bg-gray-800 border-gray-700 text-gray-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              name="username"
                              value={profileForm.username}
                              onChange={handleProfileChange}
                              className="bg-gray-800 border-gray-700 text-gray-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={profileForm.bio}
                            onChange={handleProfileChange}
                            className="bg-gray-800 border-gray-700 text-gray-100 min-h-[100px]"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              name="location"
                              value={profileForm.location}
                              onChange={handleProfileChange}
                              className="bg-gray-800 border-gray-700 text-gray-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                              id="tags"
                              name="tags"
                              value={profileForm.tags}
                              onChange={handleProfileChange}
                              className="bg-gray-800 border-gray-700 text-gray-100"
                            />
                          </div>
                        </div>
                        <div className="pt-2 flex justify-end">
                          <Button
                            onClick={handleProfileSave}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Bio</Label>
                          <p className="text-sm text-gray-300">{userData.profile.bio}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Location</Label>
                            <p className="text-sm text-gray-300">{userData.profile.location}</p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Joined</Label>
                            <p className="text-sm text-gray-300">{userData.profile.joinDate}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-muted-foreground">Tags</Label>
                          <div className="flex flex-wrap gap-2">
                            {userData.profile.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-800 text-gray-300 border-gray-700"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Streaming Platforms Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Connected Platforms</CardTitle>
                    <CardDescription>Manage your streaming and social media platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.profile.streamingPlatforms.map((platform, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                              {getPlatformIcon(platform.name)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-100">{platform.name}</h3>
                                {platform.verified && <BadgeCheck className="h-4 w-4 text-blue-500" />}
                              </div>
                              <p className="text-sm text-gray-400">
                                @{platform.username} • {platform.followers.toLocaleString()} followers
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 hover:bg-gray-700"
                              onClick={() => {
                                setSelectedPlatform(platform)
                                setShowDisconnectDialog(true)
                              }}
                            >
                              Disconnect
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 hover:bg-gray-700"
                              onClick={() =>
                                window.open(
                                  userData.profile.socialLinks[
                                    platform.name.toLowerCase() as keyof typeof userData.profile.socialLinks
                                  ],
                                  "_blank",
                                )
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" className="w-full border-dashed border-gray-700 hover:bg-gray-800 mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect New Platform
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Your public social media profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(userData.profile.socialLinks).map(([platform, url]) => (
                        <div
                          key={platform}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(platform)}
                            <span className="text-sm text-gray-300 capitalize">{platform}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => window.open(url, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Stats & Achievements */}
              <div className="space-y-6">
                {/* Stats Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Creator Stats</CardTitle>
                    <CardDescription>Your current level and stats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Level</span>
                        <span className="font-medium stat-value-amber">{userData.profile.level}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>
                          XPS: <span className="stat-value-teal">{userData.profile.xps}</span>
                        </span>
                        <span>
                          <span className="stat-value-teal">{userData.profile.maxXps}</span>
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

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-300">RPG</span>
                        </div>
                        <div className="text-lg font-medium stat-value-blue">{userData.profile.rpg}</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="h-4 w-4 text-purple-500 neon-teal-glow" />
                          <span className="text-sm text-gray-300">Energy</span>
                        </div>
                        <div className="text-lg font-medium stat-value-purple">{userData.profile.energyPacks}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">G</span>
                          </div>
                          <span className="text-sm text-gray-300">Glo-Coins</span>
                        </div>
                        <div className="text-lg font-medium stat-value-amber">
                          {userData.profile.gloCoins.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">B</span>
                          </div>
                          <span className="text-sm text-gray-300">Blo-Coins</span>
                        </div>
                        <div className="text-lg font-medium stat-value-blue">
                          {userData.profile.bloCoins.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Badges and milestones you've earned</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.profile.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            {getAchievementIcon(achievement.icon)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-100">{achievement.name}</h3>
                            <p className="text-xs text-gray-400">{achievement.description}</p>
                          </div>
                          <div className="text-xs text-gray-400">{achievement.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Groups Card */}
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Groups</CardTitle>
                    <CardDescription>Cults and clans you've joined</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userData.profile.groups.map((group, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            {getGroupIcon(group.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-100">{group.name}</h3>
                            <p className="text-xs text-gray-400">Joined: {group.joined}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                            View
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full border-dashed border-gray-700 hover:bg-gray-800 mt-2"
                        onClick={() => (window.location.href = "/dashboard/groups")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Explore More Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          value={userData.account.email}
                          readOnly
                          className="bg-gray-800 border-gray-700 text-gray-100 flex-1"
                        />
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                          Change
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          value={userData.account.phone}
                          readOnly
                          className="bg-gray-800 border-gray-700 text-gray-100 flex-1"
                        />
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue={userData.account.language.toLowerCase()}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="asia-kolkata">
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                          <SelectItem value="asia-kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                          <SelectItem value="america-new_york">America/New York (GMT-4)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (GMT+1)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex gap-2">
                      <Input
                        id="password"
                        type="password"
                        value="••••••••••••"
                        readOnly
                        className="bg-gray-800 border-gray-700 text-gray-100 flex-1"
                      />
                      <Button
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700"
                        onClick={() => setShowPasswordDialog(true)}
                      >
                        Change
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last changed: {userData.security.lastPasswordChange}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch checked={userData.account.notifications.email} />
                    </div>
                    <Separator className="bg-gray-700" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your devices</p>
                      </div>
                      <Switch checked={userData.account.notifications.push} />
                    </div>
                    <Separator className="bg-gray-700" />
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Notification Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="campaigns" className="cursor-pointer">
                            Campaign Updates
                          </Label>
                          <Switch id="campaigns" checked={userData.account.notifications.campaigns} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="payments" className="cursor-pointer">
                            Payment Notifications
                          </Label>
                          <Switch id="payments" checked={userData.account.notifications.payments} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="platform" className="cursor-pointer">
                            Platform Updates
                          </Label>
                          <Switch id="platform" checked={userData.account.notifications.platform} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing" className="cursor-pointer">
                            Marketing & Promotions
                          </Label>
                          <Switch id="marketing" checked={userData.account.notifications.marketing} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-red-400">Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-800 rounded-lg bg-red-900/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-medium text-red-400">Delete Account</h3>
                        <p className="text-sm text-red-300">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" size="sm" onClick={() => setShowDeleteAccountDialog(true)}>
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Subscription Card */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Your current plan and benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-purple-300">{userData.subscription.plan}</h3>
                      {getStatusBadge(userData.subscription.status)}
                    </div>
                    <p className="text-xs text-gray-300 mb-3">
                      Renews on {userData.subscription.renewalDate} • ₹{userData.subscription.price}/year
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-gray-300">Plan Features:</h4>
                      <ul className="space-y-1">
                        {userData.subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowUpgradeDialog(true)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.analytics.recentActivity.slice(0, 4).map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-100">
                            {activity.type === "campaign_completed" && `Completed: ${activity.name}`}
                            {activity.type === "campaign_started" && `Started: ${activity.name}`}
                            {activity.type === "level_up" && `Leveled up to Level ${activity.level}`}
                            {activity.type === "payout_processed" && `Payout: ₹${activity.amount}`}
                          </h3>
                          <p className="text-xs text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get assistance with your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-100">Help Center</h3>
                      <p className="text-xs text-gray-400">Browse FAQs and tutorials</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                      Visit
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-100">Documentation</h3>
                      <p className="text-xs text-gray-400">Read platform guidelines</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <Mail className="h-5 w-5 text-purple-500" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-100">Contact Support</h3>
                      <p className="text-xs text-gray-400">Get personalized help</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Two-Factor Authentication */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-start gap-3">
                      {userData.account.twoFactorEnabled ? (
                        <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-100">Two-Factor Authentication</h3>
                          {userData.account.twoFactorEnabled ? (
                            <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                              Disabled
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-300">
                          {userData.account.twoFactorEnabled
                            ? "Your account is protected with two-factor authentication."
                            : "Protect your account with an additional security layer."}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 hover:bg-gray-700"
                          onClick={() => setShowTwoFactorDialog(true)}
                        >
                          {userData.account.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Login History */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent login attempts to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.security.loginHistory.map((login, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {login.status === "success" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-100">{login.device}</h3>
                            {getStatusBadge(login.status)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>{login.location}</span>
                            <span>•</span>
                            <span>{login.ip}</span>
                            <span>•</span>
                            <span>{login.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Devices currently logged into your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.security.connectedDevices.map((device, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {device.name.toLowerCase().includes("iphone") ||
                          device.name.toLowerCase().includes("android") ? (
                            <Smartphone className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Laptop2 className="h-5 w-5 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-100">
                              {device.name} - {device.browser}
                            </h3>
                            {device.current && (
                              <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                                Current Device
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Last active: {device.lastActive}</p>
                        </div>
                        {!device.current && (
                          <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                            Logout
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Security Recommendations */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Security Recommendations</CardTitle>
                  <CardDescription>Enhance your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">Strong Password</h3>
                      <p className="text-xs text-gray-400">Your password is strong and secure</p>
                    </div>
                  </div>
                  {userData.account.twoFactorEnabled ? (
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-400">Your account has 2FA enabled</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-amber-800 bg-amber-900/20">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-amber-300">Enable Two-Factor Authentication</h3>
                        <p className="text-xs text-amber-200/70">Add an extra layer of security to your account</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-amber-800 bg-amber-900/30 hover:bg-amber-900/50 text-amber-300"
                          onClick={() => setShowTwoFactorDialog(true)}
                        >
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">Recovery Email</h3>
                      <p className="text-xs text-gray-400">Your recovery email is set up</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Keys */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage access to the API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <Key className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-100">Creator API Key</h3>
                      <p className="text-xs text-gray-400">Created: March 15, 2023</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                      Manage
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full border-dashed border-gray-700 hover:bg-gray-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New API Key
                  </Button>
                </CardContent>
              </Card>

              {/* Security Tips */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Security Tips</CardTitle>
                  <CardDescription>Best practices for account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-400">Use Unique Passwords</h3>
                      <p className="text-xs text-blue-300">Never reuse passwords across different websites</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-400">Check Login Notifications</h3>
                      <p className="text-xs text-blue-300">Review login alerts to detect unauthorized access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-400">Update Regularly</h3>
                      <p className="text-xs text-blue-300">Change your password every 3 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Payment Methods */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowAddPaymentDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Method
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.payment.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            {getPaymentMethodIcon(method.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-100">{method.name}</h3>
                              {method.primary && (
                                <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                                  Primary
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{method.accountNumber}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8 border-gray-700 hover:bg-gray-700">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-100">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {!method.primary && (
                              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Set as Primary
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="text-red-400 hover:bg-gray-700 cursor-pointer">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Record of your earnings payouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.payment.payoutHistory.map((payout) => (
                      <div
                        key={payout.id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-100">₹{payout.amount.toLocaleString()}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{payout.date}</span>
                              <span>•</span>
                              <span>{payout.method}</span>
                              <span>•</span>
                              <span>ID: {payout.id}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(payout.status)}
                          <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                            Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Information */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                  <CardDescription>Manage your tax details for payouts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pan">PAN Card</Label>
                      <div className="flex gap-2">
                        <Input
                          id="pan"
                          value={userData.payment.payoutSettings.taxInformation.panCard}
                          readOnly
                          className="bg-gray-800 border-gray-700 text-gray-100 flex-1"
                        />
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst">GST Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="gst"
                          value={userData.payment.payoutSettings.taxInformation.gstNumber}
                          readOnly
                          className="bg-gray-800 border-gray-700 text-gray-100 flex-1"
                        />
                        <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-green-400">Tax Information Verified</h3>
                      <p className="text-xs text-green-300">Your tax documents have been verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Payout Settings */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Payout Settings</CardTitle>
                  <CardDescription>Configure how you receive payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimum-payout">Minimum Payout Amount</Label>
                    <Select defaultValue={userData.payment.payoutSettings.minimumPayout.toString()}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectItem value="1000">₹1,000</SelectItem>
                        <SelectItem value="2500">₹2,500</SelectItem>
                        <SelectItem value="5000">₹5,000</SelectItem>
                        <SelectItem value="10000">₹10,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payout-frequency">Payout Frequency</Label>
                    <Select defaultValue={userData.payment.payoutSettings.payoutFrequency}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Payouts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically process payouts when minimum amount is reached
                      </p>
                    </div>
                    <Switch checked={userData.payment.payoutSettings.autoPayouts} />
                  </div>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                  <CardDescription>Overview of your earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg border border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-green-300">Total Earnings</h3>
                      <span className="text-xl font-bold stat-value-green">
                        ₹{userData.analytics.earnings.total.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">This Month</span>
                        <span className="font-medium stat-value-blue">
                          ₹{userData.analytics.earnings.monthly[2].amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Last Month</span>
                        <span className="font-medium text-gray-100">
                          ₹{userData.analytics.earnings.monthly[1].amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Two Months Ago</span>
                        <span className="font-medium text-gray-100">
                          ₹{userData.analytics.earnings.monthly[0].amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Earnings by Category</h3>
                    {userData.analytics.earnings.byCategory.map((category) => (
                      <div key={category.category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{category.category}</span>
                          <span className="font-medium text-gray-100">₹{category.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              category.category === "Gaming"
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : category.category === "Hardware"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                  : "bg-gradient-to-r from-purple-500 to-purple-600"
                            }`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Settings */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Invoice Settings</CardTitle>
                  <CardDescription>Manage your invoice preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Invoices</Label>
                      <p className="text-sm text-muted-foreground">Generate invoices automatically for each payout</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Invoices</Label>
                      <p className="text-sm text-muted-foreground">Receive invoices via email</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                    <FileText className="h-4 w-4 mr-2" />
                    View Past Invoices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Campaign Performance */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Overview of your campaign metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Impressions</div>
                      <div className="text-lg font-medium stat-value-purple">
                        {userData.analytics.performance.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Clicks</div>
                      <div className="text-lg font-medium stat-value-blue">
                        {userData.analytics.performance.clicks.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">CTR</div>
                      <div className="text-lg font-medium stat-value-green">{userData.analytics.performance.ctr}%</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Conversions</div>
                      <div className="text-lg font-medium stat-value-amber">
                        {userData.analytics.performance.conversions.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px] bg-gray-800 rounded-lg border border-gray-700 p-4 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-300">Performance Chart</h3>
                      <p className="text-sm text-gray-400">Campaign performance visualization</p>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-400 mb-1">Performance Insight</h3>
                      <p className="text-sm text-blue-300">
                        Your CTR of {userData.analytics.performance.ctr}% is 2.5% above the platform average. Your
                        gaming campaigns are performing particularly well.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Stats */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Campaign Statistics</CardTitle>
                  <CardDescription>Summary of your campaign activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-300">Total</span>
                      </div>
                      <div className="text-2xl font-medium stat-value-blue">
                        {userData.analytics.campaignStats.total}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <Play className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-300">Active</span>
                      </div>
                      <div className="text-2xl font-medium stat-value-green">
                        {userData.analytics.campaignStats.active}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-300">Completed</span>
                      </div>
                      <div className="text-2xl font-medium stat-value-purple">
                        {userData.analytics.campaignStats.completed}
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-gray-300">Pending</span>
                      </div>
                      <div className="text-2xl font-medium stat-value-amber">
                        {userData.analytics.campaignStats.pending}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg border border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-green-300">Success Rate</h3>
                      <span className="text-xl font-bold stat-value-green">
                        {userData.analytics.campaignStats.successRate}%
                      </span>
                    </div>
                    <Progress value={userData.analytics.campaignStats.successRate} className="h-2 bg-gray-700" />
                    <p className="text-xs text-green-300 mt-2">
                      You've successfully completed {userData.analytics.campaignStats.successRate}% of your campaigns,
                      which is excellent!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Earnings */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                  <CardDescription>Your earnings over the past 3 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {userData.analytics.earnings.monthly.map((data) => (
                      <div key={data.month} className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm"
                            style={{
                              height: `${(data.amount / 15000) * 150}px`,
                              maxHeight: "150px",
                            }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium text-gray-300">{data.month}</div>
                        <div className="text-xs text-gray-400">₹{data.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-gradient-to-r from-green-400 to-green-600 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Monthly Earnings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Performance */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>Analyze the performance of your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-800 rounded-lg border border-gray-700 p-4 flex items-center justify-center">
                    <div className="text-center">
                      <Laptop className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-300">Content Chart</h3>
                      <p className="text-sm text-gray-400">Content performance visualization</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Content Views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Audience Demographics */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Understand your audience better</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-gray-300">Audience Chart</h3>
                      <p className="text-sm text-gray-400">Audience demographics visualization</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-sm"></div>
                      <span className="text-xs text-gray-300">Audience Age</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Content */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>Identify your best content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <Play className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">BGMI Tournament Highlights</h3>
                        <p className="text-xs text-gray-400">Views: 125,000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <Play className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Mobile Legends Strategy Guide</h3>
                        <p className="text-xs text-gray-400">Views: 98,000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <Play className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Esports Commentary Tips</h3>
                        <p className="text-xs text-gray-400">Views: 75,000</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement Metrics */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Track your audience engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Likes</div>
                      <div className="text-lg font-medium stat-value-blue">25,000</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Comments</div>
                      <div className="text-lg font-medium stat-value-green">12,000</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Shares</div>
                      <div className="text-lg font-medium stat-value-purple">8,000</div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs text-muted-foreground">Saves</div>
                      <div className="text-lg font-medium stat-value-amber">5,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Identity Verification */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Identity Verification</CardTitle>
                  <CardDescription>Verify your identity for enhanced credibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">Aadhaar Card</h3>
                      <p className="text-xs text-gray-400">Submitted: January 20, 2023</p>
                    </div>
                    {userData.verification.documents[0].verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">Utility Bill</h3>
                      <p className="text-xs text-gray-400">Submitted: January 20, 2023</p>
                    </div>
                    {userData.verification.documents[1].verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowVerificationDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit More Documents
                  </Button>
                </CardContent>
              </Card>

              {/* Content Verification */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Content Verification</CardTitle>
                  <CardDescription>Verify your content for platform compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">Gaming & Esports</h3>
                      <p className="text-xs text-gray-400">Content Type</p>
                    </div>
                    {userData.verification.contentVerification.verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">13-25</h3>
                      <p className="text-xs text-gray-400">Audience Age</p>
                    </div>
                    {userData.verification.contentVerification.verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">PG-13</h3>
                      <p className="text-xs text-gray-400">Content Rating</p>
                    </div>
                    {userData.verification.contentVerification.verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">English, Hindi</h3>
                      <p className="text-xs text-gray-400">Languages</p>
                    </div>
                    {userData.verification.contentVerification.verified ? (
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-gray-700 hover:bg-gray-800"
                    onClick={() => setShowVerificationDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit More Details
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Verification Status */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>Overall verification status of your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.verification.status === "verified" ? (
                    <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg border border-green-800">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-green-400">Account Verified</h3>
                        <p className="text-xs text-green-300">Your account has been fully verified</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-amber-900/20 rounded-lg border border-amber-800">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-amber-300">Account Verification Pending</h3>
                        <p className="text-xs text-amber-200/70">
                          Please submit the required documents for verification
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-amber-800 bg-amber-900/30 hover:bg-amber-900/50 text-amber-300"
                          onClick={() => setShowVerificationDialog(true)}
                        >
                          Submit Documents
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg border border-blue-800">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-400">Why Get Verified?</h3>
                      <p className="text-xs text-blue-300">
                        Verification increases trust and unlocks additional features
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and new password to change your password.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="bg-gray-800 border-gray-700 text-gray-100 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-700"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="bg-gray-800 border-gray-700 text-gray-100 pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-700"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handlePasswordChange2}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDeleteAccountDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Choose a payment method to add to your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" className="bg-gray-800 border-gray-700 text-gray-100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowAddPaymentDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Disconnect Platform</DialogTitle>
            <DialogDescription>Are you sure you want to disconnect {selectedPlatform?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowDisconnectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDisconnectPlatform}>
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAvatarUploadDialog} onOpenChange={setShowAvatarUploadDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogDescription>Upload a new avatar for your profile.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="avatarUpload">Upload Avatar</Label>
              <Input id="avatarUpload" type="file" className="bg-gray-800 border-gray-700 text-gray-100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowAvatarUploadDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Upload Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCoverUploadDialog} onOpenChange={setShowCoverUploadDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Change Cover Image</DialogTitle>
            <DialogDescription>Upload a new cover image for your profile.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="coverUpload">Upload Cover Image</Label>
              <Input id="coverUpload" type="file" className="bg-gray-800 border-gray-700 text-gray-100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCoverUploadDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Upload Cover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>Are you sure you want to logout?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Submit Verification Documents</DialogTitle>
            <DialogDescription>Submit the required documents for verification.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="identityDocument">Identity Document</Label>
              <Input id="identityDocument" type="file" className="bg-gray-800 border-gray-700 text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressDocument">Address Document</Label>
              <Input id="addressDocument" type="file" className="bg-gray-800 border-gray-700 text-gray-100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowVerificationDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Submit Documents
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>Choose a plan to upgrade your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="planType">Plan Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Upgrade Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTwoFactorDialog} onOpenChange={setShowTwoFactorDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Two-Factor Authentication</DialogTitle>
            <DialogDescription>Enable two-factor authentication for enhanced security.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="authType">Authentication Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select authentication type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="app">Authentication App</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowTwoFactorDialog(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Enable 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const DeviceIcon = Laptop2

