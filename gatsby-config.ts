import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Logan Garay Portfolio`,
    description: `Software Developer on a mission to create beautifully simple web applications.`,
    auuthor: `@L-Garay`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
    DEV_SSR: true, //testing
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/assets/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            // pairs found on (https://www.fontpair.co/all)
            {
              family: 'Roboto Mono',
              strategy: 'selfHosted',
            },
            {
              family: 'Rubik',
              strategy: 'selfHosted',
            },
            {
              family: 'Karla',
              strategy: 'selfHosted',
            },
          ],
        },
        useMinify: true,
        usePreload: true,
        usePreconnect: false,
      },
    },
  ],
};

export default config;
