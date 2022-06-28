module.exports = {
  siteMetadata: {
    title: `Elyseos | Sacramental Ecosystem`,
        description: `Elyseos.`,
    author: `Elyseos | elyseos.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
    resolve: 'gatsby-source-prismic',
    options: {

      repositoryName: 'kannalaunch',
      accessToken: 'MC5ZclY3b3hFQUFDUUFXSEdF.Fe-_ve-_vTjvv73vv73vv71AIyo_AWoJTO-_ve-_vVHvv73vv73vv73vv73vv70577-9RA7vv709Okwr',
      customTypesApiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6Imthbm5hbGF1bmNoLTIxNGJiZDA2LTViNzYtNDk5Mi04ZDdhLTNiNTFmOThmNmU0MV80IiwiZGF0ZSI6MTY1NjA2MTI2OSwiZG9tYWluIjoia2FubmFsYXVuY2giLCJpYXQiOjE2NTYwNjEyNjl9.RaCsJ7aJdmH3uUmhoHVEHC4v42ee8qFvwFBFUDnMeXQ'
    },
  },
    // {
    //     resolve: 'gatsby-source-prismic-graphql',
    //     options: {
    //         repositoryName: 'kannalaunch', // (REQUIRED, replace with your own)
    //         linkResolver: () => post => `/${post.uid}`,
    //     }
    // },
    {
     resolve: '@chakra-ui/gatsby-plugin',
     options: {
       resetCSS: true,
       isUsingColorMode: true,
     },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-prismic-starter-prist`,
        short_name: `prist`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/oscar-icon.png`, // This path is relative to the root of the site.
      },
    },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
            head: true,
        },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
