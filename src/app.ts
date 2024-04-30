import  express from 'express'
import  connectdb from './dbconnection' ;
import { eschema } from './Schemas/empSchema';
import {UpdateEmpData, insertEmpData} from './Schemas/Typecheker'
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
app.post('/create',async (req,res)=>{
    const craetePayloads=req.body;
    const parsePayloads=insertEmpData.safeParse(craetePayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            mesg:"You send wrong Inputs",
        })
        return;
    }
    await eschema.insertMany(craetePayloads).then((result)=>{
          res.send({status:200,message:"Save Emp Data"})
    })
})
//const updatePayloads=req.params.id;
// console.log(updatePayloads);
// console.log(req.body);
// const parsePayloads=UpdateEmpData.safeParse(updatePayloads);
// if(!parsePayloads.success){
//    res.status(411).json({
//     mesg:"You send wrong Inputes"
//    })
//    return;
// }
// await eschema.findByIdAndUpdate(req.params.id,req.body).then((result)=>{
//     res.send({status:200,mesg:"Update Data successfully"});
// })
app.patch('/update/:id',async(req,res)=>{
    try {
        const updateEmp=await eschema.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            message:'Update Successfully',
            data:{
                updateEmp
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//all data
app.get('/getEmp',async(req,res)=>{
    let body=req.body;
    await eschema.find({}).then((result)=>{
        if(result.length>0){
            res.send({status:200,message:"Data find",data:result})
        }else{
            res.send({status:201,message:"No Data find",data:result})
        }
    }).catch((err)=>{
        res.send({status:400,message:err.message})
    })

})

app.patch('/update',async (req,res)=>{
    let body=req.body;
    await eschema.updateOne({empno:body.empno},{$set:{ename:body.ename,sal:body.sal}}).then((result)=>{
        res.send({status:200,message:'Save success'})
    }).catch((e)=>{
        res.send({status:400,message:e.message})
    })
})


//get Employee by id

app.get('/get/:id',async (req,res)=>{
    try {
         const empdata= await eschema.findById(req.params.id);
         res.status(200).json({
             message:"Success",
             data:{
                 empdata
             }
            });
     } catch (error) {
         res.status(404).json({
             message:"Fail to find empdata",
             data:{},
             error:error
         })
     }}
)