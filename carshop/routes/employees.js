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

  router.get('/',function(req,res,next){
    res.json(json.carshop.employees); //Returns only the Employees
  })


module.exports=router;
