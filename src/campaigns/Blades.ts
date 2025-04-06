import CampaignSeeder from "../types/CampaignSeeder";

export class Blades extends CampaignSeeder {
    protected campaignId: number = 231670;

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}