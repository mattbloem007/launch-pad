import React, { useState, useEffect } from "react";
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
import kannaNFT from "../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
import $ from 'lib/crwodsale.js'
import { toDec } from 'lib/bn.js'
import tree from '../images/Tree Artwork - V1.0.png'
import crystal from '../images/Crystal Artwork - V1.0.png'
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
  ListItem,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react'

const Hero = styled("div")`
    padding-top: 2.5em;
    padding-bottom: 3em;
    margin-bottom: 6em;
    max-width: 830px;

    @media(max-width:${dimensions.maxwidthMobile}px) {
       margin-bottom: 3em;
    }

    h1 {
        margin-bottom: 1em;

        a {
            text-decoration: none;
            transition: all 100ms ease-in-out;

            &:nth-of-type(1) { color: ${colors.blue500}; }
            &:nth-of-type(2) { color: ${colors.orange500}; }
            &:nth-of-type(3) { color: ${colors.purple500}; }
            &:nth-of-type(4) { color: ${colors.green500}; }
            &:nth-of-type(5) { color: ${colors.teal500}; }

            &:hover {
                cursor: pointer;
                transition: all 100ms ease-in-out;

                &:nth-of-type(1) { color: ${colors.blue600};    background-color: ${colors.blue200};}
                &:nth-of-type(2) { color: ${colors.orange600};  background-color: ${colors.orange200};}
                &:nth-of-type(3) { color: ${colors.purple600};  background-color: ${colors.purple200};}
                &:nth-of-type(4) { color: ${colors.green600};   background-color: ${colors.green200};}
                &:nth-of-type(5) { color: ${colors.teal600};    background-color: ${colors.teal200};}

            }
        }
    }
`

const Section = styled("div")`
    margin-bottom: 10em;
    display: flex;
    flex-direction: column;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        margin-bottom: 4em;
    }

    &:last-of-type {
        margin-bottom: 0;
    }
`

const WorkAction = styled(Link)`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;
    margin-left: auto;

    @media(max-width:${dimensions.maxwidthTablet}px) {
       margin: 0 auto;
    }

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }

    &:hover {
        color: ${colors.blue500};
        transition: all 150ms ease-in-out;

        span {
            transform: translateX(0px);
            opacity: 1;
            transition: transform 150ms ease-in-out;
        }
    }
`

const SocialContainer = styled("div")`
  display: grid;
  grid-template-columns: 0fr 0fr;
  align-items: center;
  margin-right: 5px;
`

const SocialSymbol = styled("img")`
  height: 28px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 50px;
`

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

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const RenderBody = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nftAmount, setNftAmount] = useState({ amount: 1 })
  const [fundsRaised, setfundsRaised] = useState("Loading...")
  const [numPurchased, setnumPurchased] = useState("Loading...")

  useEffect(() => {
    async function fetchData() {
      let funds = await $.crowdsale.fundsRaised()
      funds = toDec(funds._hex, 6, 1)
      let num = await $.crowdsale.numPurchased()
      num = toDec(num._hex, 0, 1)
      setnumPurchased(num)
      setfundsRaised(funds)
    }
     fetchData();

    }, [])

  function handleInputChange(e) {
    e.persist()
    setNftAmount(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
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
          <ProjectHeroContainer>
            <Heading> Statistics </Heading>
            <Container centerContent p="3" pt="0" bg={"mush"} rounded="3xl" shadow="lg" maxWidth="1185px" h="232px" justifyContent="space-evenly">
              <Text textAlign={"center"} fontSize="xl" color="white" style={{position: "relative", top: "40px"}}>Tale of TOAs</Text>
              <Stack direction="row" alignItems="center" marginRight={'122px'} spacing="6" h='228px'>
                  <Image w='300px' h='300px' src={tree} style={{position: 'relative', left: '114px', bottom: '55px', zIndex: '0'}}/>
                  <Stack direction="column" justifyContent="center" borderRadius='33px' h='128px' w='188px' bg='darkBrown' style={{position: "relative"}}>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>1</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Ongoing Projects</Text>
                  </Stack>
                  <Stack direction="column" justifyContent="center" borderRadius='33px' h='128px' w='188px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>${fundsRaised}</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Funds Raised</Text>
                  </Stack>
                  <Stack direction="column" justifyContent="center" borderRadius='33px' h='128px' w='188px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>{numPurchased}</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Total TOAs sold</Text>
                  </Stack>
                  {/**<Stack direction="column" justifyContent="center" borderRadius='33px' h='128px' w='188px' bg='darkBrown' style={{position: "relative", zIndex: "1"}}>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>48</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>TOA Beneficiaries</Text>
                  </Stack>*/}
                  <Image w='196px' h='196px' src={crystal} style={{position: "relative", zIndex: "0", right: "55px"}}/>
              </Stack>
            </Container>
            <Heading> Current & Upcoming Projects </Heading>
            {/**<Grid templateColumns='repeat(3, 1fr)' gap={3}>*/}
            <Stack justifyContent='center' alignItems='center'>
              <Link to='/project'>
                  <Box style={{display: "flex", alignContent: "flex-end", justifyContent: "center", flexWrap: "wrap", paddingBottom: '16px'}} borderRadius='11px' h='523px' w='312px' bg='orange'>
                    <Image h='416px' w='416px' src={kannaNFT}/>
                    <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px">KQKanna</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">A Sceletium growing project in the Western Cape, South Africa</Text>
                  </Box>
              </Link>
              {/**<GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkBrown'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lavendar' marginLeft={"15px"} borderColor={"darkBrown"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color="darkBrown" fontSize="lg" fontWeight="bold" fontStyle="italic"> Coming Soon!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px"> Mushroom Project</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkGreen'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lightGreen' marginLeft={"15px"} borderColor={"darkGreen"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color={"#4D9C73"} fontSize="lg" fontWeight="bold" fontStyle="italic"> Coming Soon!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px"> Marijuana Project</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>**/}
            </Stack>
            <Heading>About Elyseos Ventures</Heading>
            <Box marginRight={"50px"} marginLeft={"50px"} marginBottom={"100px"} w='1168px'>
              <Text color={"navy"} textAlign={"left"} fontSize={"sm"}>Elyseos Ventures is a platform which enables the funding of Ethno Medicine projects via Tokenised Offtake Agreements.  EV is part of the Elyseos ecosystem which includes a suite of web 3 tools which facilitate funding, trading & learning about Sacramental Medicines. Learn more at <Link to="https://elyseos.com" style={{textDecoration: "underline"}}>www.elyseos.com</Link></Text>
              <br/>
              <Text color={"navy"} textAlign={"left"}>TOAs form the core offering of Elyseos Ventures. Tokenized Off-take Agreements (TOAs) are Non Fungible Tokens (NFTs) which have attached to them an ‘offtake’ that is a certain amount of actual product produced e.g. 10kgs of cacao for 5 years.</Text>
              <br />
              <Text color={"navy"} textAlign={"left"}>Holding one of these NFTs entitles you to delivery of some form of goods (the volume and quality to be specified in the NFT) at specified time or times (again these will be specified in the NFT.</Text>
              <br/>
              <Text color={"navy"} textAlign={"left"}>TOAs are a new financial instrument which offer the following features not currently  available in the market:</Text>
              <br/>
              <UnorderedList color={"navy"} textAlign={"left"}>
                <ListItem>Funding the growing of niche ethnobotanical or ethnomycological sacraments. Traditional funding sources often do not venture into these areas.</ListItem><br/>
                <ListItem>Allows users of sacraments (traders, product creators, healers, medical facilities) to lock in a guaranteed supply of product for their needs.</ListItem><br/>
                <ListItem>Allows individuals affordable exposure to sacramental medicine growing operations.  Each individual can calibrate their risk level via the amount of TOAs they purchase.</ListItem><br/>
                <ListItem>Spreads the risk evenly among a large number of beneficiaries.</ListItem><br/>
                <ListItem>Creates an asset backed tradeable instrument that can be sold or used as collateral.</ListItem><br/>
              </UnorderedList>

              {/**<Text color={"navy"} textAlign={"left"}>- </Text><br/>
              <Text color={"navy"} textAlign={"left"}>- </Text><br/>
              <Text color={"navy"} textAlign={"left"}>- </Text><br/>
              <Text color={"navy"} textAlign={"left"}>- </Text><br/>
              <Text color={"navy"} textAlign={"left"}>- </Text><br/>*/}
            </Box>
            {/**<Heading>Past Highlights / Projects Funded</Heading>
            <Grid templateColumns='repeat(4, 0.5fr)' gap={3}>
              <GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkBrown'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lavendar' marginLeft={"15px"} borderColor={"#4F4051"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color={"#4F4051"} fontSize="lg" fontWeight="bold" fontStyle="italic"> Sold Out!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px">Project name 1</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkBrown'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lavendar' marginLeft={"15px"} borderColor={"#4F4051"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color={"#4F4051"} fontSize="lg" fontWeight="bold" fontStyle="italic"> Sold Out!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px">Project name 2</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkBrown'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lavendar' marginLeft={"15px"} borderColor={"#4F4051"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color={"#4F4051"} fontSize="lg" fontWeight="bold" fontStyle="italic"> Sold Out!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px">Project name 3</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box borderRadius='11px' h='488px' w='312px' bg='darkBrown'>
                  <Box style={{display: "flex", alignContent: "space-around", justifyContent: "center", flexWrap: "wrap"}} borderRadius="22px" h='393px' w='280px' bg='lavendar' marginLeft={"15px"} borderColor={"#4F4051"} borderTopWidth={"6px"}>
                    <Text textAlign={"center"} color={"#4F4051"} fontSize="lg" fontWeight="bold" fontStyle="italic"> Sold Out!</Text>
                  </Box>
                  <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px">Project name 4</Text>
                  <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                </Box>
              </GridItem>
            </Grid>*/}
          </ProjectHeroContainer>
          <ProjectBody>
          </ProjectBody>
    </>
  )
}

export default () => {
    //Required check for no data being returned


    return (
            <RenderBody />
    )
}
