var express = require('express');
var parse= require('body-parser');
var route = express.Router();
const registerusers = require('./schema/userregistration');
const jobseeker=require('./schema/jobseeker');
const companyrequirement= require('./schema/companyjob');
const registerjobseek = require('./schema/jregister');
var app = express();
app.use(parse.json());
// app.use(mongoose());

app.use(parse.urlencoded({
    extended: true
}));

//used for file storage
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart({
//     uploadDir:'./uploads/'
// });


route.post('/employeelist', (req,res)=>{
   console.log("employee list");
   console.log(req.body.skills);

// both ways will work 
// jobseeker.find({skillsknown:{$elemMatch:{item_text:{$in: req.body.skills}}}}, function(err,result){
    jobseeker.find({"skillsknown.item_text":{$in:req.body.skills}},function(err,result){
    if(err){
        res.json(err); 
     }
     else{
         console.log(result);
         res.json(result);
     }
    });
   
})

route.post('/companydata',(req,res)=>{
   

    companyrequirement.find({},function(err,result){
        if(err){
            res.json(err);
        }else{
            console.log(result);
        
                res.json(result);
        }       
        
    })

})



route.post('/companyjob',(req,res)=>{
    console.log('company request sent');
    console.log(req.body);
let companydata = new companyrequirement({
    name:req.body.name,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    designation:req.body.designation,
    experience:req.body.experience,
    skills:req.body.skills,
    location:req.body.location,
    vacancy:req.body.vacancy
})
companydata.save((err,result)=>{
    if(err){
        res.json(err)
    }
    else
    {
  console.log("dyttfuy      data");       
        res.json('inserted')
    }
})
})

route.post('/jobseeker',(req,res)=>{
    console.log('job seeker request sent');
    console.log(req.body);
let jobseekerdata = new jobseeker({
    name:req.body.name,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    currentdesignation:req.body.designation,
    skillsindemand:req.body.skilldemand,
    experience:req.body.experience,
    skillsknown:req.body.skills,
    city:req.body.city
})

jobseekerdata.save((err,result)=>{
    if(err){
        res.json(err)
    }
    else
    {
  console.log("dyttfuy      data");       
        res.json('inserted')
    }
})
})


route.post('/registeruser',(req,res)=>{
    console.log("request sent");
    console.log(req.body);


   let user = new registerusers ({
    name:req.body.Name,
    username: req.body.UserName,
    password: req.body.Password,
    email: req.body.mailid, 
    phonenumber: req.body.phonenumber,
   })
 user.save((err,result)=>{
       if(err){
           res.json(err)
       }
       else
       {
     console.log("dyttfuy      data");       
           res.json('inserted')
       }
   })    
})


route.post('/resjobseek',(req,res)=>{
    console.log("request sent");
    console.log(req.body);

    let resjdata = new registerjobseek ({

    username: req.body.UserName,
    password: req.body.Password,
    email: req.body.mailid, 
    phonenumber: req.body.phonenumber,
    })
    resjdata.save((err,result)=>{
        if(err){
            res.json(err)
        }
        else{
            console.log("jkaasad")
            res.json('inserted')
        }
    })
})



route.post('/userlog',(req,res)=>{
    console.log('log details');
    console.log(req.body);

    registerusers.findOne({username: req.body.username},function(err,result){
        if(err){
            res.json(err);
        }else{
            if(result === null){
                res.json('invalid user credentials');
            }
            else if (result.username == req.body.username && result.password == req.body.password){
               res.status(200).json({
                   status:'200',
                   message:'sucess'
               })
               
                // res.json('success')
                 
            }
            else{
                console.log('invalid')
            }
        }       
        
    })

})

route.post('/jobseekerlogin',(req,res)=>{
    console.log('log details of seeker');
    console.log(req.body);

    registerjobseek.find({ username: req.body.username},function(err,result){
        if(err){
            res.json(err);
        } else {
            if(result === null){
                res.json('invalid credentials')
            }
            else if(result.username == req.body.username && result.password == req.body.password){
                res.status(200).json({
                    status:'200',
                    message:'sucess'
                })
            }
            else{
                
                console.log('invalid')
            }
        }
    })
})












module.exports=route;

