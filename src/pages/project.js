import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import About from "components/About";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import Header from "components/Header";
import kannaNFT from "../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
import tree from '../images/Tree Artwork - V1.0.png'
import crystal from '../images/Crystal Artwork - V1.0.png'
import $ from 'lib/crwodsale.js'
import { toDec } from 'lib/bn.js'
import { useWeb3React } from "@web3-react/core"
import Sticky from 'react-stickynode';
import metricsBG from '../images/CardBackground.png'
import {
  Box,
  Container,
  Stack,
  Grid,
  GridItem
} from "@chakra-ui/layout"
import {
  AspectRatio,
  Tabs,
  Input,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Text,
  Heading,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useDisclosure
} from '@chakra-ui/react'




// display: grid;
// grid-template-columns: 5fr 4fr;
// gap: 40px;
// align-items: flex-start;
const ProjectHeroContainer = styled("div")`

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 0.5em;
    margin-left: 0px;
    border: 2px;
    border-color: #ec7019;
    border-radius: 2px;
    background: #F0EBDD;

    img {
        max-width: 600px;
    }
`


const ProjectBody = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 550px;
    margin: 0;
    margin-left: 55px;
    margin-right: 55px;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const Project = () => {

  const toast = useToast();
  const toastIdRef = useRef();
  const [tabIndex, setTabIndex] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [approved, setApproved] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nftAmount, setNftAmount] = useState({ amount: 1 })
  const [timeLeft, settimeLeft] = useState("")
  const [fundsRaised, setfundsRaised] = useState("")
  const [toaPrice, settoaPrice] = useState("")
  const [toaPriceBN, settoaPriceBN] = useState("")
  const [numPurchased, setnumPurchased] = useState("")
  const [available, setavailable] = useState("")
  const { active, account, library } = useWeb3React()



  useEffect(() => {
    async function fetchData() {
      let time = await $.crowdsale.timeUntilEnd()
      //time = toDec(time._hex, 0, 1)
      let date = new Date(Date.now() + time.mul(1000).toNumber())
      let funds = await $.crowdsale.fundsRaised()
      funds = toDec(funds._hex, 6, 1)
      let priceBN = await $.crowdsale.toaPrice()
      let price = toDec(priceBN._hex, 6, 1)
      let num = await $.crowdsale.numPurchased()
      num = toDec(num._hex, 0, 1)
      let avail = await $.crowdsale.available()
      avail = toDec(avail._hex, 0, 1)
      console.log("time", time, date, funds, price, num, avail)
      let today = new Date(Date.now())
      let ti = date.getTime() - today.getTime()
      let daysRemaining = ti/(1000 * 60 * 60 * 24)
      console.log("days remaining", daysRemaining)
      settimeLeft(daysRemaining)
      setfundsRaised(funds)
      settoaPrice(price)
      settoaPriceBN(priceBN)
      setnumPurchased(num)
      setavailable(avail)
    }
     fetchData();

    }, [])


  function handleInputChange(e) {
    setNftAmount(currentValues => ({
      ...currentValues,
      nftAmount: e,
    }))
  }

  async function approveUSDC(active, amount) {
    //---> sending transaction to the blockchain (Toaster) approve pending
    if(active) {
      setProcessing(true)
      toastIdRef.current = toast({
              containerStyle: {zIndex: "5500"},
              title: 'Approval pending',
              position: "top",
              status: 'info',
              isClosable: true,
              duration: 120000
          })

      let tx = await $.USDC.approve(library.getSigner(account), $.crowdsale.address, amount)
      //sent approval to the blockchain
      toast.update(toastIdRef.current, {
            title: 'Sent approval to the blockchain',
          //  description: "Sending Transaction to the blockchain.. ",
            status: 'info',
            duration: 9000,
            isClosable: true,
      })
      await $.confirm(tx.hash)
      //approval successful
       toast.update(toastIdRef.current, {
            title: 'Approval successful',
          //  description: "Sending Transaction to the blockchain.. ",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        setProcessing(false)
        setApproved(true)
    }
    else {
      toastIdRef.current = toast({
              containerStyle: {zIndex: "5500"},
              title: 'Please connect wallet!',
              position: "bottom",
              status: 'error',
              isClosable: true,
              duration: 120000
          })
    }


  }

  async function buyTOA(numTOAs) {
    //---> sending transaction to the blockchain (Toaster) approve pending
    setProcessing(true)

    toastIdRef.current = toast({
          title: 'Buy Pending',
          description: "Sending transaction to the blockchain.. ",
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
    let tx = await $.crowdsale.buy(library.getSigner(account), numTOAs)
    //sent approval to the blockchain
    toast.update(toastIdRef.current, {
          title: 'Sent transaction to the blockchain',
        //  description: "Sending Transaction to the blockchain.. ",
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
    await $.confirm(tx.hash)
    //approval successful
    toast.update(toastIdRef.current, {
          title: 'Transaction successful',
        //  description: "Sending Transaction to the blockchain.. ",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      setProcessing(false)
    //  setApproved(true)
  }

  return(
    <>
        <Helmet
            title={`Kanna Launch | Elyseos Launch Pad`}
            titleTemplate={`%s | meta.title`}
            meta={[
                {
                    name: `description`,
                    content: 'meta.description',
                },
                {
                    property: `og:title`,
                    content: `Kanna Launch | Elyseos Launch Pad`,
                },
                {
                    property: `og:description`,
                    content: 'meta.description',
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: 'meta.author',
                },
                {
                    name: `twitter:title`,
                    content: 'meta.title',
                },
                {
                    name: `twitter:description`,
                    content: 'meta.description',
                },
            ]}
        />
          <Header id="header" style={{zIndex: '-1'}}/>
          <Modal isCentered onClose={onClose} isOpen={isOpen}>
            <ModalOverlay
              bg='none'
              backdropFilter='auto'
              backdropInvert='80%'
              backdropBlur='2px'
            />
            <ModalContent alignItems="center" style={{background: "#164057", color: "white", borderRadius: "44px"}}>
              <ModalHeader style={{fontSize: "29px", fontFamily: "Parisine Plus Std Sombre", textTransform: "uppercase"}}>Sceletium TOA NFT'S</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing="5" w="full" direction="column" alignItems="flex-end" p="2">
                    <Image h='368px' w='368px' src={kannaNFT}/>
                    <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                      <Text fontSize="sm" color={"white"}>Quantity</Text>
                       <NumberInput
                       width='68px'
                       style={{borderRadius:"25px", border:"2px solid #CFADD9"}}
                       defaultValue={nftAmount.amount}
                       onChange={(e) => handleInputChange(e)}>
                        <NumberInputField style={{border: "0px"}}/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Stack>
                    <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                      <Text fontSize="sm" color={"white"}>USDC Price</Text>
                      <Text fontSize="sm" color={"white"}>${toaPrice}</Text>
                    </Stack>
                    {
                      approved ?
                      <Button size='xl' bg="darkBrown" style={{alignSelf: "center"}} isLoading={processing} onClick={() => buyTOA(nftAmount.amount)}>
                        Buy TOA
                      </Button>
                      :
                      <Button size='xl' bg="darkBrown" style={{alignSelf: "center"}} isLoading={processing} onClick={() => approveUSDC(active, toaPriceBN.mul(nftAmount.amount))}>
                        Approve USDC
                      </Button>
                    }

                  </Stack>

              </ModalBody>
            </ModalContent>
          </Modal>
          <ProjectHeroContainer id="project" style={{zIndex:"33"}}>
            <Image h='353px' w='353px' style={{position: 'relative'}} src={tree}/>
            <Grid templateColumns='5fr 4fr' gap={6} style={{maxHeight: "460px", position: "relative", right: "112px"}}>
              <GridItem h="70%">
                <Tabs isFitted size='sm' id="projectTablist" index={tabIndex} onChange={(index) => setTabIndex(index)}>
                  <TabList>
                    <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                    <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                    <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Documentation</Heading></Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <AspectRatio margin={"1rem"} w='583px' h='384px' borderRadius='25px' ratio={16 / 9}>
                        <iframe
                        title='elyseos'
                        src='https://www.youtube.com/embed/YlU5XwqtTbY'
                        allowFullScreen
                        style={{borderRadius: '25px', width:'593px', height:'384px'}}
                        />
                      </AspectRatio>
                    </TabPanel>
                    <TabPanel>
                      <Stack alignItems="center" margin={"1rem"} w='583px' h='384px' borderRadius='25px' backgroundImage={metricsBG} backgroundPosition="center" backgroundRepeat="no-repeat" backgroundSize="cover">
                        <Image src={kannaNFT} w='353px' h='353px'/>
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <AspectRatio margin={"1rem"} w='583px' h='384px' borderRadius='25px' ratio={16 / 9}>
                        <iframe
                        title='elyseos'
                        src='https://www.youtube.com/embed/YlU5XwqtTbY'
                        allowFullScreen
                        style={{borderRadius: '25px', width:'593px', height:'384px'}}
                        />
                      </AspectRatio>
                    </TabPanel>
                  </TabPanels>

                </Tabs>
              </GridItem>
              <GridItem h="70%">
                <Sticky enabled={true} top={100} bottomBoundary="#footer">
                  <Stack direction="column" alignItems="center">
                    <Image w='295px' h='295px' src={crystal} style={{position: "relative", bottom: "184px", zIndex: "99"}}/>
                    <Container centerContent p="3" pt="0" shadow="lg" w="400px" h="385px" borderRadius="25px" bg="navy" style={{position: "relative", bottom: "255px"}}>
                        <Text textAlign="left" w="full" fontSize="5xl" fontWeight="medium" color={"white"} h='95px'>$ {fundsRaised}</Text>
                        <Container px="8">
                          <Text textAlign={"center"} flexGrow="2" fontSize="lg" color={"white"} >Raised of ${toaPrice*(parseInt(numPurchased) + parseInt(available))} Minimum</Text>
                          <Progress bg="lavendar" rounded="3xl" value={(fundsRaised/toaPrice)*100} colorScheme="progress" marginBottom={"5px"}/>
                        </Container>
                        <Stack spacing="5" w="full" direction="column" alignItems="flex-end" p="2">
                          <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                            <Text fontSize="sm" color={"white"}>Price</Text>
                            <Text fontSize="sm" color={"white"}>${toaPrice}/TOA</Text>
                          </Stack>
                          <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                            <Text fontSize="sm" color={"white"}>TOA's left</Text>
                            <Text fontSize="sm" color={"white"}>{numPurchased}/{parseInt(numPurchased) + parseInt(available)} Sold</Text>
                          </Stack>
                        </Stack>
                        <Button size="lg" bg="darkBrown" onClick={onOpen}>
                        Buy Now
                        </Button>
                        <Text textAlign={"center"} flexGrow="2" color={"white"} fontStyle={"italic"}>{Math.trunc(timeLeft)} days Remaining</Text>
                    </Container>
                  </Stack>
                </Sticky>
              </GridItem>
            </Grid>
          </ProjectHeroContainer>
            <ProjectBody>
              <Stack spacing="5" w={"150px"} direction="column" p="2" borderRight={"2px"} borderRightStyle={"dotted"}>
                <Box color="navy" fontSize='sm' fontWeight="bold">
                Background
                </Box>
                <Box color="navy" fontSize='sm' fontWeight="bold">
                  Keypoints
                </Box>
                <Box color="navy" fontSize='sm' fontWeight="bold">
                  Stakeholders
                </Box>
                <Box color="navy" fontSize='sm' fontWeight="bold">
                  Risks
                </Box>
              </Stack>
            <Tabs isFitted size='sm' id="projectTablist" index={tabIndex} onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Documentation</Heading></Tab>
              </TabList>

              <TabPanels style={{width: "600px"}}>
                <TabPanel>
                  <Stack direction="row" w="3xl">

                    <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "350px"}}>
                      <Heading> Background </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                      <Heading> Keypoints </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                      <Heading> Stakeholders </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                        <Grid templateColumns='repeat(4, 0.5fr)' gap={6}>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                        </Grid>
                      <Heading> Risks </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                    </Stack>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Box bg='darkBrown' borderRadius={'25px'}>
                    <Text textAlign={"center"} fontSize="xl" color="white"> Metrics </Text>
                    <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Product</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Mesembryanthemum Tortuousum</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>First Offtake</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">1 May (Anually) 1:00 AM - UTC</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Delivery Date</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">1 May (Anually) 1:00 AM - UTC</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Duration</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">10 years</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Volume</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">10kgs</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Min/ Total Alkaloids</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">0.9%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Min Mesembrine</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">0.5%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Max Moisture</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">12%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Cut</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Tea or milled</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Frequency</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Annual</Text>
                      </Stack>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel>
                <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "350px"}}>
                  <Heading> Background </Heading>
                    <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Producer Financials</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Laboratory Audits</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Land Lease Agreements</Text>
                </Stack>
                </TabPanel>
              </TabPanels>
              </Tabs>
            </ProjectBody>
    </>
  )
}

export default () => {
    //Required check for no data being returned


    return (
            <Project />
    )
}
