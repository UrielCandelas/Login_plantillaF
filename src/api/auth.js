import axios from './axios'

export const register = user => axios.post('/register',user)

export const login = user => axios.post('/login',user)

export const verifyToken = () => axios.get('/auth/verify')

export const logout = () => axios.post('/logout')