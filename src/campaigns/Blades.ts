import CampaignFeeder from "../types/CampaignFeeder";

export class Blades extends CampaignFeeder {
    private _campaignId: number = 231670;

    public getCampaignId(): number {
        return this._campaignId;
    }

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}