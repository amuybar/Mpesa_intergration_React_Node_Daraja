const axios=require('axios');
require('dotenv').config();

// Create a "CreateToken" middleware
const createToken = async (req, res, next) => {
  // Getting the keys 
  const { SAFARICOM_CONSUMER_KEY, SAFARICOM_CONSUMER_SECRET } = process.env;

  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${SAFARICOM_CONSUMER_KEY}:${SAFARICOM_CONSUMER_SECRET}`).toString('base64');

  // Get the access token
  try {
      const response = await axios.get(url, {
          headers: {
              "Authorization": `Basic ${auth}`
          }
      });
      req.safaricom_access_token = response.data.access_token;
      console.log(req.safaricom_access_token);
      next();
  } catch (error) {
      res.status(401).send({
          "message": 'Something went wrong when trying to process your payment',
          "error": error.message
      });
  }
}

// Controller for STK push



// get time stamp
const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


module.exports={
  createToken,
  getTimestamp,
}