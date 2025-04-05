import CampaignFeeder from "../types/CampaignFeeder";

export class Warhammer extends CampaignFeeder {
    private _campaignId: number = 207764;

    public getCampaignId(): number {
        return this._campaignId;
    }

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}