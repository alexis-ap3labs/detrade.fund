<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import NumberRoll from '$lib/components/NumberRoll.svelte';

  let isVisible = false;
  let usdcApr = "...";
  let ethApr = "...";
  let eurcApr = "...";
  let usdcTvl = "...";
  let ethTvl = "...";
  let eurcTvl = "...";
  let usdcUnderlyingAmount = "...";
  let ethUnderlyingAmount = "...";
  let eurcUnderlyingAmount = "...";
  let isDataLoading = true;

  async function fetchData() {
    isDataLoading = true;
    try {
      // Fetch USDC APR
      const usdcAprResponse = await fetch('/api/apr?vaultId=detrade-core-usdc');
      const usdcAprData = await usdcAprResponse.json();
      console.log('USDC APR Data:', usdcAprData);
      
      // Fetch ETH APR
      const ethAprResponse = await fetch('/api/apr?vaultId=detrade-core-eth');
      const ethAprData = await ethAprResponse.json();
      console.log('ETH APR Data:', ethAprData);
      
      // Fetch EURC APR
      const eurcAprResponse = await fetch('/api/apr?vaultId=detrade-core-eurc');
      const eurcAprData = await eurcAprResponse.json();
      console.log('EURC APR Data:', eurcAprData);
      
      // Fetch USDC TVL
      const usdcTvlResponse = await fetch('/api/tvl?vaultId=detrade-core-usdc');
      const usdcTvlData = await usdcTvlResponse.json();
      console.log('USDC TVL Data:', usdcTvlData);
      
      // Fetch ETH TVL
      const ethTvlResponse = await fetch('/api/tvl?vaultId=detrade-core-eth');
      const ethTvlData = await ethTvlResponse.json();
      console.log('ETH TVL Data:', ethTvlData);
      
      // Fetch EURC TVL
      const eurcTvlResponse = await fetch('/api/tvl?vaultId=detrade-core-eurc');
      const eurcTvlData = await eurcTvlResponse.json();
      console.log('EURC TVL Data:', eurcTvlData);
      
      // Format values
      usdcApr = usdcAprData.apr;
      ethApr = ethAprData.apr;
      eurcApr = eurcAprData.apr;
      usdcTvl = usdcTvlData.tvl;
      ethTvl = ethTvlData.tvl;
      eurcTvl = eurcTvlData.tvl;
      usdcUnderlyingAmount = usdcTvlData.underlyingAmount;
      ethUnderlyingAmount = ethTvlData.underlyingAmount;
      eurcUnderlyingAmount = eurcTvlData.underlyingAmount;

      console.log('Formatted values:', { 
        usdcApr, 
        ethApr, 
        eurcApr,
        usdcTvl, 
        ethTvl,
        eurcTvl,
        usdcUnderlyingAmount,
        ethUnderlyingAmount,
        eurcUnderlyingAmount
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      usdcApr = "Error";
      ethApr = "Error";
      eurcApr = "Error";
      usdcTvl = "Error";
      ethTvl = "Error";
      eurcTvl = "Error";
      usdcUnderlyingAmount = "Error";
      ethUnderlyingAmount = "Error";
      eurcUnderlyingAmount = "Error";
    } finally {
      isDataLoading = false;
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            isVisible = true;
          }, 300);
        }
      },
      { threshold: 0.15 }
    );

    const section = document.querySelector('.vaults-section');
    if (section) observer.observe(section);

    fetchData();
    // Update data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  });

  $: vaults = [
    {
      title: "DeTrade Core USDC",
      isLive: true,
      description: "Maximize USDC yields through diversified stablecoin strategies and top-tier DeFi protocols for optimal risk-adjusted returns.",
      getApr: () => isDataLoading ? "..." : usdcApr,
      getTvl: () => isDataLoading ? "..." : usdcTvl,
      getUnderlyingAmount: () => isDataLoading ? "..." : `${parseFloat(usdcUnderlyingAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`,
      url: "https://app.detrade.fund/vault/detrade-core-usdc"
    },
    {
      title: "DeTrade Core ETH",
      isLive: true,
      description: "Optimized for ETH holders seeking yield without selling. Auto-compounds across top ETH yield protocols.",
      getApr: () => isDataLoading ? "..." : ethApr,
      getTvl: () => isDataLoading ? "..." : ethTvl,
      getUnderlyingAmount: () => isDataLoading ? "..." : `${parseFloat(ethUnderlyingAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETH`,
      url: "https://app.detrade.fund/vault/detrade-core-eth"
    },
    {
      title: "DeTrade Core EURC",
      isLive: true,
      description: "European compliant euro stablecoin yield optimization through diversified EURC strategies.",
      getApr: () => isDataLoading ? "..." : eurcApr,
      getTvl: () => isDataLoading ? "..." : eurcTvl,
      getUnderlyingAmount: () => isDataLoading ? "..." : `${parseFloat(eurcUnderlyingAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EURC`,
      url: "https://app.detrade.fund/vault/detrade-core-eurc"
    }
  ];

  function handleVaultClick(url: string) {
    if (url !== "#") {
      window.open(url, '_blank');
    }
  }
</script>

<section class="vaults-section" id="vaults">
  <div class="background-shapes">
    {#if isVisible}
      <div class="shape shape-1" in:fade={{ duration: 1000, delay: 200 }}></div>
      <div class="shape shape-2" in:fade={{ duration: 1000, delay: 400 }}></div>
      <div class="shape shape-3" in:fade={{ duration: 1000, delay: 600 }}></div>
      <div class="shape shape-4" in:fade={{ duration: 1000, delay: 800 }}></div>
      <div class="shape shape-5" in:fade={{ duration: 1000, delay: 1000 }}></div>
      <div class="shape shape-6" in:fade={{ duration: 1000, delay: 1200 }}></div>
      <div class="shape shape-7" in:fade={{ duration: 1000, delay: 1400 }}></div>
    {/if}
  </div>

  {#if isVisible}
    <div class="container">
      <h2 in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>Our Vaults</h2>
      
      <div id="vaults" class="intro-text" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
        <p>Strategies dynamically managed to deliver robust performance across various market conditions.</p>
      </div>

      <div class="vaults-grid" in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}>
        {#each vaults as vault}
          <div class="vault-card {vault.isLive ? '' : 'coming-soon'}">
            <div class="vault-header">
              <h3>{vault.title}</h3>
            </div>
            <div class="vault-stats">
              <div class="stat">
                <span class="label">30D APR</span>
                <span class="value" class:shimmer={isDataLoading}>
                  {#if !isDataLoading && vault.getApr() !== "..."}
                    <NumberRoll 
                      value={vault.getApr()} 
                      suffix="%" 
                      duration={1500}
                    />
                  {:else}
                    {vault.getApr()}%
                  {/if}
                </span>
              </div>
              <div class="stat">
                <span class="label">TVL</span>
                <span class="value" class:shimmer={isDataLoading}>
                  {#if !isDataLoading && vault.getTvl() !== "..."}
                    <NumberRoll 
                      value={vault.getTvl()} 
                      prefix="$"
                      format={(n) => n.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true
                      })}
                      duration={1500}
                    />
                  {:else}
                    {vault.getTvl()}
                  {/if}
                </span>
              </div>
            </div>
            <p class="description">{vault.description}</p>
            <button class="view-vault" disabled={!vault.isLive} on:click={() => handleVaultClick(vault.url)}>
              {vault.isLive ? 'View Vault →' : 'Coming Soon'}
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .vaults-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: clamp(4rem, 10vh, 8rem) 0;
  }

  .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 clamp(1.5rem, 5vw, 3rem);
    position: relative;
    z-index: 1;
  }

  .section-title {
    scroll-margin-top: 100px;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 2rem;
    color: #fff;
    text-align: center;
  }

  .intro-text {
    max-width: 800px;
    margin: 0 auto 4rem;
    text-align: center;
    scroll-margin-top: 120px;
  }

  .intro-text p {
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    line-height: 1.7;
    color: #B4C6EF;
  }

  .vaults-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .vault-card {
    background: rgba(13, 25, 42, 0.6);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(77, 168, 255, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 400px;
    margin: 0 auto;
  }

  .vault-card:hover {
    transform: translateY(-5px);
    background: rgba(20, 35, 60, 0.7);
    border-color: rgba(77, 168, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .vault-header h3 {
    font-size: 1.25rem;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  .vault-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    text-align: center;
    align-items: start;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    min-height: 3.5rem;
  }

  .label {
    color: #B4C6EF;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .value {
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1.25rem;
    font-weight: 600;
    text-shadow: 0 0 20px rgba(77, 168, 255, 0.15);
    line-height: 1.2;
  }

  @supports not (background-clip: text) {
    .value {
      background: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
      color: #4DA8FF;
    }
  }

  .description {
    color: #B4C6EF;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    min-height: 4.5em;
    font-size: 0.95rem;
  }

  .view-vault {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    padding: 0.875rem;
    background: transparent;
    border: 1px solid rgba(77, 168, 255, 0.3);
    border-radius: 12px;
    color: #4DA8FF;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-vault:hover {
    background: rgba(77, 168, 255, 0.1);
    border-color: rgba(77, 168, 255, 0.5);
  }

  @media (max-width: 1024px) {
    .vaults-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      max-width: 800px;
    }

    .vault-card {
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .vaults-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      max-width: 600px;
    }

    .vault-card {
      padding: 1.75rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    .intro-text {
      margin-bottom: 3rem;
    }

    .intro-text p {
      font-size: 1rem;
    }
  }

  @media (max-width: 640px) {
    .vaults-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 400px;
      margin: 0 auto;
    }

    .vault-card {
      width: 100%;
    }

    .container {
      padding: 0 clamp(1rem, 5vw, 2rem);
    }

    .vault-stats {
      gap: 1rem;
    }

    .description {
      min-height: auto;
      margin-bottom: 1.25rem;
    }

    /* Ajuster les formes en arrière-plan pour mobile */
    .shape-1 {
      width: 100px;
      height: 100px;
      top: 10%;
      left: 10%;
    }

    .shape-2 {
      width: 80px;
      height: 80px;
      top: 30%;
      right: 10%;
    }

    .shape-3 {
      width: 70px;
      height: 70px;
      top: 50%;
      left: 15%;
    }

    .shape-4 {
      width: 90px;
      height: 90px;
      top: 70%;
      right: 15%;
    }

    /* Masquer les autres formes sur mobile */
    .shape-5,
    .shape-6,
    .shape-7 {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .vault-card {
      padding: 1.5rem;
    }

    .vault-header h3 {
      font-size: 1.15rem;
      margin-bottom: 1.25rem;
    }

    .value {
      font-size: 1.1rem;
    }

    .label {
      font-size: 0.8rem;
    }

    .description {
      font-size: 0.9rem;
    }

    .view-vault {
      padding: 0.75rem;
      font-size: 0.95rem;
    }
  }

  /* Styles des lignes en arrière-plan */
  .background-shapes {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .shape {
    position: absolute;
    opacity: 0.12;
    background: linear-gradient(135deg, rgba(77, 168, 255, 0.4), transparent);
    border: 1px solid rgba(77, 168, 255, 0.3);
    backdrop-filter: blur(4px);
    transform-style: preserve-3d;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .shape-1 {
    width: 130px;
    height: 130px;
    top: 18%;
    left: 8%;
    animation: floatVault1 28s infinite ease-in-out;
  }

  .shape-2 {
    width: 110px;
    height: 110px;
    top: 65%;
    left: 22%;
    animation: floatVault2 32s infinite ease-in-out;
  }

  .shape-3 {
    width: 95px;
    height: 95px;
    top: 35%;
    right: 15%;
    animation: floatVault3 26s infinite ease-in-out;
  }

  .shape-4 {
    width: 120px;
    height: 120px;
    top: 75%;
    right: 28%;
    animation: floatVault4 30s infinite ease-in-out;
  }

  .shape-5 {
    width: 85px;
    height: 85px;
    top: 25%;
    left: 65%;
    animation: floatVault5 29s infinite ease-in-out;
  }

  .shape-6 {
    width: 100px;
    height: 100px;
    top: 55%;
    right: 55%;
    animation: floatVault6 27s infinite ease-in-out;
  }

  .shape-7 {
    width: 90px;
    height: 90px;
    top: 42%;
    left: 38%;
    animation: floatVault7 31s infinite ease-in-out;
  }

  @keyframes floatVault1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(35deg) rotateY(15deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-35deg) rotateY(195deg) translate(15px, 15px) scale(1.08);
      opacity: 0.2;
    }
  }

  @keyframes floatVault2 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(40deg) rotateX(40deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(-40deg) rotateX(-40deg) translate(-12px, 12px) scale(1.05);
      opacity: 0.18;
    }
  }

  @keyframes floatVault3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(50deg) rotateZ(10deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(-50deg) rotateZ(100deg) translate(12px, -12px) scale(1.12);
      opacity: 0.22;
    }
  }

  @keyframes floatVault4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(40deg) rotateY(40deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-40deg) rotateY(-40deg) translate(-15px, 8px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatVault5 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(25deg) rotateX(25deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(205deg) rotateX(-25deg) translate(8px, -8px) scale(1.15);
      opacity: 0.18;
    }
  }

  @keyframes floatVault6 {
    0%, 100% {
      transform: perspective(1000px) rotateY(35deg) rotateZ(35deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(215deg) rotateZ(-35deg) translate(-10px, 10px) scale(1.08);
      opacity: 0.2;
    }
  }

  @keyframes floatVault7 {
    0%, 100% {
      transform: perspective(1000px) rotateX(20deg) rotateZ(30deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-20deg) rotateZ(210deg) translate(10px, -10px) scale(1.1);
      opacity: 0.18;
    }
  }

  .vault-card.coming-soon {
    opacity: 0.8;
  }

  .vault-card.coming-soon:hover {
    transform: translateY(-5px);
    background: rgba(20, 35, 60, 0.7);
    border-color: rgba(77, 168, 255, 0.3);
  }

  .view-vault:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .view-vault:disabled:hover {
    background: rgba(77, 168, 255, 0.1);
    border-color: rgba(77, 168, 255, 0.5);
  }

  .value.loading {
    opacity: 0.5;
  }

  .shimmer {
    position: relative;
    overflow: hidden;
    background: rgba(13, 25, 42, 0.7);
    filter: blur(0.5px);
  }

  .shimmer::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(77, 168, 255, 0) 0,
      rgba(77, 168, 255, 0.05) 20%,
      rgba(77, 168, 255, 0.1) 60%,
      rgba(77, 168, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .vault-card {
    transition: filter 0.3s ease, transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  }

  .vault-card:has(.shimmer) {
    backdrop-filter: blur(4px);
    background: rgba(13, 25, 42, 0.4);
  }
</style> 