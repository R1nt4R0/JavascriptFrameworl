export class Shop {
  gameElement = null;
  onPurchase = null;
  cursors = 0;
  cookiesPerSecond = 0;

  constructor(gameElement, onPurchase) {
    this.gameElement = gameElement;
    this.onPurchase = onPurchase;
  }

  render() {
    // Création de l'élément de la boutique
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    
    // Structure de base de la boutique
    this.shopElement.innerHTML = `
      <h2>Boutique</h2>
      <div class="shop-stats">
        <p>Cookies par seconde: ${this.cookiesPerSecond.toFixed(1)}</p>
      </div>
      <div class="shop-items">
        <div class="shop-item">
          <h3>Curseur</h3>
          <p>Génère 0.1 cookie par seconde</p>
          <p class="cursor-price">Prix: ${this.getCursorPrice()} cookies</p>
          <button id="buy-cursor">Acheter</button>
          <p class="cursor-owned">Possédés: ${this.cursors}</p>
        </div>
      </div>
    `;

    // Ajout de l'événement pour l'achat de curseur
    const buyCursorButton = this.shopElement.querySelector("#buy-cursor");
    buyCursorButton.addEventListener("click", () => {
      const price = this.getCursorPrice();
      if (this.onPurchase(price, 0.1)) {
        this.cursors++;

        this.updateCookiesPerSecond();
        this.updateShopDisplay();
      }
    });

    // Ajout de la boutique au DOM
    this.gameElement.append(this.shopElement);
  }

  updateShopDisplay() {
    if (!this.shopElement) return;

    // Mise à jour du prix
    const priceElement = this.shopElement.querySelector(".cursor-price");
    if (priceElement) {
      priceElement.textContent = `Prix: ${this.getCursorPrice()} cookies`;
    }

    // Mise à jour du nombre de curseurs possédés
    const ownedElement = this.shopElement.querySelector(".cursor-owned");
    if (ownedElement) {
      ownedElement.textContent = `Possédés: ${this.cursors}`;
    }

    // Mise à jour des cookies par seconde
    this.updateCookiesPerSecond();
  }

  getCursorPrice() {
    return 10 + (this.cursors * 3);
  }

  updateCookiesPerSecond() {
    this.cookiesPerSecond = this.cursors * 0.1;
    if (this.shopElement) {
      const statsElement = this.shopElement.querySelector(".shop-stats p");
      if (statsElement) {
        statsElement.textContent = `Cookies par seconde: ${this.cookiesPerSecond.toFixed(1)}`;
      }
    }
  }
} 