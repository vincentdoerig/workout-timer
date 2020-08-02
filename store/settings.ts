interface Settings {
  showTitle: boolean;
}

export const state = (): Settings => ({
  showTitle: false,
});

export const mutations = {
  toggleTitle(state: Settings): void {
    state.showTitle = !state.showTitle;
  },
  setTitle(state: Settings, value: boolean): void {
    state.showTitle = value;
  }
}
