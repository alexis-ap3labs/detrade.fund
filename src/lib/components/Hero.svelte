<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import NumberRoll from '$lib/components/NumberRoll.svelte';

  let isLoaded = false;
  let usdcApr = "...";
  let ethApr = "...";
  let eurcApr = "...";
  let isAprLoading = true;

  async function fetchAPR() {
    isAprLoading = true;
    try {
      // Fetch USDC APR
      const usdcResponse = await fetch('/api/apr?vaultId=detrade-core-usdc');
      if (!usdcResponse.ok) {
        throw new Error(`HTTP error! status: ${usdcResponse.status}`);
      }
      const usdcData = await usdcResponse.json();
      usdcApr = usdcData.apr;

      // Fetch ETH APR
      const ethResponse = await fetch('/api/apr?vaultId=detrade-core-eth');
      if (!ethResponse.ok) {
        throw new Error(`HTTP error! status: ${ethResponse.status}`);
      }
      const ethData = await ethResponse.json();
      ethApr = ethData.apr;

      // Fetch EURC APR
      const eurcResponse = await fetch('/api/apr?vaultId=detrade-core-eurc');
      if (!eurcResponse.ok) {
        throw new Error(`HTTP error! status: ${eurcResponse.status}`);
      }
      const eurcData = await eurcResponse.json();
      eurcApr = eurcData.apr;
    } catch (error) {
      console.error('Error fetching APR:', error);
      usdcApr = "Error";
      ethApr = "Error";
      eurcApr = "Error";
    } finally {
      isAprLoading = false;
    }
  }

  onMount(() => {
    setTimeout(() => {
      isLoaded = true;
    }, 300);

    fetchAPR();
    // Update APR every 5 minutes
    const interval = setInterval(fetchAPR, 300000);
    
    return () => clearInterval(interval);
  });

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<section class="hero">
  <div class="background-shapes">
    {#if isLoaded}
      <div class="shape shape-1" in:fly={{ y: 20, duration: 1000, delay: 200, easing: quintOut }}></div>
      <div class="shape shape-2" in:fly={{ y: 20, duration: 1000, delay: 400, easing: quintOut }}></div>
      <div class="shape shape-3" in:fly={{ y: 20, duration: 1000, delay: 600, easing: quintOut }}></div>
      <div class="shape shape-4" in:fly={{ y: 20, duration: 1000, delay: 800, easing: quintOut }}></div>
    {/if}
  </div>
  <div class="container">
    <div class="hero-content">
      {#if isLoaded}
        <div class="hero-text"
          in:fly={{ x: -50, duration: 800, delay: 1200, easing: quintOut }}>
          <h1>High-Performance<br><span class="highlight">DeFi Strategies</span></h1>
          <p>Actively managed vaults powered by real-time data and protocol integrations. Built for performance. Open to all.</p>
          <div class="button-group">
            <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer">
              <button class="cta-button">Launch App</button>
            </a>
            <a 
              href="#about" 
              on:click|preventDefault={() => scrollToSection('about')} 
              class="learn-more-btn"
            >
              Learn More
            </a>
          </div>
        </div>
        <div class="tokens-display"
          in:fly={{ x: 50, duration: 800, delay: 1500, easing: quintOut }}>
          <div class="glow-effect"></div>
          {#if isLoaded}
            <div class="token-wrapper usdc"
              in:fly={{ y: 20, duration: 1000, delay: 1700, easing: quintOut }}>
              <div class="token-card">
                <div class="token-content">
                  <div class="token-image">
                    <img src="/USDC Token.png" alt="USDC Token" />
                  </div>
                  <div class="token-stats">
                    <div class="stat-row">
                      <span class="stat-label">30D APR</span>
                      <span class="stat-value" class:loading={isAprLoading}>
                        {#if !isAprLoading}
                          <NumberRoll 
                            value={usdcApr} 
                            suffix="%" 
                            duration={1500}
                          />
                        {:else}
                          <span class="loading-placeholder">...</span>
                        {/if}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="token-wrapper eth"
              in:fly={{ y: -20, duration: 1000, delay: 1900, easing: quintOut }}>
              <div class="token-card">
                <div class="token-content">
                  <div class="token-image eth-image">
                    <img src="/ETH Token.png" alt="ETH Token" />
                  </div>
                  <div class="token-stats">
                    <div class="stat-row">
                      <span class="stat-label">30D APR</span>
                      <span class="stat-value" class:loading={isAprLoading}>
                        {#if !isAprLoading}
                          <NumberRoll 
                            value={ethApr} 
                            suffix="%" 
                            duration={1500}
                          />
                        {:else}
                          <span class="loading-placeholder">...</span>
                        {/if}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="token-wrapper eurc"
              in:fly={{ y: 10, duration: 1000, delay: 2100, easing: quintOut }}>
              <div class="token-card">
                <div class="token-content">
                  <div class="token-image eurc-image">
                    <img src="/EURC Token.png" alt="EURC Token" />
                  </div>
                  <div class="token-stats">
                    <div class="stat-row">
                      <span class="stat-label">30D APR</span>
                      <span class="stat-value" class:loading={isAprLoading}>
                        {#if !isAprLoading}
                          <NumberRoll 
                            value={eurcApr} 
                            suffix="%" 
                            duration={1500}
                          />
                        {:else}
                          <span class="loading-placeholder">...</span>
                        {/if}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: clamp(60px, 12vh, 120px);
    padding-bottom: clamp(40px, 10vh, 80px);
    margin-top: -2rem;
  }

  .background-shapes {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .shape {
    position: absolute;
    opacity: 0.15;
    background: linear-gradient(135deg, rgba(77, 168, 255, 0.4), transparent);
    border: 1px solid rgba(77, 168, 255, 0.3);
    backdrop-filter: blur(4px);
    transform-style: preserve-3d;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .shape-1 {
    width: 220px;
    height: 220px;
    top: 15%;
    right: 20%;
    animation: float1 25s infinite ease-in-out;
  }

  .shape-2 {
    width: 180px;
    height: 180px;
    top: 45%;
    right: 35%;
    animation: float2 22s infinite ease-in-out;
  }

  .shape-3 {
    width: 160px;
    height: 160px;
    top: 30%;
    right: 65%;
    animation: float3 28s infinite ease-in-out;
  }

  .shape-4 {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 25%;
    animation: float4 24s infinite ease-in-out;
  }

  @keyframes float1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(45deg) rotateZ(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(65deg) rotateZ(180deg) translate(10px, 10px) scale(1.05);
      opacity: 0.25;
    }
  }

  @keyframes float2 {
    0%, 100% {
      transform: perspective(1000px) rotateX(30deg) rotateY(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(50deg) rotateY(180deg) translate(-10px, 15px) scale(1.08);
      opacity: 0.2;
    }
  }

  @keyframes float3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(45deg) rotateZ(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateY(-45deg) rotateZ(90deg) translate(15px, -10px) scale(1.1);
      opacity: 0.3;
    }
  }

  @keyframes float4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(30deg) rotateZ(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(-30deg) rotateZ(270deg) translate(-5px, 20px) scale(1.15);
      opacity: 0.25;
    }
  }

  .container {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0 clamp(2.5rem, 10vw, 5rem);
  }

  .hero-content {
    max-width: 1400px;
    margin: 0 auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
  }

  .hero-text {
    flex: 1;
    max-width: 600px;
  }

  .tokens-display {
    position: relative;
    width: 600px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    perspective: 1000px;
  }

  .glow-effect {
    position: absolute;
    width: 550px;
    height: 450px;
    background: radial-gradient(
      ellipse at 50% 40%,
      rgba(77, 168, 255, 0.2) 0%,
      rgba(77, 168, 255, 0.15) 30%,
      rgba(77, 168, 255, 0.08) 60%,
      transparent 85%
    );
    filter: blur(60px);
    z-index: 0;
    opacity: 0.8;
    transform: translate(-5%, 0%);
  }

  .glow-effect::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 40%,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.05) 60%,
      transparent 85%
    );
    filter: blur(50px);
    transform: translate(5%, 0%);
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
      transform: scale(0.98) translate(-10%, 10%);
    }
    50% {
      opacity: 1;
      transform: scale(1.02) translate(-10%, 10%);
    }
    100% {
      opacity: 0.6;
      transform: scale(0.98) translate(-10%, 10%);
    }
  }

  .token-wrapper {
    position: absolute;
    filter: hue-rotate(-10deg) brightness(1.1) saturate(1.2);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  .token-wrapper.usdc {
    transform: translate(15%, 35%) rotate(15deg) rotateY(-15deg) rotateX(5deg);
    z-index: 2;
  }

  .token-wrapper.eth {
    transform: translate(-35%, -15%) rotate(-15deg) rotateY(15deg) rotateX(-5deg);
    z-index: 1;
  }

  .token-wrapper.eurc {
    transform: translate(45%, -25%) rotate(10deg) rotateY(-10deg) rotateX(8deg);
    z-index: 1;
  }

  .token-wrapper:hover {
    z-index: 3;
  }

  .token-card {
    width: 240px;
    height: 240px;
    background: rgba(13, 25, 42, 1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 32px;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05),
      0 0 0 rgba(77, 168, 255, 0);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    will-change: transform, box-shadow;
    isolation: isolate;
  }

  .token-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .token-image {
    width: 100%;
    height: auto;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateZ(20px);
    margin-bottom: -0.5rem;
  }

  .token-image img {
    width: 70%;
    height: auto;
    object-fit: contain;
  }

  .token-stats {
    width: 100%;
    transform: translateZ(20px);
  }

  .stat-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .stat-label {
    color: #B4C6EF;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .stat-value {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .token-wrapper:hover .token-card {
    transform: scale(1.02) translateY(-10px) rotateY(0deg) rotateX(0deg);
    background: rgba(20, 35, 60, 1);
    box-shadow: 
      0 20px 40px rgba(77, 168, 255, 0.3),
      0 0 0 1px rgba(77, 168, 255, 0.4),
      inset 0 0 0 1px rgba(77, 168, 255, 0.1),
      0 0 40px rgba(77, 168, 255, 0.2);
  }

  .token-wrapper.usdc:hover {
    transform: translate(15%, 25%) scale(1.02) rotateY(-25deg) rotateX(10deg);
  }

  .token-wrapper.eth:hover {
    transform: translate(-35%, -25%) scale(1.02) rotateY(25deg) rotateX(-10deg);
  }

  .token-wrapper.eurc:hover {
    transform: translate(45%, -25%) scale(1.02) rotateY(-25deg) rotateX(10deg);
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #fff;
    max-width: min(600px, 100%);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #B4C6EF;
    max-width: min(500px, 90%);
    width: 100%;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    color: #0d111c;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    box-shadow: 
      0 4px 15px rgba(77, 168, 255, 0.3),
      0 0 25px rgba(77, 168, 255, 0.5);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(77, 168, 255, 0.4),
      0 0 30px rgba(77, 168, 255, 0.6);
  }

  .highlight {
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px rgba(77, 168, 255, 0.5);
  }

  .button-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    white-space: nowrap;
  }

  .learn-more-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: transparent;
    color: #fff;
    border: 1px solid rgba(77, 168, 255, 0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .learn-more-btn:hover {
    transform: translateY(-2px);
    border-color: #4DA8FF;
    background: rgba(77, 168, 255, 0.1);
    box-shadow: 0 0 20px rgba(77, 168, 255, 0.2);
  }

  @media (max-width: 1024px) {
    .hero {
      padding-top: clamp(120px, 20vh, 180px);
      text-align: center;
    }

    .hero-content {
      flex-direction: column;
      gap: 4rem;
      align-items: center;
    }

    .hero-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
      padding: 0 1rem;
    }

    h1 {
      text-align: center;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    p {
      margin-left: auto;
      margin-right: auto;
      max-width: min(400px, 90%);
      text-align: center;
      font-size: 1.1rem;
    }

    .button-group {
      justify-content: center;
    }

    .background-shapes {
      top: auto;
      height: 100vh;
      bottom: 0;
      padding: 10vh 5vw;
    }

    .shape {
      top: auto;
    }

    .shape-1 {
      bottom: 75%;
      right: 15%;
      width: 180px;
      height: 180px;
    }

    .shape-2 {
      bottom: 55%;
      right: 65%;
      width: 160px;
      height: 160px;
    }

    .shape-3 {
      bottom: 35%;
      right: 20%;
      width: 140px;
      height: 140px;
    }

    .shape-4 {
      bottom: 15%;
      right: 55%;
      width: 120px;
      height: 120px;
    }

    .tokens-display {
      width: 500px;
      height: 400px;
      margin-top: 0;
    }

    .token-card {
      width: 200px;
      height: 200px;
    }

    .token-image.eth-image img {
      width: 40%;
    }
  }

  @media (max-width: 640px) {
    .button-group {
      flex-direction: column;
      width: 100%;
      max-width: 280px;
      gap: 1rem;
    }

    .cta-button,
    .learn-more-btn {
      width: 100%;
      min-width: 280px;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding-top: clamp(140px, 25vh, 200px);
    }

    .container {
      padding: 0 clamp(1.5rem, 6vw, 2.5rem);
    }

    .tokens-display {
      width: 400px;
      height: 300px;
    }

    .glow-effect {
      display: none; /* Masquer l'effet de halo sur mobile */
    }

    .token-card {
      width: 160px;
      height: 160px;
      padding: 1.5rem;
    }

    .button-group {
      flex-direction: column;
      width: 100%;
      max-width: 280px;
      gap: 1rem;
    }

    .cta-button,
    .learn-more-btn {
      width: 100%;
    }

    h1 {
      font-size: 2.5rem;
      max-width: 320px;
      margin-bottom: 1rem;
    }

    p {
      max-width: 280px;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .token-content {
      gap: 0.75rem;
    }

    .token-image {
      margin-bottom: -0.25rem;
    }

    .stat-row {
      font-size: 0.75rem;
    }

    .stat-label {
      font-size: 0.75rem;
    }

    .stat-value {
      font-size: 0.875rem;
    }

    .token-wrapper.eth {
      transform: translate(-35%, -5%) rotate(-15deg) rotateY(15deg) rotateX(-5deg);
    }

    .token-wrapper.eth:hover {
      transform: translate(-35%, -15%) scale(1.02) rotateY(25deg) rotateX(-10deg);
    }

    .token-image.eth-image {
      padding: 0.75rem 0;
    }

    .token-image.eth-image img {
      width: 35%;
    }

    .token-wrapper.eth .token-card {
      padding: 1.25rem;
    }

    .background-shapes {
      padding: 5vh 3vw;
    }

    .shape-1 {
      bottom: 70%;
      right: 10%;
      width: 140px;
      height: 140px;
    }

    .shape-2 {
      bottom: 50%;
      right: 70%;
      width: 120px;
      height: 120px;
    }

    .shape-3 {
      bottom: 30%;
      right: 15%;
      width: 100px;
      height: 100px;
    }

    .shape-4 {
      bottom: 10%;
      right: 60%;
      width: 90px;
      height: 90px;
    }
  }

  @media (max-width: 768px) {
    .glow-effect {
      width: 450px;
      height: 350px;
      opacity: 0.7;
    }
  }

  .token-image.eth-image {
    padding: 1rem 0;
  }

  .token-image.eth-image img {
    width: 45%;
    height: auto;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .token-wrapper.eth .token-card {
    padding: 2rem;
  }

  .loading-placeholder {
    opacity: 0.5;
  }

  /* Supprimer les styles des shapes 5-8 qui ne sont plus utilisées */
  .shape-5, .shape-6, .shape-7, .shape-8 {
    display: none;
  }
</style> 