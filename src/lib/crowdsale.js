import abi from './abi'
import {ethers} from 'ethers'
import addresses from './contractAddresses'
import {axios} from 'axios'

const rpcEndPoint = {
    test: 'https://xapi.testnet.fantom.network/lachesis' //'HTTP://127.0.0.1:7545'//'https://api.avax-test.network/ext/bc/C/rpc'
}

const ethersProvider = new ethers.providers.JsonRpcProvider(rpcEndPoint.test)
ethersProvider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
});

const replaceIPFS = (url) => url.replace('ipfs://','http://nftupload.infura-ipfs.com/ipfs/')

const TOAAddress = addresses.toaAddress
const crowdsaleAddress = addresses.crowdsaleAddress
const USDCAddress = addresses.USDC
const ELYSAddress = addresses.Elys


const USDCContract = new ethers.Contract(USDCAddress, abi.USDC, ethersProvider)
const ELysContract = new ethers.Contract(ELYSAddress, abi.Elys, ethersProvider)
const TOAContract = new ethers.Contract(TOAAddress, abi.toa, ethersProvider)
const CrowdsaleContract = new ethers.Contract(crowdsaleAddress, abi.crowdsale, ethersProvider)

let abis = {}
abis[USDCAddress] = abi.USDC
abis[ELYSAddress] = abi.Elys
abis[TOAAddress] = abi.toa
abis[crowdsaleAddress] = abi.crowdsale

const confirm = (txhash) => {
    return new Promise(r=>ethersProvider.once(txhash,()=>r()))
}

const send = async (address, provider, func, params) => {
    console.log(address)
    console.log(params)
    const contract = new ethers.Contract(address, abis[address], provider)
    let ret
    try{
        const feeData = await provider.getFeeData()
        console.log(func)
        ret = await contract[func](...params,{gasPrice: feeData.gasPrice})
    }
    catch(e){
        console.log(e)
        return e
    }
    return ret
}

const $ = {
    provider: ethersProvider,
    confirm,
    nativeBalanceOf: async (acc) => {
        let wallet = new ethers.Wallet(acc.privateKey,ethersProvider)
        return await wallet.getBalance()
    },

    USDC: {
        //Read functions
        address: USDCAddress,
        allowance: async (owner, spender) => await USDCContract.allowance(owner,spender),
        balanceOf: async (address) => await USDCContract.balanceOf(address),
        decimals: async () => await USDCContract.decimals(),
        name: async () => await USDCContract.name(),
        symbol: async () => await USDCContract.symbol(),
        //Write functions - include provider
        approve: async (provider, spender, amount) => await send(USDCAddress, provider, 'approve',[spender,amount]),
        test: {
            mint: async (provider, to, amount) => await send(USDCAddress, provider, 'mint',[to, amount]),
        }
    },
    ELYS: {
        //Read functions
        address: ELYSAddress,
        allowance: async (owner, spender) => await ELysContract.allowance(owner,spender),
        balanceOf: async (address) => await ELysContract.balanceOf(address),
        decimals: async () => await ELysContract.decimals(),
        name: async () => await ELysContract.name(),
        symbol: async () => await ELysContract.symbol(),
        //Write functions - include provider
        approve: async (provider, spender, amount) => await send(ELYSAddress, provider, 'approve',[spender,amount]),
        test: {
            mint: async (provider, to, amount) => await send(ELYSAddress, provider, 'mint',[to, amount]),
        }
    },
    TOA: { //TODO: tokenURI
        //Read functions
        address: TOAAddress,
        balanceOf: async (address) => await TOAContract.balanceOf(address),
        totalSupply: async () => await TOAContract.totalSupply(),
        tokenOfOwnerByIndex: async (owner, index) => await TOAContract.tokenOfOwnerByIndex(owner, index),
        tokenByIndex: async (index) => await TOAContract.tokenByIndex(index),
        ownerOf: async (tokenId) => await TOAContract.ownerOf(tokenId),
        getApproved: async (tokenId) => await TOAContract.getApproved(tokenId),
        isApprovedForAll: async (owner, operator) => await TOAContract.isApprovedForAll(owner, operator),
        meta: async (tokenId) => {
            let url = await TOAContract.tokenURI(tokenId)
            url = replaceIPFS(url)
            let ret = await axios.get(url)
            let meta = ret.data
            meta.url = url
            return meta
        },
        //Write functions - include provider
        approve: async (provider, to, tokenId) => await send(TOAAddress,provider,'approve',[to, tokenId]),
        transferFrom: async (provider, from, to, tokenId) => await send(TOAAddress,provider,'transferFrom',[from, to, tokenId]),
        setApprovalForAll: async (provider, operator, approved) => await send(TOAAddress,provider,'setApprovalForAll',[operator, approved])
    },
    crowdsale: {
        //Read functions
        address: crowdsaleAddress,
        timeUntilEnd: async () => await CrowdsaleContract.timeUntilEnd(),
        fundsRaised: async () => await CrowdsaleContract.fundsRaised(),
        isOpen: async () => await CrowdsaleContract.isOpen(),
        isSuccess: async () => await CrowdsaleContract.isSuccess(),
        numPurchased: async () => await CrowdsaleContract.numPurchased(),
        available: async () => await CrowdsaleContract.available(),
        toaPrice: async () => await CrowdsaleContract.toaPrice(),
        TOABalance: async (account) => await CrowdsaleContract.TOABalance(account),
        balanceOf: async (account) => await CrowdsaleContract.balanceOf(account), //USDC balance available
        //Write functions - include provider
        buy: async (provider, numTOAs) => await send(crowdsaleAddress,provider,'buy',[numTOAs]),
        returnFunds: async (provider, to) => await send(crowdsaleAddress,provider,'returnFunds',[to]),
        withdrawFunds: async (provider, to) => await send(crowdsaleAddress,provider,'withdrawFunds',[to]),
        assignTOAs: async (provider) => await send(crowdsaleAddress,provider,'assignTOAs',[])
    }

}

export default $

