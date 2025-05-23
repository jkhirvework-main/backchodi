'use server'

import ApiHelper from "@/helpers/ApiHelper";
import { cookies } from "next/headers";


export const sendOtp = async (mob) => {
    const data = await ApiHelper.post('/api/send-otp', { mob });
    return data;
}

export const verifyOtp = async (mob, otp) => {
    const data = await ApiHelper.post('/api/verify-otp', { mob, otp });
    return data;
}

export const registerUser = async (mobId, name, email, workshopName, workshopAddress) => {
    const [fName, lName] = name.split(' ');
    const data = await ApiHelper.post('/api/register-user', { mobId, fName, lName, email, workShopName: workshopName, workShopAddress: workshopAddress });
    return data;
}

export const setCookies = async (key, value) => {
    const data = await cookies().set(key, value, {
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return true;
}

export const getProfileData = async () => {
    const data = await ApiHelper.get('/api/user-profile');
    return data;
}

export const getPricing = async () => {
    const data = await ApiHelper.get('/dev/plans');
    return data;
}

export const updateProfile = async (name, email, workShopName, workShopAddress, userId) => {
    const data = await ApiHelper.post('/api/update-profile/' + userId, { name, email, workShopName, workShopAddress });
    return data;
}

export const addHistory = async (userId, type, data) => {
    const nData = await ApiHelper.post('/api/add-history/' + userId, {type, data});
    return nData;
}

export const getHistory = async () => {
    const data = await ApiHelper.get('/api/get-history');
    return data;
}

export const addInfoRequest = async (data) => {
    const response = await ApiHelper.post('/api/add-info-request', data);
    return response;
}

export const getNotifications = async () => {
    const response = await ApiHelper.get('/api/notifications');
    return response;
}

export const addFcmToken = async (token) => {
    const response = await ApiHelper.post('/api/add-fcm-token', { token, deviceType: 'web' });
    return response;
}