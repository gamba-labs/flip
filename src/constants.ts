import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export const OPTIONS = [
  {
    label: 'Heads',
    config: [2, 0],
  },
  {
    label: 'Tails',
    config: [0, 2],
  },
]

export const MIN_WAGER = .01 * LAMPORTS_PER_SOL
