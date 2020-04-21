var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
fs = require('fs');
var data = fs.readFileSync('./login_info');
data = data.toString();
var arr = data.split(",");
var myUsername = arr[0];
var myPassword = arr[1];
var myDbname = arr[2];
var myServername = arr[3] + ".database.windows.net";
// Connection parameters to databasevar 
config = {    server: myServername,    
	options: {database: myDbname, encrypt: true},    
    authentication: {      
    type: "default",      
    options: {          
    	userName: myUsername,        
    	password: myPassword  
    }    
    } 
};
var connection = new Connection(config);
connection.on('connect', function(err) {        
	if (err) {            
		console.log(err)      
	} else {             
		queryDatabase()        
	}});

function queryDatabase() {    
	console.log('Reading rows from the Table...');    
	var request = new Request(        
		"SELECT * FROM Customer",        
		function(err, rowCount, rows) {            
			console.log(rowCount + ' row(s) returned');            
			process.exit();        }    );    
	request.on('row', function(columns) {        
		columns.forEach(function(column) {            
			console.log("%s\t%s", column.metadata.colName, column.value);        
		});    
	});    
	connection.execSql(request);}