import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import About from "components/About";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import kannaNFT from "../../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
import VoteMenu from "components/VoteMenu"
import { ArrowBackIcon, WarningIcon, CopyIcon } from '@chakra-ui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWeb3React } from "@web3-react/core"
import $ from 'lib/crowdsale.js'
import { toDec } from 'lib/bn.js'
import { Grid as GridSpinner } from  'react-loader-spinner'

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
  Textarea,
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
  useDisclosure
} from '@chakra-ui/react'
import Select from 'react-select'

const StyledStack = styled(Stack)`
      width: var(--chakra-sizes-6xl);

  @media(max-width:${dimensions.maxwidthMobile}px) {
        width: var(--chakra-sizes-2xs);
        margin-top: 50px;
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
        width: var(--chakra-sizes-2xs);
        margin-top: 50px;
  }
`

const options = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' }
]

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    border: '1px solid #4F4051',
    background: '#CFADD9',
    width: '100%',
    borderRadius: '25px',
  }),

  control: (_, { selectProps: { width }}) => ({
    display: 'flex',
    width: '100%',
    border: '1px solid #4F4051',
    borderRadius: '25px',
    background: '#CFADD9',
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   borderBottom: '2px solid #4F4051',
  // }),

  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';
  //   const borderRadius = '25px'
  //
  //   return { ...provided, opacity, transition, borderRadius };
  // }
}

const ProjectHeroContainer = styled("div")`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    border: 2px;
    border-color: #ec7019;
    border-radius: 2px;
    background: #F0EBDD;

    img {
        max-width: 600px;
    }
`


const ProjectBody = styled("div")`
    max-width: 550px;
    margin: 0;
    height: 1500px;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }

    @media(max-width:${dimensions.maxwidthMobile}px) {
          height: 150px;
    }

    @media(max-width:${dimensions.maxwidthTablet}px) {
          height: 150px;
    }
`

const DashBoard = (props) => {

  const toastIdRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeliveryOpen , onOpen: onDeliveryOpen, onClose: onDeliveryClose } = useDisclosure()
  const [address, setAddress] = useState({ wAddrs: "" })
  const [gender, setGender] = useState({ gender: "" })
  const [deliveryPerson, setDP] = useState({ name: "", surname: "" })
  const [deliveryAddress, setDA] = useState({ name: "", surname: "", company: "", houseNo: "", unitNo: "", city: "", country: "", postalCode: "" })
  const [courier, setCourier] = useState({ name: "" })
  const [updated, setUpdated] = useState({ updated: false, delivery_person: "", current_courier: "", current_address: "" })
  const [deliveryInfo, setDeliveryInfo] = useState({ wallet_address: "", toa_no: "", delivery_person: "", current_courier: "", current_address: "" })
  const { library, active, account } = useWeb3React()
  const [meta, setMeta] = useState({data: []})
  const [numTOAs, setNum] = useState()
  const [usdc, setUSDC] = useState()
  const [usdcPayout, setUSDCPayout] = useState()
  const [toaNumbers, setToaNumbers] = useState({numbers: []})
  const [hasLoaded, setHasLoaded] = useState(false);
  const [noData, setNoData] = useState(false);


  async function updateDelivery() {
    let personName = ""
    let addr = deliveryAddress.name + " " + deliveryAddress.surname
    if (deliveryAddress.company != "") {
      addr = addr + ", " + deliveryAddress.company
    }
    addr = addr + ", " + deliveryAddress.houseNo
    if (deliveryAddress.unitNo != "") {
      addr = addr + ", " + deliveryAddress.unitNo
    }
    addr = addr + ", " + deliveryAddress.city + ", " + deliveryAddress.country + ", " + deliveryAddress.postalCode

    if (gender.gender == 'male') {
      personName = personName + "Mr."
    } else if (gender.gender == 'female') {
      personName = personName + "Ms."
    }

    personName = personName + " " + deliveryPerson.name + " " + deliveryPerson.surname


    const body = JSON.stringify({
      wallet_address: account,
      person: personName,
      address: addr,
      courier: courier.name

    })

    try{
      await fetch("/.netlify/functions/updateDelivery", {
        method: "POST",
        body,
      })
      toastIdRef.current = toast.success("Changed your delivery address information", {
            position: toast.POSITION.BOTTOM_CENTER
      });

      setUpdated({ delivery_person: personName, current_courier: courier.name, current_address: addr, updated: true })

    } catch(error) {
      toastIdRef.current = toast.error("Error updating delivery address", {
            position: toast.POSITION.BOTTOM_CENTER
          });
      console.log("Error", error)
    }

  }

  function TOALoading(){
    return (
      <GridSpinner
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    )
  }


  //  useEffect(async () => {

  // // //  let balance = await $.crowdsale.balanceOf(account)
  //       console.log(account)
  //       //let balTOA = await $.crowdsale.TOABalance(account)
  // // //  balance = toDec(balance._hex, 6, 1)
  // //   balTOA = toDec(balTOA._hex, 6, 1)
  // //   // console.log("Balance: ", balTOA)
  // //   // console.log($.crowdsale.address)
  // //   // console.log(account)
  //  })

  useEffect(() => {
      console.log(account)

      async function fetchData() {

        let balTOA, usdcBal;
        let timeTillEnd = await $.crowdsale.timeUntilEnd()
        let metaData;
        timeTillEnd = timeTillEnd.toNumber()
        console.log("time", timeTillEnd)
        let success = await $.crowdsale.isSuccess()
        console.log("Success", success)
        if (timeTillEnd == 0 && success == true) {
          console.log("Is Success")
            let toabal = await $.crowdsale.TOABalance(account)
            toabal = toabal.toNumber()
            console.log("TOABalance: ", toabal)
            if (toabal > 0) {
              assignTOA()
            }

            balTOA = await $.TOA.balanceOf(account)
            usdcBal = await $.crowdsale.toaPrice(account)
            console.log("Balance: ", balTOA)
            balTOA = balTOA.toNumber()
            usdcBal = balTOA *  toDec(usdcBal._hex, 6, 1)
            console.log("usdc", usdcBal)
            setNum(balTOA)
            setUSDC(0)
            console.log("Balance: ", balTOA)
            console.log("account", account)
            console.log("TOA contract address", $.TOA.address)
            if (balTOA > 0) {
              let tokenId = [];
              let currId = "";
               for (let i = 0;  i < balTOA; i++) {
                  currId = await $.TOA.tokenOfOwnerByIndex(account, i)
                  console.log("Current ID", currId.toNumber())
                  tokenId.push(currId.toNumber())
               }
               setToaNumbers({numbers: tokenId})
               let data = []
               for (let i = 0; i < tokenId.length; i++) {
                 metaData = await $.TOA.meta(tokenId[i])
                 console.log("Meta", metaData)
                 data.push(metaData)
                 setMeta({data: data})
                 console.log("META Array", meta.data)
               }
               setHasLoaded(true)

            }
            else {
              setNoData(true)
            }

        }
        else {
          console.log("Not Success")
          balTOA = await $.crowdsale.TOABalance(account)
          usdcBal = await $.crowdsale.toaPrice(account)
          usdcBal = balTOA * toDec(usdcBal._hex, 6, 1)
          balTOA = balTOA.toNumber()
          setNum(balTOA)
          setUSDC(usdcBal)
          setHasLoaded(true)
          setNoData(true)
          console.log("usdc", usdc)
          console.log("TOABalance: ", balTOA)
          console.log("account", account)
          console.log("TOA contract address", meta.data)
        }

        if (timeTillEnd == 0 && success == false) {
          console.log("Not Success2")
          balTOA = await $.crowdsale.TOABalance(account)
          usdcBal = await $.crowdsale.toaPrice(account)
          usdcBal = balTOA * toDec(usdcBal._hex, 6, 1)
          balTOA = balTOA.toNumber()
          setNum(balTOA)
          setUSDC(usdcBal)
          setHasLoaded(true)
          setNoData(true)
          console.log("usdc", usdc)
          console.log("TOABalance: ", balTOA)
          console.log("account", account)
          console.log("TOA contract address", meta.data)
        }



        let body = JSON.stringify({
          wallet_address: account

        })
      //  let meta = await $.TOA.meta()
        try{
          await fetch("/.netlify/functions/getDeliveryInfo", {
            method: "POST",
            body,
          })
          .then((res) => res.json())
          .then((result) => {
            console.log(result.info)
            if (result.info == null) {
              setDeliveryInfo({wallet_address: account, toa_no: "", delivery_person: "", current_courier: "", current_address: ""})
            }
            else {
              setDeliveryInfo(result.info)
            }

          })
        } catch(error) {
          toastIdRef.current = toast.error("Error getting delivery address", {
                position: toast.POSITION.BOTTOM_CENTER
              });
          console.log("Error", error)
        }
      }
    if (updated.updated) {
      // deliveryInfo.delivery_person = updated.delivery_person
      // deliveryInfo.current_courier = updated.current_courier
      // deliveryInfo.current_address = updated.current_address
      onEditClose()
    }
    if (active) {
       fetchData()
    }
  }, [updated, active])

  const onChangeHandler = (change) => {
    setGender(currentValues => ({
      ...currentValues,
      gender: change.value,
    }))
    console.log("Gender", gender.gender)
  };

  const assignTOA = () => {
    try {
      $.crowdsale.assignTOAs(library.getSigner(account))
    }
    catch(e) {
      console.log(e.message)
    }
  }

  const transferTOA = () => {
    try {
      $.crowdsale.assignTOAs(library.getSigner(account))
    }
    catch(e) {
      console.log(e.message)
    }
  }

  function handleDeliveryPerson(e) {
    e.persist()
    setDP(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleDeliveryAddress(e) {
    e.persist()
    setDA(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleCourier(e) {
    e.persist()
    setCourier(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  }

  function handleInputChange(e) {

    setAddress(currentValues => ({
      ...currentValues,
      wAddrs: e,
    }))
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
        {
          active ?
      <>
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
              <Stack spacing="5" w="full" direction="column" alignItems="center" p="2">
                  <Image h='368px' w='368px' src={kannaNFT}/>
                  <Stack flexWrap="wrap" direction="row">
                    <Stack direction="column">
                      <Box flex={"1 1 calc(100% - 50px)"}>
                        <a href="https://www.artion.io/" target="_blank"><Button size='xs' bg='darkBrown'>Sell on Artion</Button></a>
                      </Box>
                      <Box flex={"0 0 50px"}>
                        <Link to='/project'><Button size='xs' bg='darkBrown'>View Project</Button></Link>
                      </Box>
                    </Stack>
                    <Stack direction="column">
                      <Box flex={"1 1 calc(100% - 50px)"}>
                        <Button size='xs' bg='darkBrown'>Transfer</Button>
                      </Box>
                      <Box flex={"0 0 50px"}>
                        <a href={`https://ftmscan.com/token/0xaaf5da1be157c1f811517f1d0830d8ad022ebd39?a${account}=#inventory`} target="_blank"><Button size='xs' bg='darkBrown'>View in FTM Scan</Button></a>
                      </Box>
                    </Stack>
                  </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isCentered onClose={onDeliveryClose} isOpen={isDeliveryOpen} size='2xl'>
          <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
          />
          <ToastContainer autoClose={120000}/>
          <ModalContent alignItems="center" style={{background: "#164057", color: "white", borderRadius: "44px"}}>
            <Stack direction="row" w='full'>
              <Stack spacing="5" w="3xs" direction="row" alignItems="center" justifyContent="flex-start" p="2" style={{paddingLeft: "20px"}} onClick={onDeliveryClose}>
                <ArrowBackIcon />
                <Text color={"white"} style={{marginTop: "0px", marginLeft: "5px"}}>Back</Text>
              </Stack>
              <ModalHeader style={{fontSize: "29px", fontFamily: "Parisine Plus Std Sombre"}}>Delivery</ModalHeader>
            </Stack>
            <ModalBody style={{width: "100%"}}>
            <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
              <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="darkPurple">
                <Text fontSize="sm" color={"white"}>Wallet Address</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap'}}>{deliveryInfo.wallet_address}</Text>
              </Stack>
              <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2" marginTop="0px">
                <Text fontSize="sm" color={"white"}>TOA Number</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">{deliveryInfo.toa_no}</Text>
              </Stack>
              <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="darkPurple">
                <Text fontSize="sm" color={"white"}>Delivery Person</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">{deliveryInfo.delivery_person}</Text>
              </Stack>
              <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                <Text fontSize="sm" color={"white"}>Current Courier</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">{deliveryInfo.current_courier}</Text>
              </Stack>
              <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="darkPurple">
                <Stack direction="column" justifyContent="center">
                  <Text fontSize="sm" color={"white"}>Current Address</Text>
                  <Text fontSize="12px" color="white" fontStyle="italic" style={{marginTop:"0px"}}>Note: Shipping & Delivery Cost must be borne by the Customer</Text>
                </Stack>
                <Stack direction="column" alignItems="flex-end">
                  <Text fontSize="sm" color={"white"} fontWeight="bold">{deliveryInfo.current_address}</Text>
                  {/**<Text fontSize="sm" color={"white"} fontWeight="bold">29 Witteboom Street</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">Protea Village</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">Brackenfell</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">6850</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">South Africa</Text>*/}
                </Stack>
              </Stack>
              <Button size='linkLong' bg='darkBrown' alignSelf="center">Confirm Order</Button>
              <Button size='link' bg='darkBrown' alignSelf="center" onClick={onEditOpen}>Change Order</Button>
            </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal onClose={onEditClose} isOpen={isEditOpen} size='3xl'>
          <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
          />
          <ToastContainer autoClose={120000}/>
          <ModalContent alignItems="center" style={{background: "#164057", color: "white", borderRadius: "44px"}}>
            <Stack direction="row" w='full'>
              <Stack spacing="5" w="3xs" direction="row" alignItems="center" justifyContent="flex-start" p="2" style={{paddingLeft: "20px", width: "8rem"}} onClick={onEditClose}>
                <ArrowBackIcon />
                <Text color={"white"} style={{marginTop: "0px", marginLeft: "5px"}}>Back</Text>
              </Stack>
              <Stack spacing="2" w="70%" direction="column" justifyContent="center" p="2" borderRadius="25px" bg="darkBrown"  padding="1rem" style={{marginTop: "30px", marginRight: "30px"}}>
                <Text fontSize="lg" color={"white"} fontWeight="bold" textAlign='center'>Delivery for Sceletium #81 / 500 0xf45664ds65fdfgg654616</Text>
              </Stack>
            </Stack>
            <ModalBody style={{width: "100%"}}>
            <Stack spacing="2" w="full" direction="column" alignItems="center" p="2">
              <Stack spacing="2" w="90%" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="blue"  padding="1rem">
                <Text fontSize="sm" color={"white"}>Delivery Person</Text>
                <Stack direction="column" justifyContent="flex-end">
                  <Select options={options} styles={customStyles} isSearchable={false} placeholder="Select gender..." onChange={onChangeHandler}/>
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." name="name" onChange={(e) => handleDeliveryPerson(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Surname..." name="surname" onChange={(e) => handleDeliveryPerson(e)} />
                </Stack>
              </Stack>
              <Stack spacing="2" w="90%" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="blue"  padding="1rem">
                <Text fontSize="sm" color={"white"}>Delivery Address</Text>
                <Stack direction="column" justifyContent="flex-end">
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." name="name" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Surname..." name="surname" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Company (Optional)..." name="company" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="House Number & Street Name..." name="houseNo" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Unit Number (Optional)..." name="unitNo" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="City..." name="city" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Country..." name="country" onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Postal Code..." name="postalCode" onChange={(e) => handleDeliveryAddress(e)} />
                </Stack>
              </Stack>
              <Stack spacing="2" w="full" direction="column" alignItems="center" p="2">
                <Stack spacing="2" w="90%" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="blue"  padding="1rem">
                  <Text fontSize="sm" color={"white"}>Courier</Text>
                  <Stack direction="column" justifyContent="flex-end">
                    <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." name="name" onChange={(e) => handleCourier(e)} />
                  </Stack>
                </Stack>
              </Stack>
                <Button size="linkLong" bg="darkBrown" onClick={() => updateDelivery()}>Confirm Details</Button>
            </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
         <ProjectHeroContainer>
            <Stack direction="column" w="6xl" alignItems='flex-start'>
              <Text color='navy' fontSize='2xl' fontWeight='bold'>Dashboard</Text>
              <Stack direction='row' w='full' justifyContent="flex-start" alignItems="center">
                <Text color='navy' textAlign='left' fontSize='sm'>{account}</Text>
                <CopyIcon onClick={() => {if(typeof(window) !== 'undefined') { navigator.clipboard.writeText(account)}}}/>
              </Stack>
              <Tabs>
                <TabList style={{borderBottom: "2px", borderStyle: "dashed"}}>
                  <Tab>TOA's Held</Tab>
                  <Tab>Claim</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                  {
                    hasLoaded && meta.data.length > 0 ?
                    meta.data.map((met, i) => {
                      console.log("Meta data", met)
                      console.log("numbers", toaNumbers.numbers)
                      return (
                        <Stack  w="full" direction="column" p="1">
                          <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                            <Image borderRadius='15px' w='84px' h='83px' src={met.image.replace('ipfs://','https://nftupload.infura-ipfs.io/ipfs/')} />
                            <Stack direction='column' style={{cursor: "pointer"}} onClick={onOpen}>
                              <Text color='white' textAlign='left' fontSize='sm'>{toaNumbers.numbers[i]}</Text>
                              {/*<Text color='white' textAlign='left' fontSize='sm' style={{marginTop: "0px"}}><a target="_blank" href={met.url}>{met.url}</a></Text>*/}
                            </Stack>
                            <Text color='white' textAlign='left' fontSize='sm'>{met.description}</Text>
                            <Stack flexWrap="wrap" direction="row">
                              <Stack direction="column">
                                <Box flex={"1 1 calc(100% - 50px)"}>
                                  <a href="https://www.artion.io/" target="_blank"><Button size='xs' bg='darkBrown'>Sell on Artion</Button></a>
                                </Box>
                                <Box flex={"0 0 50px"}>
                                  <Link to='/project'><Button size='xs' bg='darkBrown'>View Project</Button></Link>
                                </Box>
                                <Box flex={"0 0 50px"}>
                                  <a href={`https://ftmscan.com/token/0xaaf5da1be157c1f811517f1d0830d8ad022ebd39?a${account}=#inventory`} target="_blank"><Button size='xs' bg='darkBrown'>View in FTM Scan</Button></a>
                                </Box>
                              </Stack>
                              {/**<Stack direction="column">
                                <Box flex={"1 1 calc(100% - 50px)"}>
                                  <Button size='xs' bg='darkBrown' onClick={() => transferTOA()}>Transfer</Button>
                                </Box>
                                <Box flex={"0 0 50px"}>
                                  <a href="`https://ftmscan.com/token/0xaaf5da1be157c1f811517f1d0830d8ad022ebd39?a${account}=#inventory`" target="_blank"><Button size='xs' bg='darkBrown'>View in FTM Scan</Button></a>
                                </Box>
                              </Stack>*/}
                            </Stack>
                            <Button size='link' bg='darkBrown' onClick={onDeliveryOpen}>Delivery</Button>
                          </Stack>
                        </Stack>
                      )
                    })
                    :
                    hasLoaded && noData ?
                    <Text color='navy' textAlign='left' fontSize='sm'>No TOA's helds</Text>
                    :
                    <GridSpinner
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  }


                  </TabPanel>
                  <TabPanel>
                  <Stack  w="full" direction="column" p="1">
                    <Stack w="full" spacing="5" padding="1.5rem" borderRadius="25px" bg="mush" direction="column" justifyContent="center" alignItems="center">

                      <Stack direction="row">
                        <Stack direction='column' w="full" style={{marginRight: "60px"}}>
                          <Text color='white' textAlign='left' fontSize='lg'>USDC Refund</Text>
                          <Text color='white' textAlign='left' fontSize='sm' fontStyle="italic" style={{marginTop: "0px"}}>If the crowd sale did not hit its target, you may claim back your USDC here.</Text>
                        </Stack>
                        <Stack w='3xl' justifyContent="center" alignItems="flex-end">
                          <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="40px" bg="navy" style={{paddingLeft: "20px"}}>
                          { usdc >= 0 ? <Text fontSize="lg" color={"white"}>{`${usdc} USDC Due`}</Text> : <Text fontSize="lg" color={"white"}>{`No USDC Due`}</Text>}
                            <Button size='claim' bg='darkBrown'>Claim</Button>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack direction="row">
                        <Stack direction='column' w="full" style={{marginRight: "60px"}}>
                          <Text color='white' textAlign='left' fontSize='lg'>TOA Claim</Text>
                          <Text color='white' textAlign='left' fontSize='sm' fontStyle="italic" style={{marginTop: "0px"}}>If the crowdsale was a success you can claim your TOA's here.</Text>
                        </Stack>
                        <Stack w='3xl' justifyContent="center" alignItems="flex-end">
                          <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="40px" bg="navy" style={{paddingLeft: "20px"}}>
                            { numTOAs ? <Text fontSize="lg" color={"white"}>{`${numTOAs} TOA's Due`}</Text> : <Text fontSize="lg" color={"white"}>{`No TOA's Due`}</Text>}
                            <Button size='claim' bg='darkBrown'>Claim</Button>
                          </Stack>
                        </Stack>
                      </Stack>

                    {/**<Stack direction="row">
                        <Stack direction='column' w="full" style={{marginRight: "60px"}}>
                          <Text color='white' textAlign='left' fontSize='lg'>USDC Payout</Text>
                          <Text color='white' textAlign='left' fontSize='sm' fontStyle="italic" style={{marginTop: "0px"}}>If you are a stakeholder due USDC as a payout you can claim it here.</Text>
                        </Stack>
                        <Stack w='3xl' justifyContent="center" alignItems="flex-end">
                          <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="40px" bg="navy" style={{paddingLeft: "20px"}}>
                            { usdcPayout ? <Text fontSize="lg" color={"white"}>{`${usdcPayout} USDC Due`}</Text> : <Text fontSize="lg" color={"white"}>{`No USDC Due`}</Text>}
                            <Button size='claim' bg='darkBrown'>Claim</Button>
                          </Stack>
                        </Stack>
                      </Stack>*/}
                    </Stack>
                  </Stack>
                  {/**<Stack  w="full" direction="column" p="1">
                    <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                      <Image borderRadius='15px' w='84px' h='83px' border={'1px solid'} borderColor="#164057" src='https://bit.ly/dan-abramov' />
                      <Stack direction='row'>
                        <Text color='white' textAlign='left' fontSize='sm' w='90px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap', textDecoration:"underline"}}>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
                        <Text color='white' textAlign='left' fontSize='sm'>Transferred</Text>
                        <Text color='white' textAlign='left' fontSize='sm' fontWeight="bold">Sceletium Project #24 / 500</Text>
                        <Text color='white' textAlign='left' fontSize='sm'>To</Text>
                        <Text color='white' textAlign='left' fontSize='sm' w='90px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap', marginRight: '70px', textDecoration:"underline"}}>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
                      </Stack>
                      <Text textAlign="left" fontSize="sm" color="white" fontWeight="bold" fontStyle="italic">1 Week ago</Text>
                    </Stack>
                  </Stack>
                  <Stack  w="full" direction="column" p="1">
                    <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                      <Image borderRadius='15px' w='84px' h='83px' border={'1px solid'} borderColor="#164057" src='https://bit.ly/dan-abramov' />
                      <Stack direction='row'>
                        <Text color='white' textAlign='left' fontSize='sm' w='90px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap', textDecoration:"underline"}}>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
                        <Text color='white' textAlign='left' fontSize='sm'>Transferred</Text>
                        <Text color='white' textAlign='left' fontSize='sm' fontWeight="bold">Sceletium Project #24 / 500</Text>
                        <Text color='white' textAlign='left' fontSize='sm'>To</Text>
                        <Text color='white' textAlign='left' fontSize='sm' w='90px' style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace:'nowrap', marginRight: '70px', textDecoration:"underline"}}>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
                      </Stack>
                      <Text textAlign="left" fontSize="sm" color="white" fontWeight="bold" fontStyle="italic">2 Months ago</Text>
                    </Stack>
                  </Stack>*/}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </ProjectHeroContainer>
          </>
          :
          <ProjectHeroContainer>
          <StyledStack direction="column" alignItems='flex-start'>
            <Text color='navy' fontSize='2xl' fontWeight='bold'>Dashboard</Text>
            <Stack direction='row' w='full' justifyContent="flex-start" alignItems="center">
              <Text color='navy' textAlign='left' fontSize='sm'>Please Connect your Wallet</Text>
            </Stack>
          </StyledStack>
          </ProjectHeroContainer>
        }
        <ProjectBody></ProjectBody>
    </>
  )
}

export default DashBoard

// export const pageQuery = graphql`
// query featureItemQuery {
//   allMongodbDeliveryDataElyseosVentures {
//     edges {
//       node {
//         wallet_address
//         toa_no
//         delivery_person
//         current_courier
//         current_address
//       }
//     }
//   }
// }
// `
