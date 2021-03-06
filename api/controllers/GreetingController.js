/**
 * GreetingController
 *
 * @description :: Server-side logic for managing greetings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

function Message(msg)
{
    this.msg=msg;
    this.userage=userage;
}
 
module.exports = {
	hi: function (req, res) {
		  if (!req.param('id')) {
			    // res.status(400);
			     
			    // res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
			     }
		  return res.send("Hi, there!");
	},
	
	//登录
	rc: function (req, res) {//cn
		res.render('remote', { title: 'remote' }); 
	},
	
	bye: function (req, res) {
			    return res.redirect("http://www.so.com");
	},
	
	wc: function (req, res) {//cn
		res.render('cn', { title: 'cn' }); 
	},
	zs: function (req, res) {//cn
		res.render('lgj', { title: 'lgj' }); 
	},
	wb: function (req, res) {//cn
		res.render('wxy', { title: 'wxy' }); 
	},
	
	//登录
	login: function (req, res) {//cn
		res.render('login', { title: 'login' }); 
	},
	//登录主界面
	main: function (req, res) {//cn
		res.render('main', { title: 'main' }); 
	},
	//我的视频
	myVideo: function (req, res) {//cn
		res.render('myVideo', { title: '我的朋友圈视频' , api: 'ShareVideo' ,user: req.query.user}); 
	},
	//我的表
	myTable: function (req, res) {//cn
		res.render('myTable', { title: '我的数据表' , api: 'table' ,user: req.query.user}); 
	},
	//我的表字段
	myColumn: function (req, res) {//cn
	     console.log("tableId:" + req.query.tableId);
		res.render('myColumn', { title: '表字段维护' , api: 'column' ,tableId: req.query.tableId }); 
	},
	//预览
	preview: function (req, res) {//cn
	     console.log("tableId:" + req.query.tableId);
		res.render('preview', { title: '通用维护预览' , api: 'column' ,tableId: req.query.tableId }); 
	},
	//自动生成代码
	codeGenerator: function (req, res) {//cn
	

	var exec = require('child_process').exec; 
	var cmdStr = '~/nodejs/railsTest/codeGenerator.sh ' + req.query.tableCode;
	exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
      //  var data = JSON.parse(stdout);
        console.log(stdout);
    }
	});	
	
	var cmdStr2 = '/data/codeGenerator.sh ' + req.query.tableCode;
	exec(cmdStr2, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
      //  var data = JSON.parse(stdout);
        console.log(stdout);
    }
	});	
	
	return res.json({ msg: 'receive code gen command',result:"ok" });
	//    return res.send("receive code gen command");
		//res.render('codeGenerator', { title: 'gender' }); 
	},
	//代码标记
	editor: function (req, res) {//cn
		res.render('editor', { title: 'editor' }); 
	},
	//发布模拟环境
	release: function (req, res) {//cn
		res.render('release', { title: 'editor' }); 
	},
	
	
	
	
	
	//shell 执行命令
	
		//自动生成代码
	linuxCommand: function (req, res) {//cn
	var text = req.param('text');
	var grepCommand = req.param('grepCommand');
	
	console.log("date:" + new Date());
	if(text == null || text == undefined){
	    
	    console.log("text empty");
	     res.render('linuxCommand', { title: 'linux 命令 ' + new Date() , text: '' ,grepCommand: '',
	     result:''}); 
         //       return res.ok();
	}else{
	    console.log("text not empty");
	    	fs.writeFile('/workspace/webCommand.txt', text, function (err) {
	    if (err) throw err;
	    console.log('It\'s saved!'); //文件被保存
	});

	var exec = require('child_process').exec; 
	var cmdStr = 'cat /workspace/webCommand.txt | ' + grepCommand + " > /workspace/webCommandResult.txt";
	exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
      //  var data = JSON.parse(stdout);
        fs.readFile('/workspace/webCommandResult.txt', 'utf8', function (err, data) {
            if (err) throw err;
                console.log(data);
                res.render('linuxCommand', { title: 'linux 命令' + new Date() 
                , text: text ,grepCommand: grepCommand,result: data }); 
              //  return res.ok();
            });
            console.log(stdout);
        }
	});	
	}
	

	}
	
};

