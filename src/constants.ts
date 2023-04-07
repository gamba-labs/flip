import { LAMPORTS_PER_SOL } from 'gamba'

export const ASSET_MODEL = '/Coin.glb'
export const ASSET_LOGO = '/logo.png'

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

export const MIN_BET = 0.01 * LAMPORTS_PER_SOL
