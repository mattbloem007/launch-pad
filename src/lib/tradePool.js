import abi from './abi'
import {ethers} from 'ethers'
import addresses from './contractAddresses'
import {toBN} from './bn'

const rpcEndPoint = {
    test: 'https://xapi.testnet.fantom.network/lachesis' //'HTTP://127.0.0.1:7545'//'https://api.avax-test.network/ext/bc/C/rpc'
}

const ethersProvider = new ethers.providers.JsonRpcProvider(rpcEndPoint.test)
ethersProvider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
});

const TOAAddress = addresses.toaAddress
const USDCAddress = addresses.USDC
const TradepoolAddress = addresses.tradepool

const USDCContract = new ethers.Contract(USDCAddress, abi.USDC, ethersProvider)
const TOAContract = new ethers.Contract(TOAAddress, abi.toa, ethersProvider)
const TradepoolContract = new ethers.Contract(TradepoolAddress, abi.tradepool, ethersProvider)

let abis = {}
abis[USDCAddress] = abi.USDC
abis[TOAAddress] = abi.toa
abis[TradepoolAddress] = abi.tradepool

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
        //Write functions - include provider
        approve: async (provider, to, tokenId) => await send(TOAAddress,provider,'approve',[to, tokenId]),
        transferFrom: async (provider, from, to, tokenId) => await send(TOAAddress,provider,'transferFrom',[from, to, tokenId]),
        setApprovalForAll: async (provider, operator, approved) => await send(TOAAddress,provider,'setApprovalForAll',[operator, approved])
    },
    tradepool: {
        //Read functions
        address: TradepoolAddress,
        numOffers: async () => await TradepoolContract.numOffers(),
        getOfferByIndex: async (idx) => await TradepoolContract.numOffers(idx),
        getOffers: async () => {
            let num = await $.tradepool.numOffers()
            let n = num.toNumber()
            let ar = []
            for(let i=0;i<n;i++){
                ar.push(toBN(i))
            }
            return await Promise.all(ar.map(async idx => await $.tradepool.getOfferByIndex(idx)))
        },
        //Write functions
        createOffer: async (provider, tokenId, price) => await send(TradepoolAddress,provider,'createOffer',[tokenId, price]),
        withdrawOffer: async (provider, tokenId) => await send(TradepoolAddress,provider,'withdrawOffer',[tokenId]),
        bid: async (provider, tokenId) => await send(TradepoolAddress,provider,'bid',[tokenId])
    }

}

export default $

