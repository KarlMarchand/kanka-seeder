import CampaignFeeder from "../types/CampaignFeeder";
import Character from "../types/characters/Character";
import Location from "../types/locations/Location";
import Organisation from "../types/organisations/Organisation";

export class Cthulhu extends CampaignFeeder {
    private _campaignId: number = 314087;
    private _todoTagId: number = 450620;
    private _arkhamLocationId: number = 1687584;

    public getCampaignId(): number {
        return this._campaignId;
    }

    public seedCampaign(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private createCharacter(name: string): Promise<Character> {
        return this.kankaClient.createCharacter({
            name,
            type: 'NPC',
            tags: [this._todoTagId]
        });
    }

    private createLocation(name: string, type: string = 'Building', location_id: number = this._arkhamLocationId): Promise<Location> {
        return this.kankaClient.createLocation({
            name,
            type,
            location_id,
            tags: [this._todoTagId]
        });
    }

    private createOrganisation(name: string, type: string): Promise<Organisation> {
        return this.kankaClient.createOrganisation({
            name,
            type,
            tags: [this._todoTagId]
        });
    }

    private linkCharacterToOrganisation(characterId: number, organisationId: number, role: string = 'Member'): Promise<Organisation> {
        return this.kankaClient.addMemberToOrganisation({
            organisation_id: organisationId,
            character_id: characterId,
            role
        })
    }
}