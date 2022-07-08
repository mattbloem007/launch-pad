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
import Header from "components/Header";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure
} from '@chakra-ui/react'


const ProjectHeroContainer = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 0.5em;
    margin-left: 55px;
    margin-right: 55px;
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
    margin-left: 55px;
    margin-right: 55px;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const Project = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nftAmount, setNftAmount] = useState({ amount: 1 })

  function handleInputChange(e) {
    setNftAmount(currentValues => ({
      ...currentValues,
      nftAmount: e,
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
          <Header />
          <Modal isCentered onClose={onClose} isOpen={isOpen}>
            <ModalOverlay
              bg='none'
              backdropFilter='auto'
              backdropInvert='80%'
              backdropBlur='2px'
            />
            <ModalContent alignItems="center" style={{background: "#164057", color: "white", borderRadius: "44px"}}>
              <ModalHeader style={{fontSize: "29px", fontFamily: "Parisine Plus Std Sombre", textTransform: "uppercase"}}>Sceletium TOA NFT'S</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing="5" w="full" direction="column" alignItems="flex-end" p="2">
                    <Image h='368px' w='368px' src={kannaNFT}/>
                    <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                      <Text fontSize="sm" color={"white"}>Quantity</Text>
                       <NumberInput
                       width='68px'
                       style={{borderRadius:"25px", border:"2px solid #CFADD9"}}
                       defaultValue={nftAmount.amount}
                       onChange={(e) => handleInputChange(e)}>
                        <NumberInputField style={{border: "0px"}}/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Stack>
                    <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                      <Text fontSize="sm" color={"white"}>USDC Price</Text>
                      <Text fontSize="sm" color={"white"}>$1,200</Text>
                    </Stack>
                    <Button size='xl' bg="darkBrown" style={{alignSelf: "center"}}>
                      Approve USDC
                    </Button>
                  </Stack>

              </ModalBody>
            </ModalContent>
          </Modal>
          <ProjectHeroContainer>
            <Tabs isFitted id="project">
              <TabList>
                <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Documentation</Heading></Tab>
              </TabList>
                  <AspectRatio margin={"1rem"} w='648px' h='384px' borderRadius='25px' ratio={16 / 9}>
                    <iframe
                    title='elyseos'
                    src='https://www.youtube.com/embed/YlU5XwqtTbY'
                    allowFullScreen
                    style={{borderRadius: '25px', width:'648px', height:'384px'}}
                    />
                  </AspectRatio>
            </Tabs>
            <Container centerContent p="3" pt="0" shadow="lg" w="437px" h="385px" borderRadius="25px" bg="navy">
                <Text textAlign="left" w="full" fontSize="5xl" fontWeight="medium" color={"white"} h='95px'>$60,000</Text>
                <Container px="8">
                  <Text textAlign={"center"} flexGrow="2" fontSize="lg" color={"white"} >Raised of $250,000 Minimum</Text>
                  <Progress bg="lavendar" rounded="3xl" value={10} colorScheme="progress" marginBottom={"5px"}/>
                </Container>
                <Stack spacing="5" w="full" direction="column" alignItems="flex-end" p="2">
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                    <Text fontSize="sm" color={"white"}>Price</Text>
                    <Text fontSize="sm" color={"white"}>$1,200/TOA</Text>
                  </Stack>
                  <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="25px" bg="darkBrown">
                    <Text fontSize="sm" color={"white"}>TOA's left</Text>
                    <Text fontSize="sm" color={"white"}>50/300 Sold</Text>
                  </Stack>
                </Stack>
                <Button size="lg" bg="darkBrown" onClick={onOpen}>
                Buy Now
                </Button>
                <Text textAlign={"center"} flexGrow="2" color={"white"} fontStyle={"italic"}>11 days Remaining</Text>
            </Container>
          </ProjectHeroContainer>
            <ProjectBody>
            <Tabs isFitted id="project">
              <TabList>
                <Tab id="overview"><Heading fontSize="md" style={{marginBottom: "0px"}}>Overview</Heading></Tab>
                <Tab id="toa"><Heading fontSize="md" style={{marginBottom: "0px"}}>TOA Metrics</Heading></Tab>
                <Tab id="docs"><Heading fontSize="md" style={{marginBottom: "0px"}}>Documentation</Heading></Tab>
              </TabList>

              <TabPanels style={{width: "648px"}}>
                <TabPanel>
                  <Stack direction="row" w="4xl">
                    <Stack spacing="5" w={"150px"} direction="column" p="2" borderRight={"2px"} borderRightStyle={"dotted"}>
                      <Box color="navy" fontSize='sm' fontWeight="bold">
                      Background
                      </Box>
                      <Box color="navy" fontSize='sm' fontWeight="bold">
                        Keypoints
                      </Box>
                      <Box color="navy" fontSize='sm' fontWeight="bold">
                        Stakeholders
                      </Box>
                      <Box color="navy" fontSize='sm' fontWeight="bold">
                        Risks
                      </Box>
                    </Stack>
                    <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "350px"}}>
                      <Heading> Background </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                      <Heading> Keypoints </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                      <Heading> Stakeholders </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                        <Grid templateColumns='repeat(4, 0.5fr)' gap={6}>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                          <GridItem>
                            <Image borderRadius='33px' boxSize='100px' src='https://bit.ly/dan-abramov' />
                            <Text color={"navy"} fontSize={"sm"}> Stakeholder 1</Text>
                          </GridItem>
                        </Grid>
                      <Heading> Risks </Heading>
                        <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                    </Stack>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Box bg='darkBrown' borderRadius={'25px'}>
                    <Text textAlign={"center"} fontSize="xl" color="white"> Metrics </Text>
                    <Stack spacing="1" w="full" direction="column" alignItems="flex-end" p="2">
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Product</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Mesembryanthemum Tortuousum</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>First Offtake</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">1 May (Anually) 1:00 AM - UTC</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Delivery Date</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">1 May (Anually) 1:00 AM - UTC</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Duration</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">10 years</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Volume</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">10kgs</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Min/ Total Alkaloids</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">0.9%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Min Mesembrine</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">0.5%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Max Moisture</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">12%</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2" borderRadius="11px" bg="mush">
                        <Text fontSize="sm" color={"white"}>Cut</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Tea or milled</Text>
                      </Stack>
                      <Stack spacing="5" w="full" direction="row" justifyContent="space-between" p="2">
                        <Text fontSize="sm" color={"white"}>Frequency</Text>
                        <Text fontSize="sm" color={"white"} fontWeight="bold">Annual</Text>
                      </Stack>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel>
                <Stack spacing="1" w="full" direction="column" p="2" style={{overflowY: "auto", overflowX: "hidden", height: "350px"}}>
                  <Heading> Background </Heading>
                    <Text color={"navy"} fontSize={"sm"}>Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue. Nulla dui purus, eleifend vel, consequat non, dictum porta, nulla. Duis ante mi, laoreet ut, commodo eleifend, cursus nec, lorem. Aenean eu est. Etiam imperdiet turpis. Praesent nec augue.</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Producer Financials</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Laboratory Audits</Text>
                    <Text color={"navy"} fontSize="lg" fontStyle="underline" fontWeight="bold">Land Lease Agreements</Text>
                </Stack>
                </TabPanel>
              </TabPanels>
              </Tabs>
            </ProjectBody>
    </>
  )
}

export default ({ data }) => {
    //Required check for no data being returned


    return (
            <Project />
    )
}

Project.propTypes = {
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
