var mysql = require('mysql');
var connection  = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',//账号
    password:'123456',//密码
    database:'nodejs' //数据库名字
});
connection.connect();

//查询数据
function query(sql,callback){
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
    //connection.end();
}
function adduser(sql,callback){
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
    });
}
exports.query = query;
exports.adduser = adduser;