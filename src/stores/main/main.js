import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => ({
    navTabs: []
  }),
  actions: {
    addNavTabAction(tab) {
      this.navTabs.push(tab)
    },
    removeNavTabAction(value) {
      const index = this.navTabs.findIndex((item) => item.path === value.path)
      this.navTabs.splice(index, 1)
    },
    clearNavTabsAction() {
      this.navTabs = []
    }
  }
})

export default useMainStore
