/* ==========================================================================
   CONFIGURACIÓN DEL EVENTO - PAOLA 30 | BIRTHDAY RODEO
   ========================================================================== */

const EVENT_DATE = "2026-12-19T17:00:00-06:00"; // 19 dic 2026, 5:00 PM (CDMX)

const WHATSAPP_NUMBER = "525580331525";

// Enlace del formulario de Google Form para confirmar asistencia
const GOOGLE_FORM_URL = "https://forms.gle/8AmGXGLFbHqNo5es7";

const PINTEREST_URL = "https://mx.pinterest.com/ameliacarrill0/rodeo-outfits/";

// Reemplazar aquí con el enlace específico de la lista de deseos de Amazon
const AMAZON_URL = "https://www.amazon.com.mx/registries/gl/guest-view/AOIQJ701P7WD?ref_=cm_sw_r_apin_ggr-subnav-share_DB967QNS7KSRQVJX6TWQ&language=en-US";

const MAPS_URL = "https://maps.app.goo.gl/z4UugPik5CNo77EY8";

const PARKING_MAPS_URL = "https://maps.app.goo.gl/Fa35y3gHokJYugLe7?g_st=iw";

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/1v5fmalPAGNzy60RCWwAXG?si=SyHL1kC3T2Kkihm4geFSfg&utm_source=whatsapp&pi=mpF2IsrtT5u-0";

const CLABE = "638180000128147580";

const BANK_NAME = "Nubank";

const BENEFICIARY = "ANDREA PAOLA PALACIO RIVERA";

const CASH_DEPOSIT_CODE = "5101 2585 1059 7225";

const WHATSAPP_DEFAULT_MSG = "Hola Paola 🤠💕 Ya confirmé mi asistencia a tu cumpleaños. ¡Nos vemos en el Birthday Rodeo!";


/* ==========================================================================
   INICIALIZACIÓN AL CARGAR EL DOCUMENTO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupDynamicLinksAndData();
  setupEnvelopeOpening();
  setupAudioPlayer();
  setupCountdown();
  setupCopyClabe();
  setupCalendarButton();
  setupScrollEffects();
  setupMobileMenu();
});


/* ==========================================================================
   1. CONFIGURACIÓN DE DATOS DINÁMICOS Y ENLACES EXTERNOS
   ========================================================================== */
function setupDynamicLinksAndData() {
  // CLABE, Banco y Beneficiaria
  const clabeEl = document.getElementById("clabe-display");
  if (clabeEl) clabeEl.textContent = CLABE;

  const bankEl = document.getElementById("bank-name-display");
  if (bankEl && BANK_NAME !== "REEMPLAZAR_AQUI") {
    bankEl.textContent = BANK_NAME;
  }

  const beneficiaryEl = document.getElementById("beneficiary-display");
  if (beneficiaryEl) {
    beneficiaryEl.textContent = BENEFICIARY;
  }

  const cashCodeEl = document.getElementById("cash-code-display");
  if (cashCodeEl) {
    cashCodeEl.textContent = CASH_DEPOSIT_CODE;
  }

  // Botón Spotify Playlist
  const spotifyBtn = document.getElementById("btn-spotify");
  if (spotifyBtn) {
    spotifyBtn.href = SPOTIFY_PLAYLIST_URL;
    spotifyBtn.target = "_blank";
    spotifyBtn.rel = "noopener noreferrer";
  }

  // Botón Pinterest
  const pinterestBtn = document.getElementById("btn-pinterest");
  if (pinterestBtn) {
    pinterestBtn.href = PINTEREST_URL;
    pinterestBtn.target = "_blank";
    pinterestBtn.rel = "noopener noreferrer";
  }

  // Botón Google Maps
  const mapsBtn = document.getElementById("btn-maps");
  if (mapsBtn) {
    mapsBtn.href = MAPS_URL;
    mapsBtn.target = "_blank";
    mapsBtn.rel = "noopener noreferrer";
  }

  // Botón Google Maps Estacionamiento / Pensión
  const parkingMapsBtn = document.getElementById("btn-parking-maps");
  if (parkingMapsBtn) {
    parkingMapsBtn.href = PARKING_MAPS_URL;
    parkingMapsBtn.target = "_blank";
    parkingMapsBtn.rel = "noopener noreferrer";
  }

  // Botón Amazon
  const amazonBtn = document.getElementById("btn-amazon");
  if (amazonBtn) {
    amazonBtn.href = AMAZON_URL;
    amazonBtn.target = "_blank";
    amazonBtn.rel = "noopener noreferrer";
  }

  // Botón Google Form RSVP
  const formBtn = document.getElementById("btn-google-form");
  if (formBtn) {
    if (GOOGLE_FORM_URL && GOOGLE_FORM_URL.startsWith("http")) {
      formBtn.href = GOOGLE_FORM_URL;
      formBtn.target = "_blank";
      formBtn.rel = "noopener noreferrer";
    }
  }

  // Botón WhatsApp
  const whatsappBtn = document.getElementById("btn-whatsapp");
  if (whatsappBtn) {
    const encodedMsg = encodeURIComponent(WHATSAPP_DEFAULT_MSG);
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener noreferrer";
  }
}


/* ==========================================================================
   2. APERTURA DEL SOBRE INTERACTIVO
   ========================================================================== */
function setupEnvelopeOpening() {
  const sealBtn = document.getElementById("seal");
  const promptBtn = document.getElementById("btn-open-prompt");
  const envelopeStage = document.getElementById("envelope-stage");
  const envelopeScreen = document.getElementById("envelope-screen");
  const invitationContent = document.getElementById("invitation-content");
  const audioControl = document.getElementById("audio-control");
  const mainNav = document.getElementById("main-nav");

  let isOpening = false;

  const handleOpen = () => {
    if (isOpening) return;
    isOpening = true;

    // 1. Animación de solapa y sello
    envelopeScreen.classList.add("animating");

    // 2. Iniciar reproducción con fade-in de música
    startMusicWithFadeIn();

    // 3. Revelar el lienzo de la invitación
    setTimeout(() => {
      if (invitationContent) invitationContent.classList.remove("hidden");
      if (audioControl) audioControl.classList.remove("hidden");
      if (mainNav) mainNav.classList.remove("hidden");

      // 4. Desvanecer la pantalla del sobre
      envelopeScreen.classList.add("opened");
      setTimeout(() => {
        envelopeScreen.style.display = "none";
      }, 950);

      // 5. Scroll suave al inicio
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Disparar las animaciones de scroll
      triggerScrollReveals();
    }, 750);
  };

  if (sealBtn) sealBtn.addEventListener("click", handleOpen);
  if (promptBtn) promptBtn.addEventListener("click", handleOpen);
  if (envelopeStage) envelopeStage.addEventListener("click", handleOpen);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("opened") === "1" || window.location.hash === "#invitation-content") {
    if (invitationContent) invitationContent.classList.remove("hidden");
    if (audioControl) audioControl.classList.remove("hidden");
    if (mainNav) mainNav.classList.remove("hidden");
    if (envelopeScreen) {
      envelopeScreen.classList.add("opened");
      envelopeScreen.style.display = "none";
    }
    setTimeout(triggerScrollReveals, 100);
  }
}


/* ==========================================================================
   3. REPRODUCTOR Y CONTROL DE MÚSICA CON FADE-IN
   ========================================================================== */
let audioObj = null;
let isAudioPlaying = false;
let audioFadeInterval = null;

function setupAudioPlayer() {
  audioObj = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  if (!audioObj || !musicBtn) return;

  audioObj.volume = 0;

  musicBtn.addEventListener("click", () => {
    if (audioObj.paused) {
      audioObj.play().then(() => {
        fadeAudio(audioObj, 0.7, 1200);
        updateMusicButtonState(true);
      }).catch(err => {
        console.warn("Autoplay bloqueado por el navegador:", err);
      });
    } else {
      audioObj.pause();
      updateMusicButtonState(false);
    }
  });

  audioObj.addEventListener("play", () => updateMusicButtonState(true));
  audioObj.addEventListener("pause", () => updateMusicButtonState(false));
}

function startMusicWithFadeIn() {
  if (!audioObj) return;
  audioObj.volume = 0;
  audioObj.play().then(() => {
    fadeAudio(audioObj, 0.7, 2000);
    updateMusicButtonState(true);
  }).catch(e => {
    console.log("El navegador requiere interacción previa para reproducir audio:", e);
  });
}

function fadeAudio(audio, targetVolume, durationMs) {
  if (audioFadeInterval) clearInterval(audioFadeInterval);
  const stepTime = 50;
  const steps = durationMs / stepTime;
  const startVolume = audio.volume;
  const volumeDelta = (targetVolume - startVolume) / steps;

  audioFadeInterval = setInterval(() => {
    let nextVolume = audio.volume + volumeDelta;
    if ((volumeDelta > 0 && nextVolume >= targetVolume) || (volumeDelta < 0 && nextVolume <= targetVolume)) {
      audio.volume = targetVolume;
      clearInterval(audioFadeInterval);
      audioFadeInterval = null;
    } else {
      audio.volume = Math.max(0, Math.min(1, nextVolume));
    }
  }, stepTime);
}

function updateMusicButtonState(playing) {
  const musicBtn = document.getElementById("music-btn");
  if (!musicBtn) return;

  isAudioPlaying = playing;
  if (playing) {
    musicBtn.classList.add("playing");
    musicBtn.setAttribute("aria-pressed", "true");
  } else {
    musicBtn.classList.remove("playing");
    musicBtn.setAttribute("aria-pressed", "false");
  }
}


/* ==========================================================================
   4. CUENTA REGRESIVA
   ========================================================================== */
function setupCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");
  const clockEl = document.getElementById("countdown-clock");
  const finishedEl = document.getElementById("cd-finished");

  const targetDate = new Date(EVENT_DATE).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (clockEl) clockEl.classList.add("hidden");
      if (finishedEl) finishedEl.classList.remove("hidden");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}


/* ==========================================================================
   5. AGREGAR A GOOGLE CALENDAR
   ========================================================================== */
function setupCalendarButton() {
  const calBtn = document.getElementById("btn-add-calendar");
  if (!calBtn) return;

  calBtn.addEventListener("click", () => {
    const title = encodeURIComponent("Paola's Fest | 30th Birthday Rodeo");
    const details = encodeURIComponent("¡30 vueltas al sol merecen un buen rodeo! Acompáñanos a celebrar los 30 años de Paola.\nDress code: Cowgirl Chic / Boots & Hat.");
    const location = encodeURIComponent("Salón Jungla Kids, Cda. 1er Toltecas #113, Barrio Santa Bárbara, Iztapalapa, CDMX");
    const dates = "20261219T230000Z/20261220T060000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank", "noopener,noreferrer");
  });
}


/* ==========================================================================
   6. COPIAR CLABE INTERBANCARIA Y CÓDIGO DE DEPÓSITO
   ========================================================================== */
function setupCopyClabe() {
  bindCopyHandler("btn-copy-clabe", "copy-btn-text", CLABE, "COPIAR CLABE");
  bindCopyHandler("btn-copy-cash", "copy-cash-btn-text", CASH_DEPOSIT_CODE, "COPIAR CÓDIGO");
}

function bindCopyHandler(btnId, textId, valueToCopy, defaultText) {
  const copyBtn = document.getElementById(btnId);
  const copyText = document.getElementById(textId);

  if (!copyBtn || !copyText) return;

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(valueToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = valueToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      copyBtn.classList.add("copied");
      copyText.textContent = "¡COPIADO! ✓";

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyText.textContent = defaultText;
      }, 2000);
    } catch (err) {
      console.error("No se pudo copiar el texto:", err);
      prompt("Copia manualmente:", valueToCopy);
    }
  });
}


/* ==========================================================================
   7. ANIMACIONES AL HACER SCROLL Y VOLVER ARRIBA
   ========================================================================== */
function setupScrollEffects() {
  const backToTopBtn = document.getElementById("btn-back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 380) {
      if (backToTopBtn) backToTopBtn.classList.add("visible");
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // IntersectionObserver para apariciones suaves
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.1
    });

    document.querySelectorAll(".reveal-fade").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal-fade").forEach(el => el.classList.add("is-revealed"));
  }
}

function triggerScrollReveals() {
  const reveals = document.querySelectorAll(".reveal-fade");
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      el.classList.add("is-revealed");
    }
  });
}

/* ==========================================================================
   8. MENÚ DE HAMBURGUESA EN MÓVIL
   ========================================================================== */
function setupMobileMenu() {
  const mainNav = document.getElementById("main-nav");
  const toggleBtn = document.getElementById("nav-toggle-btn");
  if (!mainNav || !toggleBtn) return;

  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (e) => {
    if (mainNav.classList.contains("is-open") && !mainNav.contains(e.target)) {
      closeMenu();
    }
  });
}
