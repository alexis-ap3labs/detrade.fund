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

    const section = document.querySelector('.lagoon-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section class="lagoon-section" id="lagoon">
  <div class="background-shapes">
    {#if isVisible}
      <div class="shape shape-1" in:fade={{ duration: 1000, delay: 200 }}></div>
      <div class="shape shape-2" in:fade={{ duration: 1000, delay: 400 }}></div>
      <div class="shape shape-3" in:fade={{ duration: 1000, delay: 600 }}></div>
      <div class="shape shape-4" in:fade={{ duration: 1000, delay: 800 }}></div>
      <div class="shape shape-5" in:fade={{ duration: 1000, delay: 1000 }}></div>
      <div class="shape shape-6" in:fade={{ duration: 1000, delay: 1200 }}></div>
    {/if}
  </div>
  
  {#if isVisible}
    <div class="container">
      <h2 in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>
        Powered by
      </h2>
      
      <div class="logo-container" in:fly={{ y: 30, duration: 800, delay: 300, easing: quintOut }}>
        <a href="https://lagoon.finance/" target="_blank" rel="noopener noreferrer" class="logo-link">
          <img src="/logo_lagoon_white.png" alt="Lagoon Logo" class="lagoon-logo" />
        </a>
      </div>

      <div class="intro-text" id="lagoon" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
        <p>Built on Safe and powered by Lagoon Finance, our vault management system ensures robust security and transparency while maintaining full adaptability.</p>
      </div>

      <div class="cards-container" in:fly={{ y: 30, duration: 800, delay: 500, easing: quintOut }}>
        <div class="security-card">
          <h3>Lagoon's Modular Architecture</h3>
          <p>Our modular architecture enables flexible strategy creation while maintaining rigorous security standards. Each component is meticulously audited, ensuring a perfect balance between adaptability and safety.</p>
        </div>

        <div class="security-card">
          <h3>SAFE's Multi-Signature Security</h3>
          <p>Enhanced vault protection through SAFE's battle-tested multi-signature system. Multiple authorized signatures are required for any operation, preventing unauthorized access and ensuring collective control.</p>
        </div>

        <div class="security-card">
          <h3>Fully Decentralized Infrastructure</h3>
          <p>Built on decentralized protocols to eliminate single points of failure. This architecture guarantees true asset ownership and complete operational transparency, reinforcing the security of your investments.</p>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .lagoon-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: clamp(4rem, 10vh, 8rem) 0;
    text-align: center;
    overflow: visible;
    scroll-margin-top: 100px;
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
    margin-bottom: 2rem;
    color: #fff;
    text-align: center;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    margin: 2rem auto 3rem;
    max-width: 800px;
  }

  .logo-link {
    display: inline-block;
    transition: all 0.3s ease;
  }

  .logo-link:hover .lagoon-logo {
    filter: brightness(1.2) drop-shadow(0 0 15px rgba(77, 168, 255, 0.6));
    transform: translateY(-2px);
  }

  .lagoon-logo {
    height: 50px;
    width: auto;
    object-fit: contain;
    transition: all 0.3s ease;
  }

  .intro-text h3 {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    color: #4DA8FF;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .intro-text {
    max-width: 800px;
    margin: 0 auto 3rem;
    text-align: center;
  }

  .intro-text p {
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    line-height: 1.6;
    color: #B4C6EF;
    max-width: 800px;
    margin: 0 auto;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .security-card {
    background: rgba(13, 25, 42, 0.5);
    border-radius: 24px;
    padding: 2.5rem;
    border: 1px solid rgba(77, 168, 255, 0.1);
    transition: all 0.3s ease;
  }

  .security-card:hover {
    transform: translateY(-5px);
    background: rgba(20, 35, 60, 0.6);
    border-color: rgba(77, 168, 255, 0.3);
    box-shadow: 0 10px 30px rgba(77, 168, 255, 0.1);
  }

  .security-card h3 {
    font-size: 1.25rem;
    color: #fff;
    margin-bottom: 1rem;
  }

  .security-card p {
    color: #B4C6EF;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .cards-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .cards-container {
      grid-template-columns: 1fr;
    }

    .container {
      padding: 0 clamp(1rem, 5vw, 2rem);
    }

    .security-card {
      padding: 2rem;
    }

    .lagoon-logo {
      height: 35px;
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
    width: 120px;
    height: 120px;
    top: 15%;
    left: 25%;
    animation: floatLagoon1 31s infinite ease-in-out;
  }

  .shape-2 {
    width: 100px;
    height: 100px;
    top: 60%;
    left: 15%;
    animation: floatLagoon2 28s infinite ease-in-out;
  }

  .shape-3 {
    width: 90px;
    height: 90px;
    top: 25%;
    right: 18%;
    animation: floatLagoon3 33s infinite ease-in-out;
  }

  .shape-4 {
    width: 110px;
    height: 110px;
    top: 65%;
    right: 25%;
    animation: floatLagoon4 29s infinite ease-in-out;
  }

  .shape-5 {
    width: 95px;
    height: 95px;
    top: 45%;
    left: 55%;
    animation: floatLagoon5 32s infinite ease-in-out;
  }

  .shape-6 {
    width: 105px;
    height: 105px;
    top: 35%;
    right: 45%;
    animation: floatLagoon6 30s infinite ease-in-out;
  }

  @keyframes floatLagoon1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(25deg) rotateY(25deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-25deg) rotateY(205deg) translate(12px, 12px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatLagoon2 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(30deg) rotateX(30deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(-30deg) rotateX(-30deg) translate(-10px, 10px) scale(1.08);
      opacity: 0.18;
    }
  }

  @keyframes floatLagoon3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(40deg) rotateZ(20deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(-40deg) rotateZ(110deg) translate(10px, -10px) scale(1.12);
      opacity: 0.22;
    }
  }

  @keyframes floatLagoon4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(35deg) rotateY(35deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateX(-35deg) rotateY(-35deg) translate(-12px, 8px) scale(1.1);
      opacity: 0.2;
    }
  }

  @keyframes floatLagoon5 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(20deg) rotateX(20deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateZ(200deg) rotateX(-20deg) translate(8px, -8px) scale(1.15);
      opacity: 0.18;
    }
  }

  @keyframes floatLagoon6 {
    0%, 100% {
      transform: perspective(1000px) rotateY(30deg) rotateZ(30deg) translate(0, 0) scale(1);
      opacity: 0.12;
    }
    50% {
      transform: perspective(1000px) rotateY(210deg) rotateZ(-30deg) translate(-8px, 12px) scale(1.1);
      opacity: 0.2;
    }
  }

  #lagoon {
    scroll-margin-top: 120px;
  }
</style> 