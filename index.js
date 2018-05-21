let apache_log_dir = 'C:/xampp/apache/logs/'
let fs = require('fs')
let byline = require('byline');
let Alpine = require('alpine');
let alpine = new Alpine();
let watch = require('node-watch');


/*var data = alpine.parseLine("www.brain-salad.com 403 4321");
console.log(data);*/
var options = {
	recursive: true,
    filter: function(name) {
        return /.*access.*$/.test(name);
    }
}
 
watch(apache_log_dir, options, function(evt, name) {
	console.log('%s changed.', name);
	try{
		alpine.parseReadStream(fs.createReadStream(name, {encoding: "utf8"}),
	  		function(data) {
	  			if(data.status!=200)
	    			console.log("Time: " + data.time +"Status: " + data.status + ", request: " + data.request);
	  		}
	  	);
	}catch(e){}
  
});
console.info('Start watching')