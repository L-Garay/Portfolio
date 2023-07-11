import React from 'react';
import {
  CssSVG,
  HtmlSVG,
  SassSVG,
  JavaScriptSVG,
  ReactSVG,
  RemixSVG,
  TypeScriptSVG,
  GraphQLSVG,
  ApolloSVG,
  NodeSVG,
  PrismaSVG,
  PostgresSVG,
  ContentfulSVG,
  GatsbySVG
} from '../../components/svgs/languages';

const LanguageList = [
  {
    svg: <HtmlSVG id="HTML5SVG" />,
    name: 'HTML5',
    link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML'
  },
  {
    svg: <CssSVG id="CSS3SVG" />,
    name: 'CSS3',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
  },
  {
    svg: <SassSVG id="SaSSSVG" />,
    name: 'SaSS',
    link: 'https://sass-lang.com/'
  },
  {
    svg: <JavaScriptSVG id="JavaScriptSVG" />,
    name: 'JavaScript',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    svg: <TypeScriptSVG id="TypeScriptSVG" />,
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/'
  },
  {
    svg: <ReactSVG id="ReactSVG" />,
    name: 'React',
    link: 'https://react.dev/'
  },
  {
    svg: <RemixSVG id="RemixSVG" />,
    name: 'Remix',
    link: 'https://remix.run/'
  },
  {
    svg: <GraphQLSVG id="GraphQLSVG" />,
    name: 'GraphQL',
    link: 'https://graphql.org/'
  },
  {
    svg: <ApolloSVG id="ApolloSVG" />,
    name: 'Apollo',
    link: 'https://www.apollographql.com/'
  },
  {
    svg: <NodeSVG id="NodeSVG" />,
    name: 'Node',
    link: 'https://nodejs.org/en/about'
  },
  {
    svg: <PrismaSVG id="PrismaSVG" />,
    name: 'Prisma',
    link: 'https://www.prisma.io/'
  },
  {
    svg: <PostgresSVG id="PostgreSQLSVG" />,
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/'
  },
  {
    svg: <GatsbySVG id="GatsbySVG" />,
    name: 'Gatsby',
    link: 'https://www.gatsbyjs.com/'
  },
  {
    svg: <ContentfulSVG id="ContentfulSVG" />,
    name: 'Contentful',
    link: 'https://www.contentful.com/'
  }
];

export default LanguageList;
