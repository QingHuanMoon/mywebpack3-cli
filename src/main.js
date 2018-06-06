window.jQuery = window.$ = require('jquery')
window.axios = require('axios')
window.store = require('./vuex/index').default
window._ = require('lodash')

require('./assets/vendor/rem')
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueTouch from 'vue-touch'
Vue.use(VueCookie).use(VueTouch, {name: 'v-touch'})

require('uikit')
require('./assets/js/pc')

import 'uikit/dist/css/uikit.css'

import './assets/less/index.less'
