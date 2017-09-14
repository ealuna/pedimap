//const connection = require('api.utils').formatDatetime("yyyy/mm/dd/HH:MM");

//console.log(connection);

const prueba = require('./requests')('TERRANORTE');
const utils = require('./api.utils');
let cookie = '';

function requestErrorHandler(error){
	console.log('Nueva Cookie');
	return prueba.getNewCookie().then((value) => {
        cookie = value;
        return prueba.getFleetData(cookie, 'all').then(pruebaConsola);
	});
}
/*
function setNewCookie(value){
	cookie = value;
	return prueba.getFleetData(cookie, 'all');
}
*/

function pruebaConsola(value) {

	console.log(cookie);
	return value;
}


function a(){
/*prueba.getFleetData(cookie, 'all')
.then(result => {
	console.log('Hola')
	console.log(result);
})
.catch(requestErrorHandler)
.then(setNewCookie)
.then( result => {
	//console.log(result);
	return utils.parseXML(result);
})
.then( result => {
	console.log(result.MapData.DataSet);
})
;
*/
prueba.getFleetData(cookie, 'all')
	.then(pruebaConsola)
	.catch(requestErrorHandler)
	.then(utils.parseXML).then((result) => {
	console.log(result);
});

}
setInterval(a, 3000);
