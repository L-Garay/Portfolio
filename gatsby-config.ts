import type { GatsbyConfig } from 'gatsby';
import SCREEN_SIZES from './src/constants/screenSizes';
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Logan Garay Portfolio`,
    description: `Software Developer on a mission to create beautifully simple web applications.`,
    auuthor: `@L-Garay`,
    siteUrl: `https://www.yourdomain.tld`
  },
  flags: {
    DEV_SSR: true //testing
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    { resolve: 'gatsby-plugin-styled-components' },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        defaults: {
          placeholder: 'blurred',
          quality: 100,
          breakpoints: [
            SCREEN_SIZES.LARGE,
            SCREEN_SIZES.MEDIUM,
            SCREEN_SIZES.SMALL,
            SCREEN_SIZES.MOBILE
          ]
        }
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_CONTENT_API_TOKEN
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      },
      __key: 'images'
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            // pairs found on (https://www.fontpair.co/all)
            {
              family: 'Roboto Mono',
              strategy: 'selfHosted'
            },
            {
              family: 'Rubik',
              strategy: 'selfHosted'
            },
            {
              family: 'Karla',
              strategy: 'selfHosted'
            }
          ]
        },
        useMinify: true,
        usePreload: true,
        usePreconnect: false
      }
    }
  ]
};

export default config;
