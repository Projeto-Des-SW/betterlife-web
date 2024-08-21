import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class RegisterAnimalService{
    async registerAnimal(animalData){
        try {
            const response = await axios.post(`${API_URL}/registerAnimal`, animalData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if(response.status === 200)
                return {
                    error: false,
                    data: response.data
                }
            return{
                error: true,
                data: response.data
            }
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    };
}

const registerAnimalService = new RegisterAnimalService();
export default registerAnimalService;