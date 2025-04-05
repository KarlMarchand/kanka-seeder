export default interface Location {
            id: number;
            name: string;
            entry?: string;
            image?: string;
            image_full?: string;
            image_thumb?: string;
            has_custom_image?: false;
            is_destroyed?: true;
            is_private?: true;
            location_id?: number;
            entity_id?: number;
            tags?: number[];
            created_at?:  Date;
            created_by?: number;
            updated_at?:  Date;
            updated_by?: number;
            type?: string;
}