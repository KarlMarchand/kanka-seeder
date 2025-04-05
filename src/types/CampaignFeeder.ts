import KankaClient from '../services/KankaService';

export default abstract class CampaignFeeder {
    protected kankaClient: KankaClient;
    
    constructor (apiKey: string) {
        this.kankaClient = new KankaClient(this.getCampaignId(), apiKey);
    }
    
    public abstract getCampaignId(): number;
    
    public abstract seedCampaign(): Promise<void>;
}