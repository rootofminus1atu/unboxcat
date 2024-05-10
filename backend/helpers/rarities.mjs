

/**
 * Represents a set of rarities with an associated probability factor
 */
const rarities = {
    names: [
        'COMMON',
        'RARE',
        'LEGENDARY',
        'MYTHIC'
    ],
    rarityFactor: 0.3,  // 0.3 for 4 rarities results in a little less than 1% for mythic
    getRarityForRandomNum: function(randomNum) {
        let index = 0;
        let factor = this.rarityFactor;
        
        while (randomNum < factor && index < this.names.length - 1) {
            index++
            factor *= this.rarityFactor
        }
        
        return this.names[index];
    }
}

/**
 * Generates a random rarity name based on the predefined rarities and their probabilities.
 * @returns {string} A randomly chosen rarity name.
 */
export function getRandomRarity() {
    const rand = Math.random()
    const rarity = rarities.getRarityForRandomNum(rand)
    console.log(rand, rarity)
    return rarity
}
