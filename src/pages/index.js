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
import telegram from "../images/telegram-black-icon.png"
import twitter from "../images/twitter-black-icon.png"
import {
  Box,
  Container,
  Stack
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

const RenderBody = ({ home, projects, meta }) => {

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
            titleTemplate={`%s | ${meta.title}`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Kanna Launch | Elyseos Launch Pad`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
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
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
          <Modal onClose={onClose} size={"4xl"} isOpen={isOpen}>
            <ModalOverlay
              bg='none'
              backdropFilter='auto'
              backdropInvert='80%'
              backdropBlur='2px'
            />
            <ModalContent alignItems="center" style={{background: "black", color: "white", height: "400px", width: "600px", borderRadius: "44px"}}>
              <ModalHeader>Buy TOA NFTS</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack direction="column">
                  <Stack spacing="5" w="full" direction="row" alignItems="center" justifyContent="center" p="2">
                    <Box fontSize='lg'>
                      Number to buy
                    </Box>
                    <Box>
                      <Input
                      htmlSize={2}
                      width='auto'
                      defaultValue={nftAmount.amount}
                      onChange={handleInputChange}
                       />
                    </Box>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" alignItems="center" justifyContent="center" p="2">
                    <Box fontSize='lg'>
                      USDC price
                    </Box>
                    <Box>
                      $1,200
                    </Box>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" alignItems="center" justifyContent="center" p="2">
                    <Button size="lg" colorScheme='white' color='orange' border={"2px"} borderColor="orange" borderRadius={"44px"} style={{width: "100%"}}>
                      Approve USDC
                    </Button>
                  </Stack>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
          <ProjectHeroContainer>
            <Tabs isFitted>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>TOA Metrics</Tab>
                <Tab>Documentation</Tab>
              </TabList>

              <TabPanels style={{width: "644px"}}>
                <TabPanel>
                  <AspectRatio maxW='1000px' ratio={16 / 9}>
                    <iframe
                    title='elyseos'
                    src='https://www.youtube.com/embed/YlU5XwqtTbY'
                    allowFullScreen
                    />
                  </AspectRatio>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Container centerContent p="3" pt="0" border={"2px"} borderColor={"#ec7019"} rounded="3xl" shadow="lg" maxWidth="400px">
                <Text my="5" textAlign="left" w="full" fontSize="5xl" fontWeight="medium" color={"#ed6f1b"}>$60,000</Text>
                <Container px="8">
                    <Stack spacing="5" w="full" direction="row" alignItems="center" p="2">
                        <Text textAlign={"center"} flexGrow="2" color={"#ed6f1b"}>Raised of $250,000 Minimum</Text>
                    </Stack>

                        <Progress border={"2px"} borderColor={"#ec7019"} rounded="3xl" value={80} />
                </Container>
                <Stack spacing="5" w="full" direction="column" alignItems="flex-end" p="2">
                  <Box fontSize='lg'>
                  $1,200
                    <Box as='span' color='gray.600' fontSize='md'>
                      / TOA
                    </Box>
                  </Box>
                  <Box fontSize='lg'>
                    50
                    <Box as='span' color='gray.600' fontSize='md'>
                      / 300 sold
                    </Box>
                  </Box>
                </Stack>
                <Button size="lg" colorScheme='white' color='orange' border={"2px"} borderColor="orange" borderRadius={"44px"} style={{width: "44%"}} onClick={onOpen}>
                Buy Now
                </Button>
                <Text textAlign={"center"} flexGrow="2" color={"#ed6f1b"}>11 days Remaining</Text>
            </Container>
          </ProjectHeroContainer>
            <ProjectBody>
            <SocialContainer>
              <a target="_blank" href="https://t.me/joinchat/kJCUkY1WacpkZTVk">
                <SocialSymbol src={telegram}/>
              </a>
              <a target="_blank" href="https://twitter.com/ElyseosFDN">
                <SocialSymbol src={twitter} />
              </a>
            </SocialContainer>
              <Stack direction="row" w="4xl">
                <Stack spacing="5" w={"150px"} direction="column" p="2" borderRight={"2px"} borderRightStyle={"dotted"} height="200px">
                  <Box fontSize='lg'>
                  Background
                  </Box>
                  <Box fontSize='lg'>
                    Keypoints
                  </Box>
                  <Box fontSize='lg'>
                    Stakeholders
                  </Box>
                  <Box fontSize='lg'>
                    Risks
                  </Box>
                </Stack>
                <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "350px"}}>
                  <Heading> Background </Heading>
                  <Text textAlign={"left"} flexGrow="2" color={"#ed6f1b"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                  <Heading> Keypoints </Heading>
                  <Text textAlign={"left"} flexGrow="2" color={"#ed6f1b"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                  <Heading> Stakeholders </Heading>
                  <Text textAlign={"left"} flexGrow="2" color={"#ed6f1b"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                  <Heading> Risks </Heading>
                  <Text textAlign={"left"} flexGrow="2" color={"#ed6f1b"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                </Stack>
              </Stack>
            </ProjectBody>
    </>
  )
}

export default ({ data }) => {
    //Required check for no data being returned
    const doc = data.allPrismicHomepage.edges;
    const projects = data.allPrismicProject.edges;
    const meta = data.site.siteMetadata;
      console.log("HOME", doc)
    if (!doc || !projects) return null;

    return (
            <RenderBody home={doc[0].node} projects={projects} meta={meta}/>
    )
}

RenderBody.propTypes = {
    home: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    {
      allPrismicHomepage {
        edges {
          node {
            uid
            data {
              about_bio {
                text
                richText
              }
              about_links {
                about_link {
                  richText
                  text
                }
              }
              about_title {
                text
                richText
              }
              content {
                text
                richText
              }
              hero_button_link {
                url
              }
              hero_button_text {
                richText
                text
              }
              hero_title {
                richText
                text
              }
            }
          }
        }
      }
            allPrismicProject {
              edges {
                node {
                  data {
                    project_category {
                      text
                    }
                    project_description {
                      html
                      text
                    }
                    project_hero_image {
                      fluid {
                        src
                      }
                    }
                    project_post_date
                    project_preview_description {
                      html
                      text
                    }
                    project_title {
                      html
                      text
                    }
                    project_preview_thumbnail {
                      fluid {
                        src
                      }
                    }
                  }
                  uid
                }
              }
            }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
