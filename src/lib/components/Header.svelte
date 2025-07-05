<script lang="ts">
  import { fade, slide, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import NumberRoll from '$lib/components/NumberRoll.svelte';
  
  let isScrolled = false;
  let isMenuOpen = false;
  let showHamburger = false;
  let isLoaded = false;
  let lastScrollY = 0;
  let isHeaderVisible = true;
  let tvlValue = "...";
  let isTvlLoading = true;

  async function fetchTVL() {
    isTvlLoading = true;
    try {
      const response = await fetch('/api/total-tvl');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      tvlValue = data.totalTvl;
    } catch (error) {
      console.error('Error fetching TVL:', error);
      tvlValue = "Error";
    } finally {
      isTvlLoading = false;
    }
  }

  onMount(() => {
    // Initialize showHamburger based on window width
    showHamburger = window.innerWidth <= 600;
    
    setTimeout(() => {
      isLoaded = true;
    }, 300);
    
    fetchTVL();
    // Update TVL every 5 minutes
    const interval = setInterval(fetchTVL, 300000);
    
    return () => clearInterval(interval);
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      isHeaderVisible = currentScrollY <= 20 || currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;
    });

    // Handle sequential transition
    window.addEventListener('resize', () => {
      showHamburger = window.innerWidth <= 600;
    });
  }

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      isMenuOpen = false;
      element.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function reloadPage() {
    window.location.href = '/';
  }
</script>

<header class:hidden={!isHeaderVisible}>
  <div class="container">
    <div class="header-content">
      {#if isLoaded}
        <a href="/" 
           class="logo-wrapper"
           on:click={reloadPage}
           in:fly={{ y: -20, duration: 800, delay: 300, easing: quintOut }}>
          <img src="/detrade-logo-text.png" alt="DeTrade" class="logo" />
        </a>

        <div class="tvl-badge" 
          in:fly={{ y: -20, duration: 800, delay: 600, easing: quintOut }}>
          <span class="label">Total Value Locked</span>
          <span class="separator">:</span>
          <span class="value" class:shimmer={isTvlLoading}>
            {#if !isTvlLoading}
              <NumberRoll 
                value={tvlValue}
                prefix="$"
                format={(n) => n.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true
                })}
                duration={1500}
              />
            {/if}
          </span>
        </div>

        <div class="nav-group" 
          in:fly={{ y: -20, duration: 800, delay: 900, easing: quintOut }}>
          <nav>
            <a 
              href="#about" 
              on:click|preventDefault={() => scrollToSection('about')} 
              class="nav-link"
            >
              About
            </a>
            <a 
              href="#vaults" 
              on:click|preventDefault={() => scrollToSection('vaults')} 
              class="nav-link"
            >
              Vaults
            </a>
            <a 
              href="#strategies" 
              on:click|preventDefault={() => scrollToSection('strategies')} 
              class="nav-link"
            >
              Strategies
            </a>
          </nav>
          <div class="desktop-only">
            <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer">
              <button class="launch-btn">Launch App</button>
            </a>
          </div>
          {#if showHamburger}
            <button class="menu-btn" on:click={() => isMenuOpen = !isMenuOpen}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  {#if isMenuOpen}
    <div class="mobile-menu-overlay" transition:fade={{ duration: 200 }}>
      <div class="mobile-menu" transition:fly={{ duration: 300, x: '100%' }}>
        <button class="close-btn" on:click={closeMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="mobile-menu-content">
          <a 
            href="#about" 
            on:click|preventDefault={() => scrollToSection('about')} 
            class="nav-link"
          >
            About
          </a>
          <a 
            href="#vaults" 
            on:click|preventDefault={() => scrollToSection('vaults')} 
            class="nav-link"
          >
            Vaults
          </a>
          <a 
            href="#strategies" 
            on:click|preventDefault={() => scrollToSection('strategies')} 
            class="nav-link"
          >
            Strategies
          </a>
          <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer" on:click={closeMenu}>
            <button class="launch-btn">Launch App</button>
          </a>
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 100;
    padding: 1rem 0;
    background: transparent;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(0);
    display: flex;
    justify-content: center;
  }

  header.hidden {
    transform: translateY(-100%);
  }

  .container {
    width: 100%;
    max-width: 1800px;
    padding: 0 clamp(2.5rem, 10vw, 5rem);
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg, 2rem);
    max-width: 1800px;
    margin: 0 auto;
    position: relative;
    min-height: 40px;
    height: 40px;
  }

  .logo-wrapper {
    flex-shrink: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .logo {
    height: clamp(24px, 4vw, 32px);
    width: auto;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  .tvl-badge {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .label {
    color: #b4c6ef;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s ease;
    line-height: 1;
  }

  .separator {
    color: #b4c6ef;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1;
  }

  .value {
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 0.875rem;
    font-weight: 600;
    text-shadow: 0 0 20px rgba(77, 168, 255, 0.5);
    line-height: 1;
    transition: all 0.3s ease;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  .tvl-badge:hover .label,
  .tvl-badge:hover .separator {
    color: #ffffff;
  }

  .nav-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg, 2rem);
    margin-left: auto;
    opacity: 1;
    transition: opacity 0.3s ease;
    position: relative;
  }

  nav {
    display: flex;
    gap: var(--spacing-lg, 2rem);
    align-items: center;
    opacity: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .nav-link {
    color: #b4c6ef;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover {
    color: #ffffff;
  }

  .launch-btn {
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    color: #0d111c;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    min-width: 120px;
    box-shadow: 
      0 4px 15px rgba(77, 168, 255, 0.3),
      0 0 25px rgba(77, 168, 255, 0.5);
  }

  .launch-btn:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(77, 168, 255, 0.4),
      0 0 30px rgba(77, 168, 255, 0.6);
  }

  .menu-btn {
    display: none;
    background: none;
    border: none;
    color: #b4c6ef;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    flex-shrink: 0;
    min-width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .menu-btn svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .menu-btn:hover {
    color: #ffffff;
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 12, 26, 0.6);
    backdrop-filter: blur(8px);
    z-index: 999;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: rgba(13, 17, 28, 0.95);
    backdrop-filter: blur(12px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn {
    position: fixed;
    top: 1.5rem;
    right: clamp(1rem, 5vw, 2rem);
    background: none;
    border: none;
    color: #b4c6ef;
    cursor: pointer;
    padding: 0.5rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
  }

  .close-btn:hover {
    color: #ffffff;
    transform: rotate(90deg);
  }

  .mobile-menu-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }

  .mobile-menu .nav-link {
    color: #b4c6ef;
    font-size: 1.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
    letter-spacing: 0.5px;
    padding: 1rem;
    display: inline-block;
  }

  .mobile-menu .nav-link:hover {
    color: #ffffff;
    transform: translateY(-2px);
  }

  .mobile-menu .launch-btn {
    font-size: 1rem;
    padding: 0.875rem 1.75rem;
    width: auto;
    min-width: 160px;
    margin-top: 2rem;
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    color: #0d111c;
    box-shadow: 
      0 4px 15px rgba(77, 168, 255, 0.3),
      0 0 25px rgba(77, 168, 255, 0.5);
  }

  .mobile-menu .launch-btn:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(77, 168, 255, 0.4),
      0 0 30px rgba(77, 168, 255, 0.6);
  }

  .desktop-only {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 1200px) {
    .tvl-badge {
      opacity: 0;
      pointer-events: none;
    }
  }

  @media (max-width: 600px) {
    .nav-group {
      min-width: 24px;
    }

    nav, .desktop-only {
      opacity: 0;
      pointer-events: none;
    }

    .menu-btn {
      display: flex;
      opacity: 1;
      transition-delay: 0.3s;
    }

    .mobile-menu {
      display: flex;
    }
  }

  @media (max-width: 400px) {
    .menu-btn {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 640px) {
    header {
      padding: 0.75rem 0;
    }

    .header-content {
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    header {
      padding: 0.75rem 0;
    }
  }

  /* Ajouter des transitions de base pour tous les éléments */
  .logo-wrapper,
  .tvl-badge,
  .nav-group,
  .nav-link,
  .launch-btn {
    will-change: transform, opacity; /* Optimisation des performances */
  }

  .value.loading {
    opacity: 0.5;
  }

  .shimmer {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    min-width: 80px; /* Pour maintenir une largeur minimale pendant le chargement */
    height: 1.2em;
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
      transparent 0,
      rgba(77, 168, 255, 0.1) 20%,
      rgba(255, 255, 255, 0.2) 60%,
      transparent
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style> 