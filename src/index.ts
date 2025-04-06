import dotenv from 'dotenv';
import { Blades } from './campaigns/Blades';
import { Cthulhu } from './campaigns/Cthulhu';
import { Vampire } from './campaigns/Vampire';
import { Warhammer } from './campaigns/Warhammer';
import CampaignSeeder from './types/CampaignSeeder';

dotenv.config();
const apiKey = process.env.API_KEY;
const rateLimit = process.env.RATE_LIMIT;
const campaignName = process.argv[2]; // Get the campaign name from command line arguments

if (!campaignName) {
    console.error("Error: Campaign name not provided. Please specify a campaign name.");
    process.exit(1);
}

// Add your custom campaigns here
// The key should match the name you provide in the command line argument
const campaigns: { [key: string]: new () => CampaignSeeder } = {
    "coc": Cthulhu,
    "vampire": Vampire,
    "blades": Blades,
    "warhammer": Warhammer
}

const campaign = new campaigns[campaignName]();
campaign.configureKankaClient(apiKey, rateLimit);

async function startCampaign(campaign: CampaignSeeder) {
    try {
        console.log("Seeding Started!");
        await campaign.seedCampaign();
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

startCampaign(campaign);
