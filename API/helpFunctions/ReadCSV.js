const fs = require('fs');
const {Pool} = require('pg');
const csv = require('csv-parser');
require('dotenv').config({ path: __dirname + '/../../.env'});
const env = process.env;
const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD
    //port: parseInt(env.DB_PORT),
});

function getNameQ1CNCIIC(path, unis){

    return new Promise((resolve, reject) => {

        const maxValues = {
            Q1:0,
            CNCIMAX:0,
            CNCISUM:0,
            IC:0
        }
    
        fs.createReadStream(path)
          .pipe(csv())
          .on('data', (data) => {
            let name = Object.values(data)[0]
            if((name !== "Nanyang Technological University & National Institute of Education (NIE) Singapore") && (data["Documents in Q1 Journals"] != null) && (data["Documents in Q1 Journals"] != undefined)){
                let q1 = parseInt(data["Documents in Q1 Journals"]);
                let cnci = parseFloat(data["Category Normalized Citation Impact"])
                let ic = parseInt(data["% International Collaborations"])
    
                if(maxValues.Q1 < q1){
                    maxValues.Q1 = q1
                }
                if(maxValues.CNCIMAX < cnci){
                    maxValues.CNCIMAX = cnci
                }
                if(maxValues.IC < ic){
                    maxValues.IC = ic
                }
    
                maxValues.CNCISUM = parseFloat(maxValues.CNCISUM)+parseFloat(cnci)
                unis.push({
                    name: name,
                    Q1: q1,
                    CNCI: cnci,
                    IC: ic
                })
            }
          })
          .on('end', () => {
            resolve(maxValues);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
}

function getTop(path, unis){

    return new Promise((resolve, reject) => {

        const maxValues = {
            TOP: 0
        }
    
        fs.createReadStream(path)
          .pipe(csv())
          .on('data', (data) => {
            let name = Object.values(data)[0]
            if((name !== "Nanyang Technological University & National Institute of Education (NIE) Singapore") && (data["Web of Science Documents"] != null)){
                let top = parseInt(data["Web of Science Documents"]);
    
                if(maxValues.TOP < top){
                    maxValues.TOP = top
                }
    
                unis.push({
                    name: name,
                    TOP: top
                })
            }
          })
          .on('end', () => {
            resolve(maxValues);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
}

module.exports = { getNameQ1CNCIIC, getTop }