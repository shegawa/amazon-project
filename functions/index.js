
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions/v2");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

console.log('Stripe Key:', process.env.STRIPE_KEY); // Log Stripe Key to check if it's loaded

const app = express();
setGlobalOptions({ maxInstances: 10 })

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "success"
    });
});

app.post("/payment/create", async (req, res) => {
    const total = Number(req.query.total); // Convert total to number

    if (isNaN(total) || total <= 0) {
        return res.status(400).json({
            message: "Total must be a number greater than 0",
        });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        });
        console.log(paymentIntent);
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        logger.error("Error creating payment intent:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

exports.api = onRequest(app);


