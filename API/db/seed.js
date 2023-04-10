const {Pool} = require('pg');
const readExcel = require('read-excel-file/node')
const { login } = require('../helpFunctions/Scrapper')
const { scrapeQ1CNCIIC } = require('../helpFunctions/Scrapper')
const { getNameQ1CNCIIC, getTop } = require('../helpFunctions/ReadCSV')
require('dotenv').config({ path: __dirname + '/../.env'});
const env = process.env;

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
});


const sql_create_award = `CREATE TABLE award (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    uni text NOT NULL,
    year  int not null,
    share double precision NOT NULL,
    category text NOT NULL
)`;

const sql_create_ranking = `CREATE TABLE ranking (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    uni text NOT NULL,
    year int NOT NULL,
    q1 double precision NOT NULL,
    cnci double precision NOT NULL,
    ic double precision NOT NULL,
    top double precision,
    award double precision,
    category text NOT NULL,
    readingYear timestamp default now()
)`;

let table_names = [
    "award",
    "ranking"
]

let tables = [
    sql_create_award,
    sql_create_ranking
];

let table_data = [
   // sql_insert_users
]

let indexes = [];

async function getExcelAwardData(fileName, category) {
    const data = await readExcel(fileName);
    const queries = [];
    for (let i in data) {
        if(data[i][2] != "-"){
            queries.push(`insert into award (uni, year, share, category) values ('${data[i][0]}', ${data[i][1]}, ${data[i][2]}, '${category}')`);
        } 
       
    }
    return queries;
}

async function createTables(){
    console.log("Creating and populating tables");

    for(let i = 0; i < tables.length; i++){
        try{
            await pool.query(`drop table if exists ${table_names[i]}`, []);
            await pool.query(tables[i], []);
            console.log("Table " + table_names[i] + " created.");
        } catch(err){
            console.log(err)
        }
    }
}

async function seedAward(category){
    await pool.query('delete from award', []);
    const queries = await getExcelAwardData(__dirname+'/../../'+category+'.xlsx', category);

    for(let j in queries){
        try{
            await pool.query(queries[j], []);
        } catch(err){
            return console.log(err.message);
        }
    }
}

//award table seed
async function seedIndicators(category, dataSelector1, dataSelector2, startYear, endYear){


    try {

        let page = await login();
        const client = await page.target().createCDPSession()
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: './IncitesInitCSV',
        })

        for(let j = startYear; j <= endYear; j++){
            let path = './IncitesInitCSV/Incites Organizations.csv'

            await scrapeQ1CNCIIC(page, j-6, j-2, dataSelector1);
            
            const unis = [];
            const maxValues = await getNameQ1CNCIIC(path, unis);
            let maxCNCI = Math.min(maxValues.CNCIMAX, 2*maxValues.CNCISUM/unis.length);
            console.log(unis)

            await scrapeQ1CNCIIC(page, j-6, j-2, dataSelector2)

            const unis2 = [];
            const maxValues2 = await getTop(path, unis2);
            let maxTop = maxValues2.TOP
            

            for(let l in unis2){
                for(let k in unis){
                    if(unis2[l].name == unis[k].name){
                        unis[k].TOP = unis2[l].TOP
                    }
                }
            }
            
            for(let l in unis){
                const unisAward = new Map();
                let maxAward = await getMaxAwardForYear(j-2, category, unisAward)
                await pool.query('insert into ranking (uni, q1, cnci, ic, top, category, award, year) values ($1, $2, $3, $4, $5, $6, $7, $8)', [unis[l].name,
                                Math.sqrt(unis[l].Q1/maxValues.Q1)*100, 
                                Math.min(Math.sqrt(unis[l].CNCI/maxCNCI)*100, 100), 
                                Math.sqrt(unis[l].IC/maxValues.IC)*100, 
                                Math.sqrt(unis[l].TOP/maxTop)*100, 
                                category,
                                Math.sqrt(unisAward.get(unis[l].name)/maxAward)*100,
                                j])
            }
        }
    } catch (err) {
        console.log(err)
        return console.log(err.message);
    }

    
}

function getMapingForAward(year){
    const maping = new Map();
    let firstYear = 0;
    let lastDigit = year%10

    if(lastDigit == 0){
        firstYear = year-9
    } else {
        firstYear = year - lastDigit + 1
    } 

    let secondYear = firstYear-10;
    let thirdYear = firstYear-20;
    let fourthYear = firstYear-30;

    maping.set(firstYear, 1);
    maping.set(secondYear, 0.75);
    maping.set(thirdYear, 0.5);
    maping.set(fourthYear, 0.25);
    return maping
}

async function getMaxAwardForYear(year, category, awardData){
    let rows = (await pool.query('select share, year, uni from award where category = $1 and year <= $2', [category, year])).rows;
    let maxAward = 0;

    const maping = getMapingForAward(year);
    for(let i in rows){
        let weight = 0;
        for(const key of maping.keys()){
            if(rows[i].year >= key){
                weight = maping.get(key)
                break;
            }
        }

        let currentAward = awardData.get(rows[i].uni);

        if(currentAward == undefined || currentAward == null)
            currentAward = 0;
        
        currentAward += weight*rows[i].share;
        if(currentAward > maxAward) maxAward = currentAward;
        awardData.set(rows[i].uni, currentAward)
        
    }
    return maxAward
}

/*(async()=>{
    await createTables();
    await seedAward("EEE")
    await seedAward("CSE")

    let dataSelector1 = '[aria-label="View more data for EEE1"]'
    let dataSelector2 = '[aria-label="View more data for EEE2"]'
    await seedIndicators("EEE", dataSelector1, dataSelector2, 2017, new Date().getFullYear()-1)

    dataSelector1 = '[aria-label="View more data for CSE1"]'
    dataSelector2 = '[aria-label="View more data for CSE2"]'
    await seedIndicators("CSE", dataSelector1, dataSelector2, 2017, new Date().getFullYear()-1)

})()*/

module.exports = {seedAward, seedIndicators, pool}