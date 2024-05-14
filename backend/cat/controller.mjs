import express from 'express'
import { Cat } from './model.mjs'
import { apiKey } from '../server.mjs'
import { getRandomRarity } from '../helpers/rarities.mjs'
import { getRandomFullName, getRandomNameFromCountry } from '../helpers/names.mjs'
import { ObjectId } from 'bson'

export const catRoutes = express.Router()
    .get('/', getAllCats)
    .get('/:id', getCat)
    .post('/random', getRandomCat)


async function getAllCats(req, res) {
    const cats = await Cat
        .find({})
        .sort({ createdAt: -1 })

    res.status(200).json(cats)
}

async function getCat(req, res) {
    const { id } = req.params

    const cat = await Cat.findById(id)

    if (!cat) {
        return res.status(404).json({ error: 'No such cat.' })
    }

    res.status(200).json(cat)
}

async function getRandomCat(req, res) {
    const cat = await fetchRandomCat()
    if (!cat) {
        return res.status(500).json({ error: "Fetching a random cat failed :(" })
    }

    const foundCat = await Cat.findById(cat.id)
    if (foundCat) {
        console.log("================== OMG ==================")
        console.log("cat that was previously discovered:")
        console.log(foundCat.fullName, foundCat.rarity)
        console.log("================== OMG ==================")

        return res.status(200).json(foundCat)
    }

    const breed = cat.breeds[0]  // just considering the main breed
    const countryCode = breed.country_code

    const rarity = getRandomRarity()
    const petName = getRandomNameFromCountry(countryCode)
    const temperamentArr = breed.temperament ? breed.temperament.split(',').map(s => s.trim()) : []
    const altNamesArr = breed.alt_names ? breed.alt_names.split(',').map(s => s.trim()) : []
    const fullName = getRandomFullName(temperamentArr, breed.name, petName)

    const catData = {
        _id: cat.id,
        imgUrl: cat.url,
        breed: {
            id: breed.id,
            name: breed.name,
            temperament: temperamentArr,
            alt_names: altNamesArr,
            origin: breed.origin,
            country_code: countryCode,
            description: breed.description,
            wikipedia_url: breed.wikipedia_url,
        },
        rarity: rarity,
        petName: petName,
        fullName: fullName
    }

    try {
        const createdCat = await Cat.create(catData)
        res.status(200).json(createdCat)
    } catch (error) {
        // should never happen but who knows
        res.status(400).json({ error: error.message })
    }
}

async function fetchRandomCat() {
    const url = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&has_breeds=1`
    const resp = await fetch(url)

    if (!resp.ok) {
        console.error('Network response was not ok')
        return null
    }

    try {
        const jsonData = await resp.json()
        return jsonData[0]
    } catch (error) {
        console.error('Error parsing JSON:', error.message, error)
        return null
    }
}