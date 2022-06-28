import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import dimensions from "styles/dimensions";
import Layout from "components/Layout";
import PostCard from "components/PostCard";

const BlogTitle = styled("h1")`
    margin-bottom: 1em;
`

const BlogGrid = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5em;

    @media(max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-template-columns: 1fr;
        grid-gap: 2.5em;
    }
`

const Blog = ({ posts, meta }) => (
    <>
        <Helmet
            title={`Blog | Prist, Gatsby & Prismic Starter`}
            titleTemplate={`%s | Blog | Prist, Gatsby & Prismic Starter`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Blog | Prist, Gatsby & Prismic Starter`,
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
            <BlogTitle>
                Blog
            </BlogTitle>
            <BlogGrid>
                {posts.map((post, i) => (
                    <PostCard
                        key={i}
                        author={post.node.data.post_author}
                        category={post.node.data.post_category.text}
                        title={post.node.data.post_title.text}
                        date={post.node.data.post_date}
                        description={post.node.post_preview_description.text}
                        uid={post.node.uid}
                    />
                ))}
            </BlogGrid>
        </>
    </>
);

export default ({ data }) => {
    const posts = data.allPrismicPost.edges;
    const meta = data.site.siteMetadata;
    if (!posts) return null;

    return (
        <Blog posts={posts} meta={meta}/>
    )
}

Blog.propTypes = {
    posts: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
};


export const query = graphql`
    {
            allPrismicPost(sort: {fields: data___post_date, order: DESC}) {
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
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`
