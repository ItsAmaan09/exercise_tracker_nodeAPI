const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user-route.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users', userRoute);

app.get('/',(req,res)=>{
    res.json({success:'connect nodejs'})
});

mongoose
.connect("mongodb+srv://ma:XmyDlgaCWIGEOtz1@cluster0.blyqlak.mongodb.net/exerciseTracker?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to db");
    app.listen(3001,()=>{
        console.log("Server is running");
    });
})
.catch((err)=>{
    console.log(err);
});