import axios from 'axios';
// https://parking-lot-backend.onrender.com
// http://localhost:3030/api/v1/parkin_lot
export default axios.create({
    baseURL: 'https://parking-lot-backend.onrender.com/api/v1/parkin_lot',
});
