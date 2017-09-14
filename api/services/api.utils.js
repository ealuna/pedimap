const parser = require('xml2js').Parser();
const dateformat = require('dateformat');

module.exports = {
    decodeUnicode: (value) => {
        //return String.fromCharCode(parseInt(code, 16));
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
    getDataArray: (data) => {
        if (!data.hasOwnProperty('MapData')) {
            return [];
        } else if (!data.MapData.hasOwnProperty('DataSet')) {
            return [];
        } else if (!Array.isArray(data.MapData.DataSet)) {
            return [];
        }
        return data.MapData.DataSet;
    },
    yesterday: (mask) => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return dateformat(today, mask);
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