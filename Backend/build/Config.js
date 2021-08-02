"use strict";
const mssql = require('mssql');
const config = {
    user: 'sa',
    password: 'root',
    server: 'LAPTOP-FRPU9KAL\\SQL_SERVER',
    database: 'Ing_System',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};
module.exports = class Sql {
    constructor() {
    }
    connect() {
        mssql.on('error', function (err) {
            console.log(err);
            mssql.close();
        });
        return mssql.connect(config);
    }
    close() {
        return mssql.close();
    }
};
