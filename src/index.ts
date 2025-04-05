import { Blades } from './campaigns/Blades';
import { Cthulhu } from './campaigns/Cthulhu';
import { Vampire } from './campaigns/Vampire';
import { Warhammer } from './campaigns/Warhammer';
import CampaignFeeder from './types/CampaignFeeder';

require('dotenv').config();

const apiKey = process.env.API_KEY;
const campaignName = process.argv[2]; // Get the campaign name from command line

if (!apiKey) {
    console.error("Error: API key not found. Please check your .env file.");
    process.exit(1);
}

if (!campaignName) {
    console.error("Error: Campaign name not provided. Please specify a campaign name.");
    process.exit(1);
}

const campaigns: { [key: string]: new (apiKey: string) => CampaignFeeder } = {
    "coc": Cthulhu,
    "vampire": Vampire,
    "blades": Blades,
    "warhammer": Warhammer
}

const campaign = new campaigns[campaignName.toString()](apiKey);

async function startCampaign(campaign: CampaignFeeder) {
    try {
        await campaign.seedCampaign();
        console.log("Seeding complete!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

startCampaign(campaign);
