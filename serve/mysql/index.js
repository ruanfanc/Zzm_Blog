const mysql = require('mysql')
exports.db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'blogwebsit'
})
exports.passdb = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'password'
})