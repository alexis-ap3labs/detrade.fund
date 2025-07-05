<script lang="ts">
  import { browser } from '$app/environment';
</script>

<svelte:head>
  <title>DeTrade – High-Performance DeFi Strategies</title>
  <meta name="description" content="Actively managed vaults powered by real-time data and protocol integrations. Built for performance and open to all." />
  <meta name="keywords" content="DeTrade, DeFi, Trading, Cryptocurrency, Blockchain, Finance, Decentralized" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://detrade.fund" />
  <meta property="og:title" content="DeTrade – High-Performance DeFi Strategies" />
  <meta property="og:description" content="Actively managed vaults powered by real-time data and protocol integrations." />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DeTrade" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="detrade.fund" />
  <meta name="twitter:title" content="DeTrade – High-Performance DeFi Strategies" />
  <meta name="twitter:description" content="Actively managed vaults powered by real-time data and protocol integrations." />
  <meta property="twitter:image" content="/og-image.png" />
</svelte:head>

<slot />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style> 