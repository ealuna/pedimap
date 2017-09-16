/**
 * Created by Edward Luna Noriega on 11/09/17.
 */
const util = require('util');

function a(val) {
    return {
        type: "Feature",
        id: '',
        device: '',
        vehicle: '',
        status: {
            description: '',
            date: '',
            time: '',
            kmh: '',
            location: ''
        },
        geometry: {
            type: "Point",
            coordinates: [125.6, 10.1]
        },
        properties: {
            name: ""
        }
    };


    /*{
     device: '',
     id: '',
     placa: '',
     date: '',
     time: '',
     status: '',
     coords : { lat: '', lng: ''}

     };*/

}


module.exports = (value) => {


};
