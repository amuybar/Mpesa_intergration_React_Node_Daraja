const Transaction=require('../model/Transaction');


exports.callback=(req, res) => {
  const results=req.body;
  console.log(results.Body);
  // Check if the request is from Safaricom
  if(!results.Body.stkCallback.CallbackMetadata){
    console.log(results.Body);

    res.json('ok');
    
  }
  // Check if the request is from Safaricom
  else{
    console.log(results.Body.stkCallback.CallbackMetadata);

    const phone=results.Body.stkCallback.CallbackMetadata.Item[4].Value;
    const amount=results.Body.stkCallback.CallbackMetadata.Item[0].Value;
    const trnx_Id=results.Body.stkCallback.CallbackMetadata.Item[3].Value;
    console.log(phone);
    console.log(amount);
    console.log(trnx_Id);



    const transaction=new Transaction({
      number:phone,
      trnx_Id:trnx_Id,
      amount:amount,
    });
    transaction.save();
    console.log(transaction);
   
   

  res.status(200).send({
    message: 'ok'
  });
  
}}