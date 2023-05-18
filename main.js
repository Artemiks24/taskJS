import {Search} from "./js/search.js"
import {View} from "./js/view.js"
import {Api} from "./js/api.js"

const api = new Api;
const search = new Search (new View(api), api);