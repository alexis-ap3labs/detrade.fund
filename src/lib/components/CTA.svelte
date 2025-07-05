<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  let isVisible = false;

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

    const section = document.querySelector('.cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section class="cta-section">
  <div class="background-shapes">
    {#if isVisible}
      <div class="shape shape-1" in:fade={{ duration: 1000, delay: 200 }}></div>
      <div class="shape shape-2" in:fade={{ duration: 1000, delay: 400 }}></div>
      <div class="shape shape-3" in:fade={{ duration: 1000, delay: 600 }}></div>
      <div class="shape shape-4" in:fade={{ duration: 1000, delay: 800 }}></div>
    {/if}
  </div>

  {#if isVisible}
    <div class="container">
      <h2 in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
        Ready to Start Earning?
      </h2>
      
      <div class="intro-text" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
        <p>Join DeTrade Fund and discover how sophisticated investors are already benefiting from our high-performance DeFi vaults.</p>
      </div>

      <div class="cta-button-container" in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}>
        <a href="https://app.detrade.fund" target="_blank" rel="noopener noreferrer">
          <button class="launch-btn">Launch App</button>
        </a>
      </div>
    </div>
  {/if}
</section>

<style>
  .cta-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    text-align: center;
  }

  .container {
    max-width: 1800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(1.5rem, 5vw, 3rem);
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
    margin: 0 auto 3rem;
    text-align: center;
  }

  .intro-text p {
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    line-height: 1.6;
    color: #B4C6EF;
  }

  .cta-button-container {
    display: flex;
    justify-content: center;
  }

  .launch-btn {
    background: linear-gradient(135deg, #fff 0%, #4DA8FF 100%);
    color: #0d111c;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
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
    width: 100px;
    height: 100px;
    top: 20%;
    left: 15%;
    animation: floatCTA1 28s infinite ease-in-out;
  }

  .shape-2 {
    width: 85px;
    height: 85px;
    top: 60%;
    left: 25%;
    animation: floatCTA2 32s infinite ease-in-out;
  }

  .shape-3 {
    width: 110px;
    height: 110px;
    top: 30%;
    right: 20%;
    animation: floatCTA3 30s infinite ease-in-out;
  }

  .shape-4 {
    width: 90px;
    height: 90px;
    top: 50%;
    right: 30%;
    animation: floatCTA4 26s infinite ease-in-out;
  }

  @keyframes floatCTA1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(25deg) rotateY(25deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-25deg) rotateY(205deg) translate(12px, 12px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatCTA2 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(30deg) rotateX(30deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(-30deg) rotateX(-30deg) translate(-10px, 10px) scale(1.08);
      opacity: 0.18;
    }
  }

  @keyframes floatCTA3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(40deg) rotateZ(20deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(-40deg) rotateZ(110deg) translate(10px, -10px) scale(1.12);
      opacity: 0.22;
    }
  }

  @keyframes floatCTA4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(35deg) rotateY(35deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-35deg) rotateY(-35deg) translate(-12px, 8px) scale(1.1);
      opacity: 0.2;
    }
  }

  @media (max-width: 768px) {
    .cta-section {
      padding: clamp(4rem, 8vh, 6rem) 0;
      min-height: 60vh;
    }

    .container {
      padding: 0 1rem;
    }

    .launch-btn {
      padding: 0.875rem 1.75rem;
      font-size: 1rem;
    }
  }
</style> 