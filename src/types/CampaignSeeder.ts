import KankaClient from '../services/KankaService';

export default abstract class CampaignSeeder {
    protected abstract campaignId: number;
    private kankaClient: KankaClient | undefined = undefined;
    
    constructor() {}
    
    public configureKankaClient(apiKey?: string): void {
        if (!apiKey) {
            console.error("Error: API key not found. Please check your .env file.");
            process.exit(1);
        }

        this.kankaClient = new KankaClient(this.campaignId, apiKey);
    }
    
    public abstract seedCampaign(): Promise<void>;
    
    protected get HttpClient(): KankaClient {
        this.ensureKankaClientWasConfigured();
        return this.kankaClient!;
    }
    
    private ensureKankaClientWasConfigured(): void {
        if (!this.kankaClient) {
            throw new Error("Kanka client is not initialized. Please call setKankaClient() before trying to see.");
        }
    } 
}