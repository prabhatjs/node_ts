import Router from 'express';
import { eschema } from '../Schemas/empSchema';
import {UpdateEmpData, insertEmpData} from '../Schemas/Typecheker'
import { ApiResponse, ErrorResponse } from '../utils/statusMesg';


//validation
/**
 * Request Level validation
 * Database level validation
 * 
 * Request level validation
 * ----------------------------
 * Body Should not be empty
 * empno should not be empty
 * ename should not be empty
 * 
 * empno should contains only numbers
 * ename should not contains number
 * sal conatins only number
 * 
 * 
 * Ename length should be less than 10
 */



const router=Router();

router.post('/create',async (req,res)=>{
    const craetePayloads=req.body;
    const parsePayloads=insertEmpData.safeParse(craetePayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            mesg:"You send wrong Inputs",
        })
        return;
    }
    //check empno is already exits--
    await eschema.find({empno:req.body.empno}).then(async (isExist)=>{
        if(isExist.length>0){
            res.send(new ErrorResponse(201,'Empno is allready Exists'));
        }
        else{
            await eschema.insertMany(req.body).then((result:any)=>{
                res.send(new ApiResponse(200,'Save Emp Date',result))
               
          })
        }
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
router.put('/update/:id',async(req,res)=>{
            const id=req.params.id;
            const newData=req.body;
            try {
                const validateData=UpdateEmpData.safeParse(newData);
                const updateData=await eschema.findByIdAndUpdate(id,validateData,{new:true});
                if (!updateData) {
                    return res.status(404).json({ error: 'User not found' });
                  }
                  res.json(updateData)
            } catch (error) {
                console.log(error);
            }

})

        // router.put('/update/:empno',async(req,res)=>{
        //         const emp
        // })




//all data
router.get('/getEmp',async(req,res)=>{
    let body=req.body;
    
    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(ip);
    await eschema.find({}).then((result:any)=>{
        if(result.length>0){
            res.send(new ApiResponse(200,'get Emp Date',result))
            
        }else{
            res.send(new ErrorResponse(201,'not get Emp Date'))
        }
    }).catch((err)=>{
        res.send({status:400,message:err.message})
    })

})

router.patch('/update',async (req,res)=>{
    let body=req.body;
    await eschema.updateOne({empno:body.empno},{$set:{ename:body.ename,sal:body.sal}}).then((result)=>{
        res.send({status:200,message:'Save success'})
    }).catch((e)=>{
        res.send({status:400,message:e.message})
    })
})


//get Employee by id

router.get('/get/:id',async (req,res)=>{
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
//delete api only one
router.delete('/delete',async (req,res)=>{
    let body=req.body;
    await eschema.deleteOne({empno:body.empno}).then((result)=>{
        res.send({status:200,message:'Delete success'})
    }).catch((err)=>{
        res.send({status:400,message:err.message})
    })
})

//how to insert json array in mongodb;

router.post('/insertmany',async (req,res)=>{
    let body=req.body;
    await eschema.insertMany(body.data).then((result)=>{
        res.send({status:200,message:"Success"})
    }).catch((err)=>{
        res.send({status:400,message:"Unseccessfull"});
    })
})
export =router;