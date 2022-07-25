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
import VoteBlock from "components/VoteBlock"
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

const Governance = () => {

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
          <Stack direction="row" w="6xl">
            <Stack spacing="5" w={"300px"} direction="column" p="2">
              <VoteMenu />
            </Stack>
            <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "550px"}}>
              <Heading marginBottom={'0px'}>Proposals</Heading>
              <Stack spacing="5" w="full" direction="row" justifyContent="center" p="2" borderRadius="25px" bg="navy"  padding="1rem">
                <Text fontSize="sm" color={"white"}>What was your job when you were based here? Sanitation. Sanitation? Then how do you know how to disable the shields? I don't. I'm just here to get Rey. People are counting on us! The galaxy is counting on us--! Solo, we'll figure it out! We'll use the Force!</Text>
              </Stack>
              <Link to='vote1'>
                <VoteBlock title={"Sceletium Project"} active={true} voteDesc="These Jedi are not to be underestimated. Oh, noooooooooo! Quick! Get out of here! Get off! Whas dat? Hey wait! Oyi, mooie-mooie! I luv yous! You almost got us killed! Are you brainless? I spake. The ability to speak does not make you intelligent. Now get outta here! No, no! Mesa stay, Mesa culled Ja Ja Binksss. Mesa yous humble servaunt. That won't be necessary." voteText="Vote Proposal: I can't believe there is still slavery in the galaxy. The Republic's anti-slavery laws?" days="3" />
              </Link>
            </Stack>
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
            <Governance />
    )
}
