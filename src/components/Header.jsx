import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "components/_ui/Logo";
import logo from '../images/Elyseos Logo.png'
import { Text, Button } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/layout"
import { Menu, X } from "react-feather"

const HeaderContainer = styled("div")`
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderLinks = styled("div")`
    display: grid;
    height: 10%;
    grid-template-columns: repeat(2, auto);
    grid-gap: 2em;
    justify-content: flex-end;
    max-width: 200px;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 5.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }

    a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        font-size: 0.95em;
        height: 100%;
        padding-bottom: 0.25em;
        padding-top: 0.25em;
        display: block;
        position: relative;

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            width: 18px;
            height: 3px;
            background: transparent;
            bottom: -3px;
            right: 50%;
            margin-right: -9px;
            transition: 100ms ease-in-out background;
        }

        &:hover {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }

        &.Link--is-active {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }
    }
`

export const NavListWrapper = styled("div")`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    align-items: baseline;
  }
`

export const StyledButton = styled("button")`
  width: 142px;
  height: 30px;
  float: right;
  color: #ED6F1B;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 45px;

`

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState({ open: false })

  function toggleMobileMenu() {
    setMobileMenu({open: !mobileMenu.open})
  }

  return (
      <HeaderContainer>
          <HeaderContent>
            <Stack spacing="5" w="full" direction="row" alignItems="flex-start" p="2">
              <Link to="/">
                  <img style={{marginTop: "36px"}} src={logo}/>
              </Link>
                  <Stack spacing="5" w="full" direction="column" alignItems="flex-start" p="2">
                    <Text my="5" textAlign="left" w="full" fontSize="4xl" fontWeight="medium" color={"#ed6f1b"} style={{marginTop: "0px", marginBottom:"0px"}}>Project Name</Text>
                    <Text flexGrow="2" color={"#ed6f1b"} style={{marginTop: "0px"}}>A subtitle which describes the project in simple language</Text>
                  </Stack>
              </Stack>
              <Stack spacing="5" w="full" direction="row" alignItems="center" justifyContent="flex-end" p="2">
                <Button size="md" colorScheme='white' color='orange' border={"2px"} borderColor="orange" borderRadius={"44px"} style={{width: "44%"}}>
                  Connect Wallet
                </Button>
                <StyledButton
                  onClick={toggleMobileMenu}
                  style={{ color: "black", background: "none" }}
                >
                  {mobileMenu.open ? (
                    <X stroke="black" size={24} alt="close menu" />
                  ) : (
                    <Menu stroke="black" size={24} alt="open menu" />
                  )}
                </StyledButton>
              </Stack>
          </HeaderContent>
      </HeaderContainer>
  )
}

export default Header;
