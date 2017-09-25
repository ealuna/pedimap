/**
 * Created by Edward Luna Noriega on 06/09/17.
 */

"use strict";


const sequelize = require('./services/connection').HOME;

const models = require('./models')(sequelize);
//console.log(models)

models.fleteros.findAll({
    attributes: {
        exclude: ['idclifac']
    },
    include: [{
        model: models.clientes,

        /* on: {
         inner: sequelize.where(sequelize.col("fleteros.idclifac"), "=", sequelize.col("clientes.idcliente")),
         // as: 'h'
         },*/
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
    console.log(result[0].toJSON());
});
