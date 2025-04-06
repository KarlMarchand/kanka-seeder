import CampaignSeeder from "../types/CampaignSeeder";

export class Vampire extends CampaignSeeder {   
    protected campaignId: number = 267454;

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}