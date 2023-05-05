const { getRealRanking } = require('../db/dbFunctions')
const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')

const getDifference = async (req, res)=>{
    const{ year, category } = req.query

    let resultsCustom = await getAllUnisForYearAndCategory(year, category, 'total', 'false')

    for(let i in resultsCustom){
        let resultCustom = resultsCustom[i]

        let resultsReal = (await getRealRanking(resultCustom['uni'], year, category))[0]
        
        if(resultsReal){
            //console.log(resultsReal.uni)
            //console.log(resultsReal.position+" "+resultCustom.position)
        }
    }

    //let results = await getRealRanking(uni, year, category)



}

module.exports = { getDifference }