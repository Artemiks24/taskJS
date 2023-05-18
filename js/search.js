import {loadRepos} from "./api.js"
export class Search {
  constructor(view) {
    this.view = view;
    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepo.bind(this), 800)
    );
  }

  searchRepo() {
    const valueRepos = this.view.searchInput.value;
    if (valueRepos) {
      this.clearRepos();
      loadRepos(valueRepos).then((res) => {
        try {
          res.json().then((res) => {
            res.items.forEach((repo) => this.view.createRepo(repo));
          });
        }
        catch(e) {
            console.log(e)
        }
      });
    } else {
      this.clearRepos();
    }
  }

  clearRepos() {
    this.view.searchList.innerHTML = "";
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
