import { Canvas } from '@react-three/fiber'
import { LAMPORTS_PER_SOL, useGamba } from 'gamba'
import React, { useState } from 'react'
import { BetInput } from './components/BetInput'
import { Coin } from './components/Coin'
import { DropdownMenu } from './components/DropdownMenu'
import { Header } from './components/Header'
import { Loading } from './components/Loading'
import { RecentGames } from './components/RecentGames'
import { Value } from './components/Value'
import { MIN_BET, OPTIONS } from './constants'
import {
  Amount,
  Balance,
  Button,
  ButtonGroup,
  CanvasWrapper,
  Controls,
  Wrapper,
} from './styles'

export function Game() {
  const gamba = useGamba()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [wager, setWager] = useState(MIN_BET)
  const canPlay = gamba.user.created && !loading && gamba.user.status === 'playing'

  const play = async (game: number[]) => {
    try {
      const response = await gamba.play(game, wager)
      setLoading(true)
      const result = await response.result()
      setResult(result.resultIndex)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div>
        <CanvasWrapper>
          <Canvas linear flat camera={{ fov: 45 }}>
            <Coin result={result} flipping={loading} />
          </Canvas>
        </CanvasWrapper>
        <Loading loading={loading} />
        <Wrapper>
          <Controls>
            <Balance>
              <span>
                Balance: <Value children={`${(gamba.wallet.balance / LAMPORTS_PER_SOL).toFixed(2)} SOL`} />
              </span>
              <Amount $value={gamba.user.balance}>
                {gamba.user.created && <Value children={`+${(gamba.user.balance / LAMPORTS_PER_SOL).toFixed(6)}`} />}
              </Amount>
            </Balance>
            <BetInput wager={wager} onChange={setWager} />
            {!gamba.connected ? (
              <Button $gradient onClick={() => gamba.connect()}>
                Connect
              </Button>
            ) : !gamba.user.created ? (
              <Button $gradient onClick={() => gamba.init()}>
                Create Gamba account
              </Button>
            ) : (
              <ButtonGroup>
                {OPTIONS.map((option) => (
                  <Button
                    key={option.label}
                    disabled={!canPlay}
                    onClick={() => play(option.config)}
                  >
                    {option.label}
                  </Button>
                ))}
                <DropdownMenu
                  label="..."
                  options={[
                    {
                      label: 'Disconnect',
                      onClick: () => gamba.disconnect(),
                    },
                    gamba.user.balance > 0 && {
                      label: 'Claim',
                      onClick: () => gamba.withdraw(),
                    },
                    {
                      label: 'Close Account',
                      onClick: () => {
                        if (confirm('You should only use this if you are unable to Claim. Are you sure?')) {
                          gamba.close()
                        }
                      },
                    },
                    {
                      label: 'Debug State',
                      onClick: () => alert(JSON.stringify(gamba.user, null, 2)),
                    },
                  ]}
                />
              </ButtonGroup>
            )}
          </Controls>
          <RecentGames />
        </Wrapper>
      </div>
    </>
  )
}
