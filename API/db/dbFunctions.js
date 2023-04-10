const { pool } = require('./seed')

async function getAllUnisForYearAndCategory(year, category){

    const query = `SELECT DISTINCT ON (uni) *
                   FROM ranking
                   WHERE year = $1 and category = $2
                   ORDER BY uni, ABS(EXTRACT(epoch FROM (readingyear - NOW())))`

    let rows = (await pool.query(query, [year, category])).rows
    
    rows.sort((a, b)=>{
        const aq1 = isNaN(a.q1) ? 0 : a.q1
        const acnci = isNaN(a.cnci) ? 0 : a.cnci
        const aic = isNaN(a.ic) ? 0 : a.ic
        const atop = isNaN(a.top) ? 0 : a.top
        const aaward = isNaN(a.award) ? 0 : a.award

        const bq1 = isNaN(b.q1) ? 0 : b.q1
        const bcnci = isNaN(b.cnci) ? 0 : b.cnci
        const bic = isNaN(b.ic) ? 0 : b.ic
        const btop = isNaN(b.top) ? 0 : b.top
        const baward = isNaN(b.award) ? 0 : b.award

        return (bq1+bcnci+bic*0.2+btop+baward) - (aq1+acnci+aic*0.2+atop+aaward)
    });
    return rows
}

module.exports = { getAllUnisForYearAndCategory }