const parser = require('xml2js').Parser();
const dateformat = require('dateformat');

module.exports = {
    decodeUnicode: (value) => {
        return value.replace(/\\u([\d\w]{4})/gi, (match, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
        });
    },
    parseXML: (xml) => {
        return new Promise((resolve, reject) => {
            parser.parseString(xml, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    },
    dataArray: (data) => {
        if (!data.hasOwnProperty('MapData')) {
            return [];
        } else if (!data.MapData.hasOwnProperty('DataSet')) {
            return [];
        } else if (!Array.isArray(data.MapData.DataSet)) {
            return [];
        }
        return data.MapData.DataSet;
    },
    rowValidation: (row) => {
        return !row.hasOwnProperty('P') || !row.hasOwnProperty('$');
    },
    formatId: (value) => {
        return value.replace(/^(.-)|\(|\)/g, '');
        //return value.replace(/.*?-|\)/g, '');
    },
    formatVehicle: (value) => {
        return value.replace(/.*?\(|\)/g, '');
    },
    splitArray: (value) => {
        return value.toString().split('|');
    }
};