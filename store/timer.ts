import { State } from '@/types/timer';

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
};
