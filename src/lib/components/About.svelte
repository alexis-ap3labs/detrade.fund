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
          }, 300);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    const section = document.querySelector('.about-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section class="about-section" id="about">
  <div class="background-shapes">
    {#if isVisible}
      <div class="shape shape-1" in:fade={{ duration: 1000, delay: 200 }}></div>
      <div class="shape shape-2" in:fade={{ duration: 1000, delay: 400 }}></div>
      <div class="shape shape-3" in:fade={{ duration: 1000, delay: 600 }}></div>
      <div class="shape shape-4" in:fade={{ duration: 1000, delay: 800 }}></div>
      <div class="shape shape-5" in:fade={{ duration: 1000, delay: 1000 }}></div>
      <div class="shape shape-6" in:fade={{ duration: 1000, delay: 1200 }}></div>
      <div class="shape shape-7" in:fade={{ duration: 1000, delay: 1400 }}></div>
      <div class="shape shape-8" in:fade={{ duration: 1000, delay: 1600 }}></div>
    {/if}
  </div>

  {#if isVisible}
    <div class="container">
      <div class="text-center mb-12">
        <h2 in:fly={{ y: 30, duration: 800, delay: 200, easing: quintOut }}>About Us</h2>
        
        <div class="main-text" in:fly={{ y: 30, duration: 800, delay: 400, easing: quintOut }}>
          <p>
            DeTrade Fund has been active in DeFi since 2020, deploying capital across major protocols through risk-aware, adaptive strategies. We provide tailored DeFi solutions to meet the specific needs of our diverse client base.
          </p>
        </div>
      </div>

      <div class="services-box" in:fly={{ y: 30, duration: 800, delay: 600, easing: quintOut }}>
        <div class="target-segments">
          <div class="segment-card" in:fade={{ duration: 400, delay: 200 }}>
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Sophisticated Investors</h4>
            <p>Experienced investors seeking professional DeFi exposure and optimized returns through carefully managed strategies.</p>
          </div>

          <div class="segment-card" in:fade={{ duration: 400, delay: 300 }}>
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.93 4.93L9.17 9.17" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.83 14.83L19.07 19.07" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.83 9.17L19.07 4.93" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.83 9.17L18.36 5.64" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.93 19.07L9.17 14.83" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>DAOs & Crypto Projects</h4>
            <p>Organizations looking to put their treasury to work with sustainable yield generation while maintaining security and flexibility.</p>
          </div>

          <div class="segment-card" in:fade={{ duration: 400, delay: 400 }}>
            <div class="icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 7H21" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 21V7L8 3H16L19 7V21" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 21V15H15V21" stroke="#4DA8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h4>Asset Managers & VASPs</h4>
            <p>Financial service providers looking to offer DeFi yields to their clients through a professional and secure setup.</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  .about-section {
    position: relative;
    min-height: 100vh;
    padding: clamp(4rem, 8vh, 6rem) 0;
    text-align: center;
  }

  .container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 0 clamp(2.5rem, 10vw, 5rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    color: #fff;
    margin-bottom: 3rem;
    text-align: center;
  }

  .main-text {
    max-width: 800px;
    margin: 0 auto 3rem;
    font-size: clamp(1.1rem, 2vw, 1.25rem);
    line-height: 1.7;
    color: #B4C6EF;
  }

  .main-text p {
    margin-bottom: 1.5rem;
  }

  .services-box {
    max-width: 1100px;
    margin: 0 auto 3rem;
  }

  .target-segments {
    display: flex;
    gap: 2rem;
    justify-content: center;
  }

  .segment-card {
    flex: 1;
    max-width: 340px;
    background: rgba(13, 25, 42, 0.6);
    border-radius: 24px;
    padding: 2rem;
    border: 1px solid rgba(77, 168, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .segment-card:hover {
    transform: translateY(-5px);
    background: rgba(20, 35, 60, 0.7);
    border-color: rgba(77, 168, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .icon-wrapper {
    margin-bottom: 1.25rem;
    text-align: center;
  }

  .segment-card h4 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
  }

  .segment-card p {
    color: #B4C6EF;
    line-height: 1.5;
    font-size: 0.95rem;
    text-align: center;
  }

  @media (max-width: 1024px) {
    .target-segments {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .segment-card {
      width: 100%;
      max-width: 500px;
    }
  }

  @media (max-width: 768px) {
    .services-box {
      margin: 0 1rem 2rem;
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
    opacity: 0.15;
    background: linear-gradient(135deg, rgba(77, 168, 255, 0.4), transparent);
    border: 1px solid rgba(77, 168, 255, 0.3);
    backdrop-filter: blur(4px);
    transform-style: preserve-3d;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .shape-1 {
    width: 140px;
    height: 140px;
    top: 25%;
    left: 12%;
    animation: floatAbout1 30s infinite ease-in-out;
  }

  .shape-2 {
    width: 100px;
    height: 100px;
    top: 65%;
    left: 28%;
    animation: floatAbout2 25s infinite ease-in-out;
  }

  .shape-3 {
    width: 120px;
    height: 120px;
    top: 15%;
    right: 32%;
    animation: floatAbout3 28s infinite ease-in-out;
  }

  .shape-4 {
    width: 130px;
    height: 130px;
    top: 75%;
    right: 18%;
    animation: floatAbout4 32s infinite ease-in-out;
  }

  .shape-5 {
    width: 90px;
    height: 90px;
    top: 45%;
    left: 72%;
    animation: floatAbout5 27s infinite ease-in-out;
  }

  .shape-6 {
    width: 110px;
    height: 110px;
    top: 35%;
    right: 65%;
    animation: floatAbout6 29s infinite ease-in-out;
  }

  .shape-7 {
    width: 95px;
    height: 95px;
    top: 55%;
    right: 45%;
    animation: floatAbout7 26s infinite ease-in-out;
  }

  .shape-8 {
    width: 115px;
    height: 115px;
    top: 20%;
    left: 45%;
    animation: floatAbout8 31s infinite ease-in-out;
  }

  @keyframes floatAbout1 {
    0%, 100% {
      transform: perspective(1000px) rotateX(30deg) rotateY(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(-30deg) rotateY(180deg) translate(20px, 20px) scale(1.1);
      opacity: 0.25;
    }
  }

  @keyframes floatAbout2 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(45deg) rotateX(45deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateZ(-45deg) rotateX(-45deg) translate(-15px, 15px) scale(1.05);
      opacity: 0.2;
    }
  }

  @keyframes floatAbout3 {
    0%, 100% {
      transform: perspective(1000px) rotateY(60deg) rotateZ(0deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateY(-60deg) rotateZ(90deg) translate(15px, -15px) scale(1.15);
      opacity: 0.3;
    }
  }

  @keyframes floatAbout4 {
    0%, 100% {
      transform: perspective(1000px) rotateX(45deg) rotateY(45deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(-45deg) rotateY(-45deg) translate(-20px, 10px) scale(1.08);
      opacity: 0.25;
    }
  }

  @keyframes floatAbout5 {
    0%, 100% {
      transform: perspective(1000px) rotateZ(30deg) rotateX(30deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateZ(210deg) rotateX(-30deg) translate(10px, -10px) scale(1.12);
      opacity: 0.2;
    }
  }

  @keyframes floatAbout6 {
    0%, 100% {
      transform: perspective(1000px) rotateY(45deg) rotateZ(45deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateY(225deg) rotateZ(-45deg) translate(-15px, 15px) scale(1.1);
      opacity: 0.25;
    }
  }

  @keyframes floatAbout7 {
    0%, 100% {
      transform: perspective(1000px) rotateX(25deg) rotateZ(35deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateX(-25deg) rotateZ(215deg) translate(12px, -12px) scale(1.08);
      opacity: 0.2;
    }
  }

  @keyframes floatAbout8 {
    0%, 100% {
      transform: perspective(1000px) rotateY(40deg) rotateX(40deg) translate(0, 0) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: perspective(1000px) rotateY(-40deg) rotateX(-40deg) translate(-15px, 15px) scale(1.1);
      opacity: 0.25;
    }
  }
</style> 