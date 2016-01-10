var path = require('path');

console.log("hello world " + path.resolve(__dirname));

var sailsgen = require('sails-generate');
/*
var scope = {
	rootPath: path.resolve(__dirname)
};
sailsgen(require('sails-generate-model'), scope, function (err) {
	if (err) throw err;
 
	// It worked. 
});
*/

sails generate api article
sails generate api comment
sails generate api like