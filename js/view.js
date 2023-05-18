export class View {
  constructor(api) {
    this.container = document.querySelector(".container");
    this.api = api;

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Введите данные для поиска репозиториев";

    this.search = this.createElement("div", "search");
    this.searchInput = this.createElement("input", "search__input");
    this.search.append(this.searchInput);
    this.searchList = this.createElement("ul", "search__list");
    this.search.append(this.searchList);

    this.cardList = this.createElement("ul", "cards");

    this.container.append(this.title);
    this.container.append(this.search);
    this.container.append(this.cardList);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }

  createRepo(repoData) {
    const searchElement = this.createElement("li", "search__item");
    searchElement.addEventListener("click", () => this.createCard(repoData));
    searchElement.addEventListener("click", () => this.clearInput());
    searchElement.insertAdjacentHTML(
      "beforeend",
      `<div class= "search__name">${repoData.name}</div>`
    );
    this.searchList.append(searchElement);
  }

  clearInput() {
    this.searchInput.value = "";
    this.searchList.innerHTML = "";
  }

  createCard(id) {
    const card = this.createElement("li", "cards__item");
    this.api.loadReposData(id).then((res) => {
      res.forEach((key, value) => {
        card.insertAdjacentHTML(
          "beforeend",
          `<div class= "card__info">${value}:${key}</div>`
        );
      });
    });
    card.addEventListener("click", () => card.remove());
    this.cardList.append(card);
  }
}
