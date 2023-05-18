const URL = "https://api.github.com/";

const PER_PAGE = 5;

export class Api {
  async loadRepos(value) {
    return await fetch(
      `${URL}search/repositories?q=${value}&per_page=${PER_PAGE}`
    );
  }

  async loadReposData(id) {
    const urls = new Map([
      ["Name", `${id.name}`],
      ["Owner", `${id.owner.login}`],
      ["Stars", `${id.stargazers_count}`],
    ]);
    return urls;
  }
}
