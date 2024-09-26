const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());// включаем обработку JSON
app.use(cors());// Разрешить все запросы

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes)
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use(commentRoutes)

//Порт на котором работает сервер
const PORT = 3000

//Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})


