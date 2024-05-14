import {Router} from 'express';
import {Todo} from '../models/todo';

type RequestBody={text:string};
type RequestParams={todoId:string};

const todos:Todo[]=[];

const router=Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos});
});

router.post('/todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({success:true,message:'Todo added successfully',todo:newTodo});
});

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams;
    const todoId=params.todoId;
    const todoIndex=todos.findIndex(todo=>todo.id===todoId);
    if(todoIndex===-1)
        return res.status(404).json({success:false,message:'Todo not found'});
    todos.splice(todoIndex,1);
    res.status(200).json({success:true,message:'Todo deleted successfully'});
});

router.post('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequestParams;
    const todoId=params.todoId;
    const body=req.body as RequestBody;
    const todoIndex=todos.findIndex(todo=>todo.id===todoId);
    if(todoIndex===-1)
        return res.status(404).json({success:false,message:'Todo not found'});
    todos[todoIndex].text=body.text;
    res.status(200).json({success:true,message:'Todo edited successfully',todo:todos[todoIndex]});
});

export default router;