import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(__dirname, '../../.env.local') });

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'ad-campaign-monorepo';

const demoCampaigns = [
  {
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
    userId: "demo-user-id",
  },
  {
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
    userId: "demo-user-id",
  },
  {
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
    userId: "demo-user-id",
  },
  {
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
    userId: "demo-user-id",
  },
  {
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
    userId: "demo-user-id",
  },
  {
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
    userId: "demo-user-id",
  },
];

async function seedDemoData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const campaignsCollection = db.collection('campaigns');

    // Clear existing demo data
    await campaignsCollection.deleteMany({ userId: "demo-user-id" });
    console.log('Cleared existing demo data');

    // Insert new demo data
    const result = await campaignsCollection.insertMany(demoCampaigns);
    console.log(`Inserted ${result.insertedCount} demo campaigns`);

  } catch (error) {
    console.error('Error seeding demo data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDemoData(); 