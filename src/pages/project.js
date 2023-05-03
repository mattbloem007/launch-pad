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
import beneficiary from '../images/Group 138.svg'
import guardian from '../images/Group 140.svg'
import producer from '../images/Group 142.svg'
import rainmaker from '../images/Group 144.svg'
import salesperson from '../images/Group 146.svg'
import auditor from '../images/Group 148.svg'
import lawyer from '../images/Group 150.svg'
import stakeholder from '../images/Group 152.svg'
import $ from 'lib/crwodsale.js'
import { toDec } from 'lib/bn.js'
import { useWeb3React } from "@web3-react/core"
import Sticky from 'react-stickynode';
import metricsBG from '../images/CardBackground.png'
import { Flasher, flash } from "react-universal-flash";
import { createStandaloneToast } from '@chakra-ui/toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  UnorderedList,
  OrderedList,
  ListItem,
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
    margin-left: 146px;
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

  //const toast = useToast();
//  const { ToastContainer, toast } = createStandaloneToast()
  const toastIdRef = useRef();
  const [tabIndex, setTabIndex] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
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
    //----> promise.allSettled()
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
      let total = price*(parseInt(num) + parseInt(avail))
      console.log("total value", total, funds)
      let val = (funds/total)*100
      console.log("value", val)

      setProgress(val)
      settimeLeft(daysRemaining)
      setfundsRaised(funds)
      settoaPrice(price)
      settoaPriceBN(priceBN)
      setnumPurchased(num)
      setavailable(avail)
    }
     fetchData();

    }, [])

    // useEffect(() => {
    //
    //   if(processing) {
    //     console.log(processing)
    //     toastIdRef.current = toast({
    //             title: 'Please connect wallet!',
    //             position: "bottom",
    //             status: 'error',
    //             isClosable: true,
    //             duration: 120000
    //     })
    //   }
    //
    //     setProcessing(false)
    // }, [processing])


  async function handleInputChange(e) {
    console.log("NFT AMOUNT", nftAmount, e)
    setNftAmount(currentValues => ({
      ...currentValues,
      amount: parseInt(e),
    }))
    if (approved) {
      let allow = await $.USDC.allowance(account, $.crowdsale.address)
      let allowance = toDec(allow._hex, 6, 1)
      if (allowance < toaPriceBN.mul(e)) {
        setApproved(false)
      }
    }
  }

  async function approveUSDC(active, amount) {

      // let allow = await $.USDC.allowance(account, $.crowdsale.address)
      // let allowance = toDec(allow._hex, 6, 1)
      // console.log("Allow", allowance)
      // if (allowance > 0 && allowance >= amount) {
      //     setApproved(true)
      // }
      if(active) {
      setProcessing(true)
          let allow = await $.USDC.allowance(account, $.crowdsale.address)
          let bal = await $.USDC.balanceOf(account)
          let balance = toDec(bal._hex, 6, 1)
          let allowance = toDec(allow._hex, 6, 1)
          console.log("balance", balance, amount)
          if (parseInt(balance) >= parseInt(toDec(amount._hex, 6, 1))) {

            toastIdRef.current = toast.info("Approval pending", {
              position: toast.POSITION.BOTTOM_CENTER
            });

            try {
              let tx = await $.USDC.approve(library.getSigner(account), $.crowdsale.address, amount)

              //sent approval to the blockchain
              toast.update(toastIdRef.current, { render: "Sent approval to the blockchain", type: toast.TYPE.INFO })

              await $.confirm(tx.hash)
              //approval successful
              toast.update(toastIdRef.current, { render: "Approval successful", type: toast.TYPE.SUCCESS })
              setProcessing(false)
              setApproved(true)
            }
            catch(e) {
              toast.update(toastIdRef.current, { render: e.message, type: toast.TYPE.ERROR })
            }

          }
          else {
            toastIdRef.current = toast.error("Insuffcient funds", {
                  position: toast.POSITION.BOTTOM_CENTER
                });
            setProcessing(false)
          }

    }
    else {
      setProcessing(true)
      toastIdRef.current = toast.error("Please connect wallet!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setProcessing(false)
    }


  }

  async function buyTOA(numTOAs) {
    //---> sending transaction to the blockchain (Toaster) approve pending
    console.log("NUM", numTOAs)
    setProcessing(true)
    toastIdRef.current = toast.info("Buy pending", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    try {
      let tx = await $.crowdsale.buy(library.getSigner(account), numTOAs)
      //sent approval to the blockchain

      toast.update(toastIdRef.current, { render: "Sent transaction to the blockchain", type: toast.TYPE.INFO })

      await $.confirm(tx.hash)
      //approval successful
      toast.update(toastIdRef.current, { render: "Transaction successful", type: toast.TYPE.SUCCESS })

       setProcessing(false)
    }
    catch (e) {
      toast.update(toastIdRef.current, { render: "No more TOAs available for this crowdsale", type: toast.TYPE.ERROR })
    }

    //  setApproved(true)
  }

  function scroll(id) {
    if(typeof(document) !== 'undefined') {
      const violation = document.getElementById(id)
        window.scrollTo({
          top:violation.offsetTop,
          behavior:"smooth"
      })
    }
  }

  async function mintUSDC(amount) {

    let tx = await $.USDC.test.mint(library.getSigner(account), '0x5AD28fe78dBFf80385d7704880D53622d3A4A888', amount)


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
          <Modal isCentered useInert={false} trapFocus={false} onClose={onClose} isOpen={isOpen}>
            <ModalOverlay
              bg='none'
              backdropFilter='auto'
              backdropInvert='80%'
              backdropBlur='2px'
            />
            <ToastContainer autoClose={120000}/>
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
                      <Text fontSize="sm" color={"white"}>${toaPrice*nftAmount.amount}</Text>
{/**                      <Button size='xl' bg="darkBrown" style={{alignSelf: "center"}} isLoading={processing} onClick={() => mintUSDC(toaPriceBN)}>
                        mint USDC
                      </Button>*/}
                    </Stack>
                    {
                      approved ?
                      <Button size='xl2' bg="darkPurple" style={{alignSelf: "center"}} isLoading={processing} onClick={() => buyTOA(nftAmount.amount)}>
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
          <ProjectHeroContainer style={{zIndex:"33"}} justifyContent="center">
          <Stack direction="column" id="project">
            <Stack direction="row" alignItems="flex-end">
              <Image h='353px' w='353px' style={{position: 'relative', right: "51px"}} src={tree}/>
              <Grid templateColumns='5fr 4fr' gap={6} style={{maxHeight: "470px", position: "relative", right: "200px"}}>
                <GridItem h="70%">
                  <Tabs isFitted size='sm' id="projectTablist" index={tabIndex} onChange={(index) => setTabIndex(index)}>
                    <TabList>
                      <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                      <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                      <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Smart Contracts</Heading></Tab>
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
                        <Stack alignItems="center" margin={"1rem"} w='583px' h='384px' borderRadius='25px' backgroundImage={metricsBG} backgroundPosition="center" backgroundRepeat="no-repeat" backgroundSize="cover">
                          <Image src={kannaNFT} w='353px' h='353px'/>
                        </Stack>
                      </TabPanel>
                    </TabPanels>

                  </Tabs>
                </GridItem>
                <GridItem h="70%" style={{marginTop: "44px"}}>
                  <Sticky enabled={true} top={0} bottomBoundary="#body">
                    <Stack direction="column" alignItems="center">
                      <Image w='295px' h='295px' src={crystal} style={{position: "relative", bottom: "184px"}}/>
                      <Container centerContent p="3" pt="0" shadow="lg" w="400px" h="385px" borderRadius="25px" bg="navy" style={{position: "relative", bottom: "255px"}}>
                          <Text textAlign="left" w="full" fontSize="5xl" fontWeight="medium" color={"white"} h='95px'>$ {fundsRaised}</Text>
                          <Container px="8">
                            <Text textAlign={"center"} flexGrow="2" fontSize="lg" color={"white"} >Raised of ${toaPrice*(parseInt(numPurchased) + parseInt(available))} Minimum</Text>
                            <Progress bg="lavendar" rounded="3xl" value={progress} colorScheme="progress" marginBottom={"5px"}/>
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
            </Stack>
            <Stack direction='row' paddingLeft="16px">
            <Tabs isFitted size='sm' id="projectTablist" index={tabIndex} onChange={(index) => setTabIndex(index)}>
              {/**<TabList>
                <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Documentation</Heading></Tab>
              </TabList>*/}
              <TabPanels style={{width: "600px"}}>
                <TabPanel>
                  <Stack direction="row" w="3xl" alignItems="baseline">
                      <Stack spacing="5" w={"150px"} direction="column" p="2" borderRight={"2px"} borderRightStyle={"dotted"}>
                        <Box color="navy" fontSize='sm' fontWeight="bold" onClick={() => scroll('background')} style={{cursor: "pointer"}}>
                        Background
                        </Box>
                        <Box color="navy" fontSize='sm' fontWeight="bold" onClick={() => scroll('keypoints')} style={{cursor: "pointer"}}>
                          Keypoints
                        </Box>
                        <Box color="navy" fontSize='sm' fontWeight="bold" onClick={() => scroll('stake')} style={{cursor: "pointer"}}>
                          Stakeholders
                        </Box>
                        <Box color="navy" fontSize='sm' fontWeight="bold" onClick={() => scroll('risks')} style={{cursor: "pointer"}}>
                          Risks
                        </Box>
                        <Box color="navy" fontSize='sm' fontWeight="bold" onClick={() => scroll('documents')} style={{cursor: "pointer"}}>
                          Documents
                        </Box>
                      </Stack>
                    <Stack spacing="1" w="xl" direction="column" p="2">
                      <Heading id="background"> Background </Heading><br/>
                        <Text color={"navy"} fontSize={"sm"}>The CQKanna project by Kelquin Botanicals on Talana farm in the Western Cape region of South Africa will produce 1.25 Tons of Sceletium per year.</Text>
                        <Text color={"navy"} fontSize={"sm"}>Sceletium is a small succulent ground cover plant native to South Africa that has been used for centuries by indigenous peoples for its mood-enhancing and stress-relieving properties. The plant, also known as Kanna, is a member of the Mesembryanthemaceae family and grows in the arid regions of the country.</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>The active compounds in Sceletium are mesembrine, mesembrenone, and mesembrenol, which act on the brain's serotonin system. Serotonin is a neurotransmitter responsible for regulating mood, sleep, and appetite, among other functions. By modulating serotonin levels in the brain, Sceletium can help reduce anxiety and depression symptoms, promote relaxation, and improve cognitive function.</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Sceletium is fast gaining popularity as a natural supplement for managing anxiety and depression, and its recreational effects are becoming more widely embraced.. As more people become interested in natural remedies for mental health issues, the demand for Sceletium is likely to increase -  prices have been significantly trending upward in the last few years.</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>The CQKanna project will supply TOA holders with 10kgs of dried Sceletium every year for 10- years . This  Sceletium will have a minimum mesembrine content of 0.6% OR a minimum of 0.9% total alkaloid content..  The TOAs cost $1250 each - this equates to a price of  $12.50 per kilo of Sceletium.</Text>
                        <Stack justifyContent="center" alignItems="center">
                          <Divider orientation='horizontal' style={{borderTop: "2px solid #164057", width: "50%", marginTop: "40px", marginBottom: "40px"}}/>
                        </Stack>
                      <Heading id="keypoints"> Keypoints </Heading><br/>
                        <UnorderedList color={"navy"} textAlign={"left"}>
                          <ListItem>CQKanna TOAs offers the  potential to get high quality Sceletium at $12.50 per/kg a considerable discount front the current wholesale price of $40-$70 per kg</ListItem><br/>
                          <ListItem>The TOA can also be sold on should you no longer wish to hold the rights to receive the offtake</ListItem><br/>
                          <ListItem>The Sales agent will sell your product and send you money (less commission) should you wish to continue to hold the TOA but not wish the get any sceletium</ListItem><br/>
                          <ListItem>Risks of the Producer failing to deliver are mitigated by the role of the Guardian who has a legal contractual relationship with the Producer.</ListItem><br/>
                          <ListItem>The Guardian has skin in the game and is the largest holder of TOAs in this project. The Guardian only receives their offtake after all other beneficiaries agree they are happy with their offtake from the harvest.</ListItem><br/>
                          <ListItem>There is built in governance (1 TOA = 1 vote) and so all TOA holders will have a voice</ListItem><br/>
                          <ListItem>Sceletium is fast gaining popularity as a natural supplement for managing anxiety and depression.</ListItem><br/>
                          <ListItem> As more people become interested in natural remedies for mental health issues, the demand for Sceletium is likely to increase.</ListItem><br/>
                          <ListItem>Sceletium supply has not been matching demand and  prices have been trending upward in the last few years.</ListItem><br/>
                          <ListItem>Participating in Sceletium farming via these TOAs can be a both profitable and socially and environmentally responsible choice.</ListItem><br/>
                        </UnorderedList>
                        <Stack justifyContent="center" alignItems="center">
                          <Divider orientation='horizontal' style={{borderTop: "2px solid #164057", width: "50%", marginTop: "40px", marginBottom: "40px"}}/>
                        </Stack>
                      <Heading id="stake"> Stakeholders </Heading><br/>
                        <Text color={"navy"} fontSize={"sm"}>Producer - Kelquin Botanicals
Principals: Lizande Kelleher, Quintus Slabbet, Charl Slabbert, Lynette Slabbert
You may contact Kelquin Botanicals via the  Elyseos Telegram group or the Launchpad Channel on the Elyseos Discord
</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Guardian - Botanical Investment Guardians
Principals: Armand Verschuur, Paul Boulton, Simon Anderson
You may contact B.I.G via the  Elyseos Telegram group or the Launchpad Channel on the Elyseos Discord
</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Rainmaker - Andrew Lawson
You may contact Andrew via the  Elyseos Telegram group or the Launchpad Channel on the Elyseos Discord
</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Sales Agent - The Sceletium Source
Principals: Jean-Pierre Le Roux
www.sceletium.com </Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Lawyer - Gerhard Swart
You may contact Gerhard via the  Elyseos Telegram group or the Launchpad Channel on the Elyseos Discord
</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Auditor - Mark Solomon
You may contact Mark via the  Elyseos Telegram group or the Launchpad Channel on the Elyseos Discord
</Text><br/>
                        <Text color={"navy"} fontSize={"sm"}>Local Peoples - Net Vir Pret, Barrydale</Text><br/>
                        <Grid templateColumns='repeat(4, 0.5fr)' gap={6}>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={beneficiary} />
                            <Text color={"navy"} fontSize={"sm"}> Beneficiary</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={guardian} style={{alignSelf: "flex-end"}} />
                            <Text color={"navy"} fontSize={"sm"}> Guardian</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={producer} />
                            <Text color={"navy"} fontSize={"sm"}>Producer</Text><br/>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={rainmaker} />
                            <Text color={"navy"} fontSize={"sm"}>Rainmaker</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={salesperson} />
                            <Text color={"navy"} fontSize={"sm"}> Sales Person</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={auditor} style={{alignSelf: "flex-end"}} />
                            <Text color={"navy"} fontSize={"sm"}>Auditor</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={lawyer} style={{alignSelf: "flex-end"}} />
                            <Text color={"navy"} fontSize={"sm"}>Lawyer</Text>
                          </GridItem>
                          <GridItem style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Image boxSize='100px' src={stakeholder} />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                        </Grid>
                        <Stack justifyContent="center" alignItems="center">
                          <Divider orientation='horizontal' style={{borderTop: "2px solid #164057", width: "50%", marginTop: "40px", marginBottom: "40px"}}/>
                        </Stack>
                      <Heading id="risks"> Risks </Heading><br/>
                        <Text color={"navy"} fontSize={"sm"}>This project is a innovative way of applying emerging technologies in a new ways.  There are a number of risk vectors when it comes to buying these TOAs.</Text><br/>
                        <OrderedList color={"navy"} textAlign={"left"}>
                          <ListItem>Some event happens and the funds never reach the Producer(e.g. the crowdsale is hacked, or the producer has their personal wallet hacked after withdrawal)  and so they are unable to start farming.</ListItem><br/>
                          <ListItem>Producer is unreliable and does not apply the investment funds properly according to the laid out plat and so production is low and beneficiaries do not receive the correct amount of Sceletium</ListItem><br/>
                          <ListItem>The Guardian does not correctly manage risk and hold  the producer to account</ListItem><br/>
                          <ListItem>The Guardian offtake is insufficient to make up any shortfall from the producer</ListItem><br/>
                          <ListItem>Your personal TOA NFTs get stolen from your wallet</ListItem><br/>
                          <ListItem>The Sales agent is unable to sell Sceletium on your behalf and you have to take delivery</ListItem><br/>
                          <ListItem>The Sceletium you receive is not as agreed</ListItem><br/>
                        </OrderedList>
                        <Stack justifyContent="center" alignItems="center">
                          <Divider orientation='horizontal' style={{borderTop: "2px solid #164057", width: "50%", marginTop: "40px", marginBottom: "40px"}}/>
                        </Stack>
                      <Heading id="documents"> Documents </Heading>
                      <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                      <Link to="/"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">Producer Financials</Text></Link>
                      <Link to="/"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">Laboratory Audits</Text></Link>
                      <Link to="/"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">Land Lease Agreements</Text></Link>
                    </Stack>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack w='3xl' justifyContent="center" alignItems="flex-end">
                    <Box bg='darkBrown' borderRadius={'25px'} w='80%'>
                      <Text textAlign={"center"} fontSize="xl" color="white"> Metrics </Text>
                      <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
                        <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                          <Text fontSize="sm" color={"white"}>Product</Text>
                          <Text fontSize="sm" color={"white"} fontWeight="bold">Mesembryanthemum Tortuousum</Text>
                        </Stack>
                        <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                          <Text fontSize="sm" color={"white"}>First Offtake</Text>
                          <Text fontSize="sm" color={"white"} fontWeight="bold">1 December 2024</Text>
                        </Stack>
                        <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                          <Text fontSize="sm" color={"white"}>Delivery Date</Text>
                          <Text fontSize="sm" color={"white"} fontWeight="bold">1 December Anually</Text>
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
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing="1" w="full" direction="column" p="2" style={{marginLeft: "166px"}}>
                    <Heading> NFT Contracts </Heading>
                      <Link to="https://ftmscan.com/token/0xd89cc0d2a28a769eadef50fff74ebc07405db9fc"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">FTMScan</Text></Link>
                      <Text color={"navy"} fontSize="sm">https://ftmscan.com/token/0xd89cc0d2a28a769eadef50fff74ebc07405db9fc</Text>
                      <Link to="https://github.com/elyseos/contracts/blob/main/ElysForest.sol"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">Github</Text></Link>
                      <Text color={"navy"} fontSize="sm">https://github.com/elyseos/contracts/blob/main/ElysForest.sol</Text>
                      <Heading> Governance Contracts</Heading>
                      <Link to="https://ftmscan.com/token/0xd89cc0d2a28a769eadef50fff74ebc07405db9fc"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">FTMScan</Text></Link>
                      <Text color={"navy"} fontSize="sm">https://ftmscan.com/token/0xd89cc0d2a28a769eadef50fff74ebc07405db9fc</Text>
                      <Link to="https://github.com/elyseos/contracts/blob/main/ElysForest.sol"><Text color={"navy"} fontSize={"lg"} fontWeight="bold" textDecoration="underline">Github</Text></Link>
                      <Text color={"navy"} fontSize="sm">https://github.com/elyseos/contracts/blob/main/ElysForest.sol</Text>
                  </Stack>
                </TabPanel>
              </TabPanels>
              </Tabs>
              </Stack>
            </Stack>
          </ProjectHeroContainer>
            <ProjectBody id="body">


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
