exports.get = function(req,res){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    var str = "<form action='/dologin' method='post'>"+
        "帐号:<input type ='text' name='name'><br/><br/>"+
        "密码:<input type ='password' name='password'><br/><br/>"+
        "  <input type ='submit' value='提交'></form>";
    res.write(str);
    res.end();
}
exports.resgister=function(req,res){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    var str = "<form action='/dores' method='post'>"+
        "帐号:<input type ='text' name='name'><br/><br/>"+
        "密码:<input type ='password' name='password'><br/><br/>"+
        "  <input type ='submit' value='提交'></form>";
    res.write(str);
    res.end();
}
exports.deal = function(req,res,data){
    var mysql = require('./mysql');
    var name = data.name;
    var password = data.password;
    var sql = "SELECT * FROM login_user WHERE name = '"+name+"' AND password = '"+password+"'";
    mysql.query(sql,function(data){
        showpage(req,res,data);
    });
}
exports.add = function(req,res,data){
    var mysql = require('./mysql');
    var name = data.name;
    var password = data.password;
    var sql = "insert into login_user(name,password) values('"+name+"', '"+password+"')";
    mysql.adduser(sql,function(data){
        showres(req,res,data);
    });
}
exports.dealget = function(req,res,data){
    var mysql = require('./mysql');
    var id = data.id;
    var sql = "SELECT * FROM login_user WHERE id = '"+id+"'";
    mysql.query(sql,function(data){
        modifyview(req,res,data);
    });
}
function showpage(req,res,data){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if(data != ''){
        var str = "<h1>登录成功</h1>";
        str+="帐号:"+data[0].name+"<br>";
        str+="密码:"+data[0].password;
        str+="<table border='1' width='400px'>";
        str+="<tr><th>ID</th><th>名称</th><th>密码</th><th>操作</th></tr>";
        for (var i = data.length - 1; i >= 0; i--) {
            str+="<tr>";
            str+="<td>"+data[i].id+"</td>";
            str+="<td>"+data[i].name+"</td>";
            str+="<td>"+data[i].password+"</td>";
            str+="<td><a href='/modify?id="+data[i].id+"'>修改</a></td>";
            str+="</tr>";
        };
        str+="</tr></table>";
    }else{

        var str = "<h1>登录失败</h1>";
        str+="<a href='/login'>返回登录</a>";
    }
    res.write(str);
    res.end();
}
function showres(req,res,data){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    if(data != ''){
        var str = "<h1>注册成功</h1>";
        str+="<a href='/login'>去登录</a>";
    }else{
        var str = "<h1>注册失败</h1>";
        str+="<a href='/register'>返回注册</a>";
    }
    res.write(str);
    res.end();
}
function modifyview(req,res,data){
    res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
    var str = ":<input name='name' value="+data[0].name+"><br>";
    str = "名字:<input name='name' value="+data[0].name+"><br>";
    str+="密码:<input name='age' value="+data[0].password+"><br>";
    str+="<input type='submit' onclick=javascript:alert('修改成功') value='提交'><br>";
    str+="<a href='javascript:void(0)' onclick='window.history.go(-1)'>返回列表</a>";
    res.write(str);
    res.end();
}