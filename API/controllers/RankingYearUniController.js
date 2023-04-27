const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')

const getRankingForYearUniCategory = async (req, res)=>{
    const year = req.query.year
    const category = req.query.category
    const uni = req.query.uni

    let results = await getAllUnisForYearAndCategory(year, category)
    let ranking = {}
    let index = 0;

    for(let i in results){
        if(results[i].uni == uni){
            index = i;
            ranking = results[i]
        }
    }

    ranking.position = index

    return res.json(ranking)
}

module.exports = { getRankingForYearUniCategory }