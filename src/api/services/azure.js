import ApiService from './service';
import * as http from './http';
import { toastr } from 'react-redux-toastr';
import { getAuthProvider } from '../../containers/auth/azureAuthProvider';
import { StringEncryption } from '../../utils';

export class AzureService extends ApiService {
    async getUserByAzureEmail(email) {
        try {
            const accessToken = await (
                await getAuthProvider().getAccessToken()
            ).accessToken;
            const encryptToken = StringEncryption(accessToken);
            const data = {
                email,
                accesToken: encryptToken,
            };
            const url = `${this.apiDomain}/api/auth/getAzureUserByEmail`;
            const response = await http.post(url, data, this.store);
            if (
                response?.data?.status !== 200 &&
                response?.data?.status !== 422 &&
                !response?.data?.field
            ) {
                toastr.error('Error', response?.data?.message);
            }
            if (response?.data?.status === 422) {
                toastr.error('Error', 'Email must be  valid');
            }
            return response?.data;
        } catch (e) {
            console.log(e);
            toastr.error('Error', 'Cannot Access Token');
        }
    }
}
