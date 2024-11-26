import dotevn from "dotenv";
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from "mongoose";
import axios from "axios";
import crypto from 'crypto'
import { Booking } from "./models/booking.model.js";

dotevn.config({
  path: "./env",
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes 

// Endpoint to create an order
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    method: 'POST',
    url: 'https://api.razorpay.com/v1/orders',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64')}`
    },
    data: {
      amount : Number(amount) * 100,
      currency,
      receipt: 'receipt#1',
      payment_capture: 1
    }
  };

  try {
    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// payment verification api
app.post('/api/payment-verification', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
  const { firstName, lastName, email, mobile, slot, date, fee } = req.body.bookingData

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) { 
    try {
      const newBooking = new Booking({
        firstName,
        lastName,
        email,
        mobile,
        slot,
        date,
        fee,
      });
  
      const savedBooking = await newBooking.save(); 
      res.status(200).json({
        verified : true,
        savedData : savedBooking
      })
    } catch (error) {
      console.error('Error saving booking detail in database:', error);
      res.status(500).json({ message: 'Error saving booking details in database' });
    }  
  } else {
    res.status(400).json({
      verified: false
    });
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
