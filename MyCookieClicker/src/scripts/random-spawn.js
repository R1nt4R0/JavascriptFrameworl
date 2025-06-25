import GoldenCookieIMG from "../assets/golden-cookie.png";

export class RandomSpawn {
  gameElement = null;
  onGoldenCookieClick = null;
  spawnInterval = null;
  activeCookie = null;

  constructor(gameElement, onGoldenCookieClick) {
    this.gameElement = gameElement;
    this.onGoldenCookieClick = onGoldenCookieClick;
  }

  start() {
    // Démarre l'apparition aléatoire toutes les 30 secondes
    this.spawnInterval = setInterval(() => {
      this.spawnGoldenCookie();
    }, 30000);
  }

  stop() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
    if (this.activeCookie) {
      this.activeCookie.remove();
    }
  }

  spawnGoldenCookie() {
    // Supprime le cookie précédent s'il existe
    if (this.activeCookie) {
      this.activeCookie.remove();
    }

    // Crée le nouvel élément cookie doré
    this.activeCookie = document.createElement("div");
    this.activeCookie.className = "golden-cookie";
    this.activeCookie.innerHTML = `<img src="${GoldenCookieIMG}" alt="Golden Cookie" />`;

    // Position aléatoire
    const maxX = this.gameElement.clientWidth - 100;
    const maxY = this.gameElement.clientHeight - 100;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    this.activeCookie.style.left = `${randomX}px`;
    this.activeCookie.style.top = `${randomY}px`;

    // Ajoute l'événement de clic
    this.activeCookie.addEventListener("click", () => {
      this.onGoldenCookieClick();
      this.activeCookie.remove();
      this.activeCookie = null;
    });

    // Ajoute le cookie au DOM
    this.gameElement.append(this.activeCookie);

    // Supprime le cookie après 5 secondes
    setTimeout(() => {
      if (this.activeCookie) {
        this.activeCookie.classList.add("disappear");
        setTimeout(() => {
          if (this.activeCookie) {
            this.activeCookie.remove();
            this.activeCookie = null;
          }
        }, 500); // Temps de l'animation de disparition
      }
    }, 5000);
  }
} 