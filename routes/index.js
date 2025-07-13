const requester = require("request");
const axios = require('axios');
const fs = require("fs");
var app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(bodyParser.raw());
app.set("port",process.env.PORT);

app.post("*",function (req, res) { 
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

app.get("*", function (req, res) {
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


module.exports = app;