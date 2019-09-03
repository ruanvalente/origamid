export default function initFetchBitcoins() {
  async function getBitcoin(url) {
    try {
      const $bitcoinElement = document.querySelector('[data-js="bitcoin"]')
      const data = await fetch(url)
      const dataResponse = await data.json()
      const donation = 100 / dataResponse.BRL.buy
      $bitcoinElement.innerText = donation.toFixed(4)
    } catch (error) {
      console.log(Error(error))
    }
  }
  getBitcoin('https://blockchain.info/ticker')
}
