import { toastr } from 'react-redux-toastr'
import { getAuthProvider } from '../../containers/auth/azureAuthProvider'

export class AzureGraphService {
  static garphMeEndPoint = 'https://graph.microsoft-ppe.com/v1.0/me'
  static garphUserEndPoint = 'https://graph.microsoft.com/v1.0/users'

  async getAzureUserByEmail(email) {
    const url = `${AzureGraphService.garphUserEndPoint}/${email}`
    const headers = new Headers()
    try {
      const accessToken = await (
        await getAuthProvider().getAccessToken()
      ).accessToken
      // var ciphertext = CryptoJS.AES.encrypt(
      //   accessToken,
      //   process.env.CRYPTO_SECRET
      // ).toString()
      const bearer = `Bearer ${accessToken}`
      headers.append('Authorization', bearer)
      const options = {
        method: 'GET',
        headers: headers,
      }
      const res = await fetch(url, options)
        .then((response) => response.json())
        .catch((err) => {
          console.log(err)
          toastr.error('Error', 'Cannot Fetch User Details')
        })
      if (res?.error?.code) {
        toastr.error('Error', res.error.message)
        return
      }
      return res
    } catch (error) {
      console.log(error)
      toastr.error('Error', 'Cannot access token')
    }
  }
}
