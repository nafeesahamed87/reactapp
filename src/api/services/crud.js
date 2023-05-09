import { stringify } from 'query-string';
import * as http from './http';
import ApiService from './service';
export class CrudService extends ApiService {
    async getList(request) {
        const { limit, currentPage, search, sort, filter } = request;
        const query = {
            search,
            limit,
            sort: JSON.stringify(sort),
            filter: JSON.stringify(filter),
            page: currentPage,
        };

        if (!search) {
            delete query.search;
        }
        const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response.data };
    }
    async postList(request) {
        const url = `${this.apiDomain}/${request.resource}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response.data };
    }
    async create(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        console.log(data, { url });
        return http.post(url, data, this.store);
    }

    async get(request) {
        const url = `${this.apiDomain}/${request.resource}/${request.resourceId}`;
        return http.get(url, this.store);
    }

    async update(request, data) {
        const url = `${this.apiDomain}/${request.resource}/${request.resourceId}`;
        return http.put(url, data, this.store);
    }

}
