import axios from "axios";

export class ProductRepository {
    urlPrefix = "http://localhost:8000/api/product";

    async getAll() {
        try{
            const response = await axios.get(`${this.urlPrefix}`);
            return response.data;
        }catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    async get(id) {
        try{
            const response = await axios.get(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    async create(product) {
        try{
            const response = await axios.post(`${this.urlPrefix}`, product);
            return response.data;
        }catch (error) {
            console.error("Error creating products:", error);
            throw error;
        }
    }

    async update(id, product) {
        try{
            const response = await axios.put(`${this.urlPrefix}/${id}`, product);
            return response.data;
        }catch (error) {
            console.error("Error updating products:", error);
            throw error;
        }
    }

    async delete(id) {
        try{
            const response = await axios.delete(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error delete products:", error);
            throw error;
        }
    }
}