import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import dimensions from "styles/dimensions";
import { Box, Text, Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'
import { Link, navigate } from 'gatsby'
import kannaNFT from "../images/Sceletium Tortuosum - NFT Card - V1.0.2.png"

import {
  Image,
} from '@chakra-ui/react'

const StyledButton = styled(Button)`
@media(max-width:${dimensions.maxwidthMobile}px) {
   display: none;
}

@media(max-width:${dimensions.maxwidthTablet}px) {
   display: none;
}
`

const ListItem = ({ data }) => (
  <Stack  w="full" direction="column" p="1">
    <Stack w="full" padding="1.5rem" borderRadius="25px" bg="mush" direction="row" justifyContent="space-between" alignItems="center">
      <Stack onClick={() => navigate("proposals")} direction='row' alignItems="center" style={{marginRight: "60px", cursor: "pointer"}} >
        <Image borderRadius='15px' w='84px' h='83px' src={kannaNFT} />
        <Text color='white' textAlign='left' fontSize={{base: 'sm', sm: 'sm', md:'lg'}}>CQKanna Project</Text>
      </Stack>
      <StyledButton size='link' bg='darkBrown' style={{color: 'white'}} onClick={() => navigate("proposals")}>View Project Proposals</StyledButton>
    </Stack>
  </Stack>
)

export default ListItem
