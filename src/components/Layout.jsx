import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { Global } from "@emotion/core";
import globalStyles from 'styles/global';
import typeStyles from 'styles/typography';
import dimensions from "styles/dimensions";
import Footer from "components/Footer";
import Header from "components/Header";
import NavBar from "components/NavBar"
import 'styles/fonts.scss';
import Fonts from '../static/fonts.js'
//padding-left: ${dimensions.paddingHorizontalDesktop}em;
//padding-right: ${dimensions.paddingHorizontalDesktop}em;
//    max-width: ${dimensions.maxwidthDesktop}px;

const LayoutContainer = styled.div`

    margin: 0;
    background: #F0EBDD;
    @media(max-width: ${dimensions.maxwidthTablet}px) {
        padding-left: ${dimensions.paddingHorizontalTablet}em;
        padding-right: ${dimensions.paddingHorizontalTablet}em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        padding-left: ${dimensions.paddingHorizontalMobile}em;
        padding-right: ${dimensions.paddingHorizontalMobile}em;
    }

    .Layout__content {
        padding-bottom: 5em;
    }
`;

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <LayoutContainer>
                {/**<Global styles={[globalStyles, typeStyles]} />*/}
                <Fonts />
                <div>
                  <NavBar />
                    <main style={{background: "mushTan"}}>
                        {children}
                    </main>
                    <Footer />
                </div>
            </LayoutContainer>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout;
