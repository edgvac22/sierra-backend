const yappy = require("yappy-node-back-sdk");

require('dotenv').config()

  const yappyCarga = async (req, res = response) => {
    const { ptotal, psubtotal, pshipping, pdiscount, ptaxes, porderId, ptelefono } = req.body;

    const MERCHANT_ID = process.env.MERCHANT_ID;
    const SECRET_KEY = process.env.SECRET_KEY;

    const yappyClient = yappy.createClient(
      MERCHANT_ID,
      SECRET_KEY
    );
    const payment= {
                    total: ptotal,
                    subtotal: psubtotal,
                    shipping: pshipping,
                    discount: pdiscount,
                    taxes: ptaxes,
                    orderId: porderId,
                    successUrl: 'http://localhost:8080/success.html',
                    failUrl: 'http://localhost:8080/checkout.html',
                    tel: "6000-0000",
                    domain: 'https://ofideusa.net',
                    }
    try {
      const response = await yappyClient.getPaymentUrl(payment,false, true); 
      res.json(response);

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    yappyCarga
}