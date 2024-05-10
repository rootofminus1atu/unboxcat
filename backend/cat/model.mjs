import { Schema, model } from "mongoose";

const breedSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    temperament: { type: [String], required: true },
    alt_names: { type: [String], required: true },
    origin: { type: String, required: true },
    country_code: { type: String, required: true },
    description: { type: String, required: true },
    wikipedia_url: { type: String, required: true },
});

const catSchema = new Schema({
    _id: { type: String, required: true },
    imgUrl: { type: String, required: true },
    breed: { type: breedSchema, required: true },

    rarity: { type: String, required: true },
    petName: { type: String, required: true },
    fullName: { type: String, required: true }
}, { timestamps: true });

export const Cat = model('cats', catSchema)