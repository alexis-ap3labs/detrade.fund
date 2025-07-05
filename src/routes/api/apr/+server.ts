import { json } from '@sveltejs/kit';

// API Configuration
const API_BASE_URL = 'https://app.detrade.fund/api/vaults';

export async function GET({ url }) {
  try {
    // Get vault ID from query parameters, default to 'detrade-core-usdc'
    const vaultId = url.searchParams.get('vaultId') || 'detrade-core-usdc';
    
    const response = await fetch(`${API_BASE_URL}/${vaultId}/metrics/30d_apr`);
    const data = await response.json();
    
    return json({ 
      apr: data.apr,
      calculationDetails: data.calculationDetails 
    });
  } catch (error) {
    console.error('Error fetching APR:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch APR' }), {
      status: 500
    });
  }
} 