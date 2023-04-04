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
  width: 320px;
`

export function SetupGuide() {
  const [creator, setCreator] = useState('')
  const [rpc, setRpc] = useState('')
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const env = `GAMBA_CREATOR_ADDRESS="${creator}"\n\nGAMBA_SOLANA_RPC="${rpc || 'https://api.mainnet-beta.solana.com'}"\n\nGAMBA_SOLANA_RPC_WS=`

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
              Enter your Environmental variables<br />
            </div>
            <Input
              placeholder="Solana address"
              value={creator}
              onChange={(evt) => setCreator(evt.target.value)}
            />
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
            <div>
              Vercel: Go to your Project dashboard → Settings on → Environmental Variables, then paste the contents<br /><br />
              Locally: Create a file called ".env" in your project folder, then paste the contents
            </div>
            <Textarea
              disabled
              style={{ height: '150px' }}
              defaultValue={env}
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
