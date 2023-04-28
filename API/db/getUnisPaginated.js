const _ = require('lodash')
const { getAllUnisForYearAndCategory } = require('./dbFunctions')

exports.getUnisPaginated = async (
    page = 0,
    limit = 10,
    search = '',
    orderid = 'position',
    orderkey = 'true',
    year ,
    category
) => {
    try {
        var paginate = limit * page - 1
        var offset = paginate < 0 ? 0 : paginate

        if(orderid == 'position'){
            orderid = 'total'
            orderkey = 'false'
        }

        let unis = await getAllUnisForYearAndCategory(year, category, orderid, orderkey)

        
        unis = unis.filter((a) =>{
            return a.uni.toLowerCase().includes(search.toLowerCase(), 0)
        })

        const unisSliced = unis.slice(offset)
        const unisLimited = unisSliced.slice(0, limit)

        const countTotal = unis.length


        return {
            data: unisLimited,
            totalRow: countTotal,
            totalPage: Math.ceil(countTotal / limit),
        }
    } catch (error) {
        console.log(`Error on roleDatatable: ${error}`)
        return false
    }
}