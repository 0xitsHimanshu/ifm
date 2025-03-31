"use client"

import { useState } from "react"
import {
  Image,
  Video,
  FileText,
  Upload,
  Plus,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowUpRight,
  Zap,
  Trophy,
  Star,
  Layers,
  Palette,
  Maximize,
  Download,
  Share2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

// Sample creatives data
const creativesData = {
  images: [
    {
      id: 1,
      name: "BGMI Banner Ad",
      type: "image",
      format: "banner",
      dimensions: "1200x300",
      fileSize: "245 KB",
      url: "/placeholder.svg?height=300&width=1200",
      thumbnail: "/placeholder.svg?height=150&width=600",
      dateCreated: "April 5, 2023",
      status: "active",
      campaigns: ["BGMI Blitz Promotion"],
      tags: ["gaming", "banner", "mobile"],
      performance: {
        impressions: 12500,
        clicks: 1250,
        ctr: 10,
        conversions: 125,
      },
    },
    {
      id: 2,
      name: "Gaming Headset Product Shot",
      type: "image",
      format: "square",
      dimensions: "800x800",
      fileSize: "320 KB",
      url: "/placeholder.svg?height=800&width=800",
      thumbnail: "/placeholder.svg?height=150&width=150",
      dateCreated: "March 20, 2023",
      status: "active",
      campaigns: ["Gaming Headset Promo"],
      tags: ["hardware", "product", "square"],
      performance: {
        impressions: 8500,
        clicks: 765,
        ctr: 9,
        conversions: 85,
      },
    },
    {
      id: 3,
      name: "Mobile Legends Tournament Poster",
      type: "image",
      format: "portrait",
      dimensions: "800x1200",
      fileSize: "410 KB",
      url: "/placeholder.svg?height=1200&width=800",
      thumbnail: "/placeholder.svg?height=225&width=150",
      dateCreated: "April 2, 2023",
      status: "active",
      campaigns: ["Mobile Legends Tournament"],
      tags: ["gaming", "tournament", "portrait"],
      performance: {
        impressions: 15000,
        clicks: 1650,
        ctr: 11,
        conversions: 165,
      },
    },
    {
      id: 4,
      name: "Energy Drink Promo",
      type: "image",
      format: "square",
      dimensions: "1080x1080",
      fileSize: "380 KB",
      url: "/placeholder.svg?height=1080&width=1080",
      thumbnail: "/placeholder.svg?height=150&width=150",
      dateCreated: "March 25, 2023",
      status: "inactive",
      campaigns: [],
      tags: ["beverage", "product", "square"],
      performance: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        conversions: 0,
      },
    },
  ],
  videos: [
    {
      id: 5,
      name: "BGMI Gameplay Trailer",
      type: "video",
      format: "landscape",
      dimensions: "1920x1080",
      duration: "30 seconds",
      fileSize: "12.5 MB",
      url: "/placeholder.svg?height=1080&width=1920",
      thumbnail: "/placeholder.svg?height=84&width=150",
      dateCreated: "April 3, 2023",
      status: "active",
      campaigns: ["BGMI Blitz Promotion"],
      tags: ["gaming", "trailer", "gameplay"],
      performance: {
        impressions: 7500,
        clicks: 900,
        ctr: 12,
        conversions: 90,
        completionRate: 65,
      },
    },
    {
      id: 6,
      name: "Gaming Chair Product Demo",
      type: "video",
      format: "landscape",
      dimensions: "1920x1080",
      duration: "45 seconds",
      fileSize: "18.2 MB",
      url: "/placeholder.svg?height=1080&width=1920",
      thumbnail: "/placeholder.svg?height=84&width=150",
      dateCreated: "March 28, 2023",
      status: "active",
      campaigns: ["Gaming Chair Promotion"],
      tags: ["hardware", "product", "demo"],
      performance: {
        impressions: 6200,
        clicks: 682,
        ctr: 11,
        conversions: 68,
        completionRate: 72,
      },
    },
  ],
  gifs: [
    {
      id: 7,
      name: "Mobile Legends Character Animation",
      type: "gif",
      format: "square",
      dimensions: "500x500",
      fileSize: "2.8 MB",
      url: "/placeholder.svg?height=500&width=500",
      thumbnail: "/placeholder.svg?height=150&width=150",
      dateCreated: "April 4, 2023",
      status: "active",
      campaigns: ["Mobile Legends Tournament"],
      tags: ["gaming", "animation", "character"],
      performance: {
        impressions: 9800,
        clicks: 1176,
        ctr: 12,
        conversions: 118,
      },
    },
  ],
  templates: [
    {
      id: 8,
      name: "Gaming Stream Overlay",
      type: "template",
      format: "overlay",
      dimensions: "1920x1080",
      fileSize: "1.2 MB",
      url: "/placeholder.svg?height=1080&width=1920",
      thumbnail: "/placeholder.svg?height=84&width=150",
      dateCreated: "March 15, 2023",
      status: "active",
      campaigns: ["Multiple"],
      tags: ["overlay", "stream", "template"],
      performance: {
        uses: 28,
        impressions: 25000,
        clicks: 2750,
        ctr: 11,
      },
    },
    {
      id: 9,
      name: "Product Showcase Template",
      type: "template",
      format: "square",
      dimensions: "1080x1080",
      fileSize: "0.9 MB",
      url: "/placeholder.svg?height=1080&width=1080",
      thumbnail: "/placeholder.svg?height=150&width=150",
      dateCreated: "March 10, 2023",
      status: "active",
      campaigns: ["Multiple"],
      tags: ["product", "showcase", "template"],
      performance: {
        uses: 15,
        impressions: 18000,
        clicks: 1980,
        ctr: 11,
      },
    },
  ],
  performance: {
    topPerforming: [
      {
        id: 1,
        name: "BGMI Banner Ad",
        type: "image",
        impressions: 12500,
        clicks: 1250,
        ctr: 10,
        conversions: 125,
      },
      {
        id: 3,
        name: "Mobile Legends Tournament Poster",
        type: "image",
        impressions: 15000,
        clicks: 1650,
        ctr: 11,
        conversions: 165,
      },
      {
        id: 5,
        name: "BGMI Gameplay Trailer",
        type: "video",
        impressions: 7500,
        clicks: 900,
        ctr: 12,
        conversions: 90,
      },
    ],
    byFormat: [
      { format: "banner", impressions: 12500, clicks: 1250, ctr: 10 },
      { format: "square", impressions: 18300, clicks: 1827, ctr: 10 },
      { format: "portrait", impressions: 15000, clicks: 1650, ctr: 11 },
      { format: "landscape", impressions: 13700, clicks: 1582, ctr: 11.5 },
    ],
    byType: [
      { type: "image", impressions: 36000, clicks: 3665, ctr: 10.2 },
      { type: "video", impressions: 13700, clicks: 1582, ctr: 11.5 },
      { type: "gif", impressions: 9800, clicks: 1176, ctr: 12 },
      { type: "template", impressions: 43000, clicks: 4730, ctr: 11 },
    ],
  },
}

// Creative type icons
const getCreativeTypeIcon = (type: string) => {
  switch (type) {
    case "image":
      return <Image className="h-4 w-4 text-blue-500" />
    case "video":
      return <Video className="h-4 w-4 text-purple-500" />
    case "gif":
      return <Zap className="h-4 w-4 text-amber-500 neon-teal-glow" />
    case "template":
      return <Layers className="h-4 w-4 text-green-500" />
    default:
      return <FileText className="h-4 w-4 text-gray-500" />
  }
}

// Creative status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
          Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-amber-900/30 text-amber-300 border-amber-800">
          Inactive
        </Badge>
      )
    case "archived":
      return (
        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
          Archived
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-800">
          Draft
        </Badge>
      )
  }
}

export function CreativesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showCreateTemplateDialog, setShowCreateTemplateDialog] = useState(false)
  const [selectedCreative, setSelectedCreative] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  // Combine all creatives for the "all" tab
  const allCreatives = [
    ...creativesData.images,
    ...creativesData.videos,
    ...creativesData.gifs,
    ...creativesData.templates,
  ]

  // Filter creatives based on search and filters
  const filterCreatives = (creatives: any[]) => {
    return creatives.filter((creative) => {
      // Search filter
      if (
        searchQuery &&
        !creative.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !creative.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }

      // Type filter
      if (typeFilter !== "all" && creative.type !== typeFilter) {
        return false
      }

      // Format filter
      if (formatFilter !== "all" && creative.format !== formatFilter) {
        return false
      }

      return true
    })
  }

  const filteredAllCreatives = filterCreatives(allCreatives)
  const filteredImages = filterCreatives(creativesData.images)
  const filteredVideos = filterCreatives(creativesData.videos)
  const filteredGifs = filterCreatives(creativesData.gifs)
  const filteredTemplates = filterCreatives(creativesData.templates)

  // Handle creative actions
  const handleDeleteCreative = () => {
    // In a real app, this would delete the creative
    console.log("Delete creative:", selectedCreative?.id)
    setShowDeleteDialog(false)
  }

  const handlePreviewCreative = (creative: any) => {
    setSelectedCreative(creative)
    setShowPreviewDialog(true)
  }

  const handleViewDetails = (creative: any) => {
    setSelectedCreative(creative)
    setShowDetailsDialog(true)
  }

  // Render creative card
  const renderCreativeCard = (creative: any) => {
    if (viewMode === "grid") {
      return (
        <Card
          key={creative.id}
          className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 cyber-grid-bg"
        >
          <div className="relative h-[150px] bg-gray-800 overflow-hidden group">
            <img
              src={creative.thumbnail || "/placeholder.svg"}
              alt={creative.name}
              className="w-full h-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
            />
            {creative.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </div>
              </div>
            )}
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge variant="outline" className="bg-gray-900/80 text-gray-300 border-gray-700 flex items-center gap-1">
                {getCreativeTypeIcon(creative.type)}
                <span className="capitalize">{creative.type}</span>
              </Badge>
            </div>
            <div className="absolute top-2 right-2">{getStatusBadge(creative.status)}</div>
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 hover:bg-gray-700 hover:text-white"
                onClick={() => handlePreviewCreative(creative)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 hover:bg-gray-700 hover:text-white"
                onClick={() => handleViewDetails(creative)}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700 hover:text-white">
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
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedCreative(creative)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-gray-100 truncate">{creative.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-gray-400">
              <Clock className="h-3 w-3" />
              {creative.dateCreated}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {creative.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-gray-400">
              {creative.dimensions} • {creative.fileSize}
              {creative.duration && ` • ${creative.duration}`}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            {creative.campaigns.length > 0 ? (
              <div className="text-xs text-gray-400">
                Used in:{" "}
                <span className="text-gray-300">
                  {creative.campaigns[0]}
                  {creative.campaigns.length > 1 && ` +${creative.campaigns.length - 1} more`}
                </span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">Not used in any campaigns</div>
            )}
          </CardFooter>
        </Card>
      )
    } else {
      return (
        <Card
          key={creative.id}
          className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[150px] h-[150px] md:h-auto bg-gray-800 relative">
              <img
                src={creative.thumbnail || "/placeholder.svg"}
                alt={creative.name}
                className="w-full h-full object-cover opacity-80"
              />
              {creative.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <Badge
                  variant="outline"
                  className="bg-gray-900/80 text-gray-300 border-gray-700 flex items-center gap-1"
                >
                  {getCreativeTypeIcon(creative.type)}
                  <span className="capitalize">{creative.type}</span>
                </Badge>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-100">{creative.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(creative.status)}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {creative.dateCreated}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-700 hover:text-white"
                    onClick={() => handlePreviewCreative(creative)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-700 hover:text-white"
                    onClick={() => handleViewDetails(creative)}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700 hover:text-white"
                      >
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
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-red-400 hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setSelectedCreative(creative)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Dimensions</span>
                  <span className="text-sm text-gray-300">{creative.dimensions}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Format</span>
                  <span className="text-sm text-gray-300 capitalize">{creative.format}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Size</span>
                  <span className="text-sm text-gray-300">{creative.fileSize}</span>
                </div>
                {creative.duration && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <span className="text-sm text-gray-300">{creative.duration}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {creative.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {creative.performance && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Impressions</span>
                    <span className="text-sm stat-value-purple">
                      {creative.performance.impressions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Clicks</span>
                    <span className="text-sm stat-value-blue">{creative.performance.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">CTR</span>
                    <span className="text-sm stat-value-green">{creative.performance.ctr}%</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Conversions</span>
                    <span className="text-sm stat-value-amber">
                      {creative.performance.conversions.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Creatives</h1>
          <p className="text-muted-foreground">Manage your creative assets for campaigns</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowUploadDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button
            onClick={() => setShowCreateTemplateDialog(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search creatives..."
            className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="gif">GIFs</SelectItem>
              <SelectItem value="template">Templates</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="banner">Banner</SelectItem>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
              <SelectItem value="overlay">Overlay</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="text-gray-100">
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
            All
            <Badge variant="secondary" className="ml-1 bg-gray-700 text-gray-100">
              {filteredAllCreatives.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-gray-700">
            Images
            <Badge variant="secondary" className="ml-1 bg-blue-900 text-blue-100">
              {filteredImages.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-gray-700">
            Videos
            <Badge variant="secondary" className="ml-1 bg-purple-900 text-purple-100">
              {filteredVideos.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="gifs" className="data-[state=active]:bg-gray-700">
            GIFs
            <Badge variant="secondary" className="ml-1 bg-amber-900 text-amber-100">
              {filteredGifs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gray-700">
            Templates
            <Badge variant="secondary" className="ml-1 bg-green-900 text-green-100">
              {filteredTemplates.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* All Creatives Tab */}
        <TabsContent value="all">
          <div className="space-y-4">
            {filteredAllCreatives.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <Image className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No creatives found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No creatives match your search criteria. Try adjusting your filters or upload new creatives.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAllCreatives.map((creative) => renderCreativeCard(creative))}
              </div>
            ) : (
              <div className="space-y-4">{filteredAllCreatives.map((creative) => renderCreativeCard(creative))}</div>
            )}
          </div>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images">
          <div className="space-y-4">
            {filteredImages.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <Image className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No images found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No images match your search criteria. Try adjusting your filters or upload new images.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((creative) => renderCreativeCard(creative))}
              </div>
            ) : (
              <div className="space-y-4">{filteredImages.map((creative) => renderCreativeCard(creative))}</div>
            )}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <div className="space-y-4">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <Video className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No videos match your search criteria. Try adjusting your filters or upload new videos.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVideos.map((creative) => renderCreativeCard(creative))}
              </div>
            ) : (
              <div className="space-y-4">{filteredVideos.map((creative) => renderCreativeCard(creative))}</div>
            )}
          </div>
        </TabsContent>

        {/* GIFs Tab */}
        <TabsContent value="gifs">
          <div className="space-y-4">
            {filteredGifs.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <Zap className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No GIFs found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No GIFs match your search criteria. Try adjusting your filters or upload new GIFs.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGifs.map((creative) => renderCreativeCard(creative))}
              </div>
            ) : (
              <div className="space-y-4">{filteredGifs.map((creative) => renderCreativeCard(creative))}</div>
            )}
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <div className="space-y-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                <Layers className="h-12 w-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No templates found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No templates match your search criteria. Try adjusting your filters or create new templates.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTemplates.map((creative) => renderCreativeCard(creative))}
              </div>
            ) : (
              <div className="space-y-4">{filteredTemplates.map((creative) => renderCreativeCard(creative))}</div>
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Top Performing Creatives</CardTitle>
                <CardDescription>Creatives with the highest engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creativesData.performance.topPerforming.map((creative) => (
                    <div key={creative.id} className="flex items-center gap-3 p-2 bg-gray-800 rounded-md">
                      <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center">
                        {getCreativeTypeIcon(creative.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-100">{creative.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {creative.impressions.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            {creative.clicks.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            CTR: {creative.ctr}%
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-700"
                        onClick={() => {
                          const fullCreative = allCreatives.find((c) => c.id === creative.id)
                          if (fullCreative) {
                            handleViewDetails(fullCreative)
                          }
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Performance by Format</CardTitle>
                <CardDescription>CTR comparison across different creative formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creativesData.performance.byFormat.map((format) => (
                    <div key={format.format} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{format.format}</span>
                        <span className="font-medium text-gray-100">
                          CTR: <span className="stat-value-green">{format.ctr}%</span>
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            format.format === "banner"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : format.format === "square"
                                ? "bg-gradient-to-r from-purple-500 to-purple-600"
                                : format.format === "portrait"
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : "bg-gradient-to-r from-amber-500 to-amber-600"
                          }`}
                          style={{ width: `${(format.ctr / 12) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Impressions: {format.impressions.toLocaleString()}</span>
                        <span>Clicks: {format.clicks.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Performance by Type</CardTitle>
                <CardDescription>CTR comparison across different creative types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creativesData.performance.byType.map((type) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{type.type}</span>
                        <span className="font-medium text-gray-100">
                          CTR: <span className="stat-value-green">{type.ctr}%</span>
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            type.type === "image"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : type.type === "video"
                                ? "bg-gradient-to-r from-purple-500 to-purple-600"
                                : type.type === "gif"
                                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                                  : "bg-gradient-to-r from-green-500 to-green-600"
                          }`}
                          style={{ width: `${(type.ctr / 12) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Impressions: {type.impressions.toLocaleString()}</span>
                        <span>Clicks: {type.clicks.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Performance Insights</CardTitle>
                <CardDescription>Key metrics and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-300">Average CTR</div>
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold stat-value-amber">10.8%</div>
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      2.3% above industry average
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-300">Best Format</div>
                      <Star className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold stat-value-purple">Landscape</div>
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                      <ArrowUpRight className="h-3 w-3" />
                      11.5% CTR
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-400 mb-1">Recommendations</h3>
                    <ul className="space-y-2 text-sm text-blue-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          Video creatives are performing 12% better than static images. Consider converting
                          top-performing static ads to video format.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Landscape format has the highest CTR. Prioritize this format for new creatives.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>GIFs have high engagement but are underutilized. Consider creating more GIF assets.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Upload Creative</DialogTitle>
            <DialogDescription className="text-gray-400">
              Upload new creative assets for your campaigns
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="creative-type" className="text-sm font-medium">
                Creative Type
              </label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="gif">GIF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="creative-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="creative-name"
                placeholder="Enter creative name"
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-800/50">
              <Upload className="h-10 w-10 text-gray-500 mb-2" />
              <p className="text-sm text-gray-300 mb-1">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-gray-500">Supports JPG, PNG, GIF, MP4 (Max 50MB)</p>
              <Button variant="outline" className="mt-4 border-gray-700 hover:bg-gray-700">
                Browse Files
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="creative-tags" className="text-sm font-medium">
                Tags
              </label>
              <Input
                id="creative-tags"
                placeholder="Enter tags separated by commas"
                className="bg-gray-800 border-gray-700 text-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Delete Creative</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this creative? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCreative && (
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-md">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img
                  src={selectedCreative.thumbnail || "/placeholder.svg"}
                  alt={selectedCreative.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-100">{selectedCreative.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {selectedCreative.type} • {selectedCreative.format} • {selectedCreative.fileSize}
                </p>
              </div>
            </div>
          )}
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-400 mb-1">Warning</h3>
              <p className="text-sm text-red-300">
                Deleting this creative will remove it from all associated campaigns. This action cannot be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCreative}>
              Delete Creative
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100 max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Creative</DialogTitle>
            <DialogDescription className="text-gray-400">{selectedCreative?.name}</DialogDescription>
          </DialogHeader>
          {selectedCreative && (
            <div className="space-y-4">
              <div className="relative bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-700">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <img
                  src={selectedCreative.url || "/placeholder.svg"}
                  alt={selectedCreative.name}
                  className="max-h-[60vh] object-contain"
                />
                {selectedCreative.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-black/50 flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Type</div>
                  <div className="text-sm font-medium text-gray-100 flex items-center gap-1">
                    {getCreativeTypeIcon(selectedCreative.type)}
                    <span className="capitalize">{selectedCreative.type}</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Format</div>
                  <div className="text-sm font-medium text-gray-100 capitalize">{selectedCreative.format}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Dimensions</div>
                  <div className="text-sm font-medium text-gray-100">{selectedCreative.dimensions}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-md">
                  <div className="text-xs text-muted-foreground">Size</div>
                  <div className="text-sm font-medium text-gray-100">{selectedCreative.fileSize}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedCreative.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setShowPreviewDialog(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={showCreateTemplateDialog} onOpenChange={setShowCreateTemplateDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100 max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Template</DialogTitle>
            <DialogDescription className="text-gray-400">
              Design a reusable template for your campaigns
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="template-name" className="text-sm font-medium">
                    Template Name
                  </label>
                  <Input
                    id="template-name"
                    placeholder="Enter template name"
                    className="bg-gray-800 border-gray-700 text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="template-format" className="text-sm font-medium">
                    Format
                  </label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                      <SelectItem value="banner">Banner (1200x300)</SelectItem>
                      <SelectItem value="square">Square (1080x1080)</SelectItem>
                      <SelectItem value="portrait">Portrait (1080x1350)</SelectItem>
                      <SelectItem value="landscape">Landscape (1920x1080)</SelectItem>
                      <SelectItem value="overlay">Stream Overlay (1920x1080)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="template-tags" className="text-sm font-medium">
                    Tags
                  </label>
                  <Input
                    id="template-tags"
                    placeholder="Enter tags separated by commas"
                    className="bg-gray-800 border-gray-700 text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Background</label>
                  <div className="grid grid-cols-6 gap-2">
                    {["#000000", "#1E1E2E", "#4A4A4A", "#6B46C1", "#2563EB", "#059669"].map((color, index) => (
                      <div
                        key={index}
                        className="h-8 w-full rounded-md cursor-pointer border border-gray-700"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Color</label>
                  <div className="grid grid-cols-6 gap-2">
                    {["#FFFFFF", "#E5E5E5", "#A3A3A3", "#D8B4FE", "#93C5FD", "#6EE7B7"].map((color, index) => (
                      <div
                        key={index}
                        className="h-8 w-full rounded-md cursor-pointer border border-gray-700"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Accent Color</label>
                  <div className="grid grid-cols-6 gap-2">
                    {["#F43F5E", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"].map((color, index) => (
                      <div
                        key={index}
                        className="h-8 w-full rounded-md cursor-pointer border border-gray-700"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Effects</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-700 flex items-center gap-1"
                    >
                      <Zap className="h-3 w-3" />
                      Neon Glow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-700 flex items-center gap-1"
                    >
                      <Layers className="h-3 w-3" />
                      Cyber Grid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-700 flex items-center gap-1"
                    >
                      <Palette className="h-3 w-3" />
                      Gradient
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 rounded-md p-4 border border-gray-700 h-[400px] flex items-center justify-center relative">
                  <div className="absolute inset-0 cyber-grid-bg opacity-30"></div>
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-bold gaming-gradient-text shadow-neon-purple">Template Preview</h3>
                    <p className="text-gray-300 mt-2">Customize your template in the editor</p>
                    <div className="mt-4 flex justify-center">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Call to Action
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Elements</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-700 justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Text
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-700 justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-700 justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Shape
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-700 justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Button
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Opacity</label>
                  <Slider defaultValue={[100]} max={100} step={1} className="py-4" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Border Radius</label>
                  <Slider defaultValue={[8]} max={20} step={1} className="py-4" />
                </div>

                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p>
                      Templates can be reused across multiple campaigns. Create dynamic placeholders for text and images
                      that can be customized for each campaign.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateTemplateDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Creative Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100 max-w-4xl">
          <DialogHeader>
            <DialogTitle>Creative Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed information and analytics for {selectedCreative?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCreative && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <div className="bg-gray-800 rounded-md overflow-hidden">
                    <img
                      src={selectedCreative.url || "/placeholder.svg"}
                      alt={selectedCreative.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                    <h3 className="text-sm font-medium mb-3">Creative Information</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-gray-400">Type:</div>
                      <div className="text-gray-100 capitalize">{selectedCreative.type}</div>
                      <div className="text-gray-400">Format:</div>
                      <div className="text-gray-100 capitalize">{selectedCreative.format}</div>
                      <div className="text-gray-400">Dimensions:</div>
                      <div className="text-gray-100">{selectedCreative.dimensions}</div>
                      <div className="text-gray-400">File Size:</div>
                      <div className="text-gray-100">{selectedCreative.fileSize}</div>
                      {selectedCreative.duration && (
                        <>
                          <div className="text-gray-400">Duration:</div>
                          <div className="text-gray-100">{selectedCreative.duration}</div>
                        </>
                      )}
                      <div className="text-gray-400">Created:</div>
                      <div className="text-gray-100">{selectedCreative.dateCreated}</div>
                      <div className="text-gray-400">Status:</div>
                      <div className="text-gray-100">{getStatusBadge(selectedCreative.status)}</div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                    <h3 className="text-sm font-medium mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCreative.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                    <h3 className="text-sm font-medium mb-3">Used in Campaigns</h3>
                    {selectedCreative.campaigns.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCreative.campaigns.map((campaign: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                            <span className="text-sm text-gray-100">{campaign}</span>
                            <Button size="sm" variant="outline" className="h-7 border-gray-600 hover:bg-gray-600">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">Not used in any campaigns</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedCreative.performance && (
                <div className="bg-gray-800 rounded-md p-4 border border-gray-700">
                  <h3 className="text-sm font-medium mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">Impressions</div>
                      <div className="text-lg font-medium stat-value-purple">
                        {selectedCreative.performance.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">Clicks</div>
                      <div className="text-lg font-medium stat-value-blue">
                        {selectedCreative.performance.clicks.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">CTR</div>
                      <div className="text-lg font-medium stat-value-green">{selectedCreative.performance.ctr}%</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">Conversions</div>
                      <div className="text-lg font-medium stat-value-amber">
                        {selectedCreative.performance.conversions.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {selectedCreative.performance.completionRate && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Video Completion Rate</span>
                        <span className="font-medium text-gray-100">
                          {selectedCreative.performance.completionRate}%
                        </span>
                      </div>
                      <Progress value={selectedCreative.performance.completionRate} className="h-2 bg-gray-700" />
                    </div>
                  )}

                  {selectedCreative.type === "template" && selectedCreative.performance.uses && (
                    <div className="mt-4 bg-green-900/20 border border-green-800 rounded-lg p-3 flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="text-sm text-green-300">
                        <p>
                          This template has been used {selectedCreative.performance.uses} times across multiple
                          campaigns, generating a total of {selectedCreative.performance.impressions.toLocaleString()}{" "}
                          impressions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-700"
                  onClick={() => handlePreviewCreative(selectedCreative)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setShowDetailsDialog(false)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

