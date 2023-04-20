import * as React from 'react'
import { Section } from '..//components/shared/sections'

const Introduction = () => {
  const [windowHeight, setWindowHeight] = React.useState(0)

  React.useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <Section height={windowHeight} >
      <h1 style={{margin: 0}}>test section</h1>
    </Section>
  )
}

export default Introduction