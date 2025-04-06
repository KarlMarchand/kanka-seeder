import axios from 'axios';
import Character from "../types/characters/Character";
import Organisation from "../types/organisations/Organisation";
import Location from "../types/locations/Location";
import NewLocation from '../types/locations/NewLocation';
import NewCharacter from '../types/characters/NewCharacter';
import NewOrganisation from '../types/organisations/NewOrganisation';
import OrganisationMember from '../types/organisations/OrganisationMember';
import Bottleneck from 'bottleneck';


/**
 * For more details about the kanka rest api see https://app.kanka.io/api-docs/1.0/overview. Kanka allows 90 request per minute 
 * for a paying customer so we must limit the number of calls to the api to this. 
 */

export default class KankaClient {
    private baseUrl: string;
    private apiKey: string;
    private limiter: Bottleneck;
    private endpoints = {
        characters: 'characters',
        locations: 'locations',
        organisations: 'organisations'
    }

    constructor(campaignId: number, kankaApiKey: string, limitCallsPerMinute: number) {
        this.baseUrl = `https://api.kanka.io/1.0/campaigns/${campaignId.toString()}`;
        this.apiKey = kankaApiKey;

        this.limiter = new Bottleneck({
            minTime: Math.ceil(600000 / limitCallsPerMinute), // Minimum time between requests in milliseconds
            maxConcurrent: 1, // Only one request at a time
        });

        // Handle rate limit exceeded
        this.limiter.on('failed', async (error, jobInfo) => {
            if (error.response && error.response.status === 429) {
                console.warn(`Rate limit hit. Retrying after delay...`);
                return 1000; // Retry after 1 second
            }
            return null; // Do not retry for other errors
        });
    }

    public async createCharacter(newCharacter: NewCharacter): Promise<Character> {
        return this.rateLimitedPost<NewCharacter, Character>(this.endpoints.characters, newCharacter);
    }

    public async createLocation(newLocation: NewLocation): Promise<Location> {
        return this.rateLimitedPost<NewLocation, Location>(this.endpoints.locations, newLocation);
    }

    public async createOrganisation(newOrganisation: NewOrganisation): Promise<Organisation> {
        return this.rateLimitedPost<NewOrganisation, Organisation>(this.endpoints.organisations, newOrganisation);
    }

    public async addMemberToOrganisation(organisationMember: OrganisationMember): Promise<Organisation> {
        const url = `${this.endpoints.organisations}/${organisationMember.organisation_id}/organisation_members`;
        return this.rateLimitedPost<OrganisationMember, Organisation>(url, organisationMember);
    }
    
    private async rateLimitedPost<PayloadType, ResponseType>(url: string, data: PayloadType): Promise<ResponseType> {
        return this.limiter.schedule(() => this.postToKanka<PayloadType, ResponseType>(url, data));
    }        

    private async postToKanka<PayloadType, ResponseType>(url: string, data: PayloadType): Promise<ResponseType> {
        const response = await axios.post<ResponseType>(`${this.baseUrl}/${url}`, data, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
}