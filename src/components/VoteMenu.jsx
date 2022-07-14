import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Text, Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'
import { Link } from 'gatsby'

const VoteMenu = ({ data }) => (
  <Box bg="darkPurple" borderRadius="25px" w='288px' padding="10px">
  <Stack direction="column" alignItems="center">
    <Text textAlign="center" fontSize="sm" fontWeight="bold" color="white">284 Members</Text>
    <Stack direction="row" justifyContent="center"><Button size="sm" bg="navy">Connect Wallet</Button></Stack>
    <Link to="/governance"><Button size='link' bg='darkBrown'>All Proposals</Button></Link>
    {/**<Text textAlign="left" fontSize="sm" fontWeight="bold" color="white">Bonus Proposals</Text>
    <Text textAlign="left" fontSize="sm" fontWeight="bold" color="white">Remedy Proposals</Text>
    <Text textAlign="left" fontSize="sm" fontWeight="bold" color="white">Other Proposals</Text>*/}
    <Link to='addproposal'><Button size='link' bg='darkBrown'>Add Proposals</Button></Link>
    </Stack>
  </Box>
)

export default VoteMenu

VoteMenu.propTypes = {
    data: PropTypes.object.isRequired,
}
