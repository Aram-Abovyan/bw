import axios from 'axios'

export const request = {
  loginUrl: '/api/auth/login',
  homeUrl: '/api/home',
  workspaceUrl: '/api/workspace/',

  configs: {
    default: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    withAuth: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }
  },

  async login(email, password) {
    const config = this.configs.default
    const { data } = await axios.post(this.loginUrl, {email, password}, config)
    
    return data
  },

  async userData() {
    const config = this.configs.withAuth
    const { data } = await axios.get(this.homeUrl, config)

    return data
  },

  async workspaceData(id) {
    const config = this.configs.withAuth 
    const { data } = await axios.get(`${this.workspaceUrl}${id}`, config)

    return data
  }
}