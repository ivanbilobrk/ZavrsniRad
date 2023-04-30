const { getDataForUniCurrentYear } = require('../db/dbFunctions')

const getUniCurrentYearProgress = async (req, res)=>{

    const { uni, category } = req.query

    const dataUni = await getDataForUniCurrentYear(category, uni)

    return res.json(dataUni)
}

module.exports = { getUniCurrentYearProgress }