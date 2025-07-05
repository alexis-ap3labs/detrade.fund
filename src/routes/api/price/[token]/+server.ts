import { json } from '@sveltejs/kit';

// API Configuration
const API_BASE_URL = 'https://app.detrade.fund';

// Token mapping for API
const TOKEN_MAPPING = {
  'usdc': 'USDC',
  'weth': 'WETH',
  'eurc': 'EURC'
};

export async function GET({ params }) {
  try {
    const token = params.token.toLowerCase();
    const apiToken = TOKEN_MAPPING[token];
    
    if (!apiToken) {
      return new Response(JSON.stringify({ error: `Invalid token: ${token}` }), {
        status: 400
      });
    }

    console.log(`Fetching price for ${token} (API token: ${apiToken})`);
    const response = await fetch(`${API_BASE_URL}/api/price/${token}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Raw price data for ${token}:`, data);
    
    if (!data[apiToken] || typeof data[apiToken].usd !== 'number') {
      throw new Error(`Invalid price data format for ${token}: ${JSON.stringify(data)}`);
    }
    
    const result = { 
      price: data[apiToken].usd,
      timestamp: new Date().toISOString()
    };
    console.log(`Processed price data for ${token}:`, result);
    
    return json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching ${params.token} price:`, error);
    return new Response(JSON.stringify({ error: `Failed to fetch ${params.token} price: ${errorMessage}` }), {
      status: 500
    });
  }
} 