import Trait from "./Trait";

export default interface Character {
    id: number;
    name: string;
    entry?: string;
    image?: string;
    image_full?: string;
    image_thumb?: string;
    has_custom_image?: boolean;
    is_private?: boolean;
    is_personality_visible?: boolean;
    is_template?: boolean;
    entity_id: number;
    tags?: [];
    created_at?: Date;
    created_by?: number;
    updated_at?: Date;
    updated_by?: number;
    location_id?: number;
    title?: string;
    age?: string;
    sex?: string;
    pronouns?: string;
    races?: number[];
    private_races?: number[];
    type?: string;
    families?: number[];
    private_families?: number[];
    is_dead?: boolean;
    traits?: Trait[]
}