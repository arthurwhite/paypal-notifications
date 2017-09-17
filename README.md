# PayPal Notifications

PayPal client for IPN (Instant Payment Notification) and PDT (Payment Data Transfer) notifications.

## Installation

1. Get package:

    ```sh
    npm i paypal-notifications -S
    ```

2. Import it in your code:

    ```js
    const paypal = require('paypal-notifications')
    ```

## Setup

### Instant Payment Notification

TODO

### Payment Data Transfer

1. Go to [*Website Payment Preferences*](https://www.sandbox.paypal.com/cgi-bin/customerprofileweb?cmd=%5fprofile%2dwebsite%2dpayments)
2. Set the *Return URL*
3. Turn the *Payment Data Transfer* on
4. Get the *Identity Token*
3. Save

See the [PayPal documentation](https://developer.paypal.com/docs/classic/products/payment-data-transfer/#get-started) for more details.

## Usage

Make a client with the environment (`true` for live, `false` for sandbox) and your token.

```js
const paypalToken = 'G-ddvHQfRB2wqzrHCgdkbx0uXEcgKTcWbG2GjlI581zbPbGxKekGXgyVwU0'
const paypalClient = new Paypal(false, paypalToken)
```

### Instant Payment Notification

TODO

### Payment Data Transfer

Use the `pdt` method to retrive a transaction by its ID.  
The callback receives an eventual error and, if all goes well, the whole transaction object.

```js
paypalClient.pdt('EPC66XON1D4EE27M9', (err, tx) => {
  if (err) throw err
  console.log(tx['payer_email'])
})
```
