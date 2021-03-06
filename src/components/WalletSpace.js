import React from 'react'
import { Box, Button, Stack, Text } from "@chakra-ui/react"
import { IconContext } from 'react-icons'
import { BiWallet, BiCopy } from 'react-icons/bi'
import { AiOutlineDisconnect, AiOutlineWarning } from 'react-icons/ai'
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { injected } from "./wallet/connector"


const WalletSpace = ({ style }) => {
    const { active, account, activate, deactivate, error } = useWeb3React()

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
      <Stack direction="column" alignItems="center" mx="auto" w="100%" >
          {error instanceof UnsupportedChainIdError &&
              <Stack direction="row" alignItems="center" bg="#b20000" rounded="lg" py="1" px="3" >
                  <IconContext.Provider value={{ color: 'white' }}>
                      <AiOutlineWarning />
                  </IconContext.Provider>
                  <Text color="white" fontSize="sm">Switch network to <b>Fantom Opera</b></Text>
              </Stack>}
          {/* {!account && <IconContext.Provider value={{ color: 'orange', size: '25px' }}>
              <AiOutlineWarning />
          </IconContext.Provider>} */}
          {error instanceof UnsupportedChainIdError ||
            <Stack alignItems={active ? "flex-start" : "center"} direction="column" color="#ed6f1b">
                <Button size='md' backgroundColor=
                    {active ? "darkBrown" :
                        "darkBrown"} onClick={active ? () => {if(typeof(window) !== 'undefined') { navigator.clipboard.writeText(account)}} : connect}>
                        <Box><Text isTruncated color='white' fontSize='sm' >{active ? <Stack direction='row' alignItems="center" space={3}><Jazzicon diameter={20} seed={jsNumberForAddress(account)} /><Text color='white' fontSize='sm' w='100px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap'}}>{account}</Text><BiCopy/></Stack> : 'Connect Wallet'}</Text></Box>
                </Button>
                {/*active && <Stack direction='row'><Text color='white' fontSize='sm' w='100px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap'}}>{account}</Text><BiCopy onClick={() => {navigator.clipboard.writeText(account)}}/></Stack>*/}
              </Stack>
          }
          {active && <Button bg="#b20000" alignItems=" center" onClick={disconnect} color="white"><AiOutlineDisconnect /></Button>}
      </Stack >
    )
}

export default WalletSpace
