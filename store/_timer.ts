/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import Vuex from 'vuex';

interface StoreType {
  mm: Stopwatch;
}
// Declare empty store first
const store = new Vuex.Store<StoreType>({});

interface stopWatch {
  timer: any;
  time: number;
  state: string;
}

@Module({
  name: 'stopwatch',
  stateFactory: true,
  namespaced: true,
  dynamic: true,
  store,
})
export default class Stopwatch extends VuexModule {
  public swState: stopWatch = {
    timer: null,
    time: 0,
    state: 'paused',
  };

  get formattedElapsedTime(): string {
    const date: Date = new Date(0);
    date.setSeconds(this.swState.time / 1000);
    const utc: string = date.toUTCString();
    return utc.substr(utc.indexOf(':') - 2, 8);
  }

  @Mutation
  init(data: number): void {
    console.log('hellllloooo');
    this.swState.time = data;
  }

  @Mutation
  start(): void {
    console.log('hello');
    state.state = 'running';
    state.timer = setInterval(() => {
      state.time += 1000;
    }, 1000);
  }

  @Mutation
  stop(): void {
    state.state = 'paused';
    clearInterval(state.timer);
  }

  @Mutation
  reset(): void {
    this.swState.time = 0;
    this.swState.state = 'paused';
    this.swState.timer = null;
  }

  // initialize(): void {
  //   const data: string = localStorage.getItem('sw-start');
  //   console.log(data);
  // }
  @Action
  startStop({ commit }): void {
    console.log('hello');
    commit('init', 33);
    // // initial state --> start timer
    // if (!this.swState.time || this.swState.state === 'paused') this.start();
    // // stop (pause) all timers
    // else this.stop(this.swState);
    // // if (this.breakTimer) {
    // //   this.onBreak = false;
    // //   clearTimeout(this.breakTimer);
    // // }
    // // else this.startStopBreak()
  }
}
