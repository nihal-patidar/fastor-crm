const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const enquiryRoutes = require('./routes/enquiryRoutes.js')

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(' Fastor CRM API Running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/enquiry',enquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
