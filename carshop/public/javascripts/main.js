/** This is a file that during later development perhaps can be used to
send the data from the form as a JSON. Is not used in this application.*/
function sendData(data){
  var XHR=new XMLHttpRequest();
  var urlEncodedData="";
  var urlEncodedDataPairs=[];
  var name;

  //Turn the data object into an array of URL-encoded key/value pairs.
  //I know I am now not sending a JSON object but a URL-encoded key/value pair instead.
  for(name in data){
    urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
  }
  //Combine the pairs into a single string and replace all %-encoded spaces to
  //the '+' character; matches the behaviour of browser form submissions
  urlEncodedData=urlEncodedDataPairs.join('&').replace(/%20/g,'+');
  //var json=getJson(urlEncodedData); //Now it is converted into json.

  //Happens on successful data submissions
  XHR.addEventListener('load', function(event){
    alert('Success!');
  });

  //Happens in case of Error
  XHR.addEventListener('error', function(event){
    alert('Skit också');
  });

  //Set up the requests
  XHR.open('POST','routes/newcar.js');

  //Add required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type','application/x-www-form-urlencoded') //här är jag osäker på om jag får ha något som inte är url-encodat (varför jag skickar datan så istället för JSON)
  //Behåller dock funktionen för omvandlingen då den kanske kan vara lämplig vid en senare implementation
  //eller när jag ska omvandla datan i min newcar.js för att sätta in den i data.json.

  //Send data
  XHR.send(urlEncodedData);
}

function getJson(url){
  var hash;
  var myJson={};
  var hashes=url.slice(url.indexOf('?')+1).split('&')
  for(var i=0;i<hashes.length;i++){
    hash=hashes[i].split('=');
    myJson[hash[i]]=hash[i+1];
  }
  return myJson;
}
