import axios from 'axios';
import Character from "../types/characters/Character";
import Organisation from "../types/organisations/Organisation";
import Location from "../types/locations/Location";
import NewLocation from '../types/locations/NewLocation';
import NewCharacter from '../types/characters/NewCharacter';
import NewOrganisation from '../types/organisations/NewOrganisation';
import OrganisationMember from '../types/organisations/OrganisationMember';

/**
 * For more details about the kanka rest api see https://app.kanka.io/api-docs/1.0/overview.
 */

export default class KankaClient {
    private _baseUrl: string;
    private _apiKey: string;

    private _endpoints = {
        characters: 'characters',
        locations: 'locations',
        organisations: 'organisations',
        image: 'entities/{entity.id}/image',
    }

    constructor(private campaignId: number, private apiKey: string) {
        this._baseUrl = `https://app.kanka.io/api/1.0/campaigns/${campaignId.toString()}`;
        this._apiKey = apiKey;
    }
        

    async postToKanka<PayloadType, ResponseType>(url: string, data: PayloadType): Promise<ResponseType> {
        const response = await axios.post<ResponseType>(`${this._baseUrl}/${url}`, data, {
            headers: {
                'Authorization': `Bearer ${this._apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }

    async createCharacter(newCharacter: NewCharacter): Promise<Character> {
        const response = await this.postToKanka<NewCharacter, Character>(this._endpoints.characters, newCharacter);
        return response;
    }
    
    async createLocation(newLocation: NewLocation): Promise<Location> {
        const response = await this.postToKanka<NewLocation, Location>(this._endpoints.locations, newLocation);
        return response;
    }
    
    async createOrganisation(newOrganisation: NewOrganisation): Promise<Organisation> {
        const response = await this.postToKanka<NewOrganisation, Organisation>(this._endpoints.organisations, newOrganisation);
        return response;
    }
    
    async addMemberToOrganisation(organisationMember: OrganisationMember): Promise<Organisation> {
        const response = await this.postToKanka<OrganisationMember, Organisation>(`${this._endpoints.organisations}/${organisationMember.organisation_id}/organisation_members`, organisationMember);
        return response;
    }
}