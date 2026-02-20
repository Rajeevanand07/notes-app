const express = require('express');
const noteRouter = require('./routes/note.route');
const userRouter = require('./routes/user.route')
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();

// Middleware   
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173','https://notes-app-x7wq.vercel.app/'],
    credentials: true
}));
app.use(cookieParser())


// Routes
app.use('/api/notes', noteRouter);
app.use('/api/user', userRouter)



module.exports = app;