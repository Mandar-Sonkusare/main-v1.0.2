// ===============================
// Smooth Scrolling
// ===============================
let lenis;
const initSmoothScrolling = () => {
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on("scroll", () => ScrollTrigger.update());

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

// ===============================
// Dark Mode Handler
// ===============================
const DarkMode = {
  init() {
    this.elements = {
      darkIcon: document.getElementById("theme-toggle-dark-icon"),
      lightIcon: document.getElementById("theme-toggle-light-icon"),
      toggleBtn: document.getElementById("theme-toggle"),
    };

    this.setInitialTheme();
    this.bindEvents();
  },

  setInitialTheme() {
    const isDark =
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      this.elements.lightIcon?.classList.remove("hidden");
      document.documentElement?.classList.add("dark");
    } else {
      this.elements.darkIcon?.classList.remove("hidden");
      document.documentElement?.classList.remove("dark");
    }
  },

  bindEvents() {
    if (this.elements.toggleBtn) {
      this.elements.toggleBtn.addEventListener("click", () =>
        this.toggleTheme()
      );
    }
  },

  toggleTheme() {
    this.elements.darkIcon.classList.toggle("hidden");
    this.elements.lightIcon.classList.toggle("hidden");

    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("color-theme", isDark ? "dark" : "light");
  },
};

// ===============================
// Animations
// ===============================
const Animations = {
  initHeroGradient() {
    const wrapper = document.getElementById("hero-gradient-wrapper");
    const bg = document.getElementById("hero-gradient");

    gsap
      .to(wrapper, {
        scale: 0.6,
        repeat: -1,
        duration: 3,
        yoyo: true,
        ease: Linear.easeNone,
      })
      .play();

    gsap
      .to(bg, {
        repeat: -1,
        duration: 3,
        rotation: 360,
        ease: Linear.easeNone,
      })
      .play();
  },

  initPointerAnimation() {
    const pointer = document.querySelector(".pointer");

    if (window.innerWidth >= 1023) {
      ["mousemove", "mouseenter"].forEach((eventType) => {
        document.addEventListener(eventType, (e) => {
          gsap.to(pointer, {
            duration: 0.8,
            left: e.clientX,
            top: e.clientY,
            ease: "expo.out",
          });
        });
      });
    }
  },

  initTextReveal() {
    const splitTypes = document.querySelectorAll(".reveal-text");
    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: "chars" });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: "top 34%",
          end: "top -10%",
          scrub: true,
          pin: ".about",
          pinSpacing: true,
        },
        opacity: 0.1,
        stagger: 5,

        ease: "back.out",
      });
    });
  },

  initTextReveal2() {
    const splitTypes = document.querySelectorAll(".reveal-text-2");
    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: "chars" });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0.1,
        stagger: 5,
        ease: "back.out",
      });
    });
  },

  initHorizontalScroll() {
    const services = document.querySelector(".service-wrapper");
    if (!services) return;

    const getScrollAmount = () => {
      const servicesWidth = services.scrollWidth;
      return -(servicesWidth - window.innerWidth);
    };

    const hrsAnimation = gsap.to(services, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: ".service-section",
      start: "top 0%",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: hrsAnimation,
      scrub: 1,
      invalidateOnRefresh: true,
    });
  },

  initCtaImageReveal() {
    const ctaImage = document.getElementById("cta-img");
    if (!ctaImage) {
      return;
    }
    gsap.from(ctaImage, {
      scale: 0,
      rotation: -45,
      duration: 2.1,
      ease: "elastic.out(1.4, 1.2)",
      scrollTrigger: {
        trigger: ctaImage,
        start: "top 70%",
        end: "top 30%",
        scrub: false,
      },
    });
  },

  initImageHorizontalScroll() {
    const imageContainer = document.getElementById(
      "extra-large-image-container"
    );

    if (!imageContainer) {
      return;
    }

    ScrollTrigger.addEventListener("refreshInit", () => {});

    gsap.to(imageContainer, {
      x: () =>
        -(imageContainer.scrollWidth - document.documentElement.clientWidth),
      ease: "none",
      pin: true,
      scrollTrigger: {
        trigger: imageContainer,
        pin: false,
        start: "top 90%",
        end: () =>
          `+=${
            imageContainer.scrollWidth - document.documentElement.clientWidth
          }`,
        scrub: 1,
        invalidateOnRefresh: false,
        anticipatePin: 1,
      },
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  },

  initSectionTitles() {
    const titles = document.querySelectorAll(".text-appear");
    titles.forEach((title) => {
      const titleText = new SplitType(title, { types: "lines" });
      titleText.lines.forEach((lines) => {
        const lineText = new SplitType(lines, { types: "words" });
        gsap.from(lineText.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 50%",
            end: "top 30%",
            scrub: false,
          },
          y: 120,
          rotation: 21,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    });
  },

  initSectionTitles2() {
    const titles = document.querySelectorAll(".text-appear-2");
    titles.forEach((title) => {
      const titleText = new SplitType(title, { types: "lines" });
      titleText.lines.forEach((lines) => {
        const lineText = new SplitType(lines, { types: "words" });
        gsap.from(lineText.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            end: "top 30%",
            scrub: false,
          },
          y: 120,
          rotation: 21,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    });
  },

  initRevealElements() {
    const elements = document.querySelectorAll(".reveal-me");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 90%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 95,
        rotation: 2,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  },

  initZoomAnimation() {
    const zoomElem = document.querySelectorAll(".zoom-image");
    gsap.to(zoomElem, {
      scale: 3.2,
      ease: "expoScale",
      scrollTrigger: {
        trigger: zoomElem,
        start: "top 20%",
        end: "top -30%",
        pin: true,
        scrub: 1,
      },
    });
  },

  initVideoAnimation() {
    const videoElem = document.querySelectorAll(".video-wrapper");
    gsap.to(videoElem, {
      scale: 1,
      scrollTrigger: {
        trigger: ".video-section",
        start: "top 80%",
        end: "top 0%",
        scrub: 1,
      },
    });
  },
  initScaleSmallAnimation() {
    const bigToSmallImg = document.querySelectorAll(".scale-small-img");

    gsap.to(bigToSmallImg, {
      scale: 0.8,
      scrollTrigger: {
        trigger: bigToSmallImg,
        start: "top 50%",
        end: "top 0%",
        scrub: 1,
        ease: "power4.inOut",
      },
    });
  },
  initScaleSmallAnimation2() {
    const bigToSmallImg = document.querySelectorAll(".scale-hero-img");

    gsap.to(bigToSmallImg, {
      scale: 0.94,
      duration: 0.8,
      scrollTrigger: {
        trigger: bigToSmallImg,
        start: "top 7%",
        end: "top 0%",
        scrub: 1,
        ease: "power4.inOut",
      },
    });
  },
};

// ===============================
// Components
// ===============================
const Components = {
  initCircleText(selector = ".text", angleStep = 10.3) {
    const text = document.querySelector(selector);
    if (!text) return;

    const rotateChar = (char, i) =>
      `<span style="transform:rotate(${i * angleStep}deg)">${char}</span>`;

    requestAnimationFrame(() => {
      text.innerHTML = Array.from(text.textContent.trim())
        .map(rotateChar)
        .join("");
    });
  },

  initScrollingMarquee() {
    const marqueeInner = document.querySelector(".marquee-inner");
    let currentScroll = 0;
    let isScrollingDown = true;

    if (!marqueeInner) return;

    const originalContent = marqueeInner.innerHTML;

    marqueeInner.innerHTML =
      originalContent + originalContent + originalContent;

    const contentWidth = marqueeInner.offsetWidth / 3;

    const animation = gsap.to(".marquee-inner", {
      x: -contentWidth * 2,
      duration: 30,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(".marquee-inner", { x: -contentWidth });
      },
    });

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = window.requestAnimationFrame(() => {
        const newScroll = window.pageYOffset;
        if (Math.abs(newScroll - currentScroll) > 1) {
          animation.timeScale(newScroll > currentScroll ? 1 : -1);
          currentScroll = newScroll;
        }
      });
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }

      resizeTimeout = window.requestAnimationFrame(() => {
        const newContentWidth = marqueeInner.offsetWidth / 3;

        animation.vars.x = -newContentWidth * 2;
        gsap.set(".marquee-inner", { x: -newContentWidth });
        animation.invalidate().restart();
      });
    });
  },

  initFAQ() {
    const items = document.querySelectorAll(".accordion-item");
    const itemsV4 = document.querySelectorAll(".accordion-itemV4");
    const itemsV5 = document.querySelectorAll(".accordion-itemV5");

    // Regular FAQ
    const closeAll = () => {
      items.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const body = item.querySelector(".accordion-body");
        header.classList.remove("open", "active");
        body.style.height = "0";
        item.style.borderColor = "transparent";
        item.style.paddingBottom = "0";
      });
    };

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const isOpen = header.classList.contains("open");
        closeAll();
        if (!isOpen) {
          header.classList.add("open", "active");
          const body = item.querySelector(".accordion-body");
          body.style.height = `${body.scrollHeight}px`;
          item.style.border = "1px solid black";
          item.style.paddingBottom = "40px";
        }
      });
    });

    // FAQ V4
    const removeOpen = (activeIndex) => {
      itemsV4.forEach((item, index) => {
        if (index !== activeIndex) {
          const header = item.querySelector(".accordion-headerV4");
          const body = item.querySelector(".accordion-bodyV4");
          header.classList.remove("open", "active");
          body.style.height = "0";
          body.style.marginBottom = "0";
          item.setAttribute("data-active", "false");
        }
      });
    };

    itemsV4.forEach((item, index) => {
      const header = item.querySelector(".accordion-headerV4");
      const body = item.querySelector(".accordion-bodyV4");

      item.setAttribute("data-active", "false");

      header.addEventListener("click", () => {
        const isOpen = header.classList.toggle("open");
        removeOpen(index);

        if (isOpen) {
          body.style.height = `${body.scrollHeight}px`;
          header.classList.add("active");
          item.setAttribute("data-active", "true");
          body.style.marginBottom = "20px";
        } else {
          body.style.height = "0";
          header.classList.remove("active");
          item.setAttribute("data-active", "false");
          body.style.marginBottom = "0";
        }
      });
    });

    // Faq V5

    // Regular FAQ
    const closeAll2 = () => {
      itemsV5.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const body = item.querySelector(".accordion-body");
        header.classList.remove("open", "active");
        body.style.height = "0";
        item.style.paddingBottom = "0";
      });
    };

    itemsV5.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const isOpen = header.classList.contains("open");
        closeAll2();
        if (!isOpen) {
          header.classList.add("open", "active");
          const body = item.querySelector(".accordion-body");
          body.style.height = `${body.scrollHeight}px`;

          item.style.paddingBottom = "40px";
        }
      });
    });
  },

  initCounter() {
    const section = document.querySelector("#counter");
    if (!section) return;

    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        counters.forEach((counter, index) => {
          const updateCounter = () => {
            const maxValue = +counter.getAttribute("data-value");
            const currentCount = +counter.innerText || 0;
            const increment = Math.ceil(maxValue / 100);

            if (currentCount < maxValue) {
              counter.innerText = Math.min(currentCount + increment, maxValue);
              setTimeout(updateCounter, 20);
            }
          };

          counter.innerText = "0";
          updateCounter();

          const parent = counter.parentElement;
          parent.style.opacity = "0";
          parent.style.transform = "translateY(20px)";

          setTimeout(() => {
            parent.style.transition = "all 0.7s ease";
            parent.style.opacity = "1";
            parent.style.transform = "translateY(0)";
          }, index * 200);
        });

        observer.unobserve(section);
      },
      { threshold: 0.17 }
    );

    observer.observe(section);
  },

  initTeam() {
    const tabMembers = document.querySelectorAll(".tab-member");
    const teamDetails = document.querySelector(".our-team-details");
    let isAnimating = false;

    function updateTeamMember(selectedTab) {
      if (isAnimating) return;
      isAnimating = true;

      teamDetails.classList.add("transitioning");

      setTimeout(() => {
        const newTitle = selectedTab.querySelector("h3").textContent;
        const newRole = selectedTab.querySelector("p").textContent;
        const newImage = selectedTab.querySelector("img").src;

        teamDetails.querySelector("h2").textContent = newTitle;
        teamDetails.querySelector("p").textContent = newRole;
        teamDetails.querySelector("img").src = newImage;

        // Force browser reflow
        void teamDetails.offsetWidth;

        teamDetails.classList.remove("transitioning");

        setTimeout(() => {
          isAnimating = false;
        }, 400);
      }, 300);
    }

    tabMembers.forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("tab-active") || isAnimating) return;

        // Remove active class from current active tab
        document.querySelector(".tab-active")?.classList.remove("tab-active");

        tab.classList.add("tab-active");

        updateTeamMember(tab);
      });
    });
  },
};

// ===============================
// Menu Handler
// ===============================
const MenuHandler = {
  init() {
    this.elements = {
      menu: document.querySelector(".menu"),
      overflow: document.querySelector(".menu-overflow"),
      items: document.querySelectorAll(".menu-list"),
      anchors: document.querySelectorAll(".menu-list-item"),
      dropdownAnchors: document.querySelectorAll(".menu-list-item-anchor"),
      openBtn: document.querySelector(".menu-open"),
      closeBtn: document.querySelector(".menu-close"),
    };

    // Create a smoother timeline with custom ease
    this.timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "custom",
        duration: 0.8,
      },
    });

    // Define custom ease for smoother animation
    gsap.registerEase("custom", function (progress) {
      return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    });

    this.setupInitialState();
    this.createTimeline();
    this.bindEvents();
  },

  setupInitialState() {
    // Enhanced initial state with more subtle transforms
    gsap.set(this.elements.menu, {
      pointerEvents: "none",
      autoAlpha: 0,
    });
    gsap.set(this.elements.overflow, {
      pointerEvents: "none",
      autoAlpha: 0,
      y: -30,
      rotate: -1,
      scale: 0.98,
    });
    gsap.set(this.elements.items, {
      autoAlpha: 0,
      y: -10,
      scale: 0.95,
    });
    gsap.set(this.elements.closeBtn, {
      autoAlpha: 0,
      y: -10,
      scale: 0.95,
    });
  },

  createTimeline() {
    // Smoother timeline with overlapping animations
    this.timeline
      // Background fade in
      .to(
        this.elements.menu,
        {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )

      // Overflow container animation
      .to(
        this.elements.overflow,
        {
          autoAlpha: 1,
          pointerEvents: "auto",
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.6,
          ease: "custom",
        },
        0.1
      )

      // Menu items stagger with smoother timing
      .to(
        this.elements.items,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: {
            amount: 0.4,
            ease: "power2.out",
          },
          duration: 0.7,
          ease: "custom",
        },
        0.2
      )

      // Close button fade in
      .to(
        this.elements.closeBtn,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.3
      )
      // Open button animation
      .to(
        this.elements.openBtn,
        {
          autoAlpha: 0,
          y: -10,
          scale: 0.95,
          duration: 0.5,
          delay: 0.3,
          ease: "back.out(1.7)",
        },
        0.1
      )

      // Body state
      .to(
        "body",
        {
          overflow: "hidden",
          pointerEvents: "none",
          duration: 0.1,
        },
        0
      );
  },

  bindEvents() {
    if (this.elements.openBtn) {
      this.elements.openBtn.addEventListener("click", () => this.open());
    }

    if (this.elements.closeBtn) {
      this.elements.closeBtn.addEventListener("click", () => this.close());
    }

    this.elements.dropdownAnchors.forEach((elem) => {
      elem.addEventListener("click", () => this.handleDropdownClick(elem));
    });
  },

  handleDropdownClick(clickedElem) {
    if (window.screen.width > 768) {
      this.elements.dropdownAnchors.forEach((elem) => {
        elem.classList.remove("active");
      });
      clickedElem.classList.add("active");
    } else {
      clickedElem.classList.toggle("active");
    }
  },

  open() {
    // Add subtle scale to the opening animation
    gsap.set(this.elements.overflow, { scale: 0.98 });
    this.elements.openBtn.classList.add("opacity-0");
    this.timeline.timeScale(1).play();
    this.elements.menu.style.pointerEvents = "auto";
  },

  close() {
    // Faster close animation
    this.elements.openBtn.classList.remove("opacity-1");
    gsap.to(this.elements.openBtn, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    this.timeline.timeScale(1.2).reverse();
    this.elements.menu.style.pointerEvents = "none";
  },
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core functionality
  initSmoothScrolling();
  DarkMode.init();
  MenuHandler.init();

  // Initialize components
  Components.initCircleText();

  Components.initScrollingMarquee();
  Components.initFAQ();
  Components.initCounter();
  Components.initTeam();

  // Initialize animations
  Animations.initHeroGradient();
  Animations.initPointerAnimation();
  Animations.initTextReveal();
  Animations.initTextReveal2();
  Animations.initHorizontalScroll();
  Animations.initImageHorizontalScroll();
  Animations.initCtaImageReveal();
  Animations.initSectionTitles();
  Animations.initSectionTitles2();
  Animations.initRevealElements();
  Animations.initZoomAnimation();
  Animations.initVideoAnimation();
  Animations.initScaleSmallAnimation();
  Animations.initScaleSmallAnimation2();

  // Initialize sliders
  initializeSliders();
});

// Initialize sliders separately for better organization
function initializeSliders() {
  // Main Swiper
  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    allowTouchMove: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });

  // User Review slide----------
  new Swiper(".user-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 4,
    speed: 1500,
    allowTouchMove: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Toggle Pricing---------------
const toggle = document.getElementById("toggle");
const monthlyOption = document.getElementById("monthlyOption");
const yearlyOption = document.getElementById("yearlyOption");
let isYearly = false;

const monthlyCharge = document.getElementById("monthlyCharge");
const yearlyCharge = document.getElementById("yearlyCharge");

if (toggle) {
  monthlyOption.classList.add("active");

  toggle.addEventListener("click", () => {
    isYearly = !isYearly;

    toggle.classList.toggle("yearly");
    monthlyOption.classList.toggle("active");
    yearlyOption.classList.toggle("active");
    if (isYearly) {
      monthlyCharge.style.display = "none";
      yearlyCharge.style.display = "block";
    } else {
      monthlyCharge.style.display = "block";
      yearlyCharge.style.display = "none";
    }
  });
}

const skewMarquee = document.getElementById("skew-Marquee");
if (skewMarquee) {
  gsap.from(skewMarquee, {
    scrollTrigger: {
      trigger: skewMarquee,
      start: "top 80%",
      end: "top 50%",
      scrub: false,
    },
    y: 200,
    skewX: "0deg",
    skewY: "0deg",
    rotation: 0,
    duration: 3,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const ctaInlineSlider = document.querySelector(".cta-inline-slider");
  let currentSlide = 0;
  const totalSlides = 3;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    if (ctaInlineSlider) {
      ctaInlineSlider.style.transform = `translateY(-${currentSlide * 100}px)`;
    }
  }

  // Start autoplay
  setInterval(nextSlide, 3000);
});

const myElement = document.getElementById("header");
if (myElement) {
  const headroom = new Headroom(myElement);
  headroom.init();
}

// Marquee Code------------------
new InfiniteMarquee({
  element: ".marquee-container",
  speed: 120000,
  smoothEdges: true,
  direction: "left",
  pauseOnHover: true,
  gap: "30px",
  duplicateCount: 1,
  mobileSettings: {
    direction: "top",
    speed: 150000,
  },
  on: {
    beforeInit: () => {
      console.log("Not Yet Initialized");
    },

    afterInit: () => {
      console.log("Initialized");
    },
  },
});

new InfiniteMarquee({
  element: ".marquee-reverse-container",
  speed: 120000,
  smoothEdges: true,
  direction: "right",
  pauseOnHover: true,
  gap: "30px",
  duplicateCount: 1,
  mobileSettings: {
    direction: "right",
    speed: 150000,
  },
  on: {
    beforeInit: () => {
      console.log("Not Yet Initialized");
    },

    afterInit: () => {
      console.log("Initialized");
    },
  },
});

// Details Tabile List smoother Animations
document.querySelectorAll(".lenis-scroll-to").forEach((ele) =>
  ele.addEventListener("click", () => {
    lenis.scrollTo(ele.getAttribute("href"), {
      offset: -100,
    });
  })
);
