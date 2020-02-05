const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '',
      
    },
    curindex: {
      type: String,
      value: ''  
    },
    // hasSearchWidget: {
    //   type: Boolean,
    //   value: false
    // }
  },
  data: {
    // 状态栏高度
    statusBarHeight: app.globalData.sysinfo.statusHeight + 'px',
    // 顶部默认导航高度
    navigationBarHeight: (app.globalData.sysinfo.statusHeight + app.globalData.nav_default_height) + 'px'
  },

  methods: {
  }
})