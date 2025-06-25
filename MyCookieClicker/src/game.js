import { ClickableArea } from "./scripts/clickable-area";
import { Shop } from "./scripts/shop";
import { RandomSpawn } from "./scripts/random-spawn";

export class Game {
  // Game Properties
  cookies = 0;
  passiveGain = 0;
  lastUpdate = Date.now();

  // Game Elements
  gameElement = null;
  scoreElement = null;

  // Game Components
  clickableArea = null;
  shop = null;
  randomSpawn = null;

  constructor(config) {
    // Récupère le nombre de cookie de base via la configuration.
    this.cookies = config.cookies;
    // Récupère l'élément avec l'id game.
    this.gameElement = document.querySelector("#game");
    // Crée le composant ClickableArea qui gère la logique de la zone cliquable.
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );
    // Crée le composant Shop qui gère la logique de la boutique
    this.shop = new Shop(
      this.gameElement,
      this.onShopPurchase.bind(this)
    );
    // Crée le composant RandomSpawn qui gère l'apparition aléatoire des cookies dorés
    this.randomSpawn = new RandomSpawn(
      this.gameElement,
      this.onGoldenCookieClick.bind(this)
    );
  }

  // Lance le jeu
  start() {
    this.render();
    // Démarre la boucle de mise à jour pour les gains passifs
    setInterval(() => {
      this.cookies += this.passiveGain;
      this.updateScore();
    }, 1000);
    // Démarre l'apparition aléatoire des cookies dorés
    this.randomSpawn.start();
  }

  // Génère les éléments à afficher.
  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render();
  }

  // Génère l'affichage du score.
  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  // Met à jour l'affichage du score.
  updateScore() {
    this.scoreElement.innerHTML = `
        <div class="score-container">
          <span>${Math.floor(this.cookies)} cookies</span>
          <span class="passive-gain">(+${this.passiveGain.toFixed(1)}/s)</span>
        </div>
    `;
  }

  // Ici on utilise une fonction fléchée pour avoir encore accès au this de Game.
  onClickableAreaClick = () => {
    // On ajoute 1 point aux cookies pour chaque click.
    this.cookies += 1;
    // Par soucis de performance car les changements au DOM sont très lourd,
    // On demande à la Window d'attendre la prochaine frame d'animation
    // pour réaliser les changements.
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  // Callback pour les achats dans la boutique
  onShopPurchase(cost, passiveGainIncrease) {
    if (this.cookies >= cost) {
      this.cookies -= cost;
      this.passiveGain += passiveGainIncrease;
      this.updateScore();
      return true;
    }
    return false;
  }

  // Callback pour le clic sur un cookie doré
  onGoldenCookieClick() {
    const minGain = 1;
    const maxGain = this.passiveGain * 1000;
    const randomGain = Math.floor(Math.random() * (maxGain - minGain + 1)) + minGain;
    this.cookies += randomGain;
    this.updateScore();
  }
}
