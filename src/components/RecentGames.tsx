import { PublicKey } from '@solana/web3.js'
import { LAMPORTS_PER_SOL, useGamba } from 'gamba'
import React from 'react'
import styled from 'styled-components'
import { OPTIONS } from '../constants'
import { Amount, MOBILE } from '../styles'
import { Value } from './Value'

const Container = styled.div`
  display: grid;
  gap: 5px;
  display: none;
  ${MOBILE} {
    display: grid;
    z-index: 1;
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    a {
      pointer-events: auto;
      color: unset;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  font-size: 12px;
  color: white;
  display: flex;
  gap: 20px;
  & > div {
    flex-grow: 1;
    text-align: right;
  }
`

export function RecentGames() {
  const gamba = useGamba()

  const getReadableResult = (pubkey: PublicKey, resultIndex: number) => {
    // The game was played on our frontend
    if (pubkey.equals(gamba.config.creator)) {
      const result = OPTIONS[resultIndex]?.label ?? resultIndex
      return {
        name: gamba.config.name,
        result: result,
      }
    }
    // Unknown frontend
    return {
      name: 'Game ' + pubkey.toBase58().substring(0, 4) + '..',
      result: resultIndex,
    }
  }

  return (
    <Container>
      {gamba.recentGames.map((res) => {
        const profit = res.payout - res.wager
        const player = res.player.toBase58()
        const key = player + '-' + res.nonce
        const { name, result } = getReadableResult(res.creator, res.resultIndex)
        return (
          <Wrapper key={key}>
            <div>{name}</div>
            <div>{result}</div>
            <a target="_blank" href={`https://explorer.solana.com/address/${player}`} rel="noreferrer">
              {player.substring(0, 6)}..
            </a>
            <Amount $value={profit}>
              <Value>
                {`${profit >= 0 ? '+' : ''}${(profit / LAMPORTS_PER_SOL).toFixed(2)} SOL`}
              </Value>
            </Amount>
            {/* <Time time={res.estimatedTime} /> */}
          </Wrapper>
        )
      })}
    </Container>
  )
}
