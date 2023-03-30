import { clusterApiUrl } from '@solana/web3.js'

export const getConfig = () => {
  const conf = import.meta.env
  return {
    creatorAddress: conf.GAMBA_CREATOR_ADDRESS || undefined,
    rpcEndpoint: conf.GAMBA_SOLANA_RPC || clusterApiUrl(),
    rpcWsEndpoint: conf.GAMBA_SOLANA_RPC_WS || undefined,
  }
}
