import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Work = ({ projects, meta }) => (
    <>
        <Helmet
            title={`Work | Prist, Gatsby & Prismic Starter`}
            titleTemplate={`%s | Work | Prist, Gatsby & Prismic Starter`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Work | Prist, Gatsby & Prismic Starter`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <>
            <WorkTitle>
                Work
            </WorkTitle>
            <>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        category={project.node.data.project_category.text}
                        title={project.node.data.project_title.text}
                        description={project.node.data.project_preview_description.text}
                        thumbnail={project.node.data.project_preview_thumbnail.fluid}
                        uid={project.node.uid}
                    />
                ))}
            </>
        </>
    </>
);

export default ({ data }) => {
    const projects = data.allPrismicProject.edges;
    const meta = data.site.siteMetadata;
    if (!projects) return null;

    return (
        <Work projects={projects} meta={meta}/>
    )
}

Work.propTypes = {
    projects: PropTypes.array.isRequired,
};

export const query = graphql`
    {
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
              project_preview_thumbnail {
                fluid {
                  src
                }
              }
            }
            uid
          }
        }
      }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
