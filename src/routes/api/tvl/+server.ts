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

export async function GET({ url }) {
  try {
    // Get vault ID from query parameters, default to 'detrade-core-usdc'
    const vaultId = url.searchParams.get('vaultId') || 'detrade-core-usdc';
    const token = VAULT_TOKENS[vaultId];
    
    console.log(`Processing TVL request for vault ${vaultId} (token: ${token})`);
    
    if (!token) {
      console.error(`Invalid vault ID: ${vaultId}`);
      return new Response(JSON.stringify({ error: `Invalid vault ID: ${vaultId}` }), {
        status: 400
      });
    }
    
    // Fetch TVL
    console.log(`Fetching TVL from ${API_BASE_URL}/${vaultId}/metrics/tvl?latest=true`);
    const tvlResponse = await fetch(`${API_BASE_URL}/${vaultId}/metrics/tvl?latest=true`);
    if (!tvlResponse.ok) {
      throw new Error(`Failed to fetch TVL: ${tvlResponse.statusText}`);
    }
    const tvlData = await tvlResponse.json();
    console.log(`TVL data for ${vaultId}:`, tvlData);
    
    if (!tvlData.latestTvl || !tvlData.latestTvl.totalAssets) {
      throw new Error(`Invalid TVL data format: ${JSON.stringify(tvlData)}`);
    }
    
    // Fetch token price
    console.log(`Fetching price for token ${token} from ${PRICE_API_URL}/${token}`);
    const priceResponse = await fetch(`${PRICE_API_URL}/${token}`);
    if (!priceResponse.ok) {
      throw new Error(`Failed to fetch price: ${priceResponse.statusText}`);
    }
    const priceData = await priceResponse.json();
    console.log(`Price data for ${token}:`, priceData);
    
    if (!priceData[token.toUpperCase()] || !priceData[token.toUpperCase()].usd) {
      throw new Error(`Invalid price data format: ${JSON.stringify(priceData)}`);
    }
    
    // Calculate total value
    const totalAssets = parseFloat(tvlData.latestTvl.totalAssets);
    const price = parseFloat(priceData[token.toUpperCase()].usd);
    
    console.log(`Calculating TVL: ${totalAssets} * ${price}`);
    
    if (isNaN(totalAssets) || isNaN(price)) {
      throw new Error(`Invalid numeric values: totalAssets=${totalAssets}, price=${price}`);
    }
    
    const totalValue = totalAssets * price;
    console.log(`Calculated total value: ${totalValue}`);
    
    const result = { 
      tvl: totalValue.toString(),
      underlyingAmount: tvlData.latestTvl.totalAssets,
      price: priceData[token.toUpperCase()].usd,
      timestamp: tvlData.latestTvl.timestamp
    };
    console.log(`Final TVL result for ${vaultId}:`, result);
    
    return json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in TVL endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch TVL',
      details: errorMessage
    }), {
      status: 500
    });
  }
} 