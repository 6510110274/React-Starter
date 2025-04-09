import axios from "axios";

export class OrderRepository {
    urlPrefix = "http://localhost:8000/api/order";

    async getAll(filter) {
        try{
            const response = await axios.get(`${this.urlPrefix}`, { params: filter });
            return response.data;
        }catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }

    async get(id) {
        try{
            const response = await axios.get(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }

    async create(order) {
        try{
            const response = await axios.post(`${this.urlPrefix}`, order);
            return response.data;
        }catch (error) {
            console.error("Error creating orders:", error);
            throw error;
        }
    }

    async update(id, order) {
        try{
            const response = await axios.put(`${this.urlPrefix}/${id}`, order);
            return response.data;
        }catch (error) {
            console.error("Error updating orders:", error);
            throw error;
        }
    }

    async delete(id) {
        try{
            const response = await axios.delete(`${this.urlPrefix}/${id}`);
            return response.data;
        }catch (error) {
            console.error("Error delete orders:", error);
            throw error;
        }
    }
}