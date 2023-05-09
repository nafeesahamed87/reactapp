export default class ApiService {
    store;

    constructor(store) {
        this.store = store;
    }

    get token() {
        return this.store.token;
    }

    get apiDomain() {
        return this.store.apiDomain;
    }
}
