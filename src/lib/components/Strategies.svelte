<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let isVisible = false;
  let currentSlide = 0;
  let isAnimating = false;
  let isMobile = false;
  
  const strategies = [
    {
      title: "Liquidity Provision",
      subtitle: "Earn base yield from trading fees and protocol incentives.",
      description: "We allocate capital to decentralized exchange pools that offer strong trading activity and competitive rewards. By targeting the right pairs and monitoring volatility, we optimize for sustainable returns while managing impermanent loss and capital exposure."
    },
    {
      title: "Yield-Bearing Assets",
      subtitle: "Deploy capital into assets that generate native yield.",
      description: "These assets accrue interest automatically, often backed by Real World Assets (RWA) like U.S. Treasury Bills, short-term corporate debt, or other Liquid Staking Tokens (LSTs). They provide low-volatility returns without active position management."
    },
    {
      title: "Yield Derivatives & Fixed Rates",
      subtitle: "Access fixed yield strategies for reliable income.",
      description: "We use protocols that separate principal and yield to lock in fixed returns or hedge rate exposure. This allows us to construct stable income streams while adapting to changing DeFi interest rate environments."
    },
    {
      title: "Opportunistic Strategies",
      subtitle: "Farm governance tokens and airdrop points.",
      description: "We engage in high-potential reward programs by selecting trusted protocols with active incentive campaigns. Through smart positioning and timing, we capture upside from emissions and point systems — with careful management of execution and risk."
    }
  ];

  const nextSlide = async () => {
    if (isAnimating) return;
    isAnimating = true;
    
    if (window.innerWidth <= 768) {
      currentSlide = (currentSlide + 1) % strategies.length;
    } else {
      if (currentSlide === 2) {
        currentSlide = 0;
      } else {
        currentSlide = (currentSlide + 2) % strategies.length;
      }
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  };

  const prevSlide = async () => {
    if (isAnimating) return;
    isAnimating = true;
    
    if (window.innerWidth <= 768) {
      currentSlide = (currentSlide - 1 + strategies.length) % strategies.length;
    } else {
      if (currentSlide === 0) {
        currentSlide = 2;
      } else {
        currentSlide = (currentSlide - 2 + strategies.length) % strategies.length;
      }
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  };

  $: secondarySlide = (currentSlide + 1) % strategies.length;
  $: currentPair = Math.floor(currentSlide / 2);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            isVisible = true;
          }, 500);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '50px'
      }
    );

    const section = document.querySelector('.strategies-section');
    if (section) observer.observe(section);

    const checkMobile = () => {
      isMobile = window.innerWidth <= 1024;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  });

  $: totalDots = isMobile ? strategies.length : Math.ceil(strategies.length / 2);
  $: currentDot = isMobile ? currentSlide : Math.floor(currentSlide / 2);
</script>

<section class="strategies-section" id="strategies">
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
      <h2 in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>Our Strategies</h2>
      
      <div id="strategies" class="intro-text" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
        <p>Our various vaults follow a similar yield structure, optimized to generate attractive returns while managing risks. Here are the strategies we employ:</p>
      </div>

      <div class="carousel-wrapper" in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}>
        <div class="carousel-track">
          <div class="cards-container" 
               style="transform: translateX(-{currentSlide * (isMobile ? 100 : 50)}%)">
            {#each strategies as strategy, i}
              <div class="strategy-card" 
                   class:active={isMobile ? i === currentSlide : (i === currentSlide || i === secondarySlide)}>
                <h3>{strategy.title}</h3>
                <p class="subtitle">{strategy.subtitle}</p>
                <p>{strategy.description}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="carousel-dots">
        {#if isMobile}
          {#each strategies as _, i}
            <button 
              class="dot" 
              class:active={currentSlide === i}
              on:click={() => currentSlide = i}
            >
              <span class="dot-number">{(i + 1).toString().padStart(2, '0')}</span>
              <div class="dot-bar"></div>
            </button>
          {/each}
        {:else}
          {#each Array(Math.ceil(strategies.length / 2)) as _, i}
            <button 
              class="dot" 
              class:active={currentDot === i}
              on:click={() => currentSlide = i * 2}
            >
              <span class="dot-number">{(i + 1).toString().padStart(2, '0')}</span>
              <div class="dot-bar"></div>
            </button>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  .strategies-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: clamp(3rem, 8vh, 6rem) 0;
  }

  .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 clamp(2.5rem, 10vw, 5rem);
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1.5rem;
    color: #fff;
    text-align: center;
  }

  .intro-text {
    max-width: 800px;
    margin: 0 auto 2.5rem;
    text-align: center;
    scroll-margin-top: 120px;
  }

  .intro-text p {
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    line-height: 1.6;
    color: #B4C6EF;
  }

  .carousel-wrapper {
    position: relative;
    width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .carousel-track {
    flex: 1;
    overflow: hidden;
    margin: 0 -1rem;
    padding: 0;
  }

  .cards-container {
    display: flex;
    gap: 2.5rem;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0 1rem;
  }

  .strategy-card {
    flex: 0 0 calc(50% - 1.25rem);
    min-width: calc(50% - 1.25rem);
    max-width: calc(50% - 1.25rem);
    opacity: 0.3;
    transform: scale(0.95);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background: rgba(13, 25, 42, 0.6);
    border-radius: 24px;
    padding: 2.5rem;
    border: 1px solid rgba(77, 168, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-sizing: border-box;
    margin: 5px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .strategy-card.active {
    opacity: 1;
    transform: scale(1);
    background: rgba(13, 25, 42, 0.6);
    border: 1px solid rgba(77, 168, 255, 0.1);
  }

  .strategy-card:hover {
    transform: translateY(-5px) scale(1);
    background: rgba(20, 35, 60, 0.7);
    border-color: rgba(77, 168, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .strategy-card h3 {
    font-size: 1.25rem;
    color: #fff;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
  }

  .strategy-card .subtitle {
    color: #4DA8FF;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 500;
    width: 100%;
    text-align: center;
  }

  .strategy-card p {
    color: #B4C6EF;
    line-height: 1.6;
    width: 100%;
    text-align: center;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
  }

  .dot {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .dot.active {
    opacity: 1;
  }

  .dot-number {
    color: #4DA8FF;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .dot-bar {
    width: 48px;
    height: 4px;
    background: rgba(77, 168, 255, 0.2);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .dot.active .dot-bar {
    background: #4DA8FF;
    width: 64px;
  }

  .dot:hover {
    opacity: 0.8;
  }

  .dot:hover .dot-bar {
    background: rgba(77, 168, 255, 0.4);
  }

  .dot.active:hover {
    transform: translateY(-5px) scale(1);
    background: rgba(20, 35, 60, 0.7);
    border-color: rgba(77, 168, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    .carousel-wrapper {
      padding: 0 1rem;
    }

    .carousel-track {
      margin: 0;
      overflow: visible;
    }

    .cards-container {
      flex-direction: column;
      gap: 1.5rem;
      transform: none !important;
      padding: 0;
    }

    .strategy-card {
      flex: 1;
      min-width: 100%;
      max-width: 100%;
      opacity: 1 !important;
      transform: none !important;
      margin: 0;
      padding: 2rem;
      width: 100%;
    }

    .strategy-card.active {
      opacity: 1;
      transform: none;
    }

    .carousel-dots {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .strategies-section {
      padding: 3rem 0;
    }

    .container {
      padding: 0 clamp(1rem, 5vw, 2rem);
    }

    .intro-text {
      margin-bottom: 2rem;
    }

    .intro-text p {
      font-size: 1rem;
    }

    .carousel-wrapper {
      padding: 0;
    }

    .carousel-track {
      margin: 0;
      padding: 0;
    }

    .cards-container {
      gap: 1rem;
    }

    .strategy-card {
      padding: 1.5rem;
      opacity: 1 !important;
    }

    .strategy-card.active {
      opacity: 1;
    }

    .strategy-card h3 {
      font-size: 1.2rem;
    }

    .strategy-card .subtitle {
      font-size: 1rem;
    }

    .strategy-card p {
      font-size: 0.9rem;
    }

    .carousel-dots {
      gap: 1rem;
      margin-top: 2rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }

    .strategy-card {
      padding: 1.5rem;
    }

    .carousel-dots {
      gap: 0.75rem;
    }
  }

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
    width: 125px;
    height: 125px;
    top: 22%;
    left: 15%;
    animation: floatStrategy1 29s infinite ease-in-out;
  }

  .shape-2 {
    width: 105px;
    height: 105px;
    top: 55%;
    left: 32%;
    animation: floatStrategy2 33s infinite ease-in-out;
  }

  .shape-3 {
    width: 85px;
    height: 85px;
    top: 28%;
    right: 22%;
    animation: floatStrategy3 27s infinite ease-in-out;
  }

  .shape-4 {
    width: 115px;
    height: 115px;
    top: 68%;
    right: 35%;
    animation: floatStrategy4 31s infinite ease-in-out;
  }

  .shape-5 {
    width: 95px;
    height: 95px;
    top: 15%;
    left: 58%;
    animation: floatStrategy5 30s infinite ease-in-out;
  }

  .shape-6 {
    width: 110px;
    height: 110px;
    top: 45%;
    right: 48%;
    animation: floatStrategy6 28s infinite ease-in-out;
  }

  .shape-7 {
    width: 100px;
    height: 100px;
    top: 38%;
    left: 42%;
    animation: floatStrategy7 32s infinite ease-in-out;
  }

  @keyframes floatStrategy1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(30deg) rotateY(20deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-30deg) rotateY(200deg) translate(15px, 15px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatStrategy2 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(35deg) rotateX(35deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(-35deg) rotateX(-35deg) translate(-12px, 12px) scale(1.08);
      opacity: 0.18;
    }
  }

  @keyframes floatStrategy3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(45deg) rotateZ(15deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(-45deg) rotateZ(105deg) translate(12px, -12px) scale(1.15);
      opacity: 0.22;
    }
  }

  @keyframes floatStrategy4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(35deg) rotateY(35deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-35deg) rotateY(-35deg) translate(-15px, 8px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatStrategy5 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(20deg) rotateX(20deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(200deg) rotateX(-20deg) translate(8px, -8px) scale(1.12);
      opacity: 0.18;
    }
  }

  @keyframes floatStrategy6 {
    0%, 100% {
      transform: perspective(1000px) rotateY(30deg) rotateZ(30deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(210deg) rotateZ(-30deg) translate(-10px, 10px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatStrategy7 {
    0%, 100% {
      transform: perspective(1000px) rotateX(25deg) rotateZ(25deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-25deg) rotateZ(205deg) translate(10px, -10px) scale(1.08);
      opacity: 0.18;
    }
  }
</style> 