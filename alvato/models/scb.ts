import Joi from "joi"

export async function validatePaymentNotify(body:any){
    const schema = Joi.object({
        amount: Joi.string().required(),
        transactionId: Joi.string().required(),
        transactionDateandTime: Joi.string().required(),
        currencyCode: Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}



/*

  There are response message detail from SCB for each payment type below

  // QR 30 & SCB EASY App Payment (BP)
  "payeeProxyId":"010556107659001",
  "payeeProxyType":"BILLERID",
  "payeeAccountNumber":"4680716512",
  "payerAccountNumber":"0662658053",
  "payerName":"อิสมาน ยูโซะ",
  "sendingBankCode":"014",
  "receivingBankCode":"014",
  "amount":"1.00",
  "transactionId":"46a0e0c00f114482991414ef26654ace",
  "transactionDateandTime":"2019-04-11T05:16:48.000+07:00",
  "billPaymentRef1":"190411VZGNEYIWD55KDD",
  "billPaymentRef2":"ESPREE",
  "billPaymentRef3":"ESP5CAE6B1B77HOCJXLZ",
  "currencyCode":"764",
  "channelCode":"PMH",
  "transactionType":"Domestic Transfers" 


  // SCB EASY App Payment (CCFA)
  "amount": "1.0000",
  "transactionId": "46a0e0c00f114482991414ef26654ace",
  "transactionDateandTime": "2019-04-10T08:01:09.427+00:00",
  "consumerPAN": "540716xxxxxx5772",
  "currencyCode": "764",
  "transactionType": "AUTH",
  "traceNo": "014691",
  "terminalId": "57000002",
  "merchantId": "010000000002356766",
  "authorizeCode": "001ERH",
  "paymentMethod": "CreditCard",
  "billPaymentRef1": "190411VZGNEYIWD55KDD",
  "channelCode": "VISA"

  //SCB EASY App Payment (CCIPP)
  "amount": "1.0000",
  "transactionId": "46a0e0c00f114482991414ef26654ace",
  "transactionDateandTime": "2019-04-10T08:01:09.427+00:00",
  "consumerPAN": "540716xxxxxx5772",
  "currencyCode": "764",
  "transactionType": "AUTH",
  "traceNo": "014691",
  "terminalId": "57000002",
  "merchantId": "010000000002356766",
  "authorizeCode": "001ERH",
  "paymentMethod": "CreditCard",
  "billPaymentRef1": "190411VZGNEYIWD55KDD",
  "channelCode": "VISA",
  "tenor": "12",
  "ippType": "3",
  "productCode": "1001"

  //QR CS
  "amount": "1.0000",
  "transactionId": "243361",
  "transactionDateandTime": "2019-04-10T08:01:09.427+00:00",
  "merchantPAN": "5598650000204536",
  "consumerPAN": "540716xxxxxx5772",
  "currencyCode": "764",
  "transactionType": "AUTH",
  "qrId": "305408",
  "terminalId": "57000002",
  "merchantId": "010000000002356766",
  "traceNo": "014691",
  "authorizeCode": "001ERH",
  "paymentMethod": "QRCS",
  "channelCode": "VISA",
  "invoice": "1234",
  "note": ""

  //Alipay
  "payerName": "int***@service.*",
  "amount": "1.00",
  "transactionId": "2019041022001460421025418283",
  "transactionDateandTime": "2019-04-10T16:22:53+07:00",
  "currencyCode": "764",
  "transactionType": "AUTH",
  "qrId": "65001195143542737928",
  "terminalId": "65001195",
  "merchantId": "2300060",
  "paymentMethod": "ALIPAY",
  "exchangeRate": "0.21169846",
  "equivalentAmount": "0.21",
  "equivalentCurrencyCode": "156",
  "companyId": "004"


  //WeChatPay
  "payerName": "oGxrV0QJzbqTX3hDi7WE9d35_Q4I",
  "amount": "1",
  "transactionId": "4200000287201904104686653117",
  "transactionDateandTime": "2019-04-10T16:19:04+07:00",
  "currencyCode": "764",
  "transactionType": "AUTH",
  "qrId": "65001195143538455980",
  "terminalId": "65001195",
  "merchantId": "2300060",
  "paymentMethod": "WECHATPAY",
  "exchangeRate": "0.2118",
  "equivalentAmount": "0.21",
  "equivalentCurrencyCode": "156",
  "companyId": "004"

*/