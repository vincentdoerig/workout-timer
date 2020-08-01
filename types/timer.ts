export interface StopWatch {
  timer: any;
  time: number;
  state: string;
}
export interface CountDown {
  timer: any;
  timeLeft: number;
  state: string;
  breakLength: number;
  breakLengthSetting: number;
}
export interface State {
  stopWatch: StopWatch;
  countDown: CountDown;
}
