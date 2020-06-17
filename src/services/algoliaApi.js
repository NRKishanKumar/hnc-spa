import ApiService from "./Api";
import axios from "axios";
const BASE_URL = "https://hn.algolia.com/api/v1";
const client = new ApiService({ baseURL: BASE_URL})
const JSON_QUERY = '.json?print=pretty';
const PAGE_LIMIT = 20;
const algoliaApi = {};

const getPageSlice = (limit, page = 0) => ({begin: page * limit, end: (page+1) * limit});
const getPageValues = ({begin, end, items}) => items.slice(begin, end);


algoliaApi.getTopStoryIds = () => client.get(`/topstories${JSON_QUERY}`);
algoliaApi.getStory = (id) => client.get(`/item/${id}${JSON_QUERY}`);
algoliaApi.getStoryByType = (category) => client.get(`/search?tags=${category}`);
algoliaApi.getStoryObj = (objectId) => client.get(`/items/${objectId}`);
algoliaApi.getByPageNo = (category, pageNumber) => client.get(`/search?tags=${category}&page=${pageNumber}&hitsPerPage=20`)
algoliaApi.getStoriesByPage = (ids, page) => {
    const { begin, end } = getPageSlice(PAGE_LIMIT, page);
    const activeIds = getPageValues({begin, end, items: ids});
    const storyPromises = activeIds.map(id => algoliaApi.getStory(id));
    return Promise.all(storyPromises);
};

export default algoliaApi;

// deprecated
//`https://hacker-news.firebaseio.com/v0/stories.json?print=pretty`
// await axios.get(
//     `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
// );
//let url = "https://hn.algolia.com/api/v1/search?tags=story&page=3&hitsPerPage=1";