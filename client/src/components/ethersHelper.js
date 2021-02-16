/* eslint-disable no-undef */
import { ethers } from 'ethers';
import AvoToken from '../contracts/AvoToken.json';

const contractAddress = '0xA8002F2661C4520D61a9254Cff4b232Fd7e1bf52';

function getEther() {
  let provider;
  let signer;
  let erc20;
  let noProvider = true;

  try {
    // Ethers.js set up, gets data from MetaMask and blockchain
    window.ethereum.enable().then(
      provider = new ethers.providers.Web3Provider(window.ethereum),
    );
    signer = provider.getSigner();
    erc20 = new ethers.Contract(contractAddress, AvoToken.abi, signer);
    noProvider = false;

    return [provider, signer, erc20, noProvider];
  } catch (e) {
    noProvider = true;
    return [provider, signer, erc20, noProvider];
  }
}

export default getEther;
