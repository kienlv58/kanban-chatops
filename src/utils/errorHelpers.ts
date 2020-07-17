import { AxiosResponse } from 'axios';
import { isEmpty, get, toNumber } from 'lodash';

const COMMON_ERROR_MESSAGE = 'Có lỗi xảy ra!';

export function throwErrorIfEmpty(response: Partial<AxiosResponse>): void {
  if (isEmpty(get(response, 'data'))) {
    throw new Error(COMMON_ERROR_MESSAGE);
  }
}

export function throwErrorIfMalformed(response: Partial<ErrorResponseType>): void {
  throwErrorIfEmpty(response);

  if (toNumber(get(response, 'data.status')) === 0) {
    throw new Error(get(response, 'data.message') || COMMON_ERROR_MESSAGE);
  }
}
