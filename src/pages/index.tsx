// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout';
import Introduction from '../sections/introduction';
import GlobalStyle from '..//styles/global';

// Step 2: Define your component
const IndexPage = () => {
  return (
    <>
    <GlobalStyle />
    <Layout>
      <Introduction />
    </Layout></>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Home Page</title>

// Step 3: Export your component
export default IndexPage
