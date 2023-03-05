import _ from 'lodash';

export const DEFAULT_ERROR = 'Something went wrong';
export const NOT_FOUND_ERROR = 'Not Found';

export const extractError = (payload) => {
  const responseStatus = _.get(payload, 'response.status', 500);
  const error = _.get(payload, 'response.data.message', payload.message);
  return responseStatus === 404 ? NOT_FOUND_ERROR : responseStatus !== 500 ? error : DEFAULT_ERROR;
};