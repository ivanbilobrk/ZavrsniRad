const { getUnisPaginated } = require('../db/getUnisPaginated')

const getAllForYearAndCategory = async (req, res)=>{

    const { page, limit, search, orderid, orderkey, year, category } = req.query

    const unis = await getUnisPaginated(page, limit, search, orderid, orderkey, year, category)

    return res.json(unis)
}

module.exports = { getAllForYearAndCategory }