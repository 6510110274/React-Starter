import { UserRepository } from './UserRepository.js'; 
import { OrderRepository } from './OrderRepository.js';

const repositories = {
    users : new UserRepository(),
    oders : new OrderRepository()
}

export default repositories; // Export the repositories object as the default export