import axios from "axios";


const PHOTOS_URL = "https://localhost:8081/api/photos";

export default class PhotosService {
    static async getById(id: string) {
        try 
        {

        }
        catch (e) 
        {

        }
    }

    static async addPhoto() {
        try 
        {

        }
        catch (e) 
        {

        }
    }

    static async deletePhoto(id: string) {
        try 
        {
            const response = await axios.delete(`${PHOTOS_URL}/${id}`);

            if (response.status === 200) {
                return true;
            }

            return false;
        }
        catch (e) 
        {
            console.log(e);
            return false;
        }
    }
}