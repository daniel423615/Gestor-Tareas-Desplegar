// Rutas para manejar las tareas

const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('./../controllers/taskController');
const validateTask = require('../middlewares/validateTask');
const { codificacion, tabla, datos } = require('../models/taskModel');

// Devolver todas las tareas
router.get('/', getTasks);
// Devolver una tarea
router.get('/:id', getTaskById);
// Crear una nueva tarea
router.post('/', validateTask, createTask);
// Actualizar una tarea
router.put('/:id', validateTask, updateTask);
// Borrar una tarea
router.delete('/:id', deleteTask);

router.post('/tabla', codificacion, tabla, datos);

module.exports = router;