export default class BaseServise {
    static getAuthHeader() {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        return headers;
    }
}