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

const StyledStack = styled(Stack)`


  @media(max-width:${dimensions.maxwidthMobile}px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
`

const StyledStackProposals = styled(Stack)`

  width: var(--chakra-sizes-full); 

  @media(max-width:${dimensions.maxwidthMobile}px) {
    width: var(--chakra-sizes-md);
  }

  @media(max-width:${dimensions.maxwidthTablet}px) {
    width: var(--chakra-sizes-md);
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
          <StyledStack direction="row" w="6xl">
            <Stack spacing="5" w={"300px"} direction="column" p="2">
              <VoteMenu />
            </Stack>
            <StyledStackProposals spacing="1"  direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "550px"}}>
              <Heading marginBottom={'0px'}>Proposals</Heading>
              <Stack spacing="5" w="full" direction="row" justifyContent="center" p="2" borderRadius="25px" bg="navy"  padding="1rem">
                <Text fontSize="sm" color={"white"}>Vote 1</Text>
              </Stack>
              <Link to='vote1'>
                <VoteBlock title={"Sceletium Project"} active={true} voteDesc="Example Vote" voteText="Vote Proposal 1" days="3" />
              </Link>
            </StyledStackProposals>
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
            <Governance />
    )
}
