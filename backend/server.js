const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const uri = 'mongodb+srv://abdou:G3HNYJwv0vXjJtG6@cluster0.ghsi5dc.mongodb.net/RBAC?appName=Cluster0'

async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectToDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})