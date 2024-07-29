import { allFakers } from "@faker-js/faker"
import { randomChoice, randomChoiceOrDefault } from "./rng.mjs"



export function getRandomFullName(temperamentArr, breedName, petName) {
    const temperament = randomChoiceOrDefault(temperamentArr, "Nice")
    
    return `${petName}, the ${temperament} ${breedName}`
}

/**
 * Generates a random first name using the Faker library for the specified country code.
 * If the provided country code is not available, it selects a random country code.
 * @param {string} countryCode - The country code (ISO 3166-1 alpha-2) for which to generate a name.
 * @returns {string} A random first name for the specified country.
 */
export function getRandomNameFromCountry(countryCode) {
    const code = countryCode.toLowerCase()

    const chosenCode = toFakerCodeOrRandom(code)

    const name = allFakers[chosenCode].person.firstName()

    return name
}


/**
 * Converts the provided country code to a valid Faker code or selects a random one from the available codes.
 * @param {string} countryCode - The country code (ISO 3166-1 alpha-2) to convert or select.
 * @returns {string} A valid Faker code for the provided country code or a random one.
 */
function toFakerCodeOrRandom(countryCode) {
    const availableCodes = availableCountryCodes()
    const availableCodesArr = Object.keys(availableCodes)
    const chosenCode = thisCodeOrRandom(countryCode, availableCodesArr)

    const fakerCode = availableCodes[chosenCode]

    return fakerCode
}

/**
 * Selects either the provided country code or a random one from the available codes array.
 * If the provided country code is included in the available codes array, it is returned.
 * Otherwise, a random country code from the available codes array is returned.
 * @param {string} countryCode - The country code to check or select.
 * @param {string[]} availableCodes - An array of available country codes.
 * @returns {string} The selected country code.
 */
function thisCodeOrRandom(countryCode, availableCodes) {
    if (availableCodes.includes(countryCode)) {
        return countryCode
    } 

    // const randomIndex = Math.floor(Math.random() * availableCodes.length)
    // const randomCode = availableCodes[randomIndex]
    return randomChoice(availableCodes)
}

function availableCountryCodes() {
    const fakerCodes = Object.keys(allFakers)

    const codesPreprocessed = fakerCodes
        .map(codeStr => [extractCountryCode(codeStr), codeStr])
        .filter(([countryCode]) => countryCode !== null)
        .map(([countryCode, codeStr]) => [countryCode.toLowerCase(), codeStr])

    // a set is involved to get rid of duplicates
    return [...new Set(codesPreprocessed)]
        .reduce((acc, [countryCode, codeStr]) => {
            acc[countryCode] = codeStr
            return acc
    }, {})
}


function extractCountryCode(codeStr) {
    const parts = codeStr.split('_')
    if (parts.length === 1 && parts[0].length === 2) {
        return parts[0]
    } else if (parts.length >= 2 && parts.length <= 3 && parts[1].length === 2) {
        return parts[1]
    }
    return null
}

