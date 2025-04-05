### 1. API Endpoints

### Authentication & User Management

### `POST /api/auth/register`

Register a new streamer account. 

**Request Body:**

```json
{
  "email": "aarav.sharma@example.com",
  "password": "securePassword123",
  "username": "aaravsharma",
  "displayName": "Aarav Sharma"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "userId": "usr_123456789",
    "email": "aarav.sharma@example.com",
    "username": "aaravsharma",
    "displayName": "Aarav Sharma",
    "createdAt": "2023-04-05T10:30:00Z"
  }
}

```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email already in use"
    }
  ]
}

```

### `POST /api/auth/login`

Authenticate a streamer.

**Request Body:**

```json
{
  "email": "aarav.sharma@example.com",
  "password": "securePassword123"
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "userId": "usr_123456789",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}

```

**Error Response (401 Unauthorized):**

```json
{
  "success": false,
  "message": "Invalid credentials"
}

```

### `POST /api/auth/refresh`

Refresh the access token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}

```

### `GET /api/users/me`

Get the current streamer's profile.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "usr_123456789",
    "username": "aaravsharma",
    "displayName": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "avatar": "/images/avatars/aarav.jpg",
    "coverImage": "/images/covers/aarav-cover.jpg",
    "bio": "Gaming content creator and streamer. Specializing in mobile gaming and esports commentary.",
    "location": "Mumbai, India",
    "joinDate": "2023-01-15T00:00:00Z",
    "verified": true,
    "level": 4,
    "xps": 1150,
    "maxXps": 2000,
    "rpg": 410,
    "energyPacks": 8,
    "tags": ["mobile gaming", "esports", "commentary", "BGMI", "Mobile Legends"],
    "socialLinks": {
      "twitch": "<https://twitch.tv/aaravsharma>",
      "youtube": "<https://youtube.com/c/aaravsharma>",
      "instagram": "<https://instagram.com/aaravsharma>",
      "twitter": "<https://twitter.com/aaravsharma>",
      "facebook": "<https://facebook.com/aaravsharma>"
    },
    "streamingPlatforms": [
      {
        "name": "Twitch",
        "username": "aaravsharma",
        "followers": 12500,
        "verified": true,
        "connected": true
      },
      {
        "name": "YouTube",
        "username": "Aarav Sharma",
        "followers": 25000,
        "verified": true,
        "connected": true
      }
    ]
  }
}

```

### `PUT /api/users/me`

Update the current streamer's profile.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "displayName": "Aarav S. Sharma",
  "bio": "Updated bio content",
  "location": "New Delhi, India",
  "tags": ["mobile gaming", "esports", "BGMI", "commentary"]
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "displayName": "Aarav S. Sharma",
    "bio": "Updated bio content",
    "location": "New Delhi, India",
    "tags": ["mobile gaming", "esports", "BGMI", "commentary"]
  }
}

```

### `POST /api/users/me/avatar`

Upload a new avatar image.

**Headers:**

- Authorization: Bearer accessToken
- Content-Type: multipart/form-data

**Request Body:**

- Form data with "avatar" field containing the image file

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "data": {
    "avatarUrl": "/images/avatars/aarav-123456.jpg"
  }
}

```

### `POST /api/users/me/cover`

Upload a new cover image.

**Headers:**

- Authorization: Bearer accessToken
- Content-Type: multipart/form-data

**Request Body:**

- Form data with "cover" field containing the image file

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Cover image updated successfully",
  "data": {
    "coverUrl": "/images/covers/aarav-123456.jpg"
  }
}

```

### Campaign Management

### `GET /api/campaigns`

Get all campaigns for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- status: Filter by status (active, pending, completed, all)
- category: Filter by category
- type: Filter by campaign type
- search: Search term
- page: Page number (default: 1)
- limit: Items per page (default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "camp_123456",
        "name": "BGMI Blitz Promotion",
        "status": "active",
        "type": "CPI",
        "startDate": "2023-04-01T00:00:00Z",
        "endDate": "2023-04-10T00:00:00Z",
        "budget": 1500,
        "spent": 750,
        "impressions": 12500,
        "clicks": 1250,
        "conversions": 125,
        "ctr": 10,
        "cvr": 10,
        "cpi": 6,
        "earnings": 750,
        "category": "Gaming",
        "advertiser": "GameBlitz Inc.",
        "description": "Promote BGMI during your streams to attract new players.",
        "requirements": {
          "impressions": 25000,
          "streamHours": 5,
          "mentionCount": 3
        },
        "progress": 50,
        "image": "/images/campaigns/bgmi-blitz.jpg",
        "verified": true
      }
    ],
    "pagination": {
      "total": 15,
      "pages": 2,
      "page": 1,
      "limit": 10
    }
  }
}

```

### `GET /api/campaigns/:campaignId`

Get details of a specific campaign.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "camp_123456",
    "name": "BGMI Blitz Promotion",
    "status": "active",
    "type": "CPI",
    "startDate": "2023-04-01T00:00:00Z",
    "endDate": "2023-04-10T00:00:00Z",
    "budget": 1500,
    "spent": 750,
    "impressions": 12500,
    "clicks": 1250,
    "conversions": 125,
    "ctr": 10,
    "cvr": 10,
    "cpi": 6,
    "earnings": 750,
    "category": "Gaming",
    "advertiser": "GameBlitz Inc.",
    "description": "Promote BGMI during your streams to attract new players.",
    "requirements": {
      "impressions": 25000,
      "streamHours": 5,
      "mentionCount": 3
    },
    "progress": 50,
    "image": "/images/campaigns/bgmi-blitz.jpg",
    "verified": true,
    "dailyPerformance": [
      {
        "date": "2023-04-01",
        "impressions": 5000,
        "clicks": 500,
        "conversions": 50,
        "earnings": 300
      },
      {
        "date": "2023-04-02",
        "impressions": 5500,
        "clicks": 550,
        "conversions": 55,
        "earnings": 330
      }
    ],
    "streamerPerformance": {
      "streamHours": 2.5,
      "mentions": 2,
      "productDemoCompleted": true
    }
  }
}

```

### `GET /api/marketplace/campaigns`

Get available campaigns from the marketplace.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- category: Filter by category
- level: Filter by minimum level requirement
- search: Search term
- page: Page number (default: 1)
- limit: Items per page (default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "camp_789012",
        "name": "Mobile Legends Tournament",
        "type": "CPI",
        "earnings": {
          "gloCoins": 1500,
          "bloCoins": 300
        },
        "requirements": {
          "impressions": 1500,
          "level": 1,
          "rpg": 40,
          "xps": 40,
          "energyPacks": 2
        },
        "deadline": "2023-04-15T00:00:00Z",
        "details": "Promote our Mobile Legends tournament during your streams. Must mention key tournament details.",
        "image": "/images/campaigns/mobile-legends.jpg",
        "status": "available",
        "multiplier": 1.5,
        "category": "Gaming",
        "advertiser": "MobileMasters",
        "verified": true,
        "meetsRequirements": true
      }
    ],
    "pagination": {
      "total": 25,
      "pages": 3,
      "page": 1,
      "limit": 10
    },
    "userStats": {
      "level": 4,
      "rpg": 410,
      "xps": 1150,
      "energyPacks": 8,
      "bloCoins": 3800,
      "geekeys": [
        {
          "name": "Strava Cult",
          "active": true
        },
        {
          "name": "FPS Masters Clan",
          "active": true
        }
      ]
    }
  }
}

```

### `POST /api/campaigns/join`

Join a campaign from the marketplace.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "campaignId": "camp_789012"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Campaign joined successfully",
  "data": {
    "campaignId": "camp_789012",
    "status": "active",
    "startDate": "2023-04-05T00:00:00Z",
    "endDate": "2023-04-15T00:00:00Z"
  }
}

```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Cannot join campaign",
  "errors": [
    {
      "field": "requirements",
      "message": "You do not meet the minimum level requirement for this campaign"
    }
  ]
}

```

### `GET /api/campaigns/analytics`

Get campaign analytics for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- timeframe: Time period for analytics (daily, weekly, monthly)
- startDate: Start date for custom timeframe
- endDate: End date for custom timeframe

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "campaignStats": {
      "total": 15,
      "active": 4,
      "completed": 10,
      "pending": 1,
      "successRate": 92
    },
    "earnings": {
      "total": 35500,
      "monthly": [
        {
          "month": "Jan",
          "amount": 8000
        },
        {
          "month": "Feb",
          "amount": 12500
        },
        {
          "month": "Mar",
          "amount": 15000
        }
      ],
      "byCategory": [
        {
          "category": "Gaming",
          "percentage": 65,
          "amount": 23075
        },
        {
          "category": "Hardware",
          "percentage": 25,
          "amount": 8875
        },
        {
          "category": "Food & Beverage",
          "percentage": 10,
          "amount": 3550
        }
      ]
    },
    "performance": {
      "impressions": 250000,
      "clicks": 27500,
      "ctr": 11,
      "conversions": 2750,
      "cvr": 10
    },
    "platforms": [
      {
        "platform": "Twitch",
        "percentage": 55,
        "earnings": 4675
      },
      {
        "platform": "YouTube",
        "percentage": 30,
        "earnings": 2550
      },
      {
        "platform": "TikTok",
        "percentage": 15,
        "earnings": 1275
      }
    ],
    "daily": [
      {
        "date": "2023-04-01",
        "impressions": 5000,
        "clicks": 500,
        "conversions": 50,
        "earnings": 300
      },
      {
        "date": "2023-04-02",
        "impressions": 5500,
        "clicks": 550,
        "conversions": 55,
        "earnings": 330
      }
    ]
  }
}

```

### Wallet & Transactions

### `GET /api/wallet`

Get wallet information for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "gloCoins": 12450,
    "bloCoins": 3800,
    "pendingEarnings": 1250,
    "stakingRewards": 320,
    "referralBonus": 150,
    "totalEarned": 24680,
    "weeklyChange": 16.8,
    "monthlyChange": 32.5,
    "nextPayout": "2023-04-15T00:00:00Z"
  }
}

```

### `GET /api/wallet/transactions`

Get transaction history for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- type: Filter by transaction type (earning, deposit, withdrawal, staking, referral)
- currency: Filter by currency (gloCoins, bloCoins)
- status: Filter by status (completed, pending, failed)
- page: Page number (default: 1)
- limit: Items per page (default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "txn_123456",
        "type": "earning",
        "campaign": "BGMI Blitz Promotion",
        "amount": 750,
        "currency": "gloCoins",
        "date": "2023-04-05T00:00:00Z",
        "status": "completed"
      },
      {
        "id": "txn_123457",
        "type": "deposit",
        "amount": 1000,
        "currency": "bloCoins",
        "date": "2023-04-03T00:00:00Z",
        "status": "completed",
        "txHash": "0x8a7d...3f9b"
      }
    ],
    "pagination": {
      "total": 25,
      "pages": 3,
      "page": 1,
      "limit": 10
    }
  }
}

```

### `POST /api/wallet/deposit`

Deposit Blo-Coins into the wallet.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "amount": 1000,
  "paymentMethod": "crypto",
  "txHash": "0x8a7d...3f9b"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Deposit successful",
  "data": {
    "transactionId": "txn_123457",
    "amount": 1000,
    "currency": "bloCoins",
    "date": "2023-04-03T00:00:00Z",
    "status": "completed",
    "newBalance": 4800
  }
}

```

### `POST /api/wallet/withdraw`

Withdraw coins from the wallet.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "amount": 2500,
  "currency": "gloCoins",
  "withdrawalMethod": "bank",
  "accountId": "acc_123456"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Withdrawal request submitted",
  "data": {
    "transactionId": "txn_123458",
    "amount": 2500,
    "currency": "gloCoins",
    "date": "2023-04-06T00:00:00Z",
    "status": "pending",
    "estimatedProcessingTime": "24-48 hours"
  }
}

```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Withdrawal failed",
  "errors": [
    {
      "field": "amount",
      "message": "Insufficient balance"
    }
  ]
}

```

### `GET /api/wallet/staking-plans`

Get available staking plans.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "stakingPlans": [
      {
        "id": "stake_plan_1",
        "name": "Basic Staking",
        "duration": 30,
        "apy": 5,
        "minAmount": 500,
        "description": "Lock your Blo-Coins for 30 days and earn 5% APY",
        "benefits": [
          "Early access to campaigns",
          "5% bonus on campaign earnings"
        ]
      },
      {
        "id": "stake_plan_2",
        "name": "Pro Staking",
        "duration": 90,
        "apy": 12,
        "minAmount": 2000,
        "description": "Lock your Blo-Coins for 90 days and earn 12% APY",
        "benefits": [
          "Priority campaign access",
          "12% bonus on campaign earnings",
          "Weekly energy pack bonus"
        ]
      }
    ]
  }
}

```

### `POST /api/wallet/stake`

Stake Blo-Coins.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "planId": "stake_plan_1",
  "amount": 1000
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Staking successful",
  "data": {
    "stakeId": "stake_123456",
    "planId": "stake_plan_1",
    "amount": 1000,
    "startDate": "2023-04-06T00:00:00Z",
    "endDate": "2023-05-06T00:00:00Z",
    "estimatedReward": 41.67,
    "newBloCoinsBalance": 2800
  }
}

```

### `GET /api/wallet/active-stakes`

Get active stakes for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "activeStakes": [
      {
        "id": "stake_123456",
        "plan": "Basic Staking",
        "amount": 1000,
        "startDate": "2023-03-01T00:00:00Z",
        "endDate": "2023-03-31T00:00:00Z",
        "earned": 41.67,
        "status": "active",
        "remainingDays": 14
      }
    ]
  }
}

```

### Groups & Social Features

### `GET /api/groups`

Get groups for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- type: Filter by group type (cult, clan, club)
- page: Page number (default: 1)
- limit: Items per page (default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": "grp_123456",
        "name": "Strava Cult",
        "type": "cult",
        "icon": "Shield",
        "joined": "2023-02-10T00:00:00Z",
        "memberCount": 1250,
        "description": "A community of fitness enthusiasts who love gaming",
        "benefits": [
          "Access to exclusive fitness-related campaigns",
          "Weekly energy pack bonus"
        ]
      },
      {
        "id": "grp_123457",
        "name": "FPS Masters Clan",
        "type": "clan",
        "icon": "Users",
        "joined": "2023-03-05T00:00:00Z",
        "memberCount": 850,
        "description": "Elite FPS gamers community",
        "benefits": [
          "Access to exclusive FPS game campaigns",
          "Monthly RPG bonus"
        ]
      }
    ],
    "pagination": {
      "total": 5,
      "pages": 1,
      "page": 1,
      "limit": 10
    }
  }
}

```

### `GET /api/groups/available`

Get available groups to join.

**Headers:**

- Authorization: Bearer accessToken

**Query Parameters:**

- type: Filter by group type (cult, clan, club)
- page: Page number (default: 1)
- limit: Items per page (default: 10)

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": "grp_123458",
        "name": "Redbull Club",
        "type": "club",
        "icon": "Award",
        "memberCount": 500,
        "description": "Exclusive club for Redbull sponsored streamers",
        "requirements": {
          "level": 3,
          "rpg": 200,
          "invitationOnly": true
        },
        "benefits": [
          "Access to exclusive Redbull campaigns",
          "Monthly energy pack bonus",
          "Redbull merchandise"
        ],
        "meetsRequirements": true
      }
    ],
    "pagination": {
      "total": 15,
      "pages": 2,
      "page": 1,
      "limit": 10
    }
  }
}

```

### `POST /api/groups/join`

Join a group.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "groupId": "grp_123458",
  "invitationCode": "REDBULL2023" // Optional, for invitation-only groups
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Group joined successfully",
  "data": {
    "groupId": "grp_123458",
    "name": "Redbull Club",
    "type": "club",
    "joined": "2023-04-06T00:00:00Z",
    "benefits": [
      "Access to exclusive Redbull campaigns",
      "Monthly energy pack bonus",
      "Redbull merchandise"
    ]
  }
}

```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Cannot join group",
  "errors": [
    {
      "field": "invitationCode",
      "message": "Invalid invitation code"
    }
  ]
}

```

### `GET /api/geekeys`

Get Geekeys for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "geekeys": [
      {
        "id": "geekey_123456",
        "name": "Strava Cult",
        "type": "cult",
        "active": true,
        "acquired": "2023-02-10T00:00:00Z",
        "benefits": [
          "Access to exclusive Strava campaigns"
        ]
      },
      {
        "id": "geekey_123457",
        "name": "FPS Masters Clan",
        "type": "clan",
        "active": true,
        "acquired": "2023-03-05T00:00:00Z",
        "benefits": [
          "Access to exclusive FPS game campaigns"
        ]
      }
    ]
  }
}

```

### OBS Integration

### `GET /api/obs/integrations`

Get OBS integrations for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "integrations": [
      {
        "id": "obs_123456",
        "name": "BGMI Blitz Overlay",
        "type": "Overlay",
        "status": "active",
        "campaignId": "camp_123456",
        "url": "<https://api.gametriggers.com/obs/overlay/obs_123456>",
        "createdAt": "2023-04-01T00:00:00Z"
      },
      {
        "id": "obs_123457",
        "name": "Mobile Legends Banner",
        "type": "Banner",
        "status": "active",
        "campaignId": "camp_789012",
        "url": "<https://api.gametriggers.com/obs/overlay/obs_123457>",
        "createdAt": "2023-04-05T00:00:00Z"
      }
    ]
  }
}

```

### `POST /api/obs/integrations`

Create a new OBS integration.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "name": "Gaming Energy Drink Overlay",
  "type": "Overlay",
  "campaignId": "camp_345678"
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "OBS integration created successfully",
  "data": {
    "id": "obs_123458",
    "name": "Gaming Energy Drink Overlay",
    "type": "Overlay",
    "status": "active",
    "campaignId": "camp_345678",
    "url": "<https://api.gametriggers.com/obs/overlay/obs_123458>",
    "createdAt": "2023-04-06T00:00:00Z"
  }
}

```

### `DELETE /api/obs/integrations/:integrationId`

Delete an OBS integration.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "message": "OBS integration deleted successfully"
}

```

### Settings & Preferences

### `GET /api/settings`

Get settings for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "account": {
      "email": "aarav.sharma@example.com",
      "phone": "+91 98765 43210",
      "language": "English",
      "timezone": "Asia/Kolkata (GMT+5:30)",
      "twoFactorEnabled": true
    },
    "notifications": {
      "email": true,
      "push": true,
      "campaigns": true,
      "payments": true,
      "platform": true,
      "marketing": false
    },
    "security": {
      "lastPasswordChange": "2023-03-10T00:00:00Z",
      "connectedDevices": [
        {
          "name": "Windows PC",
          "browser": "Chrome",
          "lastActive": "Now",
          "current": true
        },
        {
          "name": "iPhone 13",
          "browser": "Safari",
          "lastActive": "1 day ago",
          "current": false
        }
      ]
    },
    "payment": {
      "paymentMethods": [
        {
          "id": "pm_123456",
          "type": "bank",
            {
      "paymentMethods": [
        {
          "id": "pm_123456",
          "type": "bank",
          "name": "HDFC Bank",
          "accountNumber": "XXXX-XXXX-4567",
          "primary": true
        },
        {
          "id": "pm_123457",
          "type": "upi",
          "name": "Google Pay",
          "accountNumber": "aarav@upi",
          "primary": false
        }
      ],
      "payoutSettings": {
        "minimumPayout": 5000,
        "payoutFrequency": "monthly",
        "autoPayouts": true,
        "taxInformation": {
          "panCard": "ABCDE1234F",
          "gstNumber": "22AAAAA0000A1Z5",
          "verified": true
        }
      }
    }
  }
}

```

### `PUT /api/settings`

Update settings for the current streamer.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "account": {
    "phone": "+91 98765 54321",
    "language": "Hindi",
    "timezone": "Asia/Kolkata (GMT+5:30)"
  },
  "notifications": {
    "email": true,
    "push": false,
    "campaigns": true,
    "payments": true,
    "platform": true,
    "marketing": true
  }
}

```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": {
    "account": {
      "phone": "+91 98765 54321",
      "language": "Hindi",
      "timezone": "Asia/Kolkata (GMT+5:30)"
    },
    "notifications": {
      "email": true,
      "push": false,
      "campaigns": true,
      "payments": true,
      "platform": true,
      "marketing": true
    }
  }
}

```

### `POST /api/settings/payment-methods`

Add a new payment method.

**Headers:**

- Authorization: Bearer accessToken

**Request Body:**

```json
{
  "type": "upi",
  "name": "PhonePe",
  "accountNumber": "aarav@phonepe",
  "primary": false
}

```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Payment method added successfully",
  "data": {
    "id": "pm_123458",
    "type": "upi",
    "name": "PhonePe",
    "accountNumber": "aarav@phonepe",
    "primary": false
  }
}

```

## 2. User Data Schemas

### User Model

```tsx
interface User {
  id: string;                   // Primary key, UUID
  username: string;             // Unique, lowercase, alphanumeric with underscores
  displayName: string;          // User's display name
  email: string;                // Unique, valid email format
  password: string;             // Hashed password, min length 8
  avatar: string;               // URL to avatar image
  coverImage: string;           // URL to cover image
  bio: string;                  // Max 500 chars
  location: string;             // City, Country format
  joinDate: Date;               // When user joined
  verified: boolean;            // Whether user is verified
  level: number;                // User level (1-10)
  xps: number;                  // Experience points
  maxXps: number;               // XP needed for next level
  rpg: number;                  // Reputation growth points
  energyPacks: number;          // Number of energy packs
  tags: string[];               // Array of user tags
  socialLinks: {                // Social media links
    twitch?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  streamingPlatforms: {         // Connected streaming platforms
    name: string;               // Platform name
    username: string;           // Username on platform
    followers: number;          // Follower count
    verified: boolean;          // Whether verified on platform
    connected: boolean;         // Whether currently connected
  }[];
  achievements: {               // User achievements
    id: string;                 // Achievement ID
    name: string;               // Achievement name
    description: string;        // Achievement description
    icon: string;               // Icon name
    date: Date;                 // When achieved
  }[];
  groups: string[];             // Array of group IDs user belongs to
  geekeys: string[];            // Array of geekey IDs user has
  wallet: {                     // User wallet
    gloCoins: number;           // Glo-Coins balance
    bloCoins: number;           // Blo-Coins balance
  };
  settings: {                   // User settings
    account: {
      phone?: string;           // Phone number
      language: string;         // Preferred language
      timezone: string;         // Timezone
      twoFactorEnabled: boolean; // 2FA enabled
    };
    notifications: {
      email: boolean;           // Email notifications
      push: boolean;            // Push notifications
      campaigns: boolean;       // Campaign notifications
      payments: boolean;        // Payment notifications
      platform: boolean;        // Platform notifications
      marketing: boolean;       // Marketing notifications
    };
  };
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Campaign Model

```tsx
interface Campaign {
  id: string;                   // Primary key, UUID
  name: string;                 // Campaign name
  status: 'draft' | 'available' | 'active' | 'paused' | 'completed' | 'rejected' | 'exclusive' | 'locked';
  type: 'CPI' | 'CPA' | 'CPM';  // Campaign type
  startDate: Date;              // Campaign start date
  endDate: Date;                // Campaign end date
  budget: number;               // Total budget in Glo-Coins
  category: string;             // Campaign category
  advertiser: string;           // Advertiser name
  description: string;          // Campaign description
  details: string;              // Detailed campaign information
  image: string;                // Campaign image URL
  verified: boolean;            // Whether advertiser is verified
  multiplier: number;           // Earnings multiplier
  requirements: {
    impressions: number;        // Required impressions
    level: number;              // Minimum level required
    rpg: number;                // Minimum RPG required
    xps: number;                // Minimum XPS required
    energyPacks: number;        // Energy packs required
    keyRequired?: string;       // Special key required
    bloCoinsDeposit?: number;   // Blo-Coins deposit required
    geekeys?: {                 // Required Geekeys
      name: string;             // Geekey name
      active: boolean;          // Whether active requirement
    }[];
    streamHours?: number;       // Required streaming hours
    mentionCount?: number;      // Required mentions
    productDemo?: boolean;      // Product demo required
    productReview?: boolean;    // Product review required
    gameplayMinutes?: number;   // Required gameplay minutes
    participationRequired?: boolean; // Tournament participation required
  };
  earnings: {
    gloCoins: number;           // Glo-Coins reward
    bloCoins: number;           // Blo-Coins reward
  };
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### UserCampaign Model (Join Table)

```tsx
interface UserCampaign {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  campaignId: string;           // Foreign key to Campaign
  status: 'active' | 'paused' | 'completed' | 'pending';
  progress: number;             // Progress percentage (0-100)
  impressions: number;          // Actual impressions
  clicks: number;               // Actual clicks
  conversions: number;          // Actual conversions
  ctr: number;                  // Click-through rate
  cvr: number;                  // Conversion rate
  cpi: number;                  // Cost per install/action
  earnings: number;             // Actual earnings
  spent: number;                // Amount spent from budget
  streamHours: number;          // Actual streaming hours
  mentions: number;             // Actual mentions
  productDemoCompleted: boolean; // Whether product demo completed
  productReviewCompleted: boolean; // Whether product review completed
  gameplayMinutesCompleted: number; // Actual gameplay minutes
  participationCompleted: boolean; // Whether participation completed
  startDate: Date;              // When user joined campaign
  endDate: Date;                // Campaign end date for user
  dailyPerformance: {           // Daily performance metrics
    date: Date;                 // Performance date
    impressions: number;        // Daily impressions
    clicks: number;             // Daily clicks
    conversions: number;        // Daily conversions
    earnings: number;           // Daily earnings
  }[];
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Wallet Model

```tsx
interface Wallet {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  gloCoins: number;             // Glo-Coins balance
  bloCoins: number;             // Blo-Coins balance
  pendingEarnings: number;      // Pending earnings
  stakingRewards: number;       // Staking rewards
  referralBonus: number;        // Referral bonuses
  totalEarned: number;          // Total lifetime earnings
  nextPayout: Date;             // Next scheduled payout
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Transaction Model

```tsx
interface Transaction {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  type: 'earning' | 'deposit' | 'withdrawal' | 'staking' | 'referral';
  amount: number;               // Transaction amount
  currency: 'gloCoins' | 'bloCoins';
  campaignId?: string;          // For earning transactions
  referralId?: string;          // For referral transactions
  stakeId?: string;             // For staking transactions
  txHash?: string;              // For blockchain transactions
  status: 'pending' | 'completed' | 'failed';
  date: Date;                   // Transaction date
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Stake Model

```tsx
interface Stake {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  planId: string;               // Foreign key to StakingPlan
  amount: number;               // Staked amount
  startDate: Date;              // Stake start date
  endDate: Date;                // Stake end date
  earned: number;               // Amount earned so far
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### StakingPlan Model

```tsx
interface StakingPlan {
  id: string;                   // Primary key, UUID
  name: string;                 // Plan name
  duration: number;             // Duration in days
  apy: number;                  // Annual percentage yield
  minAmount: number;            // Minimum stake amount
  description: string;          // Plan description
  benefits: string[];           // Array of benefits
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Group Model

```tsx
interface Group {
  id: string;                   // Primary key, UUID
  name: string;                 // Group name
  type: 'cult' | 'clan' | 'club'; // Group type
  icon: string;                 // Icon name
  description: string;          // Group description
  memberCount: number;          // Number of members
  requirements: {
    level?: number;             // Minimum level required
    rpg?: number;               // Minimum RPG required
    invitationOnly?: boolean;   // Whether invitation-only
  };
  benefits: string[];           // Array of benefits
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### UserGroup Model (Join Table)

```tsx
interface UserGroup {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  groupId: string;              // Foreign key to Group
  joined: Date;                 // When user joined group
  role: 'member' | 'moderator' | 'admin';
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### Geekey Model

```tsx
interface Geekey {
  id: string;                   // Primary key, UUID
  name: string;                 // Geekey name
  type: 'cult' | 'clan' | 'club'; // Geekey type
  benefits: string[];           // Array of benefits
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### UserGeekey Model (Join Table)

```tsx
interface UserGeekey {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  geekeyId: string;             // Foreign key to Geekey
  active: boolean;              // Whether geekey is active
  acquired: Date;               // When geekey was acquired
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### OBSIntegration Model

```tsx
interface OBSIntegration {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  name: string;                 // Integration name
  type: 'Overlay' | 'Banner' | 'Alert';
  status: 'active' | 'inactive';
  campaignId?: string;          // Associated campaign
  url: string;                  // Integration URL
  settings: {                   // Integration settings
    position?: string;          // Position on screen
    size?: string;              // Size
    animation?: string;         // Animation type
    duration?: number;          // Display duration
  };
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

### PaymentMethod Model

```tsx
interface PaymentMethod {
  id: string;                   // Primary key, UUID
  userId: string;               // Foreign key to User
  type: 'bank' | 'upi' | 'crypto';
  name: string;                 // Method name
  accountNumber: string;        // Account number or address
  primary: boolean;             // Whether primary method
  verified: boolean;            // Whether verified
  createdAt: Date;              // When record was created
  updatedAt: Date;              // When record was last updated
}

```

## 3. Data Relationships

1. **User to UserCampaign**: One-to-Many
2. A user can join multiple campaigns
3. Each UserCampaign belongs to one user
4. **Campaign to UserCampaign**: One-to-Many
5. A campaign can be joined by multiple users
6. Each UserCampaign belongs to one campaign
7. **User to Wallet**: One-to-One
8. Each user has exactly one wallet
9. Each wallet belongs to one user
10. **User to Transaction**: One-to-Many
11. A user can have multiple transactions
12. Each transaction belongs to one user
13. **User to Stake**: One-to-Many
14. A user can have multiple stakes
15. Each stake belongs to one user
16. **StakingPlan to Stake**: One-to-Many
17. A staking plan can have multiple stakes
18. Each stake belongs to one staking plan
19. **User to UserGroup**: One-to-Many
20. A user can join multiple groups
21. Each UserGroup belongs to one user
22. **Group to UserGroup**: One-to-Many
23. A group can have multiple members
24. Each UserGroup belongs to one group
25. **User to UserGeekey**: One-to-Many
26. A user can have multiple geekeys
27. Each UserGeekey belongs to one user
28. **Geekey to UserGeekey**: One-to-Many
29. A geekey can be owned by multiple users
30. Each UserGeekey belongs to one geekey
31. **User to OBSIntegration**: One-to-Many
32. A user can have multiple OBS integrations
33. Each OBS integration belongs to one user
34. **Campaign to OBSIntegration**: One-to-Many
35. A campaign can have multiple OBS integrations
36. Each OBS integration can be associated with one campaign
37. **User to PaymentMethod**: One-to-Many
38. A user can have multiple payment methods
39. Each payment method belongs to one user

## 4. Authentication and Authorization Requirements

### Authentication

1. **JWT-based Authentication**
2. Access tokens with short expiry (1 hour)
3. Refresh tokens with longer expiry (7 days)
4. Tokens stored securely (HTTP-only cookies or secure local storage)
5. **Two-Factor Authentication**
6. Optional SMS or authenticator app verification
7. Recovery codes for backup access
8. **Social Authentication**
9. OAuth integration with Twitch, YouTube, etc.
10. Account linking between platforms

### Authorization

1. **Role-Based Access Control**
2. Streamer role: Access to own campaigns, wallet, etc.
3. Admin role: Access to all data, user management, etc.
4. **Resource-Based Permissions**
5. Users can only access their own data
6. Campaign access based on join status
7. Group access based on membership
8. **Feature-Based Permissions**
9. Level-gated features (e.g., exclusive campaigns)
10. Geekey-gated features (e.g., special campaigns)
11. **API Rate Limiting**
12. Prevent abuse with rate limits
13. Different limits for different endpoints

## 5. State Management Requirements

1. **Real-time Campaign Progress Tracking**
2. Synchronize campaign progress between frontend and backend
3. Update progress based on streamer actions
4. **Wallet Balance Consistency**
5. Ensure wallet balances are consistent across transactions
6. Lock mechanisms for concurrent transactions
7. **Campaign Status Updates**
8. Automatic status changes based on time and progress
9. Notifications for status changes
10. **User Level and XP Progression**
11. Track XP gains from various activities
12. Trigger level-up events when thresholds are reached
13. **Caching Strategy**
14. Cache frequently accessed data (e.g., user profile, active campaigns)
15. Invalidate cache on relevant updates
16. **Optimistic Updates**
17. Update UI immediately for better UX
18. Rollback on backend failure
19. **Conflict Resolution**
20. Handle concurrent edits to the same resource
21. Version-based conflict detection

## 6. Third-Party API Integrations

1. **Streaming Platforms**
2. Twitch API: For authentication, stream data, and viewer metrics
3. YouTube API: For authentication, stream data, and viewer metrics
4. TikTok API: For authentication and content metrics
5. **Payment Gateways**
6. Stripe/PayPal: For fiat currency transactions
7. Cryptocurrency payment processors: For crypto transactions
8. **Analytics Services**
9. Google Analytics: For user behavior tracking
10. Mixpanel/Amplitude: For event tracking and funnel analysis
11. **Notification Services**
12. Firebase Cloud Messaging: For push notifications
13. SendGrid/Mailgun: For email notifications
14. **OBS Integration**
15. OBS WebSocket API: For direct integration with OBS
16. StreamElements/Streamlabs APIs: For overlay integration
17. **Social Media**
18. Twitter API: For social sharing and authentication
19. Instagram API: For social sharing and authentication
20. Facebook API: For social sharing and authentication

## 7. Websocket/Real-time Communication Requirements

1. **Campaign Performance Updates**
2. Real-time updates on impressions, clicks, and conversions
3. Live progress tracking during streams
4. **Wallet Balance Updates**
5. Real-time notifications for earnings and transactions
6. Live balance updates
7. **Notifications**
8. Real-time notifications for campaign invitations
9. Alerts for campaign status changes
10. Notifications for level-ups and achievements
11. **Chat and Collaboration**
12. Group chat functionality for clans and cults
13. Direct messaging between streamers
14. **OBS Integration**
15. Real-time control of overlays and banners
16. Live campaign activation during streams
17. **Analytics Dashboard**
18. Live updating charts and metrics
19. Real-time audience engagement data

### Websocket Events

```tsx
// Example websocket events
interface WebsocketEvents {
  // Campaign events
  'campaign:progress': {
    campaignId: string;
    progress: number;
    metrics: {
      impressions: number;
      clicks: number;
      conversions: number;
    };
  };
  'campaign:status': {
    campaignId: string;
    status: string;
    message: string;
  };

  // Wallet events
  'wallet:transaction': {
    transactionId: string;
    type: string;
    amount: number;
    currency: string;
    newBalance: number;
  };
  'wallet:stake': {
    stakeId: string;
    status: string;
    earned: number;
  };

  // User events
  'user:levelup': {
    newLevel: number;
    rewards: any[];
  };
  'user:achievement': {
    achievementId: string;
    name: string;
    rewards: any[];
  };

  // Notification events
  'notification:new': {
    id: string;
    type: string;
    message: string;
    link?: string;
  };
}

```

## 8. Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ],
  "code": "ERROR_CODE",
  "status": 400
}

```

### Common Error Codes

1. **Authentication Errors**
2. `AUTH_INVALID_CREDENTIALS`: Invalid login credentials
3. `AUTH_TOKEN_EXPIRED`: JWT token expired
4. `AUTH_INSUFFICIENT_PERMISSIONS`: Insufficient permissions
5. **Validation Errors**
6. `VALIDATION_REQUIRED_FIELD`: Required field missing
7. `VALIDATION_INVALID_FORMAT`: Invalid data format
8. `VALIDATION_UNIQUE_CONSTRAINT`: Unique constraint violation
9. **Resource Errors**
10. `RESOURCE_NOT_FOUND`: Resource not found
11. `RESOURCE_ALREADY_EXISTS`: Resource already exists
12. `RESOURCE_STATE_CONFLICT`: Resource in incompatible state
13. **Business Logic Errors**
14. `CAMPAIGN_REQUIREMENTS_NOT_MET`: Campaign requirements not met
15. `INSUFFICIENT_BALANCE`: Insufficient wallet balance
16. `RATE_LIMIT_EXCEEDED`: API rate limit exceeded

This comprehensive API architecture provides all the necessary endpoints, data models, and relationships to support the streamer-centric ad campaign dashboard frontend. It includes authentication, authorization, state management, third-party integrations, and real-time communication requirements to ensure a robust and scalable backend system.