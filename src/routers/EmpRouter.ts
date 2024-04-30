import express from 'express'
import empcont from '../controllers/empcontroller'

const app1=express();
app1.use('/CRUD',empcont);
export =app1;