# ripplectron

> Ripple(Blockchain coin) Wallet Desktop client for vue-electron

# How to save wallet key

```
C = User Crypto key (one-time input → send coin, check secret, load wallet)
S = Ripple Wallet Secret

HashValue = SHA256(C)
Encryption = AES256.encode(secret:S, key:HashValue)
DecodeValue = AES256.decode(value:Encryption, key:HashValue)
```

# Develop RoadMap

- [x] Create Wallet
- [x] get Balance
- [x] Send Coin (with Destination Tag)
- [x] get History
- [ ] Auto Update
- [ ] Donate Button
- [ ] Ripple Game
- [ ] Mac Version
  - [x] Test Version
  - [ ] Production
- [ ] Windows Version
  - [ ] Test Version
  - [ ] Production
- [ ] Linux Version
  - [ ] Test Version
  - [ ] Production
- [ ] Android Version
- [ ] iOS Version

![icon](https://github.com/devjin0617/ripplectron/blob/master/images/icon.png?raw=true)
![start](https://github.com/devjin0617/ripplectron/blob/master/images/image_0.png?raw=true)
![wallet](https://github.com/devjin0617/ripplectron/blob/master/images/image_1.png?raw=true)

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
