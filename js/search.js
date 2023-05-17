export class Search {
    constructor(view,api) {
        this.view = view;
        this.api = api;

        this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepo.bind(this),1000))
    }
   
     searchRepo () {
        const valueRepos = this.view.searchInput.value
        if(valueRepos) {
        this.clearRepos();   
        this.api.loadRepos(valueRepos).then((res)=> {
            if(res.ok) {
                res.json().then((res) => {
                    console.log(res)
                    res.items.forEach(repo => this.view.createRepo(repo))
                })
            }
            else {

            }
        })
        } else {
            this.clearRepos();
        }
        
    }

    clearRepos() {
        this.view.reposList.innerHTML = '';
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
          const context = this, args = arguments;
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