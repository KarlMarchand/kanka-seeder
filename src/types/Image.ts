export default interface Image {
    id: string;
    name: string;
    is_folder: boolean;
    folder_id?: number;
    path: string;
    ext: string;
    size: number;
    created_at: Date;
    created_by: number;
    updated_at: Date;
    focus_x?: number;
    focus_y?: number;
}