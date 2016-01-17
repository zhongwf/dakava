/**
 * ShareVideoController
 *
 * @description :: Server-side logic for managing Sharevideos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/*
 * 可选 option
 *
 * host:    default is: dakava.oss-cn-beijing-internal.aliyuncs.com,
 * timeout: default is: 300000,
 * agent:   default is: agent.maxSockets = 20
 */
var OSS = require('aliyun-oss');
var dakava = require("../../config/dakava"); 

console.log("AlyunOssHost" + dakava.AliyunOssHost);
var option = {
  accessKeyId: dakava.AliyunOssAccessKeyId,
  host: dakava.AliyunOssHost,
  accessKeySecret: dakava.AliyunOssAccessKeySecret
};





var oss = OSS.createClient(option);

module.exports = {
	    myVideoUpload: function (req, res) {
	         
	         console.log('req.param(title)' + req.param('title'));
	 
            ShareVideo.create({
                title: req.param('title'),
                introduction: req.param('introduction'),
                authorId: req.param('authorId'),
                authorNickname: req.param('authorNickname'),
                url:req.session.ajaxFileSavePath,
                imageUrl:req.session.ajaxFileSavePath
            }).exec(function createCB(err, created){
  
                if (err) return res.negotiate(err);
                console.log('Created user with name ' + created.name);
                
                
			    return res.ok();
            });
	    },
	    
	    share: function (req, res) {//cn
	    
            ShareVideo.findOne(req.query.videoId).exec(function createCB(err, data){
  
                if (err) return res.negotiate(err);
                
                res.render('videoShare', data); 
			 //   return res.ok();
            });
            
		    
    	},
	
		ajaxFileSave: function (req, res) {

			  req.file('video').upload({
			    // don't allow the total upload size to exceed ~10MB
			    maxBytes: 10000000
			  },function whenDone(err, uploadedFiles) {
			    if (err) {
			      return res.negotiate(err);
			    }

			    // If no files were uploaded, respond with an error.
			    if (uploadedFiles.length === 0){
			      return res.badRequest('No file was uploaded');
			    }

			    console.log('ok '+ uploadedFiles[0].fd);
			    var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/') + 1, uploadedFiles[0].fd.length);
			    console.log('ok '+ filename);
			    
			    console.log('req.session.me '+ req.session.me);
			      console.log('sails.getBaseUrl() '+ sails.getBaseUrl());
			      
oss.putObject({
  bucket: 'dakava',
  object: 'video/' + filename,
  source: uploadedFiles[0].fd
}, function (err, result) {
       if (err) return res.negotiate(err);
       console.log('aliyun oss upload ok');
       req.session.ajaxFileSavePath = "http://dakava." + dakava.AliyunOssHost_Public + "/video/" + filename;
			      return res.ok();
  
});


			  });
			}
		
};

