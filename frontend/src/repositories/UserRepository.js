import axios from "axios";

export class UserRepository {
    urlPrefix = "http://localhost:8000/api/user";

    async getAll(filter) {
        try{
            const response = await axios.get(`${this.urlPrefix}`, { params: filter });
            return response.data;
        }catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async get(id) {
        try{
            const response = await axios.get(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async delete(id) {
        try{
            const response = await axios.delete(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error delete users:", error);
            throw error;
        }
    }
}