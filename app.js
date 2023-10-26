const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-config.js'); // Import your Swagger configuration


dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database.');
});

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes setup
const userRoutes = require('./src/routes/userRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const adminRoutes = require('./src/routes/adminRoutes');


app.use('/users', userRoutes);
app.use('/blog', blogRoutes);
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
