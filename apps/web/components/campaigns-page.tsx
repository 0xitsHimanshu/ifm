"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Filter,
  LineChart,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Tag,
  Trash2,
  Trophy,
  Users,
  Zap,
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
import { campaignsApi, Campaign } from "@/lib/api-client"

// Sample campaign data
const campaignData = {
  activeCampaigns: [
    {
      id: 1,
      name: "BGMI Blitz Promotion",
      status: "active",
      type: "CPI",
      startDate: "April 1, 2023",
      endDate: "April 10, 2023",
      budget: 1500,
      spent: 750,
      impressions: 12500,
      clicks: 1250,
      conversions: 125,
      ctr: 10,
      cvr: 10,
      cpi: 6,
      earnings: 750,
      category: "Gaming",
      advertiser: "GameBlitz Inc.",
      description: "Promote BGMI during your streams to attract new players.",
      requirements: {
        impressions: 25000,
        streamHours: 5,
        mentionCount: 3,
      },
      progress: 50,
    },
    {
      id: 2,
      name: "Mobile Legends Tournament",
      status: "active",
      type: "CPI",
      startDate: "April 5, 2023",
      endDate: "April 15, 2023",
      budget: 3000,
      spent: 1500,
      impressions: 25000,
      clicks: 2750,
      conversions: 275,
      ctr: 11,
      cvr: 10,
      cpi: 5.45,
      earnings: 1500,
      category: "Gaming",
      advertiser: "MobileMasters",
      description: "Promote the upcoming Mobile Legends tournament during your streams.",
      requirements: {
        impressions: 50000,
        streamHours: 8,
        mentionCount: 5,
      },
      progress: 50,
    },
    {
      id: 3,
      name: "Gaming Chair Promotion",
      status: "paused",
      type: "CPA",
      startDate: "March 25, 2023",
      endDate: "April 22, 2023",
      budget: 6000,
      spent: 1500,
      impressions: 15000,
      clicks: 1200,
      conversions: 50,
      ctr: 8,
      cvr: 4.17,
      cpi: 30,
      earnings: 1500,
      category: "Hardware",
      advertiser: "ComfortGaming",
      description: "Promote our ergonomic gaming chair. Mention key features and comfort benefits.",
      requirements: {
        impressions: 60000,
        streamHours: 10,
        mentionCount: 8,
        productDemo: true,
      },
      progress: 25,
    },
  ],
  pendingCampaigns: [
    {
      id: 4,
      name: "Gaming Energy Drink",
      status: "pending",
      type: "CPI",
      startDate: "April 15, 2023",
      endDate: "April 25, 2023",
      budget: 10000,
      category: "Food & Beverage",
      advertiser: "PowerUp Drinks",
      description: "Promote our energy drink designed for gamers. Must show product on stream.",
      requirements: {
        impressions: 100000,
        streamHours: 15,
        mentionCount: 10,
        productDemo: true,
      },
    },
  ],
  completedCampaigns: [
    {
      id: 5,
      name: "Indie Game Launch",
      status: "completed",
      type: "CPI",
      startDate: "March 10, 2023",
      endDate: "March 18, 2023",
      budget: 2400,
      spent: 2400,
      impressions: 30000,
      clicks: 3600,
      conversions: 300,
      ctr: 12,
      cvr: 8.33,
      cpi: 8,
      earnings: 2400,
      category: "Gaming",
      advertiser: "IndieDevs Studio",
      description: "Help promote our indie game launch. Must play the game for at least 30 minutes.",
      requirements: {
        impressions: 30000,
        streamHours: 6,
        mentionCount: 4,
        gameplayMinutes: 30,
      },
      progress: 100,
    },
    {
      id: 6,
      name: "Gaming Headset Promo",
      status: "completed",
      type: "CPA",
      startDate: "March 1, 2023",
      endDate: "March 20, 2023",
      budget: 4000,
      spent: 4000,
      impressions: 45000,
      clicks: 4950,
      conversions: 200,
      ctr: 11,
      cvr: 4.04,
      cpi: 20,
      earnings: 4000,
      category: "Hardware",
      advertiser: "TechGear",
      description: "Promote our new gaming headset. Provide a review of features during stream.",
      requirements: {
        impressions: 45000,
        streamHours: 8,
        mentionCount: 6,
        productReview: true,
      },
      progress: 100,
    },
  ],
  campaignPerformance: {
    daily: [
      { date: "Apr 1", impressions: 5000, clicks: 500, conversions: 50, earnings: 300 },
      { date: "Apr 2", impressions: 5500, clicks: 550, conversions: 55, earnings: 330 },
      { date: "Apr 3", impressions: 6000, clicks: 660, conversions: 66, earnings: 396 },
      { date: "Apr 4", impressions: 5800, clicks: 638, conversions: 64, earnings: 384 },
      { date: "Apr 5", impressions: 6200, clicks: 682, conversions: 68, earnings: 408 },
      { date: "Apr 6", impressions: 6500, clicks: 715, conversions: 72, earnings: 432 },
      { date: "Apr 7", impressions: 7000, clicks: 770, conversions: 77, earnings: 462 },
    ],
    categories: [
      { category: "Gaming", percentage: 65, earnings: 5525 },
      { category: "Hardware", percentage: 25, earnings: 2125 },
      { category: "Food & Beverage", percentage: 10, earnings: 850 },
    ],
    platforms: [
      { platform: "Twitch", percentage: 55, earnings: 4675 },
      { platform: "YouTube", percentage: 30, earnings: 2550 },
      { platform: "TikTok", percentage: 15, earnings: 1275 },
    ],
  },
  campaignTemplates: [
    {
      id: 1,
      name: "Standard Gaming Promotion",
      type: "CPI",
      description: "Basic template for promoting games during streams",
      requirements: {
        impressions: 25000,
        streamHours: 5,
        mentionCount: 3,
      },
    },
    {
      id: 2,
      name: "Product Review Campaign",
      type: "CPA",
      description: "Template for reviewing gaming products on stream",
      requirements: {
        impressions: 40000,
        streamHours: 8,
        mentionCount: 6,
        productReview: true,
      },
    },
    {
      id: 3,
      name: "Tournament Promotion",
      type: "CPI",
      description: "Template for promoting gaming tournaments",
      requirements: {
        impressions: 50000,
        streamHours: 10,
        mentionCount: 5,
        participationRequired: true,
      },
    },
  ],
}

const getStatusBadge = (status: string) => {
  const variants = {
    active: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

      return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
  );
};

const getTypeBadge = (type: string) => {
      return (
    <Badge variant="outline" className="ml-2">
          {type}
        </Badge>
  );
};

const getCategoryIcon = (category: string) => {
  const icons = {
    Gaming: <Trophy className="h-4 w-4" />,
    Hardware: <Shield className="h-4 w-4" />,
    "Food & Beverage": <Zap className="h-4 w-4" />,
  };

  return icons[category as keyof typeof icons] || <Tag className="h-4 w-4" />;
};

export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // TODO: Replace with actual user ID from auth context
        const userId = "demo-user-id";
        const data = await campaignsApi.getAll(userId);
        setCampaigns(data);
      } catch (err) {
        setError("Failed to fetch campaigns. Please try again later.");
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const toggleCampaignDetails = (id: string) => {
    setExpandedCampaigns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filterCampaigns = (campaigns: Campaign[]) => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      const matchesType = typeFilter === "all" || campaign.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesType && matchesCategory;
    });
  };

  const handlePauseCampaign = async (campaign: Campaign) => {
    try {
      await campaignsApi.update(campaign.id, { status: "paused" });
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, status: "paused" } : c
      ));
    } catch (err) {
      console.error("Error pausing campaign:", err);
    }
  };

  const handleResumeCampaign = async (campaign: Campaign) => {
    try {
      await campaignsApi.update(campaign.id, { status: "active" });
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, status: "active" } : c
      ));
    } catch (err) {
      console.error("Error resuming campaign:", err);
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;
    
    try {
      await campaignsApi.delete(campaignToDelete.id);
      setCampaigns(prev => prev.filter(c => c.id !== campaignToDelete.id));
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    } catch (err) {
      console.error("Error deleting campaign:", err);
    }
  };

  const renderCampaignCard = (campaign: Campaign) => {
    const isExpanded = expandedCampaigns.has(campaign.id);
    
    return (
      <Card key={campaign.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  {getStatusBadge(campaign.status)}
                  {getTypeBadge(campaign.type)}
                </div>
            <div className="flex items-center space-x-2">
              {campaign.status === "active" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePauseCampaign(campaign)}
                >
                  <Pause className="h-4 w-4" />
                </Button>
              )}
              {campaign.status === "paused" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleResumeCampaign(campaign)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toggleCampaignDetails(campaign.id)}>
                    {isExpanded ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                    {isExpanded ? "Hide Details" : "Show Details"}
                    </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCampaignToDelete(campaign)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
                  <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <div className="flex items-center space-x-1">
                {getCategoryIcon(campaign.category)}
                <span>{campaign.category}</span>
                    </div>
                  </div>
                  <div>
              <p className="text-sm text-muted-foreground">Advertiser</p>
              <p>{campaign.advertiser}</p>
                  </div>
                  <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p>${campaign.budget}</p>
                  </div>
                  <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p>{campaign.startDate} - {campaign.endDate}</p>
                    </div>
            </div>

          {isExpanded && (
            <div className="mt-4 space-y-4">
                <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{campaign.description}</p>
                </div>
                <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <ul className="list-disc list-inside">
                  <li>{campaign.requirements.impressions.toLocaleString()} impressions</li>
                  <li>{campaign.requirements.streamHours} stream hours</li>
                  <li>{campaign.requirements.mentionCount} mentions</li>
                  {campaign.requirements.productDemo && <li>Product demo required</li>}
                  {campaign.requirements.gameplayMinutes && (
                    <li>{campaign.requirements.gameplayMinutes} minutes of gameplay</li>
                  )}
                  {campaign.requirements.productReview && <li>Product review required</li>}
                </ul>
                      </div>
              {campaign.spent !== undefined && (
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <Progress value={(campaign.spent / campaign.budget) * 100} className="mt-2" />
                  <p className="text-sm mt-1">
                    ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                  </p>
                      </div>
                    )}
              {campaign.impressions !== undefined && (
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                    <p>{campaign.impressions.toLocaleString()}</p>
                      </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clicks</p>
                    <p>{campaign.clicks?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p>{campaign.conversions?.toLocaleString()}</p>
                </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Earnings</p>
                    <p>${campaign.earnings?.toLocaleString()}</p>
                      </div>
                </div>
              )}
          </div>
        )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const filteredCampaigns = filterCampaigns(campaigns);
  const activeCampaigns = filteredCampaigns.filter(c => c.status === "active");
  const pendingCampaigns = filteredCampaigns.filter(c => c.status === "pending");
  const completedCampaigns = filteredCampaigns.filter(c => c.status === "completed");

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
            </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
          <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CPI">CPI</SelectItem>
              <SelectItem value="CPA">CPA</SelectItem>
            </SelectContent>
          </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
                      </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Hardware">Hardware</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeCampaigns.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCampaigns.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCampaigns.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCampaigns.map(renderCampaignCard)}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingCampaigns.map(renderCampaignCard)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedCampaigns.map(renderCampaignCard)}
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCampaign}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                    </div>
  );
}

