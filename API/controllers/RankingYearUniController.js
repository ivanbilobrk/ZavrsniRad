const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')

const getRankingForYearUniCategory = async (req, res)=>{

    const{ year, category, uni } = req.query

    let results = await getAllUnisForYearAndCategory(year, category, 'total', 'false')
    let ranking = {}
    let index = 0;

    for(let i in results){
        if(results[i].uni == uni){
            index = i;
            ranking = results[i]
        }
    }

    return res.json(ranking)
}

module.exports = { getRankingForYearUniCategory }