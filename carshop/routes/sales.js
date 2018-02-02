var express = require('express');
var router = express.Router();
var fs=require('fs'),
  json;


/**Reads the JSON file*/
  function readJsonFileSync(filepath, encoding){

      if (typeof (encoding) == 'undefined'){//If the encoding isn't defined, like in the getConfig function it will be set to utf8
          encoding = 'utf8';
      }
      var file = fs.readFileSync(filepath, encoding);
      return JSON.parse(file);
  }

  /**Function that reads the JSON file with the name of the file as an attribute
  (no need to find the path). The actual reading occurs in the function readJsonFileSync above.*/
  function getConfig(file){

      var filepath = __dirname + '/../' + file;
      return readJsonFileSync(filepath);
  }

  json = getConfig('data.json');

  router.get('/',function(req,res,next){
    var result=createjson();
    res.send(result); //Returns only the Employees with their corresponding total sales.
  })

/**Performing searches in the three arrays employees, sales and carmodels to match an
employee-id in Employees with employee-id in sales and then match the corresponding
car-id with an ID in Carmodels in order to extract the price for that car*/
  function createjson(){
    var employees=json.carshop.employees;
    var sales=json.carshop.sales;
    var cars=json.carshop.carmodels;
    var newObj={"sales":[]};
    var array=newObj.sales;
    for(var i=0;i<employees.length;i++){
    var employee_id=employees[i].id;
    var instance={
                id:employee_id,//Retrieve all the employee-data for this id. Could have been more attributes defined below "name"
                name:employees[i].name,
                sales:0
    }
    for(var k=0;k<sales.length;k++){
      if(employee_id==sales[k].employee_id){ //Looking for the employee-id in sales, if found extract car_id
        var carid=sales[k].carmodel_id;
        var price;
        for(var n=0;n<cars.length;n++){ //Looking for car_id, if found extract price.
          if(carid==cars[n].id){
            if(instance.sales!=0){ //If this is not the first loop with this employee, simply add the extracted price to the sales attribute.
              price=cars[n].price;
              var current=instance.sales;
              instance.sales=current+price;
            }else{
            price=cars[n].price;
            instance.sales=price;
            array.push(instance); //Only need to push the instance if no instances of it has occurred before in sales (sales-attribute would be zero then)
            }
          }
        }
      }else{
      }
    }
  }
  return newObj;
}

module.exports=router;
