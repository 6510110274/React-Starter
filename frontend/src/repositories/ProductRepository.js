import axios from "axios";

export class ProductRepository {
    urlPrefix = "http://localhost:8000/api/product";

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

    async create(user) {
        try{
            const response = await axios.post(`${this.urlPrefix}`, user);
            return response.data;
        }catch (error) {
            console.error("Error creating users:", error);
            throw error;
        }
    }

    async update(id, user) {
        try{
            const response = await axios.put(`${this.urlPrefix}/${id}`, user);
            return response.data;
        }catch (error) {
            console.error("Error updating users:", error);
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