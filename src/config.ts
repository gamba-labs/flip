import { clusterApiUrl } from '@solana/web3.js'

export const getConfig = () => {
  const conf = import.meta.env
  return {
    appName: conf.GAMBA_APP_NAME as string || 'Gamba Flip',
    creatorAddress: conf.GAMBA_CREATOR_ADDRESS as string || undefined,
    rpcEndpoint: conf.GAMBA_SOLANA_RPC as string || undefined,
    rpcWsEndpoint: conf.GAMBA_SOLANA_RPC_WS as string || undefined,
  }
}
