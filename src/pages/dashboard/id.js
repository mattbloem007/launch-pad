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
import { CopyIcon } from '@chakra-ui/icons'
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

const WalletDashboard = ({ home, projects, meta }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [address, setAddress] = useState({ wAddrs: "" })

  function handleInputChange(e) {

    setAddress(currentValues => ({
      ...currentValues,
      wAddrs: e,
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
            <Stack direction="column" w="6xl" alignItems='flex-start'>
              <Text color='navy' fontSize='2xl' fontWeight='bold'>Dashboard</Text>
              <Stack direction='row' w='full' justifyContent="space-around">
                <Text color='navy' textAlign='left' fontSize='sm'>0x8f725cef531c3277eb902ea8fec44fcc0e0b7bac</Text>
                <CopyIcon />
              </Stack>
              <Tabs>
                <TabList>
                  <Tab>TOA's Held</Tab>
                  <Tab>History</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
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
            <WalletDashboard home={doc[0].node} projects={projects} meta={meta}/>
    )
}

WalletDashboard.propTypes = {
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
