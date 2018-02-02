/**This is a route*/
var express = require('express');
var router = express.Router();
var fs=require('fs'),
  json;

/**Reads the JSON file*/
  function readJsonFileSync(filepath, encoding){

      if (typeof (encoding) == 'undefined'){ //If the encoding isn't defined, like in the getConfig function it will be set to utf8
          encoding = 'utf8';
      }
      var file = fs.readFileSync(filepath, encoding);
      return JSON.parse(file);
  }
  /**Function that reads the JSON file with the name of the file as an attribute
  (no need to find the path). The actual reading occurs in the function readJsonFileSync above.*/
  function getConfig(file){

      var filepath = __dirname + '/../' + file; //assume that the file is in application root
      return readJsonFileSync(filepath);
  }



  json = getConfig('data.json');
  /**Disclaimer: It was specified to send all data as JSON, this is not what's happening when
  the form is submitted. This is something to work on during later development*/
  router.post('/',function(req,res,next){
    response = {                      //Obtains the data that the user entered in the form.
              id : req.body.id,
              brand: req.body.brand,
              model: req.body.model,
              price:req.body.price
              };
    json.carshop.carmodels.push(response); //Add this object to the array Carmodels in the JSON-file (add last)
    var jfile=JSON.stringify(json.carshop);
    fs.writeFile('data.json',jfile,'utf8'); //Write the altered file to data.json so that it is updated
    res.end(JSON.stringify(response)); //Return the response (the entered data) to the user
  });


module.exports=router;
