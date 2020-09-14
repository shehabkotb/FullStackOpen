import axios from "axios"

const baseURL = "/login"

const login = async (credintials) => {
  const response = await axios.post(baseURL, credintials)
  return response.data
}

export default { login }
