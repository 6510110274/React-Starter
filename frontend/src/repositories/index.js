import { UserRepository } from './UserRepository.js'; 
import { OrderRepository } from './OrderRepository.js';
import { ProductRepository } from './ProductRepository.js';

const repositories = {
    users : new UserRepository(),
    orders : new OrderRepository(),
    products : new ProductRepository()
}

export default repositories; // Export the repositories object as the default export