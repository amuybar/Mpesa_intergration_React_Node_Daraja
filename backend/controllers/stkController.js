const axios = require('axios');
const { getTimestamp } = require('./token');
require('dotenv').config();

exports.stkPush = async (req, res) => {
    const amount = req.body.amount;
    const phone_number = req.body.phone.substring(1);
    const shortCode = process.env.BUSINESS_SHORT_CODE;
    const passKey = process.env.PASS_KEY;
    const timestamp = getTimestamp();
    const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const body = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone_number}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone_number}`,
        CallBackURL: "https://3e422b76d2c0189f904130f86436f19e.serveo.net/callback", 
        AccountReference: "Account Reference",
        TransactionDesc: "Transaction Description"
    };

    try {
        // Make the STK push request
        const response = await axios.post(url, body, {
            headers: {
                "Authorization": `Bearer ${req.safaricom_access_token}`,
                "Content-Type": "application/json"
            }
        });

        // Respond with the response body
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(401).send({
            "message": 'Something went wrong when trying to process your payment',
            "error": error.message
        });
    }
}
