import axios from 'axios';

export const http = axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3/",
    params:{
        key:"AIzaSyDHLa8iEjagehgXlKVXK-0_Riw7XbkC4ac"
    }
})

