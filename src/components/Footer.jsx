import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Logo from "components/_ui/Logo";
import spooch from "images/Elyseos Logo.png"
import twitter from "images/Social Media Icons Twiteer - V1.0.png"
import github from "images/Social Media Icons Github- V1.0.png"
import medium from "images/Social Media Icons M - V1.0.png"
import email from "images/Social Media Icons Email - V1.0.png"
import discord from "images/Social Media Icons Discord - V1.0.png"
import telegram from "images/Social Media Icons Telegram - V1.0.png"
import facebook from "images/Social Media Icons Facebook- V1.0.png"
import instagram from "images/Social Media Icons Instagram - V1.0.png"
import youtube from "images/Social Media Icons YouTube - V1.0.png"
import soundcloud from "images/Social Media Icons Soundclourd- V1.0.png"
import spotify from "images/Social Media Icons Spotify - V1.0.png"
import rss from "images/Social Media Icons RSS - V1.0.png"
import dimensions from "styles/dimensions";
import { Tooltip } from '@chakra-ui/react'


const FooterWrapper = styled("footer")`
  background-color: ${colors.mush};
`

const FooterColumn = styled("div")`
  span {
    font-size: 16px;
    font-weight: bold;
    color: ${colors.white};
  }
  ul {
    list-style: none;
    margin: 16px 0;
    padding: 0;
    color: ${colors.white};
    li {
      margin-bottom: 12px;
      font-size: 16px;
      margin-left: 2px;
    }
  }
  @media (max-width: ${dimensions.maxwidthMobile}px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const FooterContainer = styled("div")`
    position: relative;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 0 0px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 32px;
    padding-top: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    justify-content: start;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 32px;
    }

    svg {
        max-width: 50px;
    }
`

const SocialContainer = styled("div")`
  display: grid;
  grid-template-columns: 40px 40px 40px;
  align-items: center;
  margin-right: 20px;
  column-gap: 30px;
`

const SocialSymbol = styled("img")`
  height: 40px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 50px;
`

const FooterAuthor = styled("a")`
    font-size: 0.75em;
    color: ${colors.grey700};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    margin-top: 1.5em;

     &:hover {
         color: ${colors.blue900};

        .FooterSpooch {
            animation-name: rotate;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
`

const ListLink = styled("a")`
    text-decoration: none;
    color: ${colors.white};
  :hover {
    color: #ED6F1B;
  }
`

const FooterSpooch = styled("img")`
    max-width: 33px;
    margin-top: 0.25em;
`

const Footer = () => (
  <FooterWrapper id="footer">
    <FooterContainer>
      <FooterColumn>
        <span>General</span>
        <ul>
          <ListLink href="/about"><li>About</li></ListLink>
          <ListLink href="/faq"><li>FAQ</li></ListLink>
          <ListLink href="/support"><li>Support</li></ListLink>
        </ul>
      </FooterColumn>
      <FooterColumn>
        <span>Technology</span>
        <ul>
          <ListLink href="https://www.elyseos.com/token-timelines"><li>Token</li></ListLink>
          <ListLink href="https://www.elyseos.com/litepaper"><li>Litepaper</li></ListLink>
        </ul>
      </FooterColumn>
      <FooterColumn>
        <span>Community</span>
        <ul>
        <ListLink href="https://app.gitbook.com/c/5deeMaOeXG1Hj9HVcM5U"><li>Guidebook</li></ListLink>
        <ListLink href="https://snapshot.org/#/elyseos.eth"><li>Governance</li></ListLink>
        </ul>
      </FooterColumn>
      <FooterColumn>
        <span>Listings</span>
        <ul>
          <ListLink target="_blank" href="https://nomics.com/assets/elys-elyseos"><li>Nomics</li></ListLink>
        </ul>
        <ul>
          <ListLink target="_blank" href="https://beets.fi"><li>Beethoven</li></ListLink>
        </ul>
      </FooterColumn>
      <FooterColumn>
      <SocialContainer>
        <Tooltip hasArrow label='Twitter' bg='gray.300' color='black' placement='top'>
          <a target="_blank" href="https://twitter.com/ElyseosFDN">
            <SocialSymbol src={twitter} />
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Discord' bg='gray.300' color='black' placement='top'>
          <a target="_blank" href="https://discord.gg/gY2WMAnBem">
            <SocialSymbol src={discord} />
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Github' bg='gray.300' color='black' placement='top'>
          <a target="_blank" href="https://github.com/elyseos/contracts">
            <SocialSymbol src={github} />
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Telegram' bg='gray.300' color='black' placement='top'>
          <a target="_blank" href="https://t.me/joinchat/kJCUkY1WacpkZTVk">
            <SocialSymbol src={telegram}/>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Email' bg='gray.300' color='black' placement='top'>
          <Link to="/email-signup">
            <SocialSymbol src={email} />
          </Link>
        </Tooltip>
        <Tooltip hasArrow label='Medium' bg='gray.300' color='black' placement='top'>
          <a target="_blank" href="https://medium.com/@Elyseos">
            <SocialSymbol src={medium} />
          </a>
        </Tooltip>
{/**        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={facebook} />
        </a>
        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={instagram} />
        </a>
        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={youtube} />
        </a>
        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={soundcloud} />
        </a>
        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={spotify} />
        </a>
        <a target="_blank" href="https://medium.com/@Elyseos">
          <SocialSymbol src={rss} />
        </a>*/}

      </SocialContainer>
      </FooterColumn>
    </FooterContainer>
  </FooterWrapper>
)

export default Footer;
