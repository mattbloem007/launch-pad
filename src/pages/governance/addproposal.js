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
import { ArrowBackIcon, WarningIcon } from '@chakra-ui/icons'
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

const AddProposal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState({ title: "" })
  const [desc, setDesc] = useState({ desc: "" })

  function handleInputChange(e) {

    setTitle(currentValues => ({
      ...currentValues,
      title: e,
    }))
  }

  function handleTextChange(e) {

    setDesc(currentValues => ({
      ...currentValues,
      desc: e,
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
            <Stack spacing="3" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "550px"}}>
              <Link to="/governance">
                <Stack spacing="5" w="sm" direction="row" alignItems="center" justifyContent="flex-start" p="2">
                  <ArrowBackIcon />
                  <Text color={"navy"} fontSize='sm' fontWeight='semibold' style={{marginTop: "0px", marginLeft: "5px"}}>Back</Text>
                </Stack>
              </Link>
              <Stack spacing="1" w="70%" direction="column" justifyContent="center" p="2" borderRadius="25px" bg="navy"  padding="1rem">
                <Text fontSize="sm" color={"white"}><WarningIcon boxSize='2rem' marginRight="15px"/>You need to have a minimum of 1 TOA in order to submit a proposal.</Text>
                <Text fontSize='sm' color='white' fontWeight='bold'>Learn More</Text>
              </Stack>
              <Stack spacing="1" w="full" direction="column" justifyContent="center">
                <Text textAlign='left' fontSize='sm' color='navy' fontWeight="bold">Title</Text>
                <Input size='sm' w="70%" bg="lavendar" border="2px solid" borderColor='darkBrown' borderRadius='25px' onChange={(e) => handleInputChange(e)} />
              </Stack>
              <Stack spacing="1" w="full" direction="column" justifyContent="center">
                <Text textAlign='left' fontSize='sm' color='navy' fontWeight="bold">Description</Text>
                <Textarea w="70%" h="200px" bg="lavendar" border="2px solid" borderColor='darkBrown' borderRadius='25px' onChange={(e) => handleTextChange(e)} />
              </Stack>
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


    return (
            <AddProposal />
    )
}

AddProposal.propTypes = {
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
