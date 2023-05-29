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
  OrderedList,
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

const ListLink = styled("a")`
    text-decoration: underline;
    color: ${colors.white};
  :hover {
    color: #ED6F1B;
  }
`

const Faq = () => {

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
            <Heading>FAQ's</Heading>
            <Stack w='6xl' justifyContent="center" alignItems="center" marginBottom="130px">
              <Box bg='darkBrown' borderRadius={'25px'} w='80%' padding={'20px'}>
                <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>As a Beneficiary how can I be assured of getting the Offtake I’ve paid for?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <OrderedList>
                      <ListItem><Text fontSize="sm" color={"white"}>The producer is a known entity who has agreed,
                      as per a contract, to produce the goods which are part of the TOA.
                      Failure to deliver affects their personal and professional reputations.
                      </Text></ListItem>
                      <br/>
                      <ListItem><Text fontSize="sm" color={"white"}>The producer of  each  project  has a
                      legal relationship with the project Guardian.The Guardian can therefore bring
                      pressure to bear should the beneficiaries not receive their offtake as per the
                      contract. </Text></ListItem>
                      <br/>
                      <ListItem><Text fontSize="sm" color={"white"}>The Guardian of every project has a
                      large amount of “Skin in the Game” (7%-20% of the TOAs) The Guardian only receives
                      their offtake once all the beneficiaries have received theirs. Therefore there is a
                      big incentive for the guardian to closely monitor the producer to ensure they deliver
                      as agreed.</Text></ListItem>
                      <br/>
                    </OrderedList>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>What if I don’t want to receive any more product, can I sell my TOA to someone else?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>Either you can get the project's Sales Agent to
                    sell the product on your behalf and send you the returns less commission.  Or you can
                    sell your TOA yourself.  TOAs are NFTs  which are fully transferable,as is any NFT.
                    You can offer your TOA for sale in the Elyseos TOA marketplace (soon to be launched on this
                      site) where you can look for a potential buyer.</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>How do I transfer this TOA to someone else?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>Send it to their wallet address.
                    If you offer it for sale in the marketplace, once your price is met then your TOA will
                    automatically be transferred (buyers can also make you an offer)</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>What happens if there is an Act of God (drought, flood, earthquake) and there is no offtake for a given period?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                  <OrderedList>
                    <ListItem><Text fontSize="sm" color={"white"}>There is a contingency fund in every
                    project to help producers get back on track and hopefully between the producer and the
                    Guardian they will be able to make up your offtake.
                    </Text></ListItem>
                    <br/>
                    <ListItem><Text fontSize="sm" color={"white"}>Some producers will also carry
                    insurance for this eventuality which means they may be able to pay a cash alternative
                    for the failed offtake period. Check the outline of their project to see if it includes
                    insurance.</Text></ListItem>
                    <br/>
                    <ListItem><Text fontSize="sm" color={"white"}>We are looking into TOA crypto insurance
                    products which you may be able to buy to protect your TOA value in the future.
                    </Text></ListItem>
                    <br/>
                    <ListItem><Text fontSize="sm" color={"white"}>This happens in the world and people
                    participating in projects take losses.  The advantage of the TOA model is multiple
                    backers can easily participate together which spreads the risk.
                    </Text></ListItem>
                    <br/>
                  </OrderedList>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>How do I know that this is a legit project?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>For individual projects read their about page,
                    examine the reports of the auditor, scrutinize the legal agreement
                    presented by the lawyer and check out the Guardian’s bonafides.<br/><br/>
                    For Elyseos - we are not anonymous so you can check out the members of the
                    foundation and the DAO.  Elyseos has been in the crypto space since 2021 and went
                    through the brutal bear marketplace of 2022 and through it all members of the DAO kept
                    showing up and delivering despite zero funding or general marketplace support.  There are a
                    lot of people who very much want this endeavor to succeed.
                    </Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>Who is Elyseos?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>See our about page <ListLink href="/about">here</ListLink></Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>Are there any other projects similar to this?</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>There are number of general crypto crowdfunding models - none specifically for
                    Sacraments or with a focus on an ongoing offtake.  In the near future we hope to present
                    more projects like this on this platform, check out our Governance page for proposals
                    you can vote on <ListLink href="/governance">here</ListLink>.
                    </Text>
                  </Stack>
                </Stack>
              </Box>
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
            <Faq />
    )
}
