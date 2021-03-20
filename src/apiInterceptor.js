import axios from 'axios';

export const http = axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3/",
    params:{
        key:"AIzaSyCUmLFPhEXK_kxIvRoZ72js8OsMJepPD2s"
    }
})

