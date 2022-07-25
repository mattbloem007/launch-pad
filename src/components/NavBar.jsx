import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import Logo from "components/_ui/Logo";
import logo from '../images/Elyseos Logo.png'
import { Text, Button, Image } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/layout"
import { Menu, X } from "react-feather"
import WalletSpace from './WalletSpace'
import { useWeb3React } from "@web3-react/core"

const HeaderContainer = styled("div")`
    background: #5E8195;
    color: white;
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderLinks = styled("div")`

    display: flex;

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
        font-weight: 300;
        font-size: 11px;
        height: 100%;
        padding-bottom: 0.25em;
        padding-top: 0.25em;
        display: block;
        position: relative;
        margin-right: 15px;


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

const NavBar = () => {

  const [mobileMenu, setMobileMenu] = useState({ open: false })
  const { active } = useWeb3React()

  function toggleMobileMenu() {
    setMobileMenu({open: !mobileMenu.open})
  }

  return (
      <HeaderContainer>
          <HeaderContent>
              <Stack spacing="5" w="lg" direction="row" alignItems="flex-start" p="2" justifyContent="flex-end">
                <HeaderLinks>
                    <Link
                        activeClassName="Link--is-active"
                        to="https://www.elyseos.com/"
                        style={{fontSize: "16px"}}>
                        ELYSEOS HOME
                    </Link>
                    <Link
                        activeClassName="Link--is-active"
                        to="https://elys.money/"
                        style={{fontSize: "16px"}}>
                        ELYS TOKEN
                    </Link>
                  </HeaderLinks>
                </Stack>
              <Stack spacing="5" w="3xs" direction="row" alignItems="center" justifyContent="center" paddingTop="3" h="6rem">
                <Link to="/">
                    <Image src={logo} w="102px" h="104px"/>
                </Link>
              </Stack>
                  <Stack spacing="5" w="lg" direction="row" alignItems={active ? "center" : "flex-start"} p="2">
                  <HeaderLinks>
                      <Link
                          activeClassName="Link--is-active"
                          to="/governance"
                          style={{fontSize: "16px"}}>
                          GOVERNANCE
                      </Link>
                      <Link
                          activeClassName="Link--is-active"
                          to="/dashboard"
                          style={{fontSize: "16px"}}>
                          DASHBOARD
                      </Link>
                    </HeaderLinks>
                    {/**<Button size='md' bg='darkBrown'>
                      Connect Wallet
                    </Button>*/}
                    <WalletSpace />
                  </Stack>
              {/**<Stack spacing="5" w="full" direction="row" alignItems="center" justifyContent="flex-end" p="2">

              </Stack>*/}
          </HeaderContent>
      </HeaderContainer>
  )
}

export default NavBar;
