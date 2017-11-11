export default {
  COMMON: {
    OK: 'Tamam',
    CANCEL: 'İptal',
    PUBLIC_ADDRESS: 'Cüzdan Adresi',
    WALLET: 'Cüzdan',
    SECRET: 'Kurtarma Anahtarı',
    CRYPTO_KEY: 'Gizli Kelime',
    BALANCE: 'Hesabım',
    SEND: 'Gönder',
    GET_SECRET: 'Kurtarma Anahtarı',
    HISTORY: 'Geçmiş',
    REMOVE_WALLET: 'Cüzdanı Sil',
    REMOVE: 'Sil',
    INFO: 'Hakkında',
    APP_INFO: 'Uygulama hakkında',
    DONATE: 'Bağış',
    SOURCE_CODE: 'Kaynak kodu',
    VALUE: 'Miktar',
    DATE: 'Tarih',
    ADDRESS: 'Adres',
    MESSAGE: {
      REMOVED: 'Silindi!',
      SUCCESS: 'Tamamlandı!'
    },
    ALERT: {
      CREATE_SUCCESS: {
        TITLE: 'Tamamlandı!',
        DESCRIPTION: 'Cüzdan oluşturuldu'
      }
    },
    CONFIRM: {
      CREATE_WALLET: {
        TITLE: 'Cüzdan oluştur',
        DESCRIPTION: 'Cüzdan oluşturmak istiyor musunuz?'
      },
      INPUT_PUBLIC_ADDRESS: {
        TITLE: 'Cüzdan ekle',
        DESCRIPTION: 'Lütfen cüzdan adresini giriniz'
      },
      INPUT_SECRET: {
        TITLE: 'Cüzdan ekle',
        DESCRIPTION: 'Lütfen cüzdan kurtarma anahtarını giriniz'
      },
      INPUT_CRYPTO_KEY: {
        TITLE: 'Şifreleme',
        DESCRIPTION: 'Lütfen gizli kelimenizi giriniz (Kurtarma anahtarını girmeyiniz)',
        VALIDATION: {
          TEXT: 'Rakam veya harf (6 ile 32 karakter arasında)'
        }
      },
      REMOVE_WALLET: {
        TITLE: 'Uyarı',
        DESCRIPTION: [
          'Cüzdanı silmek istediğinizden emin misiniz?',
          '(Sildikten sonra geri kurtarabilirsiniz)'
        ]
      },
      SEND_COIN: {
        TITLE: 'Gönder',
        DESCRIPTION: 'Göndermek istediğinizden emin misiniz?'
      }
    }
  },
  START_PAGE: {
    TITLE: 'Repplectron (Ripple Wallet)',
    BUTTON: {
      CREATE: 'Cüzdan oluştur',
      OPEN: 'Cüzdan ekle'
    }
  },
  WALLET_PAGE: {
    RELOAD_BALANCE: 'Bakiyeyi yenile'
  },
  SEND_PAGE: {
    DESTINATION_ADDRESS: 'Alıcı Ripple adresi',
    IS_TAG_TEXT: 'Destinasyon etiketi kullan',
    DESTINATION_TAG: 'Destinasyon Etiketi',
    MONEY: 'Tutar',
    VALIDATION: {
      EMPTY_INPUT: 'Lütfen geçerli bir adres giriniz',
      CHECK_ADDRESS: 'Lütfen Ripple adresi giriniz',
      CHECK_XRP: 'Lütfen XRP miktarını giriniz.',
      CHECK_MONEY: 'Lütfen tutarı giriniz.'
    }
  },
  HISTORY_PAGE: {
    EMPTY_LIST: 'İşlem geçmişi bulunmamakta.'
  }
}
