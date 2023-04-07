import { Gamba } from 'gamba'
import React from 'react'
import { Game } from './Game'
import { SetupGuide } from './SetupGuide'
import { getConfig } from './config'
import { Container, GlobalStyle } from './styles'

function Wrapper({ children }: {children: any}) {
  return (
    <Container>
      <GlobalStyle />
      {children}
    </Container>
  )
}

export function App() {
  const config = getConfig()
  if (!config.creatorAddress || !config.rpcEndpoint) {
    return (
      <SetupGuide />
    )
  }
  return (
    <Wrapper>
      <Gamba
        name={config.appName ?? ''}
        creator={config.creatorAddress}
        connection={{
          endpoint: config.rpcEndpoint,
          config: {
            commitment: 'processed',
            wsEndpoint: config.rpcWsEndpoint,
          },
        }}
      >
        <Game />
      </Gamba>
    </Wrapper>
  )
}
