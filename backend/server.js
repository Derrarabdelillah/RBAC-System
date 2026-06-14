const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://abdou:OXg0PMnfZsyFWDft@cluster0.ghsi5dc.mongodb.net/RBAC?retryWrites=true&w=majority&appName=Cluster0'

async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})