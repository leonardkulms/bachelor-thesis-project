/* eslint-disable no-undef */
import { ethers } from 'ethers';
import AvoToken from '../contracts/AvoToken.json';

const contractAddress = '0xc509d91e5A1B5d32e765012b21f39baBE95Ec723';

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
