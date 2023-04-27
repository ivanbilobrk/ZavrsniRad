const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')
const { getUnisPaginated } = require('../db/getUnisPaginated')

const getAllForYearAndCategory = async (req, res)=>{

    const { page, limit, search, orderid, orderkey, year } = req.query

    const unis = await getUnisPaginated(page, limit, search, orderid, orderkey, year)

    return res.json(unis)
}

module.exports = { getAllForYearAndCategory }