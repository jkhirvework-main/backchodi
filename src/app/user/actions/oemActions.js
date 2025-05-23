'use client'

import BackendHelper from "@/helpers/BackendHelper";

export const findComponent = async (id, isVar, varId) => {
    return await BackendHelper.get('/find-comp?id=' + id + '&isVar=' + isVar+'&varId='+varId);
}

export const findComponent2 = async (id) => {
    return await BackendHelper.get('/find-comp2?id=' + id);
}
