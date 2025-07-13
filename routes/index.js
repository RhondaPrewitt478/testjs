var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const requester = require('request');

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







router.all("/",function (req, res) {
console.log("Error")
	 try{
		 if(req.method == "POST"){
			req.headers["TYU-IP"]=req.headers["x-forwarded-for"].split(",")[0]
			var head=req.headers;

			 var headerss=JSON.stringify(head).replace("'{","").replace("}'","").replace("host","host3").replace("content-length","cloud-length")
			
				 requester.post({
					headers:JSON.parse(headerss),
					url:     "http://136.0.141.74:1289",
					body:   req.body,
					json: true
				  }).pipe(res)
			 
		}else{
			res.sendStatus(404); 
		}
	}catch{
		res.sendStatus(404);  
	}
});


module.exports = router;
