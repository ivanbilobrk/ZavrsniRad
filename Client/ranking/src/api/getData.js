import axios from "./axios"

export const getData = async (queryOptions = null) => {
    try {
        let query = '?';
        for(const key in queryOptions){
            if(queryOptions[key] != null && queryOptions[key] != undefined && queryOptions[key].length != 0)
                query += '&'+key+'='+queryOptions[key]
        }

       

        const request = await axios.get(`/rankingsYear/${query}`,
                        {
                            headers: {'Content-Type':'application/json'},
                            withCredentials: true
                        });
        
        const response = request.data
        
        return response
    } catch (error) {
        console.log(`Error while fetching data.`)
        return false
    }
}