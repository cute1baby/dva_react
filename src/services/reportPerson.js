import request from '../utils/request';

export function queryPerson(param) {
  return request('/api/getAsyc',{
    method: 'GET',
    query: param
  });
}
