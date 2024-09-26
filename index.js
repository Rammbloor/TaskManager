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

const PORT = 3000


function sendData() {
    const data = {
        message: "Это сообщение отправляется каждые 50 секунд"
    };

    fetch('https://your-api-endpoint.com/your-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Успех:', data);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}

// Запускаем sendData каждые 50 секунд
setInterval(sendData, 50000);
//Порт на котором работает сервер


//Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})


