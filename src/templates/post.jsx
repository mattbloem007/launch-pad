import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Moment from 'react-moment';
import { graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import colors from "styles/colors";
import Layout from "components/Layout";

const PostHeroContainer = styled("div")`
    max-height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 3em;

    img {
        width: 100%;
    }
`

const PostHeroAnnotation = styled("div")`
    padding-top: 0.25em;

    h6 {
        text-align: right;
        color: ${colors.grey600};
        font-weight: 400;
        font-size: 0.85rem;
    }

    a {
        color: currentColor;
    }
`

const PostCategory = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
    font-weight: 600;
    color: ${colors.grey600};

    h5 {
        margin-top: 0;
        margin-bottom: 1em;
    }
`

const PostTitle = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    text-align: center;

    h1 {
        margin-top: 0;
    }
`

const PostBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const PostMetas = styled("div")`
    max-width: 550px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 2em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const PostAuthor = styled("div")`
    margin: 0;
`

const PostDate = styled("div")`
    margin: 0;
`

const Post = ({ post, meta }) => {
    return (
        <>
            <Helmet
                title={`${post.data.post_title.text} | Prist, Gatsby & Prismic Starter`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${post.data.post_title.text} | Prist, Gatsby & Prismic Starter`,
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
                <PostCategory>
                    {/**RichText.render(post.data.post_category.richText)*/}
                </PostCategory>
                <PostTitle>
                    {/**RichText.render(post.data.post_title.richText)*/}
                </PostTitle>
                <PostMetas>
                    <PostAuthor>
                        {post.data.post_author.text}
                    </PostAuthor>
                    <PostDate>
                        <Moment format="MMMM D, YYYY">{post.data.post_date}</Moment>
                    </PostDate>
                </PostMetas>
                    {post.post_hero_image && (
                    <PostHeroContainer>
                        <img src={post.post_hero_image.url} alt="bees" />
                        <PostHeroAnnotation>
                            {/**RichText.render(post.data.post_hero_annotation.richText)*/}
                        </PostHeroAnnotation>
                    </PostHeroContainer>
                )}
                <PostBody>
                    {/**RichText.render(post.data.post_body.richText)*/}
                </PostBody>
            </>
        </>
    )
}

export default ({ data }) => {
    const postContent = data.prismic.allPrismicPost.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Post post={postContent} meta={meta}/>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
};

export const query = graphql`
    query PostQuery($uid: String) {
      allPrismicPost(filter:{uid: {eq: $uid}}) {
        edges {
          node {
            data {
              post_author
              post_date
              post_title {
                text
                html
                richText
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
                richText
              }
              post_category {
                text
                richText
              }
              post_body {
                html
                text
                richText
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
