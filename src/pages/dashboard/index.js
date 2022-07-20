import React, { useState } from "react";
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
import kannaNFT from "../../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
import VoteMenu from "components/VoteMenu"
import { ArrowBackIcon, WarningIcon, CopyIcon } from '@chakra-ui/icons'
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
    margin-bottom: 6.5em;
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

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const DashBoard = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeliveryOpen , onOpen: onDeliveryOpen, onClose: onDeliveryClose } = useDisclosure()
  const [address, setAddress] = useState({ wAddrs: "" })
  const [gender, setGender] = useState({ prop: "" })
  const [deliveryPerson, setDP] = useState({ name: "", surname: "" })
  const [deliveryAddress, setDA] = useState({ name: "", surname: "", company: "", houseNo: "", unitNo: "", city: "", country: "", postalCode: "" })
  const [courier, setCourier] = useState({ name: "" })

  const onChangeHandler = (change) => {
    setGender(currentValues => ({
      ...currentValues,
      gender: change.label,
    }))
  };

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
                        <Button size='xs' bg='darkBrown'>Sell on Artion</Button>
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
                        <Button size='xs' bg='darkBrown'>View in FTM Scan</Button>
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
                <Text fontSize="sm" color={"white"} fontWeight="bold">0x8f725cef531c3277eb902e...</Text>
              </Stack>
              <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2" marginTop="0px">
                <Text fontSize="sm" color={"white"}>TOA Number</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">#81 / 500</Text>
              </Stack>
              <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="darkPurple">
                <Text fontSize="sm" color={"white"}>Delivery Person</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">Mr. Mogana Nkhotsi</Text>
              </Stack>
              <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                <Text fontSize="sm" color={"white"}>Current Courier</Text>
                <Text fontSize="sm" color={"white"} fontWeight="bold">The Courier Guy</Text>
              </Stack>
              <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="darkPurple">
                <Stack direction="column" justifyContent="center">
                  <Text fontSize="sm" color={"white"}>Current Address</Text>
                  <Text fontSize="12px" color="white" fontStyle="italic" style={{marginTop:"0px"}}>Note: Shipping & Delivery Cost must be borne by the Customer</Text>
                </Stack>
                <Stack direction="column" alignItems="flex-end">
                  <Text fontSize="sm" color={"white"} fontWeight="bold">James Whitmore</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">29 Witteboom Street</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">Protea Village</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">Brackenfell</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">6850</Text>
                  <Text fontSize="sm" color={"white"} fontWeight="bold">South Africa</Text>
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
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." onChange={(e) => handleDeliveryPerson(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Surname..." onChange={(e) => handleDeliveryPerson(e)} />
                </Stack>
              </Stack>
              <Stack spacing="2" w="90%" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="blue"  padding="1rem">
                <Text fontSize="sm" color={"white"}>Delivery Address</Text>
                <Stack direction="column" justifyContent="flex-end">
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Surname..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Company (Optional)..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="House Number & Street Name..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Unit Number (Optional)..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="City..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Country..." onChange={(e) => handleDeliveryAddress(e)} />
                  <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Postal Code..." onChange={(e) => handleDeliveryAddress(e)} />
                </Stack>
              </Stack>
              <Stack spacing="2" w="full" direction="column" alignItems="center" p="2">
                <Stack spacing="2" w="90%" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="blue"  padding="1rem">
                  <Text fontSize="sm" color={"white"}>Courier</Text>
                  <Stack direction="column" justifyContent="flex-end">
                    <Input size='sm' w="360px" h="40px" bg="lavendar" border="1px solid" borderColor='darkBrown' borderRadius='25px' placeholder="Name..." onChange={(e) => handleCourier(e)} />
                  </Stack>
                </Stack>
              </Stack>
                <Button size="linkLong" bg="darkBrown">Confirm Details</Button>
            </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <ProjectHeroContainer>
          <Stack direction="column" w="6xl" alignItems='flex-start'>
            <Text color='navy' fontSize='2xl' fontWeight='bold'>Dashboard</Text>
            <Stack direction='row' w='full' justifyContent="flex-start" alignItems="center">
              <Text color='navy' textAlign='left' fontSize='sm'>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
              <CopyIcon onClick={() => {if(typeof(window) !== 'undefined') { navigator.clipboard.writeText("0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac")}}}/>
            </Stack>
            <Tabs>
              <TabList style={{borderBottom: "2px", borderStyle: "dashed"}}>
                <Tab>TOA's Held</Tab>
                <Tab>History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                <Stack  w="full" direction="column" p="1">
                  <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                    <Image borderRadius='15px' w='84px' h='83px' border={'1px solid'} borderColor="#164057" src='https://bit.ly/dan-abramov' />
                    <Stack direction='column' style={{marginRight: "60px", cursor: "pointer"}} onClick={onOpen}>
                      <Text color='white' textAlign='left' fontSize='sm'>Sceletium Project</Text>
                      <Text color='white' textAlign='left' fontSize='sm' style={{marginTop: "0px"}}>0xf45664ds65fdfgg654616</Text>
                    </Stack>
                    <Text color='white' textAlign='left' fontSize='sm'>NFT #81 / 500</Text>
                    <Stack flexWrap="wrap" direction="row">
                      <Stack direction="column">
                        <Box flex={"1 1 calc(100% - 50px)"}>
                          <Button size='xs' bg='darkBrown'>Sell on Artion</Button>
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
                          <Button size='xs' bg='darkBrown'>View in FTM Scan</Button>
                        </Box>
                      </Stack>
                    </Stack>
                    <Button size='link' bg='darkBrown' onClick={onDeliveryOpen}>Delivery</Button>
                  </Stack>
                </Stack>
                <Stack  w="full" direction="column"  p="1">
                  <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                    <Image borderRadius='15px' w='84px' h='83px' border={'1px solid'} borderColor="#164057" src='https://bit.ly/dan-abramov' />
                    <Stack direction='column' style={{marginRight: "60px", cursor: "pointer"}} onClick={onOpen}>
                      <Text color='white' textAlign='left' fontSize='sm'>Sceletium Project</Text>
                      <Text color='white' textAlign='left' fontSize='sm' style={{marginTop: "0px"}}>0xf45664ds65fdfgg654616</Text>
                    </Stack>
                    <Text color='white' textAlign='left' fontSize='sm'>NFT #81 / 500</Text>
                    <Stack flexWrap="wrap" direction="row">
                      <Stack direction="column">
                        <Box flex={"1 1 calc(100% - 50px)"}>
                          <Button size='xs' bg='darkBrown'>Sell on Artion</Button>
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
                          <Button size='xs' bg='darkBrown'>View in FTM Scan</Button>
                        </Box>
                      </Stack>
                    </Stack>
                    <Button size='link' bg='darkBrown' onClick={onDeliveryOpen}>Delivery</Button>
                  </Stack>
                </Stack>
                <Stack  w="full" direction="column"  p="1">
                  <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="center" alignItems="center">
                    <Image borderRadius='15px' w='84px' h='83px' border={'1px solid'} borderColor="#164057" src='https://bit.ly/dan-abramov' />
                    <Stack direction='column' style={{marginRight: "60px", cursor: "pointer"}} onClick={onOpen}>
                      <Text color='white' textAlign='left' fontSize='sm'>Sceletium Project</Text>
                      <Text color='white' textAlign='left' fontSize='sm' style={{marginTop: "0px"}}>0xf45664ds65fdfgg654616</Text>
                    </Stack>
                    <Text color='white' textAlign='left' fontSize='sm'>NFT #81 / 500</Text>
                    <Stack flexWrap="wrap" direction="row">
                      <Stack direction="column">
                        <Box flex={"1 1 calc(100% - 50px)"}>
                          <Button size='xs' bg='darkBrown'>Sell on Artion</Button>
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
                          <Button size='xs' bg='darkBrown'>View in FTM Scan</Button>
                        </Box>
                      </Stack>
                    </Stack>
                    <Button size='link' bg='darkBrown' onClick={onDeliveryOpen}>Delivery</Button>
                  </Stack>
                </Stack>
                </TabPanel>
                <TabPanel>
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
                    <Text textAlign="left" fontSize="sm" color="white" fontWeight="bold" fontStyle="italic">3 Days ago</Text>
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
                </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </ProjectHeroContainer>
          <ProjectBody>
          </ProjectBody>
    </>
  )
}

export default () => {
    //Required check for no data being returned


    return (
            <DashBoard />
    )
}
