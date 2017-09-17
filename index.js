const qs = require('qs')
const request = require('request')

const liveUrl = 'https://www.paypal.com/cgi-bin/webscr'
const sandboxUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr'

class Paypal {
  /**
   *
   * @param {Boolean} live
   * @param {String} tk
   */
  constructor(live, token) {
    this.live = live
    this.token = token
  }

  static get liveUrl() {
    return 'https://www.paypal.com/cgi-bin/webscr'
  }

  static get sandboxUrl() {
    return 'https://www.sandbox.paypal.com/cgi-bin/webscr'
  }

  get url() {
    if (this.live) {
      return Paypal.liveUrl
    } else {
      return Paypal.sandboxUrl
    }
  }

  /**
   * A callback that handles a PDT response.
   *
   * @callback Paypal~pdtCallback
   * @param {Error} err
   * @param {Object} tx - The PDT transaction object.
   */

  /**
   * Get a PDT transaction by its ID.
   *
   * @param {String} txId - The transaction ID.
   * @param {Paypal~pdtCallback} cb - The callback that handles the result.
   */
  pdt(txId, cb) {
    if (!txId) {
      throw new Error('Transaction ID not provided')
    }
    request.post(this.url, {form: {
      'cmd': '_notify-synch',
      'at': this.token,
      'tx': txId,
    }}, (err, res, body) => {
      if (err) {
        cb(err, null)
        return
      }
      body = body.split('\n')
      if (!body.length || body[0] != 'SUCCESS') {
        let err = new Error('Cannot get transaction from PayPal')
        cb(err, null)
        return
      }
      body = body.slice(1) // Remove 'SUCCESS'
      let tx = {}
      for (let line of body) {
        Object.assign(tx, qs.parse(line))
      }
      cb(null, tx)
    })
  }
}

module.exports = Paypal
