import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCZ37cZNEHXSBLcS0CvPAM7CK-vpGUJmng',
    libraries: 'places'
  },
  installComponents: true
})
