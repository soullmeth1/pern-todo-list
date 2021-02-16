const express = require('express');
const app = express();
const cors = require('cors');
require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const postgresRoute = require('./routes/psqlRoute');
const mysqlRoute = require('./routes/mysqlRoute');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/pgsql', postgresRoute);
app.use('/mysql', mysqlRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
