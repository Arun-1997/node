var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, res) {  
   // Parse the request containing file name

	 // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	
	var out='';
	
	request.on('data', function(chunk) {
		var j=JSON.parse(chunk);
		
		if(j.name=="idiot")
		{
			
			
				var audioFilePath = 'data/'; 
				fs.readdir(audioFilePath, function(err, files) {
					if (err) { throw err; }
					var File = getNewestFile(files, audioFilePath);
					fs.readFile('data/'+File, function (err, data) {
					  	if (err) console.log(err);
						else {	
							 out=data.toString();	
							res.write(out);
							res.end();
						  }
				   }); 
				});

			
		}
});

}).listen(8081);



function getNewestFile(files, path) {
    var out = [];
    files.forEach(function(file) {
        var stats = fs.statSync(path + "/" +file);
        if(stats.isFile()) {
            out.push({"file":file, "mtime": stats.mtime.getTime()});
        }
    });
    out.sort(function(a,b) {
        return b.mtime - a.mtime;
    })
    return (out.length>0) ? out[0].file : "";
}

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');