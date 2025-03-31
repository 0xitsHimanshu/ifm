"use client"

import { useState } from "react"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  BarChart3,
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Trophy,
  Star,
  Info,
  AlertCircle,
  CheckCircle,
  Lock,
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

// Sample wallet data
const walletData = {
  gloCoins: 12450,
  bloCoins: 3800,
  pendingEarnings: 1250,
  stakingRewards: 320,
  referralBonus: 150,
  totalEarned: 24680,
  weeklyChange: 16.8,
  monthlyChange: 32.5,
  nextPayout: "April 15, 2023",
  transactions: [
    {
      id: 1,
      type: "earning",
      campaign: "BGMI Blitz Promotion",
      amount: 750,
      currency: "gloCoins",
      date: "April 5, 2023",
      status: "completed",
    },
    {
      id: 2,
      type: "deposit",
      amount: 1000,
      currency: "bloCoins",
      date: "April 3, 2023",
      status: "completed",
      txHash: "0x8a7d...3f9b",
    },
    {
      id: 3,
      type: "withdrawal",
      amount: 2500,
      currency: "gloCoins",
      date: "March 28, 2023",
      status: "completed",
      txHash: "0x3e5f...8c2d",
    },
    {
      id: 4,
      type: "earning",
      campaign: "Mobile Legends Tournament",
      amount: 1500,
      currency: "gloCoins",
      date: "March 25, 2023",
      status: "completed",
    },
    {
      id: 5,
      type: "staking",
      amount: 320,
      currency: "bloCoins",
      date: "March 22, 2023",
      status: "completed",
    },
    {
      id: 6,
      type: "referral",
      amount: 150,
      currency: "gloCoins",
      referral: "user123",
      date: "March 20, 2023",
      status: "completed",
    },
    {
      id: 7,
      type: "earning",
      campaign: "Gaming Chair Promotion",
      amount: 3000,
      currency: "gloCoins",
      date: "March 18, 2023",
      status: "pending",
    },
  ],
  stakingPlans: [
    {
      id: 1,
      name: "Basic Staking",
      duration: 30,
      apy: 5,
      minAmount: 500,
      description: "Lock your Blo-Coins for 30 days and earn 5% APY",
      benefits: ["Early access to campaigns", "5% bonus on campaign earnings"],
    },
    {
      id: 2,
      name: "Pro Staking",
      duration: 90,
      apy: 12,
      minAmount: 2000,
      description: "Lock your Blo-Coins for 90 days and earn 12% APY",
      benefits: ["Priority campaign access", "12% bonus on campaign earnings", "Weekly energy pack bonus"],
    },
    {
      id: 3,
      name: "Elite Staking",
      duration: 180,
      apy: 20,
      minAmount: 5000,
      description: "Lock your Blo-Coins for 180 days and earn 20% APY",
      benefits: [
        "Exclusive campaign access",
        "20% bonus on campaign earnings",
        "Daily energy pack bonus",
        "Automatic level-up after staking period",
      ],
    },
  ],
  activeStakes: [
    {
      id: 1,
      plan: "Basic Staking",
      amount: 1000,
      startDate: "March 1, 2023",
      endDate: "March 31, 2023",
      earned: 41.67,
      status: "active",
    },
  ],
  earningsByMonth: [
    { month: "Jan", gloCoins: 1800, bloCoins: 360 },
    { month: "Feb", gloCoins: 2200, bloCoins: 440 },
    { month: "Mar", gloCoins: 3500, bloCoins: 700 },
    { month: "Apr", gloCoins: 1500, bloCoins: 300 },
  ],
  earningsByCategory: [
    { category: "Gaming", percentage: 65 },
    { category: "Hardware", percentage: 20 },
    { category: "Food & Beverage", percentage: 10 },
    { category: "Sports", percentage: 5 },
  ],
}

// Transaction type icons
const getTransactionIcon = (type: string) => {
  switch (type) {
    case "earning":
      return <Trophy className="h-4 w-4 text-green-500" />
    case "deposit":
      return <ArrowDownLeft className="h-4 w-4 text-blue-500" />
    case "withdrawal":
      return <ArrowUpRight className="h-4 w-4 text-amber-500" />
    case "staking":
      return <Lock className="h-4 w-4 text-purple-500" />
    case "referral":
      return <Star className="h-4 w-4 text-pink-500" />
    default:
      return <Wallet className="h-4 w-4 text-gray-500" />
  }
}

// Transaction status badges
const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
          Completed
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
          Processing
        </Badge>
      )
  }
}

export function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showDepositDialog, setShowDepositDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [showStakeDialog, setShowStakeDialog] = useState(false)
  const [selectedStakingPlan, setSelectedStakingPlan] = useState<any>(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")
  const [withdrawCurrency, setWithdrawCurrency] = useState("gloCoins")
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(null)

  // Toggle transaction details
  const toggleTransactionDetails = (id: number) => {
    if (expandedTransaction === id) {
      setExpandedTransaction(null)
    } else {
      setExpandedTransaction(id)
    }
  }

  // Handle deposit
  const handleDeposit = () => {
    // In a real app, this would handle the deposit process
    setShowDepositDialog(false)
    setDepositAmount("")
  }

  // Handle withdrawal
  const handleWithdraw = () => {
    // In a real app, this would handle the withdrawal process
    setShowWithdrawDialog(false)
    setWithdrawAmount("")
  }

  // Handle staking
  const handleStake = () => {
    // In a real app, this would handle the staking process
    setShowStakeDialog(false)
    setStakeAmount("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings, deposits, and withdrawals</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowDepositDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Deposit
          </Button>
          <Button
            onClick={() => setShowWithdrawDialog(true)}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="text-gray-100">
        <TabsList className="mb-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-gray-700">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="staking" className="data-[state=active]:bg-gray-700">
            Staking
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 cyber-grid-bg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Glo-Coins</CardTitle>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  <span className="stat-value-amber">{walletData.gloCoins.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">+{walletData.weeklyChange}% from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 cyber-grid-bg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Blo-Coins</CardTitle>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">B</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  <span className="stat-value-blue">{walletData.bloCoins.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Available for staking and deposits</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 cyber-grid-bg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Pending Earnings</CardTitle>
                <Clock className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  <span className="stat-value-purple">{walletData.pendingEarnings.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Next payout: {walletData.nextPayout}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 cyber-grid-bg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Total Earned</CardTitle>
                <Trophy className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  <span className="stat-value-amber">{walletData.totalEarned.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Lifetime earnings (Glo-Coins)</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Recent Transactions</CardTitle>
                <CardDescription>Your latest activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {walletData.transactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-gray-700 flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">
                          {transaction.type === "earning"
                            ? transaction.campaign
                            : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <div
                          className={`h-4 w-4 rounded-full ${
                            transaction.currency === "gloCoins"
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "bg-gradient-to-r from-blue-400 to-blue-600"
                          } flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-[8px]">
                            {transaction.currency === "gloCoins" ? "G" : "B"}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            transaction.currency === "gloCoins" ? "stat-value-amber" : "stat-value-blue"
                          }`}
                        >
                          {transaction.amount.toLocaleString()}
                        </span>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100"
                  onClick={() => setActiveTab("transactions")}
                >
                  View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Earnings Breakdown</CardTitle>
                <CardDescription>Your earnings by source</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Campaign Earnings</span>
                    <span className="font-medium stat-value-amber">
                      {(walletData.totalEarned * 0.85).toLocaleString()} ({85}%)
                    </span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-700" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Staking Rewards</span>
                    <span className="font-medium stat-value-purple">
                      {walletData.stakingRewards.toLocaleString()} (
                      {Math.round((walletData.stakingRewards / walletData.totalEarned) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(walletData.stakingRewards / walletData.totalEarned) * 100}
                    className="h-2 bg-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Referral Bonuses</span>
                    <span className="font-medium stat-value-blue">
                      {walletData.referralBonus.toLocaleString()} (
                      {Math.round((walletData.referralBonus / walletData.totalEarned) * 100)}%)
                    </span>
                  </div>
                  <Progress
                    value={(walletData.referralBonus / walletData.totalEarned) * 100}
                    className="h-2 bg-gray-700"
                  />
                </div>

                <div className="mt-4 bg-blue-900/20 border border-blue-800 rounded-lg p-3 flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p>Stake your Blo-Coins to earn passive income and unlock exclusive campaign opportunities.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100"
                  onClick={() => setActiveTab("staking")}
                >
                  Explore Staking Options <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Transaction History</CardTitle>
              <CardDescription>View all your transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {walletData.transactions.map((transaction) => (
                <div key={transaction.id} className="bg-gray-800 rounded-md overflow-hidden">
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700"
                    onClick={() => toggleTransactionDetails(transaction.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">
                          {transaction.type === "earning"
                            ? transaction.campaign
                            : transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-4 w-4 rounded-full ${
                              transaction.currency === "gloCoins"
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                : "bg-gradient-to-r from-blue-400 to-blue-600"
                            } flex items-center justify-center`}
                          >
                            <span className="text-white font-bold text-[8px]">
                              {transaction.currency === "gloCoins" ? "G" : "B"}
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              transaction.currency === "gloCoins" ? "stat-value-amber" : "stat-value-blue"
                            }`}
                          >
                            {transaction.amount.toLocaleString()}
                          </span>
                        </div>
                        {getStatusBadge(transaction.status)}
                      </div>
                      {expandedTransaction === transaction.id ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {expandedTransaction === transaction.id && (
                    <div className="p-3 bg-gray-700 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Transaction Type</p>
                          <p className="text-gray-100 capitalize">{transaction.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Status</p>
                          <p className="text-gray-100 capitalize">{transaction.status}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Date</p>
                          <p className="text-gray-100">{transaction.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Amount</p>
                          <p className="text-gray-100">
                            {transaction.amount.toLocaleString()}{" "}
                            {transaction.currency === "gloCoins" ? "Glo-Coins" : "Blo-Coins"}
                          </p>
                        </div>
                        {transaction.txHash && (
                          <div className="col-span-2">
                            <p className="text-gray-400">Transaction Hash</p>
                            <p className="text-gray-100 font-mono text-xs">{transaction.txHash}</p>
                          </div>
                        )}
                        {transaction.campaign && (
                          <div className="col-span-2">
                            <p className="text-gray-400">Campaign</p>
                            <p className="text-gray-100">{transaction.campaign}</p>
                          </div>
                        )}
                        {transaction.referral && (
                          <div className="col-span-2">
                            <p className="text-gray-400">Referred User</p>
                            <p className="text-gray-100">{transaction.referral}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value="staking">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {walletData.stakingPlans.map((plan) => (
              <Card key={plan.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">APY</div>
                    <div className="text-xl font-bold stat-value-purple">{plan.apy}%</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">Duration</div>
                    <div className="text-sm font-medium text-gray-100">{plan.duration} days</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-300">Minimum</div>
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-[8px]">B</span>
                      </div>
                      <span className="text-sm font-medium stat-value-blue">{plan.minAmount}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">Benefits:</div>
                    <ul className="space-y-1">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => {
                      setSelectedStakingPlan(plan)
                      setShowStakeDialog(true)
                    }}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Stake Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {walletData.activeStakes.length > 0 && (
            <Card className="mt-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Your Active Stakes</CardTitle>
                <CardDescription>Currently staked Blo-Coins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {walletData.activeStakes.map((stake) => (
                  <div key={stake.id} className="bg-gray-800 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-100">{stake.plan}</p>
                          <p className="text-xs text-muted-foreground">
                            Started: {stake.startDate} • Ends: {stake.endDate}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Staked Amount</span>
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">B</span>
                          </div>
                          <span className="font-medium stat-value-blue">{stake.amount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Earned So Far</span>
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">B</span>
                          </div>
                          <span className="font-medium stat-value-blue">{stake.earned.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Time Remaining</span>
                        <span className="font-medium text-gray-100">14 days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Monthly Earnings</CardTitle>
                <CardDescription>Your earnings over the past 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {walletData.earningsByMonth.map((data) => (
                    <div key={data.month} className="flex flex-col items-center gap-2 w-full">
                      <div className="w-full flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-sm"
                          style={{
                            height: `${(data.gloCoins / 4000) * 200}px`,
                            maxHeight: "200px",
                          }}
                        ></div>
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm"
                          style={{
                            height: `${(data.bloCoins / 800) * 200}px`,
                            maxHeight: "200px",
                          }}
                        ></div>
                      </div>
                      <div className="text-xs font-medium text-gray-300">{data.month}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm"></div>
                    <span className="text-xs text-gray-300">Glo-Coins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm"></div>
                    <span className="text-xs text-gray-300">Blo-Coins</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Earnings by Category</CardTitle>
                <CardDescription>Distribution of earnings across campaign categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {walletData.earningsByCategory.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{category.category}</span>
                        <span className="font-medium text-gray-100">{category.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            category.category === "Gaming"
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : category.category === "Hardware"
                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                : category.category === "Food & Beverage"
                                  ? "bg-gradient-to-r from-purple-500 to-purple-600"
                                  : "bg-gradient-to-r from-amber-500 to-amber-600"
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-400 mb-1">Earnings Insight</h3>
                    <p className="text-sm text-blue-300">
                      Gaming campaigns provide the highest earnings. Consider focusing on this category to maximize your
                      revenue.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Performance Metrics</CardTitle>
              <CardDescription>Key metrics to track your earnings performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-300">Average Earnings per Campaign</div>
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold stat-value-amber">1,850</div>
                  <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    12% increase from last month
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-300">Campaigns Completed</div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold stat-value-green">12</div>
                  <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />3 more than last month
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-300">Conversion Rate</div>
                    <Zap className="h-5 w-5 text-purple-500 neon-teal-glow" />
                  </div>
                  <div className="text-2xl font-bold stat-value-purple">85%</div>
                  <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    5% increase from last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Deposit Blo-Coins</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add Blo-Coins to your wallet for staking and campaign deposits
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="deposit-amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="bg-gray-800 border-gray-700 text-gray-100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">B</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p>
                  Blo-Coins are used for staking and campaign deposits. They can be purchased with cryptocurrency or
                  earned through campaigns.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDepositDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeposit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={!depositAmount || Number(depositAmount) <= 0}
            >
              Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Withdraw Coins</DialogTitle>
            <DialogDescription className="text-gray-400">
              Withdraw your earnings to your connected wallet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="withdraw-currency" className="text-sm font-medium">
                Currency
              </label>
              <Select value={withdrawCurrency} onValueChange={setWithdrawCurrency}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                  <SelectItem value="gloCoins">Glo-Coins</SelectItem>
                  <SelectItem value="bloCoins">Blo-Coins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="withdraw-amount" className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="bg-gray-800 border-gray-700 text-gray-100"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      withdrawCurrency === "gloCoins"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                        : "bg-gradient-to-r from-blue-400 to-blue-600"
                    } flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-[8px]">
                      {withdrawCurrency === "gloCoins" ? "G" : "B"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Available:{" "}
                {withdrawCurrency === "gloCoins"
                  ? walletData.gloCoins.toLocaleString()
                  : walletData.bloCoins.toLocaleString()}{" "}
                {withdrawCurrency === "gloCoins" ? "Glo-Coins" : "Blo-Coins"}
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-800 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm text-amber-300">
                <p>
                  Withdrawals may take up to 24 hours to process. A small network fee may be applied to your withdrawal.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowWithdrawDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              disabled={
                !withdrawAmount ||
                Number(withdrawAmount) <= 0 ||
                Number(withdrawAmount) > (withdrawCurrency === "gloCoins" ? walletData.gloCoins : walletData.bloCoins)
              }
            >
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stake Dialog */}
      <Dialog open={showStakeDialog} onOpenChange={setShowStakeDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle>Stake Blo-Coins</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedStakingPlan?.description || "Lock your Blo-Coins to earn passive income"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-800 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">Plan</div>
                <div className="text-sm font-medium text-gray-100">{selectedStakingPlan?.name}</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">Duration</div>
                <div className="text-sm font-medium text-gray-100">{selectedStakingPlan?.duration} days</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-300">APY</div>
                <div className="text-sm font-medium stat-value-purple">{selectedStakingPlan?.apy}%</div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="stake-amount" className="text-sm font-medium">
                Amount to Stake
              </label>
              <div className="relative">
                <Input
                  id="stake-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="bg-gray-800 border-gray-700 text-gray-100"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">B</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Available: {walletData.bloCoins.toLocaleString()} Blo-Coins
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">Minimum Stake</div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">B</span>
                  </div>
                  <span className="text-sm font-medium stat-value-blue">
                    {selectedStakingPlan?.minAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-300">Estimated Earnings</div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">B</span>
                  </div>
                  <span className="text-sm font-medium stat-value-blue">
                    {stakeAmount
                      ? Math.round(
                          (Number(stakeAmount) *
                            (selectedStakingPlan?.apy || 0) *
                            (selectedStakingPlan?.duration || 0)) /
                            36500,
                        ).toLocaleString()
                      : "0"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-300">Lock Period Ends</div>
                <div className="text-sm font-medium text-gray-100">
                  {new Date(
                    new Date().getTime() + (selectedStakingPlan?.duration || 0) * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p>
                  Staked Blo-Coins are locked for the duration of the staking period. Early unstaking is not available.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStakeDialog(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStake}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={
                !stakeAmount ||
                Number(stakeAmount) <= 0 ||
                Number(stakeAmount) < (selectedStakingPlan?.minAmount || 0) ||
                Number(stakeAmount) > walletData.bloCoins
              }
            >
              Stake Blo-Coins
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

