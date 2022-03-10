import axios from 'axios'
import { removeMember } from '../redux/features/workspase/workspaseSlice'

export const request = {
  loginUrl: '/api/auth/login',
  registerUrl: '/api/auth/register',
  homeUrl: '/api/home',
  workspaceUrl: '/api/workspace/',
  searchUrl: '/api/search',

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

  async register(params) {
    const config = this.configs.default
    const { data } = await axios.post(this.registerUrl, params, config)
    return data
  },

  async userData() {
    // const config = this.configs.withAuth

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }
    const { data } = await axios.get(this.homeUrl, config)

    return data
  },

  async workspaceData(id) {
    const config = this.configs.withAuth 
    const { data } = await axios.get(`${this.workspaceUrl}${id}`, config)

    return data
  },

  async createWorkspace(name) {
    const config = this.configs.withAuth
    const { data } = await axios.post(`${this.workspaceUrl}`,{name} , config)

    return data
  },

  async users(subStr) {
    const config = this.configs.default
    const data = {text: subStr}
    const { data: users } = await axios.post(`${this.searchUrl}/users`, data, config)
    return users
  },

  async addMembers(workspaceId, members) {
    const config = this.configs.default
    const data = {workspaceId, members}
    const { data: membersData } = await axios.put('/api/workspace', data, config)
    return membersData.members
  },

  async removeMember(workspaceId, memberId) {
    const config = this.configs.default
    const data = {workspaceId, memberId}
    const { data: members } = await axios.put('/api/member', data, config)

    return members
  }
}