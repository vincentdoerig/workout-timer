import { State } from '@/types/timer';
import { ActionContext } from 'vuex';

export const state = (): State => ({
  stopWatch: {
    timer: null,
    time: 0,
    state: 'paused',
  },
  countDown: {
    timer: null,
    timeLeft: 0,
    state: 'paused',
    breakLength: 90,
    breakLengthSetting: 90,
  },
});

export const getters = {
  formattedElapsedTime(state: State): string {
    const date: Date = new Date(0);
    date.setSeconds(state.stopWatch.time);
    const utc: string = date.toUTCString();
    return utc.substring(utc.indexOf(':') - 2, 25);
  },
  formattedBreakTime(state: State): string {
    const date: Date = new Date(0);
    date.setSeconds(state.countDown.timeLeft);
    const utc: string = date.toUTCString();
    return utc.substring(utc.indexOf(':') + 1, 25);
  },
  bothRunning(state: State): boolean {
    // eslint-disable-next-line prettier/prettier
    if (state.stopWatch.state === 'running' && state.countDown.state === 'running')
      return true;
    return false;
  },
  bothPaused(state: State): boolean {
    // eslint-disable-next-line prettier/prettier
    if (state.stopWatch.state === 'paused' && state.countDown.state === 'paused')
      return true;
    return false;
  },
};

export const mutations = {
  setBreakLength(state: State, breakLength: number) {
    state.countDown.breakLength = breakLength;
    state.countDown.breakLengthSetting = breakLength;
  },
  startSW(state: State): void {
    state.stopWatch.state = 'running';
    state.stopWatch.timer = setInterval(() => {
      state.stopWatch.time += 1;
      // document.title = this.formattedElapsedTime;
    }, 1000);
  },
};

export const actions = {
  startStop({ commit, state }: ActionContext<State, any>): void {
    // initial state --> start timer
    commit('startSW');
    if (!state.stopWatch.timer || state.stopWatch.state === 'paused') {
      commit('startSW');
      if (state.countDown.timeLeft > 0) commit('startCDRecursion');
    } else {
      // stop (pause) all timers
      commit('stopSW');
      if (state.countDown.timer) commit('stopCD');
    }
  },
  startStopBreak({ commit, getters, state }: ActionContext<State, any>): void {
    /* if (state.countDown.timeLeft > 0) {
      // break timer already running
      if (getters.bothPaused) {
        // both timers paused => continue stopwatch and countdown
         state.startSW();
           state.startCDRecursion();

        // commit('startSW')
      } else if (state.countDown.state === 'running') {
        state.stopCD();
      } else {
        state.startCDRecursion();
      }
    } else if (getters.bothPaused) {
      state.startSW();
      state.startCD();
    } else if (getters.bothRunning) {
      state.stopCD();
    } else {
      state.startCD();
    }
    */
  },
};
