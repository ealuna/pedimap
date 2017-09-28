/**
 * Created by Zerufo on 28/09/2017.
 */

"use strict";

const vehicle = require('../models/vehiculo');

vehicle('TERRANORTE').getPoints('352544070752218', 15).then((c) => {
    console.log(c.MapData.DataSet)
}).catch((c)=>{
    console.log(c)
});
