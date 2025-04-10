import { omitBy, isUndefined } from 'lodash';

import { UbnetLoggerService } from "src/context/shared/logger/logger.service";
export function createObjectWithoutUndefined(object: any) {
    try {
        return omitBy(object, isUndefined);
    } catch (error: any) {
        UbnetLoggerService.getInstance().error('Error creating object', error);
        throw error;
    }
}