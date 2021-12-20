
let web3, shieldInstance,kogeInstance,pearInstance, singInstance




async function loadWeb3(){
  web3 = new Web3('https://speedy-nodes-nyc.moralis.io/b339a04a1ce96516cea5132d/polygon/mainnet')
  const shieldAddress = "0xF239E69ce434c7Fb408b05a0Da416b14917d934e";
  const kogeAddress = "0x13748d548D95D78a3c83fe3F32604B4796CFfa23"
  const pearAddress = "0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44"
  const singAddress = "0xCB898b0eFb084Df14dd8E018dA37B4d0f06aB26D"

    shieldInstance =  new web3.eth.Contract(window.shieldABI, shieldAddress);
    kogeInstance =  new web3.eth.Contract(window.kogeABI, kogeAddress);
    pearInstance =  new web3.eth.Contract(window.pearABI, pearAddress);
    singInstance =  new web3.eth.Contract(window.singABI, singAddress);
}

async function returnBalance() {
  let address = document.getElementById("walletAddress").value
  let shieldBal = await shieldInstance.methods.balanceOf(address).call()
  let kogeBal = await kogeInstance.methods.balanceOf(address).call()
  let pearBal = await pearInstance.methods.balanceOf(address).call()
  let singBal = await singInstance.methods.balanceOf(address).call()
  let shieldToDaiQuote, kogeToDaiQuote, pearToDaiQuote, singToDaiQuote
  try{
     shieldToDaiQuote = await axios.get(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=0xF239E69ce434c7Fb408b05a0Da416b14917d934e&toTokenAddress=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&amount=${shieldBal}`)
     kogeToDaiQuote = await axios.get(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=0x13748d548D95D78a3c83fe3F32604B4796CFfa23&toTokenAddress=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&amount=${kogeBal}`)
     pearToDaiQuote = await axios.get(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44&toTokenAddress=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&amount=${pearBal}`)
     singToDaiQuote = await axios.get(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=0xCB898b0eFb084Df14dd8E018dA37B4d0f06aB26D&toTokenAddress=0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063&amount=${singBal}`)
  }catch(err){
    console.log("Wallet address does not have required balance: This error indicates a 0 token balance")
  }
  document.getElementById("shield-count").textContent = shieldBal;
  document.getElementById("koge-count").textContent = kogeBal;
  document.getElementById("pear-count").textContent = pearBal;
  document.getElementById("sing-count").textContent = singBal;

  document.getElementById("shield-quote").textContent = shieldToDaiQuote.data.toTokenAmount;
  document.getElementById("koge-quote").textContent = kogeToDaiQuote.data.toTokenAmount;
  document.getElementById("pear-quote").textContent = pearToDaiQuote.data.toTokenAmount;
  document.getElementById("sing-quote").textContent = singToDaiQuote.data.toTokenAmount;

}

document.getElementById("balanceCheck").onclick = returnBalance;

loadWeb3()
