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
import { RiShareForward2Fill } from "react-icons/ri";
import { ArrowBackIcon } from '@chakra-ui/icons'
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
  Icon,
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

const Governance = ({ home, projects, meta }) => {

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
          <ProjectHeroContainer>
          <Stack direction="row" w="6xl">
            <Stack spacing="5" w={"300px"} direction="column" p="2">
              <VoteMenu />
            </Stack>
            <Stack spacing="5" w="3xl" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "550px"}}>
              <Link to="/governance">
                <Stack spacing="5" w="sm" direction="row" alignItems="center" justifyContent="flex-start" p="2">
                  <ArrowBackIcon />
                  <Text color={"navy"} fontSize='sm' fontWeight='semibold' style={{marginTop: "0px", marginLeft: "5px"}}>Back</Text>
                </Stack>
              </Link>
              <Heading marginBottom={'0px'} fontWeight="bold">Vote Proposal: I can't believe there is still slavery in the galaxy. The Republic's anti-slavery laws?</Heading>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Stack direction="row" bg="#7DC05A" borderRadius="40px" w='72px' h='22px' justifyContent="center"><Text fontSize="12px" textAlign="center" color="white">Active</Text></Stack>
                  <Text color='navy' fontSize='sm' textAlign='left'>Sceletium Project</Text>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Icon as={RiShareForward2Fill} />
                  <Text color='darkBrown' fontSize='sm' textAlign='left'>Share</Text>
                </Stack>
              </Stack>
              <Text color="navy" fontSize='sm'>As soon as we land the Federation will arrest you, and force you to sign the treaty. I agree. I'm not sure what you wish to accomplish by this. I will take back what's ours. There are too few of us, Your Highness.. we have no army. </Text>
              <Text color="navy" fontSize='sm'>Do you know where they are, Jar Jar? When in trouble, Gungans go to sacred place. Mesa show you. C'mon, mesa show you. You Honor, Queen Amidala of the Naboo. Ah, ello dare, ye big Boss Nass, You Honor. Jar Jar Binks, who's da uss-en others?? I am Queen Amidala of the Naboo.</Text>
              <Stack direction="column" justifyContent="center" alignItems="center" bg='navy' borderRadius="40px" padding="1rem">
                <Text fontSize='lg' fontWeight="bold" color="white">Cast Your Vote</Text>
                <Stack alignItems="center" w='full'><Box bg='lavendar' borderRadius="27px" w='full'><Text textAlign='center' fontSize="sm" color="navy">Yes</Text></Box></Stack>
                <Stack alignItems="center" w='full'><Box bg='lavendar' borderRadius="27px" w='full'><Text textAlign='center' fontSize="sm" color="navy">No</Text></Box></Stack>
                <Button size='lng' bg='darkBrown' marginTop="10px">Vote</Button>
              </Stack>
              <Box bg='darkBrown' borderRadius={'25px'}>
                <Text textAlign={"center"} fontSize="xl" color="white"> Votes </Text>
                <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>0x084A61...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">No</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">6 TOA's</Text>
                  </Stack>
                  <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2" marginTop="0px">
                    <Text fontSize="sm" color={"white"}>0x08UI85...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">Yes</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">8 TOA's</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>0x0F4168...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">Yes</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">3 TOA's</Text>
                  </Stack>
                  <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>0x046B1...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">No</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">6 TOA's</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>0x045G7...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">Yes</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">2 TOA's</Text>
                  </Stack>
                  <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>0x084A61...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">No</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">6 TOA's</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>0x8105QA...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">Yes</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">15 TOA's</Text>
                  </Stack>
                  <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>0x0054ER...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">No</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">6 TOA's</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                    <Text fontSize="sm" color={"white"}>0x8105QA...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">Yes</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">15 TOA's</Text>
                  </Stack>
                  <Stack spacing="1" w="full" direction="row" justifyContent="space-between" p="2">
                    <Text fontSize="sm" color={"white"}>0x0054ER...</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">No</Text>
                    <Text fontSize="sm" color={"white"} fontWeight="bold">6 TOA's</Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="column">
              <Box bg="darkPurple" borderRadius="25px" w='288px' padding="10px">
                <Text fontSize="lg" color="white" fontWeight="bold">Information</Text>
                <Stack direction="row" w="full" justifyContent="space-between">
                  <Text fontSize="sm" color="white" fontWeight="bold">Start Date</Text>
                  <Text fontSize="sm" color="white">1 May 2024</Text>
                </Stack>
                <Stack direction="row" w="full" justifyContent="space-between">
                  <Text fontSize="sm" color="white" fontWeight="bold">End Date</Text>
                  <Text fontSize="sm" color="white">22 May 2024</Text>
                </Stack>
              </Box>
              <Box bg="mush" borderRadius="25px" w='288px' padding="10px">
                <Text fontSize="lg" color="white" fontWeight="bold">Current Results</Text>
                <Stack direction="row" w="full" justifyContent="space-between">
                  <Text fontSize="sm" color="white">Yes</Text>
                  <Text fontSize="sm" color="white">80 TOA's 80%</Text>
                </Stack>
                <Progress bg="lavendar" rounded="3xl" value={80} colorScheme="progress"/>
                <Stack direction="row" w="full" justifyContent="space-between">
                  <Text fontSize="sm" color="white">No</Text>
                  <Text fontSize="sm" color="white">20 TOA's 20%</Text>
                </Stack>
                <Progress bg="lavendar" rounded="3xl" value={20} colorScheme="progress"/>
                <Stack direction="row" w="full" justifyContent="space-between">
                  <Text fontSize="sm" color="white">Quorum</Text>
                  <Text fontSize="sm" color="white">100 / 1</Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          </ProjectHeroContainer>
          <ProjectBody>
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
            <Governance home={doc[0].node} projects={projects} meta={meta}/>
    )
}

Governance.propTypes = {
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
