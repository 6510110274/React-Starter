import { UserRepository } from './UserRepository.js'; 

const repositories = {
    users : new UserRepository()
}

export default repositories; // Export the repositories object as the default export