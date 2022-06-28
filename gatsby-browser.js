/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// const { registerLinkResolver } = require('gatsby-source-prismic-graphql');
// const { linkResolver } = require('./src/utils/prismic-configuration');

// registerLinkResolver(linkResolver);

import { wrapPageElement as wrap } from './src/root-wrapper'

export const wrapPageElement = wrap
