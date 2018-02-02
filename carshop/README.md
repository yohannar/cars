This is a web application where, currently, a web server containing a JSON-file called data.json is set up on your local machine. The program will then send requests to this server to get data from the JSON-file or to put data in the JSON-file. This is connected to a user interface where all functions implemented can be reached. 

To run the program: 
	Open terminal window, cd to the directory containing this program
	type node app.js or npm start app.js
	Open web browser of choice and type http://localmachine:3000

Disclaimer:
In the specification for this project it was required that all data that is passed between the client and the server should be in JSON-format. However, this is not implemented here in one place: When the form to create a new car model is submitted. 
It also seems like the function to write the new car model to the file does not update the actual JSON-file on the server. This is something that has to be fixed during the next iteration of the development of this project (to see what is done to write to file today see newcar.json line 38). 