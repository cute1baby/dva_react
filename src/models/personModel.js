import * as service from '../services/reportPerson';
export default {

  namespace: 'person',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryPerson({ payload }, { call }) {  // eslint-disable-line
      return yield call(service.queryPerson,payload);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
