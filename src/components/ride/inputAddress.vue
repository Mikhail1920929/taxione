<template>

  <q-input
    borderless
    v-model="texting"
    class="input"
    @input="searchByInputs(texting,type)"
    @focus="showClear = true"
    @blur="showClear = false"
    :readonly="readMode"
    ref="code1"
    @click="$emit('active', type)"
    :placeholder="$t('addressTo')">

        <template v-slot:append v-if="showClear === true">
            <div class="clear" @click="$emit('clear', type)">
                <img src="../../statics/order_icons/clear.svg" alt="">
            </div>
        </template>

    </q-input>

</template>

<script>
export default {
  data () {
    return {
      showClear: false,
      text2: this.text
    }
  },
  computed: {
    texting: {
      get () {
        return this.text
      },
      set (newValue) {
      }
    }
  },
  props: {
    google: { required: true },
    center: { required: true },
    type: { type: String, required: true },
    text: { type: String, required: true },
    readMode: { required: true }
  },
  methods: {
    searchByInputs (value, type) {
      this.autocomplete = new this.google.maps.places.AutocompleteService()
      this.$emit('searching')

      if (value) {
        this.autocomplete.getPlacePredictions({
          input: value,
          location: this.center,
          origin: this.center,
          radius: 25000
        }, (results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            results.sort((a, b) => { return a.distance_meters - b.distance_meters })
            this.$emit('success', results)
          }
        })
      }
    }
  }

}
</script>

<style>
  .input {
    width: calc(100% - 24px);
    padding-left: 15px;
  }
</style>
