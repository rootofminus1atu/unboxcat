export interface Breed {
    id: string;
    name: string;
    temperament: string[];
    alt_names: string[];
    origin: string;
    country_code: string;
    description: string;
    wikipedia_url: string;
    _id: string;
}

export interface Cat {
    _id: string;
    imgUrl: string;
    breed: Breed;
    rarity: string;
    petName: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}