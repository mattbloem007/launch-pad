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
import kannaNFT from "../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
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
    margin-bottom: 0.5em;
    border: 2px;
    border-color: #ec7019;
    border-radius: 2px;

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
            <Container centerContent p="3" pt="0" bg={"mush"} rounded="3xl" shadow="lg" maxWidth="1000px" h="232px" justifyContent="space-evenly">
              <Text textAlign={"center"} fontSize="xl" color="white">Within the last few days...</Text>
              <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <GridItem>
                  <Box borderRadius='33px' h='128px' w='216px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>3</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}> Ongoing Projects</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box borderRadius='33px' h='128px' w='216px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>$60,000</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Funds Raised</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box borderRadius='33px' h='128px' w='216px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>$350M</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Project Market Cap</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box borderRadius='33px' h='128px' w='216px' bg='darkBrown'>
                    <Text textAlign={"center"} fontSize="xl" fontWeight="bold" color={"white"}>48</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"}>Stakeholders</Text>
                  </Box>
                </GridItem>
              </Grid>
            </Container>
            <Heading> Current & Upcoming Projects </Heading>
            <Grid templateColumns='repeat(3, 1fr)' gap={3}>
              <Link to='/project'>
                <GridItem>
                  <Box style={{display: "flex", alignContent: "flex-end", justifyContent: "center", flexWrap: "wrap"}} borderRadius='11px' h='488px' w='312px' bg='orange'>
                    <Image h='416px' w='416px' src={kannaNFT}/>
                    <Text textAlign={"center"} color={"white"} fontSize="lg" fontWeight="bold" lineHeight="31px"> Sceletium Project</Text>
                    <Text textAlign={"center"} fontSize="sm" color={"white"} lineHeight="31px">It could be smugglers, it could be. That is the system</Text>
                  </Box>
                </GridItem>
              </Link>
              <GridItem>
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
              </GridItem>
            </Grid>
            <Heading>Learn More</Heading>
            <Box marginRight={"50px"} marginLeft={"50px"} w='1168px'>
              <Text color={"navy"} textAlign={"center"} fontSize={"sm"}>What was your job when you were based here? Sanitation. Sanitation? Then how do you know how to disable the shields? I don't. I'm just here to get Rey. People are counting on us! The galaxy is counting on us--! Solo, we'll figure it out! We'll use the Force! That's not how the Force works--! Oh really, you're cold? Come on! Report. Weapon charged in fifteen minutes, sir. Hey! The longer we're here, less luck we're going to have. The shields? I have an idea about that.</Text>
              <br/>
              <Text color={"navy"} textAlign={"center"}>I didn't know there was this much green in the whole galaxy. Hey, Solo -- I'm not sure what we're walking into here -- D'you just call me Solo? Sorry. Han-- Mr.</Text>
              <br />
              <Text color={"navy"} textAlign={"center"}>What do we do with her? Is there a garbage chute? Trash compactor? Yeah, there is. General, their shields are down! Thank the Maker! Han did it! Send them in! Give Poe full authorization to attack. Black Leader, go to sub-lights. On your call. COMMODORE META reacts. Admiral, their weapon will fire in two minutes. The Falcon's this way. We're not done yet. You're a monster! It's just us now. Han Solo can't save you. Rey! Rey! Rey.</Text>
              <br/>
              <Text color={"navy"} textAlign={"center"}>But my first battle, I made a choice. I wasn't going to kill for them. So I ran. Right into you. We have their location. We tracked their reconnaissance ship to the Ileenium system. Good. Then we will crush them once and for all.Something far worse has happened to you. You know what I've come for. I know where you come from. Before you called yourself Kylo Ren. The map to Skywalker. We know you've found it, and now you're going to give it to the First Order.</Text>
              <br/>
              <Text color={"navy"} textAlign={"center"}>General, their shields are down! Thank the Maker! Han did it! Send them in! Give Poe full authorization to attack. Black Leader, go to sub-lights. On your call. Roger, base -- red squad, blue squad, take my lead.</Text>
            </Box>
            <Heading>Past Highlights / Projects Funded</Heading>
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
            </Grid>
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
