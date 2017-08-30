export default {
  COMMON: {
    OK: 'OK',
    CANCEL: 'Cancel',
    PUBLIC_ADDRESS: 'Public address',
    WALLET: 'Wallet',
    SECRET: 'secret',
    CRYPTO_KEY: 'Crypto key',
    BALANCE: 'Balance',
    SEND: 'Send',
    GET_SECRET: 'Get Secret',
    HISTORY: 'History',
    REMOVE_WALLET: 'Remove Wallet',
    REMOVE: 'Remove',
    INFO: 'Info',
    APP_INFO: 'App Info',
    DONATE: 'Donate',
    SOURCE_CODE: 'Source Code',
    VALUE: 'value',
    DATE: 'date',
    ADDRESS: 'address',
    MESSAGE: {
      REMOVED: 'Removed!',
      SUCCESS: 'Success!'
    },
    ALERT: {
      CREATE_SUCCESS: {
        TITLE: 'Success!',
        DESCRIPTION: 'Wallet Created'
      }
    },
    CONFIRM: {
      CREATE_WALLET: {
        TITLE: 'Create Wallet',
        DESCRIPTION: 'Would you like to make a wallet?'
      },
      INPUT_PUBLIC_ADDRESS: {
        TITLE: 'Get Wallet',
        DESCRIPTION: 'Please input your Ripple Public Address'
      },
      INPUT_SECRET: {
        TITLE: 'Get Wallet',
        DESCRIPTION: 'Please input your Ripple Secret'
      },
      INPUT_CRYPTO_KEY: {
        TITLE: 'Encryption',
        DESCRIPTION: 'Please input your Crypto key (not Secret key)',
        VALIDATION: {
          TEXT: 'Number or String (Enter more than 6-32 characters)'
        }
      },
      REMOVE_WALLET: {
        TITLE: 'Warning',
        DESCRIPTION: [
          'Are you sure you want to delete your wallet?',
          '(You can recover it even after deleting it.)'
        ]
      },
      SEND_COIN: {
        TITLE: 'Send',
        DESCRIPTION: 'Ready to XRP send?'
      }
    }
  },
  START_PAGE: {
    TITLE: 'Repplectron (Ripple Wallet)',
    BUTTON: {
      CREATE: 'Create Wallet',
      OPEN: 'Get the Wallet'
    }
  },
  WALLET_PAGE: {
    RELOAD_BALANCE: 'Reload Balance'
  },
  SEND_PAGE: {
    DESTINATION_ADDRESS: 'Receive XRP Address',
    IS_TAG_TEXT: 'using destination tag',
    DESTINATION_TAG: 'destination tag',
    MONEY: 'Money',
    VALIDATION: {
      EMPTY_INPUT: 'Please input a valid address',
      CHECK_ADDRESS: 'Please input Ripple Address',
      CHECK_XRP: 'Please input XRP',
      CHECK_MONEY: 'Please input money'
    }
  },
  HISTORY_PAGE: {
    EMPTY_LIST: 'No transaction history.'
  }
}
