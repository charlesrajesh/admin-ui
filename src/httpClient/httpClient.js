import axios from 'axios'

const httpClient = {
  get: ({ path, params }) => axios.get(path, { params: params })
}

export default httpClient
