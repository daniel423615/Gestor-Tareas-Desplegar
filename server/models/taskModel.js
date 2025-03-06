const pool = require('../config/db'); // Importamos la conexión desde db.js

// Todas las tareas
const getTasks = async () => {
    const result = await pool.query('SELECT task_id, task_name, task_description, task_state, task_date::date AS task_date FROM tasks ORDER BY task_id');
    return result.rows;
};
// Una sola tarea
const getTaskById = async (id) => {
    const result = await pool.query('SELECT task_id, task_name, task_description, task_state, task_date::date AS task_date FROM tasks WHERE task_id = $1', [id]);
    return result.rows[0]; // Return the task or null if not found
};

// Crear nueva tarea
const createTask = async (task_name, task_description, task_state, task_date) => {
    const result = await pool.query(
        'INSERT INTO tasks (task_name, task_description, task_state, task_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [task_name, task_description, task_state, task_date]
    );
    return result.rows[0];
};

// Actualizar una tarea
const updateTask = async (task_id, task_name, task_description, task_state, task_date) => {
    const result = await pool.query(
        'UPDATE tasks SET task_name = $1, task_description = $2, task_state = $3, task_date = $4 WHERE task_id = $5 RETURNING *',
        [task_name, task_description, task_state, task_date, task_id]
    );
    return result;
};

// Borrar una tarea
const deleteTask = async (task_id) => {
    const result = await pool.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [task_id]);
    return result;
};


const codificacion = async () => {
    const result = await pool.query("SET client_encoding TO 'UTF8'");
    return result;
};
const tabla = async () => {
    const result = await pool.query("CREATE TABLE tasks (task_id SERIAL PRIMARY KEY,task_name VARCHAR(255) NOT NULL,task_description TEXT,task_state VARCHAR(50) NOT NULL,task_date DATE)");
    return result;
};
const datos = async () => {
    const result = await pool.query("INSERT INTO tasks (task_name, task_description, task_state, task_date) VALUES"+
    "('Revisar notas de clase', 'Repasar los apuntes de la última clase de programación.', 'Iniciada', '2025-03-01'),"+
    "('Practicar algoritmos', 'Resolver al menos 3 ejercicios de algoritmos en LeetCode.', 'Pendiente', '2025-03-02'),"+
    "('Configurar entorno de desarrollo', 'Instalar y configurar VS Code con las extensiones necesarias.', 'Completada', '2025-02-27'),"+
    "('Leer documentación', 'Revisar la documentación oficial de PostgreSQL.', 'Retrasada', '2025-03-03'),"+
    "('Hacer un mini proyecto', 'Desarrollar una pequeña aplicación CRUD en Python.', 'Iniciada', '2025-03-05')");
    return result;
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getTaskById, codificacion, tabla, datos };
