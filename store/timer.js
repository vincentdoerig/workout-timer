/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const state = {
  stopwatch: {
    timer: null,
    time: 0,
    state: 'paused',
  },
};

const getters = {
  stopwatchState: state => state.state,
  formattedElapsedTime: () => {
    const date = new Date(0);
    date.setSeconds(this.swState.time / 1000);
    const utc = date.toUTCString();
    return utc.substr(utc.indexOf(':') - 2, 8);
  },
};

const actions = {
  init({ commit }) {
    const data = localStorage.getItem('sw-start');

    commit('setStopwatch', data);
  },
};

const mutations = {
  handleStopwatch: (state, action) => {
    switch (action) {
      case 'start':
        state.state = 'running';
        state.timer = setInterval(() => {
          state.time += 1000;
        }, 1000);
        break;
      case 'stop':
        state.state = 'paused';
        clearInterval(state.timer);
        break;
      case 'reset':
        state.time = 0;
        state.state = 'paused';
        state.timer = null;
        break;
      default:
        break;
    }
  },
  setStopwatch: (state, data) => (state.stopwatch = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
