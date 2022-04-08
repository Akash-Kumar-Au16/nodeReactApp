const express = require('express');
var payloadChecker = require('payload-validator');
const app = express();
const PORT = 8080;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var expectedPayload={
    "first_name":"",
    "last_name":""
};
app.get('/index.html',(req, res) => {
    res.sendFile("C:/Users/Manish.kumar/Desktop/test/"+"index.html")
});
app.post('/test',urlencodedParser,(req, res) =>{
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response)

    if(req.body){
        var result = payloadChecker.validator(req.body, expectedPayload,["first_name","last_name"], false);
        if(result.success){
            res.json({"message":"payload is correct"})
        }else{
            res.json({"message":result.response.errorMessage});
        }
    }else{
        res.json({"message":"payload is not correct"})
    }
})
app.listen(PORT,()=>{
    console.log('server is running at : http://localhost:8080/')
});