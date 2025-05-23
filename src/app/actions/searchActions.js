'use server'

import ApiHelper from "@/helpers/ApiHelper";
import prisma from "@/utils/db/db"
import Utils from "@/utils/Utils";

export const getOems = async () => {
    const oems = await ApiHelper.get('/api/oems');
    console.log(oems);
    return Utils.genOptionData(oems);
}

export const getModels = async (parId) => {
    const models = await ApiHelper.get(`/api/models?parId=${parId}`);
    return Utils.genOptionData(models);
}

export const getYears = async (parId) => {
    const nData = await ApiHelper.get(`/api/years?parId=${parId}`);
    return nData;
}

export const getEngines = async (parId, year) => {
    const data = await ApiHelper.get(`/api/engines?parId=${parId}&year=${year}`);
    return data;
}

export const getModules = async (parId) => {
    const modules = await prisma.module.findUnique({ include: { SubModules: true }, where: { id: parId } });
    return modules;
}

export const saveHistory = async (type, title, description, obj) => {
    const data = prisma.searchHistory.create({ data: { type, title, description, targetObj: obj, time: new Date()} });

    
    return data;
}