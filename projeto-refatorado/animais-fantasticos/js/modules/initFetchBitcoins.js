export default function fetchBitcoins(url, target) {
  async function getBitcoin() {
    try {
      const $bitcoinElement = document.querySelector(target);
      const data = await fetch(url);
      const dataResponse = await data.json();
      const donation = 100 / dataResponse.BRL.buy;
      $bitcoinElement.innerText = donation.toFixed(4);
    } catch (error) {
      console.log(Error(error));
    }
  }
  return getBitcoin();
}
