import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { RichText } from "prismic-reactjs";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import kannaNFT from "../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"
import $ from 'lib/crowdsale.js'
import { toDec } from 'lib/bn.js'
import tree from '../images/Tree Artwork - V1.0.png'

import {
  Box,
  Container,
  Stack,
  Grid,
  GridItem
} from "@chakra-ui/layout"
import {
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
  Image,
  ListItem,
  UnorderedList,
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

const About = () => {

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
            <Stack direction="row" alignItems="center">
              <Box marginRight={"50px"} marginLeft={"50px"} marginBottom={"30px"} textAlign="center">
                <Heading>About Elyseos</Heading>
                <Text color={"navy"} textAlign={"left"} fontSize={"sm"}>Elyseos is a decentralized ecosystem
                for Sacramental Medicine exploration. Sacramental medicines include, plant medicine,
                medicinal fungi, animal medicine and other agents of deep transformation. As people search
                for effective longer lasting agents of deep healing, these Sacramental Medicines are bursting
                into the mainstream. With the global marketplace embracing these powerful agents of
                transformation, the tools of organisation and capital are being brought to a previously
                underground movement. Elyseos has emerged to hold an honoring and remembering of the sacred
                within this meeting.</Text>
                <br/>
                <Text color={"navy"} textAlign={"left"}>We directly connect farmer with customer, client
                with practitioner, teacher with student, individual with community. Decentralizing enables
                permission-less innovation and disrupts the tendency of Capital towards total ownership,
                capture and colonization.</Text>
                <br />
                <Text color={"navy"} textAlign={"left"}>The Elyseos DAO is here to support this evolving
                ecosystem by rewarding integrity, and offers fair access to capital and to markets, and
                provides compassionate feedback loops, thereby incentivizing collaboration and
                decentralization.</Text>
                <Heading>About the Elyseos Launchpad</Heading>
                  <Text color={"navy"} textAlign={"left"} fontSize={"sm"}>This is a platform for funding a
                  range of innovative Sacramental medicine projects - from growing medicines, to extracting
                  them, to product creation, to training, to whatever you can imagine that can be tokenised
                  and offered in the future. Think of it as decentralised, crypto-native crowdfunding for
                  everything related to ethnobotanical and sacramental medicines.</Text>
                  <br/>
                  <Text color={"navy"} textAlign={"left"}>At the heart of the Elyseos launchpad are Tokenised
                  Offtake Agreements - TOAs for short. TOAs represent an innovative way of financing that's
                  becoming increasingly popular in the world of commodities.   A TOA is essentially an
                  agreement between a producer and a buyer. The producer agrees to supply a certain product to
                  the buyer over a specified period of time, and the buyer pre-purchases it at an agreed
                  price. What differentiates TOAs from commodity trading or even regular crowdfunding, is that
                  they're recorded on a blockchain, and tokens are used to represent the goods or services
                  being traded.</Text>
                  <br />
                </Box>
                <Image w='564px' h='564px' src={tree}/>
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
            <About />
    )
}
