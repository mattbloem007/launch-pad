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
import Select from 'react-select'

const options = [
  { value: 'producer', label: 'Bonus Proposal: Producer' },
  { value: 'community', label: 'Bonus Proposal: Community' },
  { value: 'rememdy', label: 'Remedy Proposal' },
  { value: 'other', label: 'Other' }
]

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    border: '2px solid #4F4051',
    background: '#CFADD9',
    width: '70%',
    borderRadius: '25px',
  }),

  control: (_, { selectProps: { width }}) => ({
    display: 'flex',
    width: '70%',
    border: '2px solid #4F4051',
    borderRadius: '25px',
    background: '#CFADD9',
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   borderBottom: '2px solid #4F4051',
  // }),

  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';
  //   const borderRadius = '25px'
  //
  //   return { ...provided, opacity, transition, borderRadius };
  // }
}

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
  const [proposal, setProposal] = useState({ prop: "" })

  function handleInputChange(e) {

    setTitle(currentValues => ({
      ...currentValues,
      title: e,
    }))
  }

  const onChangeHandler = (change) => {
    setProposal(currentValues => ({
      ...currentValues,
      prop: change.label,
    }))
  };

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
            <Stack spacing="3" w="full" direction="column" p="2" style={{marginBottom: "200px"}}>
              <Link to="/governance">
                <Stack spacing="5" w="sm" direction="row" alignItems="center" justifyContent="flex-start" p="2">
                  <ArrowBackIcon />
                  <Text color={"navy"} fontSize='sm' fontWeight='semibold' style={{marginTop: "0px", marginLeft: "5px"}}>Back</Text>
                </Stack>
              </Link>
              <Heading marginBottom={'0px'} fontWeight="bold">Add Proposal</Heading>
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
              <Stack spacing="1" w="full" direction="column" justifyContent="center">
                <Text textAlign='left' fontSize='sm' color='navy' fontWeight="bold">Proposal Type</Text>
                <Select options={options} styles={customStyles} isSearchable={false} placeholder="Select option" onChange={onChangeHandler}/>
              </Stack>
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
            <AddProposal />
    )
}
