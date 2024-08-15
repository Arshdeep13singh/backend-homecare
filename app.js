const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');  // Import cors package
const providerRoutes = require('./controller/providerRoutes.js');
const connectDB = require('./db/connect.js');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());  // Enable CORS
app.use(express.json());
app.use('/api/providers', providerRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        const server = app.listen(PORT, () => {
            console.log(`${PORT} yes I am connected`);
        });

        
        const shutdown = () => {
            console.log('Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                mongoose.connection.close(false, () => {
                    console.log('MongoDB connection closed');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        console.error('Error starting the application:', error);
    }
};

start();