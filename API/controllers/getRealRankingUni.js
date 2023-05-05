const { getRealRanking } = require('../db/dbFunctions')

const getRealRankingForYearUniCategory = async (req, res)=>{

    const{ year, category, uni } = req.query

    let results = await getRealRanking(uni, year, category)

    return res.json(results)
}

module.exports = { getRealRankingForYearUniCategory }