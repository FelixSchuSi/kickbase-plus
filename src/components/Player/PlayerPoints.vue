<template>
    <div>
        <p>TODO: Render Player Points here</p>
        <div>{{JSON.stringify(this.getPoints)}}</div>
        <v-btn block v-on:click="fetchData">fetch data again</v-btn>
    </div>

</template>
  
<script>
import api from "../../api/api";
import { mapGetters } from "vuex";

export default {
    name: "PlayerPoints",
    props: {
        player: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
            'getPointsScored',
        ]),
        getPoints() {
            if (this.getPointsScored[this.player.id]) {
                return this.getPointsScored[this.player.id]
            } else {
                return null
            }
        }
    },
    methods: {
        fetchData() {
            api.loadPlayerPoints(this.player.id)
        },
    }
}
</script>
  
<style scoped>

</style>