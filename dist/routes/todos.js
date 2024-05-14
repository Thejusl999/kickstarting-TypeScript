"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ success: true, message: 'Todo added successfully', todo: newTodo });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1)
        return res.status(404).json({ success: false, message: 'Todo not found' });
    todos.splice(todoIndex, 1);
    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
});
router.post('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1)
        return res.status(404).json({ success: false, message: 'Todo not found' });
    todos[todoIndex].text = body.text;
    res.status(200).json({ success: true, message: 'Todo edited successfully', todo: todos[todoIndex] });
});
exports.default = router;
