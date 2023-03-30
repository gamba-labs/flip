import { clusterApiUrl } from '@solana/web3.js'

export const getConfig = () => {
  const conf = import.meta.env
  return {
    gambaName: conf.GAMBA_GAME_TITLE || 'Gamba Flip',
    gambaCreator: conf.GAMBA_CREATOR_ADDRESS || undefined,
    rpcEndpoint: conf.GAMBA_SOLANA_RPC_HTTP || clusterApiUrl(),
    rpcWsEndpoint: conf.GAMBA_SOLANA_RPC_WS || undefined,
  }
}
