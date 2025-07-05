import { json } from '@sveltejs/kit';

// API Configuration
const API_BASE_URL = 'https://app.detrade.fund/api/vaults';
const PRICE_API_URL = 'https://app.detrade.fund/api/price';

// Token mapping by vault
const VAULT_TOKENS = {
  'detrade-core-usdc': 'usdc',
  'detrade-core-eth': 'weth',
  'detrade-core-eurc': 'eurc'
};

async function fetchVaultTVL(vaultId: string) {
  const token = VAULT_TOKENS[vaultId];
  
  // Fetch TVL
  const tvlResponse = await fetch(`${API_BASE_URL}/${vaultId}/metrics/tvl?latest=true`);
  if (!tvlResponse.ok) {
    throw new Error(`Failed to fetch TVL for ${vaultId}: ${tvlResponse.statusText}`);
  }
  const tvlData = await tvlResponse.json();
  
  if (!tvlData.latestTvl || !tvlData.latestTvl.totalAssets) {
    throw new Error(`Invalid TVL data format for ${vaultId}: ${JSON.stringify(tvlData)}`);
  }
  
  // Fetch token price
  const priceResponse = await fetch(`${PRICE_API_URL}/${token}`);
  if (!priceResponse.ok) {
    throw new Error(`Failed to fetch price for ${token}: ${priceResponse.statusText}`);
  }
  const priceData = await priceResponse.json();
  
  if (!priceData[token.toUpperCase()] || !priceData[token.toUpperCase()].usd) {
    throw new Error(`Invalid price data format for ${token}: ${JSON.stringify(priceData)}`);
  }
  
  // Calculate total value
  const totalAssets = parseFloat(tvlData.latestTvl.totalAssets);
  const price = parseFloat(priceData[token.toUpperCase()].usd);
  
  if (isNaN(totalAssets) || isNaN(price)) {
    throw new Error(`Invalid numeric values for ${vaultId}: totalAssets=${totalAssets}, price=${price}`);
  }
  
  return {
    vaultId,
    totalValue: totalAssets * price,
    underlyingAmount: tvlData.latestTvl.totalAssets,
    price: priceData[token.toUpperCase()].usd,
    timestamp: tvlData.latestTvl.timestamp
  };
}

export async function GET() {
  try {
    // Fetch TVL for all three vaults in parallel
    const [usdcVault, ethVault, eurcVault] = await Promise.all([
      fetchVaultTVL('detrade-core-usdc'),
      fetchVaultTVL('detrade-core-eth'),
      fetchVaultTVL('detrade-core-eurc')
    ]);
    
    // Calculate total TVL
    const totalTVL = usdcVault.totalValue + ethVault.totalValue + eurcVault.totalValue;
    
    const result = {
      totalTvl: totalTVL.toString(),
      vaults: {
        usdc: usdcVault,
        eth: ethVault,
        eurc: eurcVault
      }
    };
    
    return json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in total TVL endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch total TVL',
      details: errorMessage
    }), {
      status: 500
    });
  }
} 