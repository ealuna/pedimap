/**
 * Created by Edward Luna Noriega on 06/09/17.
 */

"use strict";


const sequelize = require('./services/connection').TERRANORTE;


sequelize.query(' EXEC [SP].[cliente] @fecha = \'2017-10-02 14:54:36.875 -05:00\', @pedido = 0').then(a =>{
	console.log(a);
	//console.log(s);
});

//const models = require('./models')(sequelize);
//console.log(models)
/*
 models.fleteros.findAll({
 attributes: {
 exclude: ['idclifac']
 },
 include: [{
 model: models.clientes,
 */
/* on: {
 inner: sequelize.where(sequelize.col("fleteros.idclifac"), "=", sequelize.col("clientes.idcliente")),
 // as: 'h'
 },*/
/*
 attributes: ['idcliente', 'nomcli'],
 required: true
 }, {
 model: models.mascstock,
 as: 'planillas',
 required: true,
 attributes: {
 exclude: ['idcliente']
 }
 }]
 }).then(result => {
 if(result.length) console.log(result[0].toJSON());
 });
 */

/*models.mascara.scope({method:['documentos', '2017/09/12']}).findAll().then(result => {
    if (result.length)
        for (let i = 0; i < result.length; i++)
            console.log(result[i].toJSON());
});*/