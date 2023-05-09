import {
    CrudService,
    UserService,
    AuthService,
    AzureService,
    AzureGraphService,
} from './services';
import { RoleService } from './services/role';

export default class EdsApiClient {
    crud;
    user;
    auth;
    azure;
    azureGraphApi;
    store = {
        apiDomain: '',
        token: undefined,
    };

    constructor(apiDomain) {
        this.store.apiDomain = apiDomain;
        this.crud = new CrudService(this.store);
        this.user = new UserService(this.store);
        this.auth = new AuthService(this.store);
        this.rolelist = new RoleService(this.store);
        this.azure = new AzureService(this.store);
        this.azureGraphApi = new AzureGraphService();
    }

    setToken(token) {
        this.store.token = token;
    }
}
