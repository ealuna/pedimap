/**
 * Created by Edward Luna Noriega on 06/09/17.
 */
const connection = require('./services/connection');
const df = require('dateformat');
/*
module.exports = (name) => {
    const database = connection(name);
    for (let i = 0; ) {

    }


};*/

console.log(df('5:00 PM', 'HH:MM'))