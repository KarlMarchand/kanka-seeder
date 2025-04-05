export default interface Organisation {
    id: number;
    name: string;
    entry: string;
    image: string;
    image_full: string;
    image_thumb: string;
    has_custom_image: boolean;
    is_private: boolean;
    entity_id: number;
    tags: number[];
    created_at:  Date;
    created_by: number;
    updated_at:  Date;
    updated_by: number;
    organisation_id: number;
    type: string;
    is_defunct: boolean;
    members: number[];
    locations: number[];
}