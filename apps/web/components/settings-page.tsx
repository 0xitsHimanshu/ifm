"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Bell,
  Shield,
  Palette,
  Wallet,
  Globe,
  HardDrive,
  Zap,
  Save,
  X,
  Check,
  AlertTriangle,
  Lock,
  Download,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [showLogoutAllDevicesDialog, setShowLogoutAllDevicesDialog] = useState(false)
  const [showResetSettingsDialog, setShowResetSettingsDialog] = useState(false)
  const [showExportDataDialog, setShowExportDataDialog] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false)
  const [showSavedChangesAlert, setShowSavedChangesAlert] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  // Mock user data
  const userData = {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    username: "AaravSharma",
    avatar: "/placeholder.svg?height=128&width=128",
    phone: "+91 98765 43210",
    twoFactorEnabled: true,
    language: "English",
    timezone: "Asia/Kolkata (GMT+5:30)",
    theme: "dark",
    accentColor: "cyber-teal",
    fontScale: 100,
    animationsEnabled: true,
    soundEffects: true,
    notificationVolume: 70,
    autoplayVideos: false,
    highQualityRendering: true,
    dataUsageOptimization: "balanced",
    notifications: {
      email: {
        campaigns: true,
        marketplace: true,
        wallet: true,
        system: true,
        marketing: false,
      },
      push: {
        campaigns: true,
        marketplace: true,
        wallet: true,
        system: true,
        marketing: false,
      },
      inApp: {
        campaigns: true,
        marketplace: true,
        wallet: true,
        system: true,
        marketing: false,
        sounds: true,
      },
    },
    privacy: {
      profileVisibility: "public",
      activityStatus: "online",
      campaignParticipationVisibility: "followers",
      walletBalanceVisibility: "private",
      dataSharing: {
        analytics: true,
        thirdParty: false,
        advertisers: false,
      },
    },
    devices: [
      {
        name: "Windows PC",
        browser: "Chrome",
        lastActive: "Now",
        location: "Mumbai, India",
        current: true,
      },
      {
        name: "iPhone 13",
        browser: "Safari",
        lastActive: "1 day ago",
        location: "Mumbai, India",
        current: false,
      },
    ],
    walletSettings: {
      defaultCurrency: "INR",
      autoConvert: false,
      paymentMethods: [
        {
          type: "bank",
          name: "HDFC Bank",
          accountNumber: "XXXX-XXXX-4567",
          primary: true,
        },
        {
          type: "upi",
          name: "Google Pay",
          accountNumber: "aarav@upi",
          primary: false,
        },
      ],
      autoPayouts: true,
      minimumPayout: 5000,
      payoutFrequency: "monthly",
    },
  }

  // Form states
  const [accountForm, setAccountForm] = useState({
    name: userData.name,
    email: userData.email,
    username: userData.username,
    phone: userData.phone,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Add these state variables after the existing state declarations
  const [emailNotifications, setEmailNotifications] = useState({
    system: userData.notifications.email.system,
    campaigns: userData.notifications.email.campaigns,
    marketplace: userData.notifications.email.marketplace,
    wallet: userData.notifications.email.wallet,
    marketing: userData.notifications.email.marketing
  });

  const [pushNotifications, setPushNotifications] = useState({
    system: userData.notifications.push.system,
    campaigns: userData.notifications.push.campaigns,
    marketplace: userData.notifications.push.marketplace,
    wallet: userData.notifications.push.wallet,
    marketing: userData.notifications.push.marketing
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    system: userData.notifications.inApp.system,
    campaigns: userData.notifications.inApp.campaigns,
    marketplace: userData.notifications.inApp.marketplace,
    wallet: userData.notifications.inApp.wallet,
    marketing: userData.notifications.inApp.marketing,
    sounds: userData.notifications.inApp.sounds
  });

  const [privacySettings, setPrivacySettings] = useState({
    analytics: userData.privacy.dataSharing.analytics,
    thirdParty: userData.privacy.dataSharing.thirdParty,
    advertisers: userData.privacy.dataSharing.advertisers
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    animations: userData.animationsEnabled,
    soundEffects: userData.soundEffects,
    autoplayVideos: userData.autoplayVideos,
    highQualityRendering: userData.highQualityRendering
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    reducedMotion: false,
    highContrast: false,
    screenReader: false
  });

  const [walletSettings, setWalletSettings] = useState({
    autoPayouts: userData.walletSettings.autoPayouts,
    autoConvert: userData.walletSettings.autoConvert
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    quietHours: true,
    grouping: true,
    previewContent: true
  });

  const [devicePermissions, setDevicePermissions] = useState({
    camera: true,
    microphone: true,
    location: false,
    notification: true
  });

  const [deviceSecurity, setDeviceSecurity] = useState({
    trustedDevices: true,
    loginNotifications: true,
    rememberLogin: true
  });

  const [deviceSync, setDeviceSync] = useState({
    syncSettings: true,
    backgroundSync: true,
    offlineMode: true
  });

  const [developerOptions, setDeveloperOptions] = useState({
    apiAccess: true,
    debugMode: false,
    betaFeatures: true
  });

  const [systemSettings, setSystemSettings] = useState({
    hardwareAcceleration: true,
    backgroundProcessing: true
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    automaticInvoices: true,
    emailInvoices: true
  });

  const [translationSettings, setTranslationSettings] = useState({
    autoTranslate: true,
    showOriginal: false
  });

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: true
  });

  // Add handler functions for each group of settings
  const handleEmailNotificationChange = (key: string) => (checked: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handlePushNotificationChange = (key: string) => (checked: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handleInAppNotificationChange = (key: string) => (checked: boolean) => {
    setInAppNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handlePrivacySettingChange = (key: string) => (checked: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleAppearanceSettingChange = (key: string) => (checked: boolean) => {
    setAppearanceSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleAccessibilitySettingChange = (key: string) => (checked: boolean) => {
    setAccessibilitySettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleWalletSettingChange = (key: string) => (checked: boolean) => {
    setWalletSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleNotificationPreferenceChange = (key: string) => (checked: boolean) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: checked }));
  };

  const handleDevicePermissionChange = (key: string) => (checked: boolean) => {
    setDevicePermissions(prev => ({ ...prev, [key]: checked }));
  };

  const handleDeviceSecurityChange = (key: string) => (checked: boolean) => {
    setDeviceSecurity(prev => ({ ...prev, [key]: checked }));
  };

  const handleDeviceSyncChange = (key: string) => (checked: boolean) => {
    setDeviceSync(prev => ({ ...prev, [key]: checked }));
  };

  const handleDeveloperOptionChange = (key: string) => (checked: boolean) => {
    setDeveloperOptions(prev => ({ ...prev, [key]: checked }));
  };

  const handleSystemSettingChange = (key: string) => (checked: boolean) => {
    setSystemSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleInvoiceSettingChange = (key: string) => (checked: boolean) => {
    setInvoiceSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleTranslationSettingChange = (key: string) => (checked: boolean) => {
    setTranslationSettings(prev => ({ ...prev, [key]: checked }));
  };

  const handleSessionSettingChange = (key: string) => (checked: boolean) => {
    setSessionSettings(prev => ({ ...prev, [key]: checked }));
  };

  // Generic handler for radio inputs
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This can be expanded as needed for different radio groups
    console.log(`Radio changed: ${e.target.name} = ${e.target.value}`);
  };

  // Handle form changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submissions
  const handleSaveChanges = () => {
    // In a real app, this would save the changes to the server
    setShowSavedChangesAlert(true)
    setTimeout(() => setShowSavedChangesAlert(false), 3000)
  }

  const handlePasswordChange2 = () => {
    // In a real app, this would change the password
    setShowChangePasswordDialog(false)
    setShowSavedChangesAlert(true)
    setTimeout(() => setShowSavedChangesAlert(false), 3000)
  }

  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    setShowDeleteAccountDialog(false)
  }

  const handleLogoutAllDevices = () => {
    // In a real app, this would log out all devices
    setShowLogoutAllDevicesDialog(false)
    setShowSavedChangesAlert(true)
    setTimeout(() => setShowSavedChangesAlert(false), 3000)
  }

  const handleResetSettings = () => {
    // In a real app, this would reset all settings to default
    setShowResetSettingsDialog(false)
    setShowSavedChangesAlert(true)
    setTimeout(() => setShowSavedChangesAlert(false), 3000)
  }

  const handleExportData = () => {
    // In a real app, this would export user data
    setShowExportDataDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800"
            onClick={() => setShowResetSettingsDialog(true)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleSaveChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {showSavedChangesAlert && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-900/80 border border-green-700 text-green-100 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <Check className="h-5 w-5 text-green-400" />
          <span>Changes saved successfully!</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 h-6 w-6 rounded-full hover:bg-green-800"
            onClick={() => setShowSavedChangesAlert(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="text-gray-100">
        <TabsList className="mb-4 bg-gray-800 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
          <TabsTrigger value="account" className="data-[state=active]:bg-gray-700 py-2">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-700 py-2">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gray-700 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-700 py-2">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-gray-700 py-2">
            <Wallet className="h-4 w-4 mr-2" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="language" className="data-[state=active]:bg-gray-700 py-2">
            <Globe className="h-4 w-4 mr-2" />
            Language
          </TabsTrigger>
          <TabsTrigger value="devices" className="data-[state=active]:bg-gray-700 py-2">
            <HardDrive className="h-4 w-4 mr-2" />
            Devices
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-gray-700 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Profile Information */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-gray-700">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="bg-gray-800 text-gray-100">{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-gray-400">JPG, PNG or GIF. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={accountForm.name}
                        onChange={handleAccountChange}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={accountForm.username}
                        onChange={handleAccountChange}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={accountForm.email}
                        onChange={handleAccountChange}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={accountForm.phone}
                        onChange={handleAccountChange}
                        className="bg-gray-800 border-gray-700 text-gray-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        onClick={() => setShowChangePasswordDialog(true)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-blue-500" />
                        <Label className="text-base">Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {userData.twoFactorEnabled
                          ? "Two-factor authentication is enabled"
                          : "Add an extra layer of security to your account"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          userData.twoFactorEnabled
                            ? "bg-green-900/30 text-green-300 border-green-800"
                            : "bg-amber-900/30 text-amber-300 border-amber-800"
                        }
                      >
                        {userData.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 hover:bg-gray-700"
                        onClick={() => setShowTwoFactorDialog(true)}
                      >
                        {userData.twoFactorEnabled ? "Manage" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-purple-500" />
                        <Label className="text-base">Active Sessions</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Manage devices that are currently logged into your account
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-700"
                      onClick={() => setShowLogoutAllDevicesDialog(true)}
                    >
                      Logout All
                    </Button>
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
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
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
                  <div className="p-4 border border-amber-800 rounded-lg bg-amber-900/20">
                    <div className="flex items-start gap-3">
                      <Download className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div className="space-y-2">
                        <h3 className="font-medium text-amber-400">Export Data</h3>
                        <p className="text-sm text-amber-300">
                          Download a copy of all your personal data and activity history.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-800 bg-amber-900/30 hover:bg-amber-900/50 text-amber-300"
                          onClick={() => setShowExportDataDialog(true)}
                        >
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Account Status */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                  <CardDescription>Your current account status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Status</span>
                    <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Account Type</span>
                    <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-800">
                      Pro Creator
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Verification</span>
                    <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-800">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Member Since</span>
                    <span className="text-sm text-gray-300">January 15, 2023</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Connected Accounts */}
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage your connected accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-purple-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6001 13.6L12.0001 18.2L7.40012 13.6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 5.80005V18.2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Twitch</h3>
                        <p className="text-xs text-gray-400">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-red-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">YouTube</h3>
                        <p className="text-xs text-gray-400">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                      Disconnect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-blue-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.19795 21C15.5229 21 19.0229 15.75 19.0229 11.25C19.0229 11.1 19.0229 10.95 19.0229 10.8C19.7729 10.3 20.4229 9.65 20.9229 8.9C20.1729 9.2 19.4229 9.4 18.6229 9.5C19.4229 9 20.0229 8.2 20.3229 7.25C19.5729 7.75 18.7229 8.1 17.8229 8.3C17.0729 7.5 16.0729 7.5 15.3229 8.3C14.4229 8.1 13.5729 7.75 12.8229 7.25C13.1229 8.2 13.7229 9 14.5229 9.5C13.7229 9.4 12.9729 9.2 12.2229 8.9C12.7229 9.65 13.3729 10.3 14.1229 10.8C14.1229 10.95 14.1229 11.1 14.1229 11.25C14.1229 15.75 17.6229 21 23.9479 21"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Twitter</h3>
                        <p className="text-xs text-gray-400">Connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

