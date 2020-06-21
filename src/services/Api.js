import axios from "axios";
import Dexie from "dexie";

// Default API  root
const API_ROOT = process.env.URL || 'http://localhost:3000/';
const TIMEOUT = 20000;
const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

class ApiService {
    constructor({baseURL = API_ROOT, timeout = TIMEOUT, headers = HEADERS, auth}) {
        const client = axios.create({
            baseURL,
            headers,
            auth,
        });

        client.interceptors.response.use(this.handleSuccess, this.handleError);
        this.client = client;
        this.db = new Dexie("persister");
        this.db.version(1).stores({
            apiCache: 'id,data'
        })
    }


    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    /**
     * @description method to get url data with cache interceptor for storing api result in cache
     * @param path
     * @returns {string|Promise<AxiosResponse<any>>}
     */
    get(path, pageNumber) {

        return this.db.apiCache.get(path)
            .then(success => {
                if (success) {
                    return JSON.parse(success.data);
                } else {
                    return this.client.get(path).then(response => {
                        return this.db.apiCache.put({
                            "id": path,
                            "data": JSON.stringify(response.data)
                        })
                            .then(doneIt => {
                                return response.data;
                            })
                    });
                }
            });
    }

    post(path, payload) {
        return this.client.post(path, payload).then(response => response.data);
    }

    put(path, payload) {
        return this.client.put(path, payload).then(response => response.data);
    }

    patch(path, payload) {
        return this.client.patch(path, payload).then(response => response.data);
    }

    delete(path) {
        return this.client.delete(path).then(response => response.data);
    }

    async hideElem(index, pageNo) {
        let query = pageNo === 0 ? "/search?tags=story" : `/search?tags=story&page=${pageNo}&hitsPerPage=20`;
        return this.db.apiCache.get(query)
            .then(response => {
                if (response) {
                    let result = JSON.parse(response.data);
                    result.hits.splice(index, 1);
                    return this.db.apiCache.put({
                        "id": query,
                        "data": JSON.stringify(result)
                    }).then(res => {
                        return res;
                    });
                }
            })
            .catch(errorMap => {
                console.log(errorMap);
            })
    }

    upVote(itemId, pageNo) {
        let query = `/items/${itemId}`;
        return this.db.apiCache.get(query)
            .then(response => {
                if (response) {
                    let upVoter = JSON.parse(response.data);
                    ++upVoter.points;

                    return this.db.apiCache.put({
                        "id": query,
                        "data": JSON.stringify(upVoter)
                    }).then(async res => {
                        return res;
                    })
                }
            })
            .catch(errorMap => {
                console.log(errorMap);
            })
    }

    clearCacheDb() {
        this.db.apiCache.clear();
    }
}

export default ApiService;