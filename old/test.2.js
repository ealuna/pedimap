//const connection = require('api.utils').formatDatetime("yyyy/mm/dd/HH:MM");

//console.log(connection);

const prueba = require('../api/services/request')('TERRANORTE');
const utils = require('../api/services/utils');
let cookie = '';
/*
function requestErrorHandler(error){
	console.log('Nueva Cookie');
	return prueba.getNewCookie().then((value) => {
        cookie = value;
        return prueba.getFleetData(cookie, 'all').then(pruebaConsola);
	});
}*/
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
prueba.fleet('all')
	.then((x)=>{
        //utils.dataArray(x)
        console.log('PROMISE')
	console.log(x)
	});


}

function b() {
    prueba.fleet2('all', (body)=> {
    	utils.parseXML2(body, (x, z)=>{

            console.log('CALLBACK')
            console.log(z);
		});
    });
}

a();
b();
//setInterval(a, 3000);
