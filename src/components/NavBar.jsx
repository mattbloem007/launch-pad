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
import Burger from './Burger'

// position: fixed;
// transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
// top: 0;
// right: 0;
// height: 100vh;
// width: 300px;
// padding-top: 3.5rem;
// transition: transform 0.3s ease-in-out;
// z-index: 99;

const HeaderContainer = styled("div")`
    background: #5E8195;
    color: white;

    @media (max-width: 768px) {
      position: fixed;
      transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
      top: 0;
      padding-top: 3.5rem;
      transition: transform 0.3s ease-in-out;
      z-index: 99;
  }
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
    flex-direction: column;

  }
`

const HeaderLinks = styled("div")`

    display: flex;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 1.5em;
        flex-direction: column;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
        flex-direction: column;
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

export const StyledStack = styled('div')`
    display: flex;
    flex-direction: row;
    width: var(--chakra-sizes-lg);
    padding: var(--chakra-space-2);
    justify-content: flex-end;

    @media (max-width: 768px) {
      flex-direction: column;
  }
}
`

export const LogoStyledStack = styled('div')`
    display: flex;
    flex-direction: row;
    width: var(--chakra-sizes-3xs);
    padding-top: var(--chakra-space-3);
    height: 6rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
    display: none;
  }
}
`

export const RightStyledStack = styled('div')`
    display: flex;
    flex-direction: row;
    width: var(--chakra-sizes-lg);
    padding: var(--chakra-space-2);
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
  }
}
`

const NavBar = () => {

  const [mobileMenu, setMobileMenu] = useState({ open: false })
  const { active } = useWeb3React()

  function toggleMobileMenu() {
    setMobileMenu({open: !mobileMenu.open})
  }

  return (
      <>
          <Burger toggle={toggleMobileMenu}/>
      </>
  )
}

export default NavBar;
