import CampaignSeeder from "../types/CampaignSeeder";

export class Warhammer extends CampaignSeeder {
    protected campaignId: number = 207764;

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}