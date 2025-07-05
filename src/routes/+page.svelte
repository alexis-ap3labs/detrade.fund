<script>
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Strategies from '$lib/components/Strategies.svelte';
  import Vaults from '$lib/components/Vaults.svelte';
  import Lagoon from '$lib/components/Lagoon.svelte';
  import CTA from '$lib/components/CTA.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>DeTrade – High-Performance DeFi Strategies</title>
  <meta name="keywords" content="DeTrade, DeFi, Trading, Cryptocurrency, Blockchain, Finance, Decentralized, Yield Farming, Automated Trading, Digital Assets, Lagoon Protocol, DeFi Vaults, Yield Vaults, USDC Vault, EURC Vault, ETH Vault, Stablecoin Yield, Ethereum Yield, High-Yield Vaults, Automated Vaults, Smart Vaults" />
  <meta name="description" content="Actively managed vaults powered by real-time data and protocol integrations. Built for performance and open to all. Access high-yield DeFi strategies with institutional-grade security." />
  <link rel="canonical" href="https://detrade.fund" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://detrade.fund" />
  <meta property="og:title" content="DeTrade – High-Performance DeFi Strategies" />
  <meta property="og:description" content="Actively managed vaults powered by real-time data and protocol integrations. Built for performance and open to all. Access high-yield DeFi strategies with institutional-grade security." />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DeTrade" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="detrade.fund" />
  <meta name="twitter:title" content="DeTrade – High-Performance DeFi Strategies" />
  <meta name="twitter:description" content="Actively managed vaults powered by real-time data and protocol integrations. Built for performance and open to all." />
  <meta property="twitter:image" content="/og-image.png" />
</svelte:head>

<div class="wrapper">
  <Header />
  <main>
    <div class="gradient-container">
      <Hero />
      <About />
      <Vaults />
      <Strategies />
      <Lagoon />
      <CTA />
      <Footer />
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #0d111c;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(button) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  :global(.nav-link) {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .wrapper {
    width: 100%;
    min-height: 100vh;
    background: #000c1a;
    overflow: hidden;
  }

  main {
    width: 100%;
    min-height: 100vh;
    padding: 0;
  }

  .gradient-container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg,
      #002F5D 0%,
      #002B52 15%,
      #002748 30%,
      #002340 45%,
      #001F36 60%,
      #001B2E 75%,
      #001725 85%,
      #001422 92%,
      #000E1C 100%
    );
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1200px) {
    .wrapper {
      padding-left: 0;
    }
  }

  @media (max-width: 768px) {
    main {
      padding: 0;
    }
  }

  @media (max-width: 480px) {
    main {
      padding: 0;
    }
  }

  #vaults, #strategies, #lagoon, #about {
    scroll-margin-top: 100px; /* Adjusted for better transition */
  }
</style> 