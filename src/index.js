//Module Imports
const express = require("express");

//Declarations + Initializations
const app = express();

//ROUTES
app.get('/', (request, response) => {
	response.send('Hello World');
});

// App Setup
app.listen(port, (err) => {
	if (err){
		console.log(err);
	}
	return console.log(`Server is listening on Port:${port}`);
});
