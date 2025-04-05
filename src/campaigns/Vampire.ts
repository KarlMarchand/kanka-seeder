import CampaignFeeder from "../types/CampaignFeeder";

export class Vampire extends CampaignFeeder {
    private _campaignId: number = 267454;
    
    public getCampaignId(): number {
        return this._campaignId;
    }

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}