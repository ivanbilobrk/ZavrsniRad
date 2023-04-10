const { seedAward, seedIndicators } = require('../db/seed')

async function scheduledFunction(){
    await seedAward("EEE")
    await seedAward("CSE")
    const year = new Date().getFullYear();

    let dataSelector1 = '[aria-label="View more data for EEE1"]'
    let dataSelector2 = '[aria-label="View more data for EEE2"]'
    await seedIndicators("EEE", dataSelector1, dataSelector2, year, year)

    dataSelector1 = '[aria-label="View more data for CSE1"]'
    dataSelector2 = '[aria-label="View more data for CSE2"]'
    await seedIndicators("CSE", dataSelector1, dataSelector2, year, year)

}

module.exports = { scheduledFunction }