const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')

const getAllForYearAndCategory = async (req, res)=>{
    const year = req.query.year
    const category = req.query.category

    let results = await getAllUnisForYearAndCategory(year, category)
    return res.json(results)
}

module.exports = { getAllForYearAndCategory }