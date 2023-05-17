export class View {
    constructor (api) {
        this.main = document.querySelector('.main');
        this.api = api;

        this.title = this.createElement('h1','title');
        this.title.textContent = 'Введите данные для поиска репозиториев';

        this.searchLine = this.createElement('div', 'search');
        this.searchInput = this.createElement('input', 'search__input');
        this.searchCounter = this.createElement('span');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        
        this.repos = this.createElement('div', 'repos');
        this.reposList = this.createElement('ul', 'repos__list');
        this.repos.append(this.reposList);

        this.wrapper = this.createElement('div', 'wrapper');
        this.wrapper.append(this.repos);

        this.cardList = this.createElement('ul', 'cards');


        this.main.append(this.title);
        this.main.append(this.searchLine);
        this.main.append(this.wrapper);
        this.main.append(this.cardList)
    }

    createElement (elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if(elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    createRepo (repoData) {
        const reposElement = this.createElement('li', 'repos__item')
        reposElement.addEventListener('click', () => this.createCard(repoData))
        reposElement.insertAdjacentHTML('beforeend', `<div class= "repos__name">${repoData.name}</div>`);
        this.reposList.append(reposElement);
    }

    createCard (id)  {
        const card = this.createElement('li', 'cards__item');
        this.api.loadReposData(id).then(res => {
            console.log(res)
            res.forEach((e) => {
                card.insertAdjacentHTML('beforeend', `<div class= "card__info">${e}</div>`)
            })
        })
        this.cardList.append(card)
    }
}
