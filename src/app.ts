import  express from 'express'
import  connectdb from './dbconnection' ;
import app1 from './routers/EmpRouter'

const app=express();
const PORT=3000;


app.listen(PORT, async ()=>{
    await  connectdb();
    console.log("connected");
})


app.get('/test',(req,res)=>{
    res.send({status:200,msg:"Check it"});
})
app.use(express.json());
// app.post('/create',async(req,res)=>{
//     let body=req.body;
//     await eschema.insertMany(body).then((result)=>{
//         res.send({status:200,message:"Save Emp Data"})
//     }).catch((err)=>{
//         res.send({status:400,message:"Error "})
//     })

// })
//zod validation like this 
app.use('/MONGODB',app1);