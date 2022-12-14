import axios from 'axios'
import {apiRoutes} from '../config/api'

export const resetPasswordEmailVerify = async (payloads) => {
    try {
        await axios.post(`${apiRoutes.RESET_PASSWORD_EMAIL_VERIFY}`, payloads)
    } catch (error) {
        throw error
    }
}

export const resetPasswordConfirm = async (payloads) => {
    try {
        await axios.post(`${apiRoutes.RESET_PASSWORD_CONFIRM}`, payloads)
    } catch (error) {
        throw error
    }
}
