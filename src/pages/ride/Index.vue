<template>
  <q-page>
    <configuratorError v-if="showError" :error="estimateError" @closeError="showError = false, estimateError= null, activeSelectRide = true, showSelect = true, loadingOrder = false, clearRide()"/>

    <q-btn
      dense
      icon="img:../statics/order_icons/arrow.svg"
      class="menuBtn"
      v-show="showBackBtn"
      @click="disableInputs()"
    />
    <q-btn
      dense
      icon="img:../statics/order_icons/arrow.svg"
      class="menuBtn"
      v-show="showBackBtnMapSelect"
      @click="backSelect()"
    />

    <div class="point" :class="{ point_active: activePoint}" v-show="startChooseMarker && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad && !showStartSearch || from.marker && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad && !showStartSearch || to.marker && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad && !showStartSearch"></div>
    <div class="getGeo flex items-center justify-center" v-show="showSelect === true && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad" @click="geoUpdate()"><img src="../../statics/order_icons/plane.svg" alt=""></div>
    <div class="getGeoOrder flex items-center justify-center" v-show="showOrder === true && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad" @click="myGeo()"><img src="../../statics/order_icons/plane.svg" alt=""></div>
    <div class="getGeo flex items-center justify-center" :class="{ getGeoOrder: this.status && this.status.ride.ride_status_name === 'driving' || this.status && this.status.ride.ride_status_name === 'waiting'}" v-show="geoOnRide" @click="getGeoOnRide()"><img src="../../statics/order_icons/plane.svg" alt=""></div>

    <div
      class="google-map"
      :class="{
        mapPicMap: mapPick === true,
        mapOrder: showOrder === true || loadingOrder === true,
        mapStartSearch: showStartSearch === true && showSelect === false,
        searchMap: mapSearch === true && showSelect === false && showStartSearch === false && showOrder === false,
        assignedMap: mapAssigned === true && showSelect === false && showStartSearch === false && showOrder === false,
        inRoadMap: mapInRoad === true && showSelect === false && showStartSearch === false && showOrder === false,
        failedMap: mapFailed === true && showSelect === false && showStartSearch === false && showOrder === false
       }"
      ref="googleMap">
      <template v-if="Boolean(this.google) && Boolean(this.map)">
        <slot
          :google="google"
          :map="map"
        />
     </template>
    </div>

    <div :class="{page_background: activeSelectRide}" v-show="!mapPick && showSelect && !mapSearch && !mapAssigned && !mapAssigned && !mapInRoad" @click="disableInputs()">
      <q-card class="selectRide" :class="{selectRide_active: activeSelectRide}" @click.stop>
        <div class="inputBlock flex justify-between items-center">
          <inputSteps
            :isTo="to.step"
            :isFrom="from.step"
          />
          <div class="toFromInputs">
            <q-input
              borderless
              v-model="from.text"
              class="input__from"
              style="padding-left: 15px"
              @input="searchByInputs(from.text,'from')"
              @focus="from.showClear = true"
              @blur="from.showClear = false"
              :readonly="readMode"
              ref="code1"
              @click="active('from')"
              :placeholder="$t('addressFrom')">
              <div class="clear flex justify-center items-center" @click="clear('from')" v-if="from.showClear === true" style="padding: 0 10px">
                <img src="../../statics/order_icons/clear.svg" alt="">
              </div>
            </q-input>
            <div class="line"></div>
            <q-input
              borderless
              v-model="to.text"
              class="input__to"
              style="padding-left: 15px"
              :readonly="readMode"
              @input="searchByInputs(to.text, 'to')"
              @focus="to.showClear = true"
              @blur="to.showClear = false"
              @click="active('to')"
              ref="inputTo"
              :placeholder="$t('addressTo')">
              <div class="clear flex justify-center items-center" @click="clear('to')" v-if="to.showClear === true" style="padding: 0 10px">
                <img src="../../statics/order_icons/clear.svg" alt="">
              </div>
            </q-input>
          </div>
        </div>
        <q-btn class="controls__choose-btn q-mb-md" v-if="from.step && activeSelectRide" flat :label="$t('onMapBtn')" no-caps @click="pointOnMap('from')"/>
        <q-btn class="controls__choose-btn q-mb-md" v-if="to.step && activeSelectRide" flat :label="$t('onMapBtn')" no-caps @click="pointOnMap('to')"/>
        <inputTipsArea
          :isActive="activeSelectRide"
          :toTips="to.stringOptions"
          :fromTips="from.stringOptions"
          @clickOnTip="chooseAdress"
        />
      </q-card>
    </div>
    <mapPickInfo
      v-if="mapPick"
      :isTo="to.marker"
      :isFrom="from.marker"
      :address="markerAddress"
      @pickonfirmed="closePick"
    />
    <loadingСonfigurator
      v-if="loadingOrder"
      :textTo="this.to.text"
      :textFrom="this.from.text"
      @editRide="showOrder = false, showSelect = true, hideBack(), clearRide(), loadingOrder = false, active('from')"
      @back="backToPage()"
    />
    <orderСonfigurator
      v-if="showOrder"
      :textTo="this.to.text"
      @ordered="hideBack(), showRideLine = true, hideRide(), showOrder = false, showStartSearch = true, showSelect = false"
      @editRide="from.step = true, to.step = false, from.marker = false, to.marker = false, showOrder = false, showSelect = true, hideBack(), clearRide(), active('from')"
      @back="backToPage()"
      @resendRide="goConfigurate()"
      @resendEstimate="from.step = true, to.step = false, from.marker = false, to.marker = false, hideBack(), clearRide(), active('from'), showOrder = false, showSelect = true, continueConfigurate()"
      :textFrom="this.from.text"
      :to="this.to"
      :from="this.from"
      :uuid="this.uuid"/>
    <searchStart v-if="showStartSearch"/>
    <loadingAssigned v-if="loadAssigned" />
    <loadingExpect v-if="loadExpect" />
    <loadingRoad v-if="loadRoad" />
    <div v-if="status">
      <searchCar v-if="this.status.ride.ride_status_name === 'searching' || this.status.ride.ride_status_name === 'scheduling' || this.status.ride.ride_status_name === 'scheduled'" @canceled="ifRideCanceled()"/>
      <carAssigned v-if="this.status.ride.ride_status_name === 'driving'" @canceled="ifRideCanceled()" />
      <driverExpect v-if="this.status.ride.ride_status_name === 'waiting'" @canceled="ifRideCanceled()" />
      <road v-if="this.status.ride.ride_status_name === 'transporting'" @canceled="ifRideCanceled()" />
      <endRide v-if="this.status.ride.ride_status_name === 'complete'" @completeRide="ifEndRide()" />
      <noDriver v-if="this.status.ride.ride_status_name === 'failed' || this.status.ride.ride_status_name === 'expired'" @noDriver="ifNoDriver()"  />
      <driverCanceled v-if="this.status.ride.ride_status_name === 'canceled'" @driverCanceled="ifDriverCanceled()"  />
    </div>
  </q-page>
</template>

<script>
import searchCar from '../../components/ride/search/searchCar'
import searchStart from '../../components/ride/search/searchStart'
import carAssigned from '../../components/ride/assigned/carAssigned'
import loadingAssigned from '../../components/ride/assigned/loadingAssigned'
import driverExpect from '../../components/ride/expect/driverExpect'
import loadingExpect from '../../components/ride/expect/loadingExpect'
import road from '../../components/ride/road/road'
import configuratorError from '../../components/popUps/configuratorError'
import loadingRoad from '../../components/ride/road/loadingRoad'
import endRide from '../../components/ride/endRide'
import noDriver from '../../components/popUps/noDriver'
import driverCanceled from '../../components/popUps/driverCanceled'
import orderСonfigurator from '../../components/ride/configurator/orderСonfigurator'
import loadingСonfigurator from '../../components/ride/configurator/loadingСonfigurator'
import inputTipsArea from '../../components/ride/inputTipsArea'
import mapPickInfo from '../../components/ride/mapPickInfo'
import inputSteps from '../../components/ride/inputSteps'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageRide',
  data () {
    return {
      apiKey: 'AIzaSyDkB8ULDjHGj4bCqRDVI3aCOBcjOpcFv2w',
      google: null,
      map: null,
      marker: null,
      bounds: null,
      userLocation: null,
      driverLocation: null,
      directionsRenderer: null,
      directionsService: null,
      startPos: {
        lat: null,
        lng: null
      },
      watcherId: null,
      interpolateInterval: null,
      activePoint: false,
      mapPick: false,
      startChooseMarker: true,
      activeSelectRide: false,
      showBackBtn: false,
      showBackBtnMapSelect: false,
      readMode: true,
      markerAddress: null,
      geoOnRide: false,
      carIsTracking: true,
      userInCar: false,
      showMapPick: false,
      showSelect: true,
      showOrder: false,
      showError: false,
      estimateError: null,
      loadingOrder: false,
      loadAssigned: false,
      loadExpect: false,
      loadRoad: false,
      showStartSearch: false,
      showRideLine: true,
      uuid: null,
      markerSearchingTimout: null,
      prevStatusDelay: 0,
      currentStatusDelay: 0,

      from: {
        // for map
        search: null,
        step: true,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        utc_offset: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      },

      to: {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      },

      mapSearch: false,
      mapAssigned: false,
      mapInRoad: false,
      mapFailed: false
    }
  },
  computed: {
    ...mapGetters({
      status: 'ride/status',
      user: 'user/user/user',
      rideStatus: 'user/user/ride_status',
      card: 'user/user/card',
      cards: 'user/payment/cards',
      companies: 'user/user/companies',
      default_company: 'user/user/default_company'
    }),
    selectCard () {
      if (this.card && this.cards) {
        return this.cards.find(card => card.card_id === this.card.card_id)
      } else {
        return false
      }
    },
    selectCompany () {
      if (this.default_company && this.companies) {
        return this.companies.find(company => company.uuid === this.default_company.uuid)
      } else {
        return false
      }
    }
  },
  watch: {
    rideStatus (newValue, oldValue) {
      if (this.rideStatus) {
        if (this.rideStatus.ride_status_name === 'searching' || this.status.ride.ride_status_name === 'scheduling' || this.status.ride.ride_status_name === 'scheduled') {
          if (this.marker) {
            this.map.setCenter(this.marker.getPosition())
            this.map.setZoom(17)
          }
          this.geoOnRide = true
          this.showStartSearch = true
          this.loadingOrder = false
          this.showOrder = false
          this.calcRouteIfCountinue()
          this.continueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
          this.clearWatcher()
          this.hideBack()
          this.showSelect = false
        }
        if (this.rideStatus.ride_status_name === 'driving') {
          this.loadAssigned = true
          this.geoOnRide = true
          this.calcRouteIfCountinue()
          this.continueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
          this.clearWatcher()
          this.hideBack()
          this.mapAssigned = true
          this.showSelect = false
        }
        if (this.rideStatus.ride_status_name === 'waiting') {
          this.loadExpect = true
          this.geoOnRide = true
          this.calcRouteIfCountinue()
          this.continueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
          this.clearWatcher()
          this.hideBack()
          this.mapAssigned = true
          this.showSelect = false
        }
        if (this.rideStatus.ride_status_name === 'transporting') {
          this.loadRoad = true
          this.geoOnRide = true
          this.calcRouteIfCountinue()
          this.continueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
          this.clearWatcher()
          this.hideBack()
          this.mapInRoad = true
          this.showSelect = false
        }
      } else {
        this.mapSearch = false
        this.mapAssigned = false
        this.mapInRoad = false
      }
    },
    status (newValue, oldValue) {
      if (this.status) {
        if (this.status.ride.ride_status_name === 'searching' || this.status.ride.ride_status_name === 'scheduling' || this.status.ride.ride_status_name === 'scheduled') {
          if (!oldValue) {
            if (this.marker) {
              this.map.setCenter(this.marker.getPosition())
              this.map.setZoom(17)
            }
            this.geoOnRide = true
            this.loadingOrder = false
            this.showOrder = false
          }
          this.showStartSearch = false
          this.mapSearch = true
          this.carIsTracking = true
        } else {
          this.mapSearch = false
        }
        if (this.status.ride.ride_status_name === 'driving' || this.status.ride.ride_status_name === 'waiting') {
          this.carIsTracking = true
          sessionStorage.clear()
          let driverCoords = new this.google.maps.LatLng(this.status.vehicle.location.latitude, this.status.vehicle.location.longitude)
          if (this.driverLocation) {
            this.prevStatusDelay = (this.prevStatusDelay) ? this.currentStatusDelay : Date.now()
            this.currentStatusDelay = Date.now()
            const interval = this.currentStatusDelay - this.prevStatusDelay
            clearInterval(this.interpolateInterval)
            let count = 0
            this.interpolateInterval = setInterval(() => {
              count = (count + 1) % 1000
              let position = this.google.maps.geometry.spherical.interpolate(this.driverLocation.getPosition(), driverCoords, count / interval)
              this.driverLocation.setPosition(position)
            }, 30)
            if (!this.bounds || newValue.ride.ride_status_name !== oldValue.ride.ride_status_name) {
              this.bounds = new this.google.maps.LatLngBounds()
              this.bounds.extend(driverCoords)
              if (this.marker) this.bounds.extend(this.marker.getPosition())
              this.map.fitBounds(this.bounds)
            }
          } else {
            this.driverLocation = new this.google.maps.Marker({
              position: driverCoords,
              map: this.map,
              icon: {
                url: '../../statics/order_icons/driver.svg',
                scaledSize: new this.google.maps.Size(100, 40)
              }
            })
            this.directionsRenderer.setOptions({
              preserveViewport: true
            })
          }
          this.loadExpect = false
          this.loadAssigned = false
          this.mapAssigned = true
          this.showRideLine = true
          this.geoOnRide = true
        } else {
          this.mapAssigned = false
        }
        if (this.status.ride.ride_status_name === 'transporting') {
          let driverCoords = new this.google.maps.LatLng(this.status.vehicle.location.latitude, this.status.vehicle.location.longitude)
          this.clearWatcher()
          if (this.marker) this.marker.setMap(null)
          this.from.directionMarker.setMap(null)
          this.userInCar = true
          if (this.driverLocation) {
            if (newValue.ride.ride_status_name !== oldValue.ride.ride_status_name || this.carIsTracking) {
              this.map.setCenter(this.driverLocation.getPosition())
              this.map.setZoom(17)
            }
            clearInterval(this.interpolateInterval)
            let count = 0
            this.interpolateInterval = setInterval(() => {
              count = (count + 1) % 1000
              let position = this.google.maps.geometry.spherical.interpolate(this.driverLocation.getPosition(), driverCoords, count / 300)
              this.driverLocation.setPosition(position)
            }, 30)
          } else {
            this.driverLocation = new this.google.maps.Marker({
              position: driverCoords,
              map: this.map,
              icon: {
                url: '../../statics/order_icons/driver.svg',
                scaledSize: new this.google.maps.Size(100, 40)
              }
            })
            this.map.setCenter(this.driverLocation.getPosition())
            this.map.setZoom(17)
          }
          this.loadRoad = false
          this.mapInRoad = true
          this.geoOnRide = true
        } else {
          this.mapInRoad = false
        }
        if (this.status.ride.ride_status_name === 'failed' || this.status.ride.ride_status_name === 'expired' || this.status.ride.ride_status_name === 'canceled') {
          this.showStartSearch = false
          this.mapFailed = true
          this.geoOnRide = false
        } else {
          this.mapFailed = false
        }
      } else {
        this.mapSearch = false
        this.mapAssigned = false
        this.mapAssigned = false
        this.mapInRoad = false
      }
    }
  },

  async mounted () {
    this.hideBack()
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      libraries: ['places'],
      language: this.user.lang
    })
    this.google = googleMapApi
    this.$nextTick(() => this.initializeMap())
    this.$nextTick(() => {
      if (sessionStorage.getItem('from') && sessionStorage.getItem('to') && sessionStorage.getItem('car_type') && !this.rideStatus) {
        this.startChooseMarker = false
        this.clearWatcher()
        this.from = JSON.parse(sessionStorage.getItem('from'))
        this.to = JSON.parse(sessionStorage.getItem('to'))
        this.continueConfigurate()
      }
    })
    this.$nextTick(() => { this.getUser() })
  },

  beforeRouteLeave (to, from, next) {
    if (this.watcherId) this.clearWatcher()
    next()
  },

  methods: {
    ...mapActions({
      sendCoords: 'ride/sendCoords',
      continueRide: 'ride/continueRide',
      getUser: 'user/user/getUser'
    }),
    active (type) {
      this.showBack()
      this.activeSelectRide = true
      this.startChooseMarker = false
      this.readMode = false
      this.from.step = (type === 'from')
      this.to.step = (type === 'to')
      this.showMapPick = true
    },
    disableInputs () {
      sessionStorage.clear()
      this.hideBack()
      this.activeSelectRide = false
      this.readMode = true
      this.showMapPick = false
      this.from.step = false
      this.to.step = false
      this.showOrder = false
      this.loadingOrder = false
      if (this.marker) this.marker.setMap(this.map)
      this.showSelect = true
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.clearRide()
      this.to = {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      }
      this.geoOnRide = false
      this.carIsTracking = true
      this.userInCar = false
      this.from.directionMarker = null
      this.driverLocation = null
      this.startChooseMarker = true
      this.showMapPick = false
      this.showStartSearch = false
      this.uuid = null
      this.showSelect = true
      this.hideBack()
      this.map.setZoom(17)
      this.geoUpdate()
    },
    backSelect () {
      this.mapPick = false
      this.from.marker = false
      this.to.marker = false
      this.showBackBtnMapSelect = false
      this.activeSelectRide = true
      this.showBackBtn = true
    },
    pointOnMap (type) {
      this.activeSelectRide = false
      this.mapPick = true
      this.readMode = true
      this[type].marker = true
      this.showBackBtn = false
      this.showBackBtnMapSelect = true
    },
    closePick (type) {
      this.activeSelectRide = true
      if (type === 'from') this.from.step = false
      this.to.step = (type === 'from')
      this[type].marker = false
      this.mapPick = false
      this.showBackBtnMapSelect = false
      this.showBackBtn = true
      if (this.to.lat && this.from.lat) this.goConfigurate()
    },
    clear (type) {
      this[type].text = ''
      this[type].search = null
      this[type].stringOptions = []
    },

    initializeMap () {
      if (this.rideStatus) this.continueRide({ provider: this.rideStatus.provider, uuid: this.rideStatus.uuid })
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
      this.watcherId = navigator.geolocation.watchPosition(this.watchUserLocation)
      this.geoUpdate()
      const config = {
        center: { lat: 55.75222, lng: 37.61556 },
        zoom: 10,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' }
            ]
          }
        ]
      }
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
        mapContainer, config
      )
      this.directionsService = new this.google.maps.DirectionsService()
      this.directionsRenderer = new this.google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        InfoWindowOptions: {
          disableAutoPan: true
        }
      })
      this.map.addListener('dragstart', async (e) => {
        this.activePoint = true
        if (this.status && this.status.ride.ride_status_name === 'transporting') this.carIsTracking = false
      })
      this.map.addListener('dragend', async (e) => {
        this.activePoint = false
        if (this.markerSearchingTimout) {
          clearTimeout(this.markerSearchingTimout)
          this.markerSearchingTimout = setTimeout(() => {
            this.markerSearchingTimout = 0
            this.loadPlaceByPicker()
          }, 1000)
        }

        this.loadPlaceByPicker()
      })
      this.autocomplete = new this.google.maps.places.AutocompleteService()
      this.service = new this.google.maps.places.PlacesService(this.map)
      this.geocoder = new this.google.maps.Geocoder()
      this.calcRouteIfCountinue()
      this.calcRouteIfOtherPage()
    },

    loadPlaceByPicker () {
      let type = (this.to.marker) ? 'to' : 'from'

      if ((this.startChooseMarker || this.from.marker || this.to.marker) && !this.markerSearchingTimout) {
        let coords = this.map.getCenter()
        this[type].cordByPicking = coords
        this.geocoder.geocode({
          location: coords
        }, (results, status) => {
          if (status === 'OK') {
            if (!this.startChooseMarker) this.searchByInputs(results[0].formatted_address, type)
            this.chooseMarker(results[0], type)

            // задержка в 1 секунду
            this.markerSearchingTimout = setTimeout(() => {}, 1000)
          }
        })
      }
    },

    // callback for navigator func
    geoSuccess (position) {
      let image = {
        url: '../../statics/order_icons/userLocation.svg',
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(24, 24)
      }
      this.map.setZoom(17)
      this.map.setCenter(new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude))
      this.marker = new this.google.maps.Marker({ position: new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude), map: this.map, icon: image })
    },
    calcRouteIfCountinue () {
      if (this.rideStatus) {
        var start = this.rideStatus.position.latitude + ',' + this.rideStatus.position.longitude
        var end = this.rideStatus.destination.latitude + ',' + this.rideStatus.destination.longitude

        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }
        this.directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setOptions({
              polylineOptions: {
                visible: false
              }
            })
            this.directionsRenderer.setOptions({
              preserveViewport: false
            })
            if (this.to.directionMarker && this.from.directionMarker) {
              this.to.directionMarker.setMap(null)
              this.from.directionMarker.setMap(null)
            }
            this.to.directionMarker = null
            this.from.directionMarker = null
            this.makeDirectionPoints(
              new this.google.maps.LatLng(this.rideStatus.position.latitude, this.rideStatus.position.longitude),
              new this.google.maps.LatLng(this.rideStatus.destination.latitude, this.rideStatus.destination.longitude)
            )
            this.directionsRenderer.setDirections(result)
          }
        })
      }
    },
    calcRouteIfOtherPage () {
      if (this.status) {
        var start = this.status.ride.position.latitude + ',' + this.status.ride.position.longitude
        var end = this.status.ride.destination.latitude + ',' + this.status.ride.destination.longitude

        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }
        this.directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setOptions({
              polylineOptions: {
                visible: false
              }
            })
            this.directionsRenderer.setOptions({
              preserveViewport: false
            })

            this.makeDirectionPoints(
              new this.google.maps.LatLng(this.status.ride.position.latitude, this.status.ride.position.longitude),
              new this.google.maps.LatLng(this.status.ride.destination.latitude, this.status.ride.destination.longitude)
            )
            this.directionsRenderer.setDirections(result)
          }
        })
      }
    },
    ifRideCanceled () {
      clearInterval(this.interpolateInterval)
      if (this.marker) this.marker.setMap(this.map)
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.clearRide()
      this.to = {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      }
      this.from.directionMarker = null
      this.geoOnRide = false
      this.carIsTracking = true
      this.userInCar = false
      this.driverLocation = null
      this.startChooseMarker = true
      this.showMapPick = false
      this.showStartSearch = false
      this.uuid = null
      this.showSelect = true
      this.hideBack()
      this.map.setZoom(17)
      this.geoUpdate()
    },
    ifEndRide () {
      clearInterval(this.interpolateInterval)
      if (this.marker) this.marker.setMap(this.map)
      this.showSelect = true
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.clearRide()
      this.to = {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      }
      this.geoOnRide = false
      this.carIsTracking = true
      this.userInCar = false
      this.from.directionMarker = null
      this.driverLocation = null
      this.startChooseMarker = true
      this.showMapPick = false
      this.showStartSearch = false
      this.uuid = null
      this.showSelect = true
      this.hideBack()
      this.map.setZoom(17)
      this.geoUpdate()
    },
    ifNoDriver () {
      clearInterval(this.interpolateInterval)
      this.showSelect = true
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.hideBack()
      this.mapFailed = false
      this.continueConfigurate()
    },
    ifDriverCanceled () {
      clearInterval(this.interpolateInterval)
      if (this.marker) this.marker.setMap(this.map)
      this.showSelect = true
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.clearRide()
      this.to = {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      }
      this.geoOnRide = false
      this.carIsTracking = true
      this.userInCar = false
      this.from.directionMarker = null
      this.driverLocation = null
      this.startChooseMarker = true
      this.showMapPick = false
      this.uuid = null
      this.showSelect = true
      this.hideBack()
      this.map.setZoom(17)
      this.geoUpdate()
    },
    clearWatcher () {
      navigator.geolocation.clearWatch(this.watcherId)
    },

    geoUpdate () {
      navigator.geolocation.clearWatch(this.watcherId)
      navigator.geolocation.getCurrentPosition((position) => {
        let latLng = new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        this.map.setCenter(latLng)
        if (this.marker) this.marker.setPosition(latLng)
        this.map.setZoom(17)
        let coords = this.map.getCenter()
        this.geocoder.geocode({
          location: coords
        }, (results, status) => {
          if (status === 'OK') {
            this.searchByInputs(results[0].formatted_address, 'from')
            this.chooseMarker(results[0], 'from')
          }
        })
      })
      this.watcherId = navigator.geolocation.watchPosition(this.watchUserLocation)
    },

    // callback for navigator func
    watchUserLocation (position) {
      let latLng = new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      if (this.marker) this.marker.setPosition(latLng)
    },

    myGeo () {
      navigator.geolocation.clearWatch(this.watcherId)
      navigator.geolocation.getCurrentPosition(async (position) => {
        let latLng = new this.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        this.map.setCenter(latLng)
        if (this.marker) this.marker.setPosition(latLng)
        this.map.setZoom(17)
      })
      this.watcherId = navigator.geolocation.watchPosition(this.watchUserLocation)
    },

    getGeoOnRide () {
      if (!this.userInCar) this.myGeo()
      else {
        this.carIsTracking = true
      }
    },

    calcRoute () {
      if (this.from.search && this.to.search) {
        var start = this.from.search.geometry.location.lat() + ',' + this.from.search.geometry.location.lng()
        var end = this.to.search.geometry.location.lat() + ',' + this.to.search.geometry.location.lng()

        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }
        this.directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setOptions({
              polylineOptions: {
                visible: true,
                strokeColor: '#816FF6',
                strokeWeight: 5
              }
            })
            this.directionsRenderer.setOptions({
              preserveViewport: false
            })
            this.to.directionMarker = null
            this.from.directionMarker = null
            this.makeDirectionPoints(this.from.search.geometry.location, this.to.search.geometry.location)
            this.directionsRenderer.setDirections(result)
          }
        })
      }
    },
    calcRouteContinue () {
      if (this.from && this.to) {
        var start = this.from.lat + ',' + this.from.lng
        var end = this.to.lat + ',' + this.to.lng

        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }
        this.directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setOptions({
              polylineOptions: {
                visible: true,
                strokeColor: '#816FF6',
                strokeWeight: 5
              }
            })
            this.directionsRenderer.setOptions({
              preserveViewport: false
            })
            if (this.to.directionMarker && this.from.directionMarker) {
              this.to.directionMarker.setMap(null)
              this.from.directionMarker.setMap(null)
            }
            this.to.directionMarker = null
            this.from.directionMarker = null
            this.makeDirectionPoints(
              new this.google.maps.LatLng(this.from.lat, this.from.lng),
              new this.google.maps.LatLng(this.to.lat, this.to.lng)
            )
            this.directionsRenderer.setDirections(result)
          }
        })
      }
    },

    chooseMarker (adress, type) {
      this[type].search = adress

      let streetName = adress.address_components.find(c => { return c.types[0] === 'route' })
      let streetNumber = adress.address_components.find(c => { return c.types[0] === 'street_number' })
      this.markerAddress = (streetName && streetNumber) ? (streetName.long_name + ', ' + streetNumber.long_name) : (
        adress.address_components.find(c => { return c.types[0] === 'bus_station' }) ||
        adress.address_components.find(c => { return c.types[0] === 'establishment' }) ||
        adress.address_components.find(c => { return c.types[0] === 'point_of_interest' }) ||
        adress.address_components.find(c => { return c.types[0] === 'transit_station' }) ||
        adress.address_components.find(c => { if (c.long_name !== 'Unnamed Road') return c.types[0] === 'route' }) ||
        adress.address_components.find(c => { return c.types[1] === 'political' }) ||
          { long_name: undefined }
      ).long_name
      this.chooseAdress(adress, type, 'marker', this.markerAddress)
    },

    chooseAdress (adress, type, caller, street) {
      this.service.getDetails({
        placeId: adress.place_id,
        fields: ['name', 'address_components', 'geometry', 'utc_offset_minutes']
      }, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          let components = results.address_components
          if (type === 'from') this.from.utc_offset = results.utc_offset_minutes / 60

          if (components) {
            this[type].city = (
              components.find(c => { return c.types[0] === 'locality' }) ||
              components.find(c => { return c.types[0] === 'administrative_area_level_2' }) ||
              components.find(c => { return c.types[0] === 'postal_town' }) ||
              { long_name: 'Not found' }
            ).long_name

            this[type].country = (
              components.find(c => { return c.types[0] === 'country' }) ||
              { long_name: 'Not found' }
            ).long_name

            this[type].lat = results.geometry.location.lat()
            this[type].lng = results.geometry.location.lng()
            this[type].name = results.name
            this[type].postal_code = (
              components.find(c => { return c.types[0] === 'postal_code' }) ||
              { long_name: 'Not found' }
            ).long_name

            this[type].street_name = (
              components.find(c => { return c.types[0] === 'route' }) ||
              { long_name: 'Not found' }
            ).long_name

            this[type].street_number = (
              components.find(c => { return c.types[0] === 'street_number' }) ||
              { long_name: 'Not found' }
            ).long_name
          }

          this[type].search = results
          this[type].text = street || components[1].long_name + ', ' + components[0].long_name

          if (!this.startChooseMarker) this[type].step = false
          this[type].stringOptions = []
          if (!this.startChooseMarker && type === 'from') this.to.step = true

          if (caller === 'input' && this.to.lat && this.from.lat) this.goConfigurate()
        }
      })
    },

    searchByInputs (value, type) {
      this.to.stringOptions = []
      this.from.stringOptions = []
      if (value) {
        this.autocomplete.getPlacePredictions({
          input: value,
          location: this.map.getCenter(),
          origin: this.map.getCenter(),
          radius: 25000
        }, (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            results.sort((a, b) => { return a.distance_meters - b.distance_meters })
            this[type].stringOptions = results
          }
        })
      }
    },
    goConfigurate () {
      sessionStorage.setItem('from', JSON.stringify(this.from))
      sessionStorage.setItem('to', JSON.stringify(this.to))
      this.activeSelectRide = false
      this.showSelect = false
      this.loadingOrder = true
      this.calcRoute()
      if (this.from.text && this.to.text) {
        this.sendCoords({ from: this.from, to: this.to, billing: this.selectCard.rebill_id || this.selectCompany.uuid || null })
          .then(response => {
            this.loadingOrder = false
            this.from.step = false
            this.to.step = false
            this.readMode = true
            this.showOrder = true
            this.uuid = response.data.uuid
          })
          .catch(error => {
            this.showError = true
            this.estimateError = error.response.data.message
          })
      }
    },
    continueConfigurate () {
      this.activeSelectRide = false
      this.showSelect = false
      if (!this.rideStatus) {
        this.loadingOrder = true
      }
      this.calcRouteContinue()
      if (this.from.text && this.to.text) {
        this.sendCoords({ from: this.from, to: this.to, billing: this.selectCard.rebill_id || this.selectCompany.uuid || null })
          .then(response => {
            this.loadingOrder = false
            this.from.step = false
            this.to.step = false
            this.readMode = true
            if (!this.status) this.showOrder = true
            this.uuid = response.data.uuid
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    makeDirectionPoints (coordFrom, coordTo) {
      if (!this.to.directionMarker) {
        this.to.directionMarker = new this.google.maps.Marker({
          position: coordTo,
          map: this.map,
          icon: {
            url: '../../statics/order_icons/pointFrom.svg',
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(15, 15),
            scaledSize: new this.google.maps.Size(45, 45)
          }
        })
      }
      if (!this.from.directionMarker) {
        this.from.directionMarker = new this.google.maps.Marker({
          position: coordFrom,
          map: this.map,
          icon: {
            url: '../../statics/order_icons/pointTo.svg',
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(15, 15),
            scaledSize: new this.google.maps.Size(24, 24)
          }
        })
      }
    },
    backToPage () {
      sessionStorage.clear()
      this.showOrder = false
      this.loadingOrder = false
      if (this.marker) this.marker.setMap(this.map)
      this.showSelect = true
      if (this.driverLocation) {
        this.driverLocation.setMap(null)
      }
      this.clearRide()
      this.to = {
        // for map
        search: null,
        step: false,
        marker: false,
        text: null,
        showClear: false,
        stringOptions: [],
        cordByPicking: null,
        directionMarker: null,
        // for request
        city: null,
        country: null,
        lat: null,
        lng: null,
        name: null,
        postal_code: null,
        street_name: null,
        street_number: null
      }
      this.geoOnRide = false
      this.carIsTracking = true
      this.userInCar = false
      this.from.directionMarker = null
      this.driverLocation = null
      this.startChooseMarker = true
      this.showMapPick = false
      this.showStartSearch = false
      this.uuid = null
      this.showSelect = true
      this.hideBack()
      this.map.setZoom(17)
      this.geoUpdate()
    },
    showBack () {
      this.$root.$emit('hideMenu')
      this.showBackBtn = true
    },
    hideBack () {
      this.$root.$emit('showMenu')
      this.showBackBtn = false
    },
    clearRide () {
      this.bounds = null
      if (this.driverLocation) this.driverLocation.setMap(null)
      if (this.to.directionMarker && this.from.directionMarker) {
        this.to.directionMarker.setMap(null)
        this.from.directionMarker.setMap(null)
      }
      this.directionsRenderer.set('directions', null)
      if (this.marker) this.map.setCenter(this.marker.getPosition())
    },
    hideRide () {
      if (this.showRideLine) {
        this.directionsRenderer.setOptions({
          polylineOptions: {
            visible: false
          }
        })
        this.directionsRenderer.setMap(this.map)
        this.showRideLine = false
      }
    }
  },
  components: {
    orderСonfigurator,
    loadingСonfigurator,
    inputTipsArea,
    inputSteps,
    mapPickInfo,
    searchCar,
    searchStart,
    carAssigned,
    loadingAssigned,
    driverExpect,
    loadingExpect,
    road,
    loadingRoad,
    endRide,
    configuratorError,
    noDriver,
    driverCanceled
  }
}
</script>

<style>
  .getGeo{
    width: 36px;
    height: 36px;
    background: #F8F8F8;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24), inset 0px 0.5px 0px rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    position: absolute;
    right: 15px;
    bottom: 28%;
    cursor: pointer;
    z-index: 2;
  }
  .getGeoOrder{
    width: 36px;
    height: 36px;
    background: #F8F8F8;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24), inset 0px 0.5px 0px rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    position: absolute;
    right: 15px;
    bottom: 48%;
    cursor: pointer;
    z-index: 2;
  }
  .google-map{
    width: 100%;
    height: calc(100% - 143px);
    position: absolute;
    top: 0;
  }
  .mapOrder{
    height: calc(100% - 290px);
  }
  .point{
    width: 36px;
    height: 72px;
    background: url(../../statics/order_icons/pin.svg) 50% 50% no-repeat;
    background-size: contain;
    display: block;
    position: absolute;
    top: 30%;
    left: 46%;
    z-index: 3;
  }
  .point_active{
    width: 36px;
    height: 79.5px;
    background: url(../../statics/order_icons/pin_active.svg) 50% 50% no-repeat;
    background-size: contain;
  }
  .page_background{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(25, 25, 25, 0.5);
  }
  .selectRide{
    position: absolute;
    width: 100%;
    background: #F8F8F8;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
  .selectRide_active{
    height: 90%;
  }
  .selectMapHeader{
    padding: 22px 20px 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
  .selectMapBtn{
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), inset 6px 6px 12px 0 #FDFDFD;
    text-align: center;
    border-radius: 24px;
    font-size: 14px;
    color: #688AF5;
    letter-spacing: -0.35px;
    font-weight: 600;
    background: #F8F8F8;
  }
  .inputBlock {
    padding: 20px 0 10px 20px;
  }
  .input__from, .input__to{
    width: calc(100% - 24px);
  }
  .clear{
    font-size: 0px;
    position: relative;
    z-index: 15;
  }
  .clear img{
    width: 16px;
  }
  .toFromInputs{
    width: calc(100% - 24px);
  }
  .line{
    width: calc(100% - 15px);
    height: 1px;
    background-color: #9B9B9B;
    margin-left: 15px;

  }
  .controls__choose-btn{
    background: #F8F8F8;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), inset 6px 6px 12px 0 #FDFDFD;
    border-radius: 8px;
    width: calc(100% - 40px);
    margin-left: 20px;
    font-size: 17px;
    color: #688AF5;
    letter-spacing: -0.35px;
    text-align: center;
  }
  .mapStartSearch{
    height: calc(100% - 164px);
  }
  .searchMap{
    height: calc(100% - 164px);
  }
  .assignedMap{
    height: calc(100% - 301px);
  }
  .inRoadMap{
    height: calc(100% - 145px);
  }
  .failedMap{
    height: 100%;
  }
  .mapPicMap{
    height: calc(100% - 167px);
  }
  @media (min-width: 320px) and (max-width: 386px) {
    .searchMap{
      height: calc(100% - 180px);
    }
    .assignedMap{
      height: calc(100% - 314px);
    }
    .inRoadMap{
      height: calc(100% - 159px);
    }
    .failedMap{
      height: 100%;
    }
    .mapPicMap{
      height: calc(100% - 167px);
    }
  }
  @media (min-width: 387px) and (max-width: 480px) {
    .searchMap{
      height: calc(100% - 165px);
    }
    .assignedMap{
      height: calc(100% - 314px);
    }
    .failedMap{
      height: 100%;
    }
    .mapPicMap{
      height: calc(100% - 167px);
    }
  }

  @media (min-width: 568px) and (max-width: 666px) {
    .getGeoOrder{
      right: 15px;
      bottom: 65%;
    }
    .getGeo{
      right: 15px;
      bottom: 40%;
    }
  }
  @media (min-width: 667px) and (max-width: 736px) {
    .getGeoOrder{
      right: 15px;
      bottom: 55%;
    }
    .getGeo{
      right: 15px;
      bottom: 35%;
    }
  }
</style>
