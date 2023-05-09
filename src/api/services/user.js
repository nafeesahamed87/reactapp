// import * as http from './http';
import ApiService from './service';
import * as http from './http';

export class UserService extends ApiService {
    async addUser(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        return http.post(url, data, this.store);
    }
    async getUserById(id) {
        const url = `${this.apiDomain}/api/users/${id} `;
        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response.data };
    }
    async updateUser(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        return http.put(url, data, this.store);
    }
}
