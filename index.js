const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51HavVyFYQlFGDS7GUpQm3yMyj3W8hFYBSc5kd4ZoyHHocrtaPYK9S65SrgiSZTpNpdwNOH80wTwcmssLCR7rHNTv00YyL40MHR');

const PORT = process.env.port || 4000;
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("HELLO SERVER");
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('payment receieved', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})