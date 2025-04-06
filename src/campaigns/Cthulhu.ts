import { promises as fs } from 'fs';
import CampaignSeeder from "../types/CampaignSeeder";
import Organisation from "../types/organisations/Organisation";
import Character from "../types/characters/Character";
import Location from "../types/locations/Location";

export class Cthulhu extends CampaignSeeder {
    protected campaignId: number = 314087;
    private todoTagId: number = 450620;
    private arkhamTagId: number =  452477;
    private arkhamLocationId: number = 1687584;
    private tags = [this.todoTagId, this.arkhamTagId];
    private exampleJsonFilePath = './src/data/cthulhu.json';

    public async seedCampaign(): Promise<void> {
        const jsonData = await fs.readFile(this.exampleJsonFilePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const organisationMap: Map<string, number> = new Map();
        const locationMap: Map<string, number> = new Map();
        const characterMap: Map<string, number> = new Map();

        // Create organisations
        for (const organisation of data.organisations) {
            const createdOrg = await this.createOrganisation(organisation.name, organisation.type);
            organisationMap.set(organisation.name, createdOrg.id);
            console.log(`Created organisation: ${organisation.name}`);
        }

        // Create locations
        for (const location of data.locations) {
            let parentId = this.arkhamLocationId;
            if (location.parent && locationMap.has(location.parent)) {
                parentId = locationMap.get(location.parent)!;
            }
            const createdLoc = await this.createLocation(location.name, location.type, parentId);
            locationMap.set(location.name, createdLoc.id);
            console.log(`Created location: ${location.name}`);
        }

        // Create characters
        for (const character of data.characters) {
            const createdChar = await this.createCharacter(character.name);
            characterMap.set(character.name, createdChar.id);
            console.log(`Created character: ${character.name}`);

            // Link character to organisations
            for (const orgName of character.organisations) {
                if (organisationMap.has(orgName)) {
                    const orgId = organisationMap.get(orgName)!;
                    await this.addMemberToOrganisation(createdChar.id, orgId);
                    console.log(`Added ${character.name} to ${orgName}`);
                }
            }
        }
    }

    private createCharacter(name: string): Promise<Character> {
        return this.HttpClient.createCharacter({
            name,
            type: 'NPC',
            tags: this.tags
        });
    }

    private createLocation(name: string, type: string = 'Building', parentId: number = this.arkhamLocationId): Promise<Location> {
        return this.HttpClient.createLocation({
            name,
            type,
            location_id: parentId,
            tags: this.tags
        });
    }

    private createOrganisation(name: string, type: string): Promise<Organisation> {
        return this.HttpClient.createOrganisation({
            name,
            type,
            tags: this.tags
        });
    }

    private addMemberToOrganisation(characterId: number, organisationId: number, role: string = 'Member'): Promise<Organisation> {
        return this.HttpClient.addMemberToOrganisation({
            organisation_id: organisationId,
            character_id: characterId,
            role
        })
    }
}