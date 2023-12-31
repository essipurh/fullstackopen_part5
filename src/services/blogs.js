import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }