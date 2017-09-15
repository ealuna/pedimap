const prueba = require('../api/services/request')('ORIUNDA');
//const prueba1 = require('../models/flota2')
//const prueba4 = require('../models/vehiculo')('ORIUNDA');
const utils = require('../api/services/utils');
let cookie = '';
/*
function requestErrorHandler(error){
	return prueba.authenticate().then(() => {
		//cookie = value;
		return prueba.getFleetData('all').then(prueba2);
	});
}
*/
/*function setNewCookie(value){
	cookie = value;
	return prueba.getFleetData(cookie, 'all').then();
}
*/
function prueba2(x) {
	//console.log(x.MapData.DataSet);
	//const result = prueba1(x);
    //console.log(result);
console.log(x.MapData.DataSet);

}

function a(){
	//console.log(prueba.cookie);
/*prueba.fleetData('all')
.then(prueba2);*/
    prueba.deviceData('352544070751640', 15)
        .then(prueba2);


//.catch(prueba.fleetErrorHandler)
//.then(setNewCookie)
/*
.then( result => {
	//console.log(result);
	console.log("Obtenido");
	//return utils.parseXML(result);
})*/
/*.then( result => {
	console.log(result.MapData.DataSet);
});*/

}
a();
setInterval(a, 10000);
