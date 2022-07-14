const path = require('path');

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors
        }
        return result
    });

    exports.onCreateWebpackConfig = ({
      stage,
      rules,
      loaders,
      plugins,
      actions,
    }) => {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
          ],
        },
        plugins: [
          plugins.define({
            __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
          }),
        ],
      })
    }

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        graphql(`
        {
          allPrismicPost {
            edges {
              node {
                data {
                  post_author
                  post_date
                  post_title {
                    text
                    html
                  }
                  post_preview_description {
                    html
                    text
                  }
                  post_hero_image {
                    fluid {
                      src
                    }
                  }
                  post_hero_annotation {
                    html
                    text
                  }
                  post_category {
                    text
                  }
                  post_body {
                    html
                    text
                  }
                }
                uid
              }
            }
          }

          allPrismicProject {
            edges {
              node {
                data {
                  project_category {
                    text
                  }
                  project_description {
                    html
                    text
                  }
                  project_hero_image {
                    fluid {
                      src
                    }
                  }
                  project_post_date
                  project_preview_description {
                    html
                    text
                  }
                  project_title {
                    html
                    text
                  }
                }
                uid
              }
            }
          }
        }
    `)
    )

    const projectsList = result.data.allPrismicProject.edges;
    const postsList = result.data.allPrismicPost.edges;
    // 
    // const projectTemplate = require.resolve('./src/templates/project.jsx');
    // const postTemplate = require.resolve('./src/templates/post.jsx');
    //
    // projectsList.forEach(edge => {
    //     // The uid you assigned in Prismic is the slug!
    //     console.log("Edge", edge)
    //     createPage({
    //         type: 'Project',
    //         match: '/work/:uid',
    //         path: `/work/${edge.node.uid}`,
    //         component: projectTemplate,
    //         context: {
    //             // Pass the unique ID (uid) through context so the template can filter by it
    //             uid: edge.node.uid,
    //         },
    //     })
    // })
    //
    // postsList.forEach(edge => {
    //     createPage({
    //         type: 'Project',
    //         match: '/blog/:uid',
    //         path: `/blog/${edge.node.uid}`,
    //         component: postTemplate,
    //         context: {
    //             uid: edge.node.uid,
    //         },
    //     })
    // })
}
