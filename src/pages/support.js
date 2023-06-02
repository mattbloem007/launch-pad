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
import crystal from '../images/Crystal Artwork - V1.0.png'
import discord from "images/Social Media Icons Discord - V1.0.png"
import telegram from "images/Social Media Icons Telegram - V1.0.png"

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

const SocialSymbol = styled("img")`
  height: 40px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 10px;
`

const StyledBox = styled(Box)`
  margin-left: 370px;
  margin-bottom: 30px;
  text-align: center;
  width: 821px;
  position: relative;
  z-index: 22;

  @media(max-width:${dimensions.maxwidthMobile}px) {
    width: var(--chakra-sizes-md);
    margin-left: 0px;
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
    width: var(--chakra-sizes-md);
    margin-left: 0px;
  }
`

const StyledStack = styled(Stack)`
  flex-direction: row;
  @media(max-width:${dimensions.maxwidthMobile}px) {
    flex-direction: column;
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
    flex-direction: column;
  }
`

const CrystalImage = styled(Image)`
  height: 590px;
  width: 590px;
  position: relative;
  right: 175px;
  z-index: 0;

  @media(max-width:${dimensions.maxwidthMobile}px) {
     right: 0;
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
     right: 0;
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
            <StyledStack alignItems="center">
              <StyledBox>
                <Heading>Support</Heading>
                <Text color={"navy"} textAlign={"left"} fontSize={"sm"}>Welcome to our support page!
                If you're experiencing any issues or have any questions, we're here to help.
                Our support team is available to assist you via our Discord server.
                </Text>
                <br/>
                <Text color={"navy"} textAlign={"left"}>Discord is a great platform for connecting with our team and getting quick support.
                To join our Discord server, simply click the link below and you'll be directed to our server.
                If you don't already have a Discord account, it's easy to sign up for one.</Text>
                <br />
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <a target="_blank" href="https://t.me/joinchat/kJCUkY1WacpkZTVk">
                    <SocialSymbol src={telegram} />
                  </a>
                  <a target="_blank" href="https://t.me/joinchat/kJCUkY1WacpkZTVk">
                    <Text color={"navy"} textAlign={"left"} fontSize="28px">Join Our Telegram!</Text>
                  </a>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <a target="_blank" href="https://discord.com/invite/gY2WMAnBem">
                    <SocialSymbol src={discord} />
                  </a>
                  <a target="_blank" href="https://discord.com/invite/gY2WMAnBem">
                    <Text color={"navy"} textAlign={"left"} fontSize="28px">Join Our Discord!</Text>
                  </a>
                </Stack>
                <Text color={"navy"} textAlign={"left"}>Once you're in our server, you'll be able to chat
                with our support team and other members of our community. We encourage you to take advantage
                of this resource and ask any questions you may have. Our team is dedicated to providing you
                with the best possible support, and we're always happy to help.
                <br/><br/>
                Thank you for choosing our product and we look
                forward to seeing you on our Discord server!</Text>
                </StyledBox>
                <CrystalImage src={crystal} />
              </StyledStack>
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
