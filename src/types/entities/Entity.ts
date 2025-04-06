import EntityModule from "../../enums/EntityModule";

export default interface Entity {
    id: number;
    name: string;
    type?: string;
    type_id: EntityModule;
    entity_type: string;
    child_id?: number;
    tags: number[];
    is_private: boolean;
    campaign_id: number;
    is_attributes_private: boolean;
    tooltip?: string;
    header_image?: string;
    header_uuid?: string;
    image_uuid?: string;
    created_at: Date;
    created_by?: number;
    updated_at: Date;
    updated_by?: number;
}