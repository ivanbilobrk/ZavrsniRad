const { getRealRanking } = require('../db/dbFunctions')
const { getAllUnisForYearAndCategory } = require('../db/dbFunctions')

const getDifference = async (req, res)=>{
    const{ year, category } = req.query

    let resultsCustom = await getAllUnisForYearAndCategory(year, category, 'total', 'false')
    let correctNum = 0;
    let totalNum = 0;
    for(let i in resultsCustom){
        
        let resultCustom = resultsCustom[i]
        let resultsReal = (await getRealRanking(resultCustom['uni'], year, category))[0]
        if(resultsReal){
            ++totalNum;
            if(resultsReal.position.includes('-')){
                let lPos = resultsReal.position.split('-')[0];
                let uPos = resultsReal.position.split('-')[1];
                if(resultCustom.position <= uPos && resultCustom >= lPos)
                    correctNum++;
            } else {
                let uPos = parseInt(resultsReal.position)+3
                let lPos = parseInt(resultsReal.position)-3
                if(parseInt(resultCustom.position) <= uPos && parseInt(resultCustom.position) >= lPos){
                    correctNum++;
                }

            }
        }
    }
    let percentageCorrect = correctNum/totalNum
    return res.json({correct: percentageCorrect})

}

module.exports = { getDifference }