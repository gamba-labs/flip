import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Container,
  Controls,
  GlobalStyle,
  Input,
  Textarea,
} from './styles'
import styled from 'styled-components'

const Wapper = styled.div`
  width: 360px;
`

const Info = styled.div`
  font-size: 11px;
  opacity: .8;
  text-align: left;
  padding: 5px;
`

export function SetupGuide() {
  const [appName, setAppName] = useState('Gamba Flip')
  const [creator, setCreator] = useState('')
  const [rpc, setRpc] = useState('')
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const env = `GAMBA_APP_NAME="${appName}"\n\nGAMBA_CREATOR_ADDRESS="${creator}"\n\nGAMBA_SOLANA_RPC="${rpc || 'https://api.mainnet-beta.solana.com'}"\n\nGAMBA_SOLANA_RPC_WS=`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(env)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch {
      alert('Failed to copy. Copy manually')
    }
  }

  return (
    <Container>
      <GlobalStyle />
      <Wapper>
        <img src="/logo.png" height="100" />
        {!generated ? (
          <Controls>
            <h1>Almost there!</h1>
            <div>
              Enter your Environment variables
            </div>
            <Input
              placeholder="App Name"
              value={appName}
              onChange={(evt) => setAppName(evt.target.value)}
            />
            <div>
              <Input
                placeholder="Solana address"
                value={creator}
                onChange={(evt) => setCreator(evt.target.value)}
              />
              <Info>This wallet will collect fees. Please make sure it has been initialized by sending ~0.001 SOL to it!</Info>
            </div>
            <Input
              placeholder="RPC URL (Leave empty for default)"
              value={rpc}
              onChange={(evt) => setRpc(evt.target.value)}
            />
            <Button disabled={!creator} onClick={() => setGenerated(true)}>
              ✅ Generate .env
            </Button>
          </Controls>
        ) : (
          <Controls>
            <h1>Almost there!</h1>
            <Info>
              Vercel: Go to your Project dashboard → Settings on → Environment Variables, then paste the contents<br /><br />
              Locally: Create a file called ".env" in your project folder, then paste the contents
            </Info>
            <Textarea
              style={{ height: '150px' }}
              value={env}
              onChange={() => null}
              spellCheck={false}
            />
            <ButtonGroup>
              <Button onClick={() => setGenerated(false)}>
               ❌ Go back
              </Button>
              <Button onClick={copy}>
                {!copied ? <>📝 Copy</> : <>✨ Copied!</>}
              </Button>
            </ButtonGroup>
          </Controls>
        )}
      </Wapper>
    </Container>
  )
}
