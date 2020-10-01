import { mapState } from 'vuex'

const baseMixin = {
  computed: {
    ...mapState({
      layout: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixedSidebar: state => state.app.fixedSidebar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      isMobile: state => state.app.isMobile,
      sideCollapsed: state => state.app.sideCollapsed,
      multiTab: state => state.app.multiTab
    }),
    isTopMenu () {
      return this.layout === 'topmenu'
    }
  },
  methods: {
    isSideMenu () {
      return !this.isTopMenu
    }
  }
}
const searchMixin = {
  data () {
    return {
      expand: false // 展开收起
    }
  },
  methods: {
    handleExpand () {
      this.expand = !this.expand
    }
  }
}
export { baseMixin, searchMixin }
