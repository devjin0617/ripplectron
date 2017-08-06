export default {
  COMMON: {
    OK: '확인',
    CANCEL: '취소',
    PUBLIC_ADDRESS: '공개 주소',
    WALLET: '지갑',
    SECRET: '비밀키',
    CRYPTO_KEY: '암호화 키',
    BALANCE: '잔액',
    SEND: '전송',
    GET_SECRET: '비밀키 확인',
    REMOVE_WALLET: '지갑 삭제',
    REMOVE: '삭제',
    MESSAGE: {
      REMOVED: '삭제되었습니다!',
      SUCCESS: '완료했습니다!'
    },
    ALERT: {
      CREATE_SUCCESS: {
        TITLE: '완료!',
        DESCRIPTION: '지갑이 생성되었습니다.'
      }
    },
    CONFIRM: {
      CREATE_WALLET: {
        TITLE: '지갑 생성',
        DESCRIPTION: '지갑을 생성하시겠습니까?'
      },
      INPUT_PUBLIC_ADDRESS: {
        TITLE: '지갑 가져오기',
        DESCRIPTION: '리플 공개 주소를 입력창에 입력해주세요.'
      },
      INPUT_SECRET: {
        TITLE: '지갑 가져오기',
        DESCRIPTION: '리플 비밀키를 입력창에 입력해주세요.'
      },
      INPUT_CRYPTO_KEY: {
        TITLE: '암호화',
        DESCRIPTION: '리플지갑을 암호화할 임의의 키를 입력하세요. (리플 비밀키가 아닙니다)',
        VALIDATION: {
          TEXT: '숫자나 문자열을 입력하세요. (6~32자 사이로 이루어져야 합니다.)'
        }
      },
      REMOVE_WALLET: {
        TITLE: '경고',
        DESCRIPTION: [
          '현재 저장되어 있는 리플지갑을 삭제하시겠습니까?',
          '(나중에 필요할 때 언제든지 다시 불러올 수 있습니다.)'
        ]
      },
      SEND_COIN: {
        TITLE: 'Send',
        DESCRIPTION: 'Ready to XRP send?'
      }
    }
  },
  START_PAGE: {
    TITLE: 'Repplectron (리플 지갑)',
    BUTTON: {
      CREATE: '지갑 생성',
      OPEN: '지갑 가져오기'
    }
  },
  WALLET_PAGE: {
    RELOAD_BALANCE: '잔액 갱신'
  },
  SEND_PAGE: {
    DESTINATION_ADDRESS: '상대방 XRP 공개 주소',
    IS_TAG_TEXT: 'destination 태그사용',
    DESTINATION_TAG: 'destination 태그',
    MONEY: '돈',
    VALIDATION: {
      EMPTY_INPUT: '공개 주소를 다시 확인해주세요.',
      CHECK_ADDRESS: '리플 공개 주소를 입력해주세요.',
      CHECK_XRP: '전송할 XRP를 입력해주세요.',
      CHECK_MONEY: '금액을 확인해주세요.'
    }
  }
}
