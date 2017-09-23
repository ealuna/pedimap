/**
 * Created by Edward Luna Noriega on 06/09/17.
 */

"use strict";


const sequelize = require('./services/connection').ORIUNDA;

const models = require('./models')(sequelize);
//console.log(models)

models.models.fleteros.findAll({raw:true, include:[
    {
        model: models.models.clientes,
        as: 'clientes',
        on: {
            inner: sequelize.where(sequelize.col("fleteros.idclifac"), "=", sequelize.col("clientes.idcliente")),
           // as: 'h'
        },
        attributes: ['nomcli'],
        required: true
    }
]}).then(result => {
    console.log(result);
});
