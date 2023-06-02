import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Text, Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/layout'

const VoteBlock = ({ title, active, voteText, voteDesc, days }) => (
  <Stack w="full" padding="2rem" borderRadius="25px" bg="mush" direction="column" justifyContent="center" alignItems="center">
    <Stack w="full" direction="row" justifyContent="space-between" paddingLeft="1rem" paddingTop="0.5rem" alignItems="center">
      <Text fontSize="sm" color="navy">{title}</Text>
      {active ? <Stack direction="row" bg="#7DC05A" borderRadius="40px" w='72px' h='22px' justifyContent="center"><Text fontSize="12px" textAlign="center" color="white">Active</Text></Stack>
      : <Stack direction="row" bg="#E13F3F" borderRadius="40px" w='72px' h='22px' justifyContent="center"><Text fontSize="12px" textAlign="center" color="white">Closed</Text></Stack>
      }
      <Button size='xs' bg='darkBrown'>View Project</Button>
    </Stack>
    <Stack spacing="5" direction="row" justifyContent="center" p="2" bg="darkBrown" borderRadius="11px">
      <Text fontSize="lg" textAlign="center" color={"white"}>{voteText}</Text>
    </Stack>
    <Text textAlign="left" fontSize="sm" color="white">{voteDesc}</Text>
    <Text alignSelf="flex-start" textAlign="left" fontSize="sm" color="white" fontWeight="bold" fontStyle="italic">{days} Days Left</Text>
  </Stack>
)

export default VoteBlock

VoteBlock.propTypes = {
    data: PropTypes.object.isRequired,
}
