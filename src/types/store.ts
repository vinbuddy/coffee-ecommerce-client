export interface IStore {
    id: number;
    store_name: string;
    address: string;
    city: string;
    google_map_location: string;
    open_time: string;
    close_time: string;
    district: string;
    ward: string;
    image: string;
}

export interface IStoreLocation {
    city: string;
    store_count: number;
}
