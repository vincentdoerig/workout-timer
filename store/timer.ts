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
    state.countDown.breakLength = parseInt(breakLength);
  },
  startSW(state: State): void {
    state.stopWatch.state = 'running';
  },
  setSW(state: State, payload: { property: string; value: any }) {
    state.stopWatch[payload.property] = payload.value;
  },
  setCD(state: State, payload: { property: string; value: any }) {
    state.countDown[payload.property] = payload.value;
  },
  increaseSWInterval(state: State) {
    state.stopWatch.time += 1;
  },
  setSWInterval(state: State, interval: number) {
    state.stopWatch.timer = interval;
  },
  clearSWInterval(state: State) {
    clearInterval(state.stopWatch.timer);
  },
  decreaseCDInterval(state: State) {
    state.countDown.timeLeft -= 1;
  },
  setCDInterval(state: State, interval: number) {
    state.countDown.timer = interval;
  },
  clearCDInterval(state: State) {
    clearInterval(state.countDown.timer);
  },
};
