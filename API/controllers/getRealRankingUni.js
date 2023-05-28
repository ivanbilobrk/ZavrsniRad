const { getRealRanking } = require('../db/dbFunctions')

const getRealRankingForYearUniCategory = async (req, res)=>{

    const{ year, category, uni } = req.query

    let results = await getRealRanking(uni, year, category)

    if(results.length > 0){
        results[0].total = results[0].q1+results[0].cnci+results[0].ic*0.2+results[0].top+results[0].award
    }
    return res.json(results[0])
}

module.exports = { getRealRankingForYearUniCategory }