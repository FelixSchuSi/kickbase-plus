<template>
    <div class="player-points-root" ref="scrollElement">
        <div class="player-points-season" v-for="season in points" :key="season.t">
            <player-points-match-day :barStyles="barStyles[season.t + matchDay.d]" :matchDay="matchDay"
                class="player-points-season-match" v-for="matchDay in season.m" :key="season.t + matchDay.d">
            </player-points-match-day>
            <div class="season-summary">
                <div class="season-summary-details">
                    <div class="season-summary-details-value">{{ season.t }}</div>
                    <div class="season-summary-details-key">season summary</div>
                    <div class="season-summary-details-value">{{ season.p }}</div>
                    <div class="season-summary-details-key">points</div>
                    <div class="season-summary-details-value">
                        {{ season.mp > 0 ? Math.round(season.p / season.mp) : 0 }}
                    </div>
                    <div class="season-summary-details-key">∅ points</div>
                    <div class="season-summary-details-value">{{ season.mp }}</div>
                    <div class="season-summary-details-key">appearances</div>
                    <div class="season-summary-details-value">{{ season.ms }}</div>
                    <div class="season-summary-details-key">starting 11</div>
                </div>
            </div>
        </div>
        <player-points-match-day :barStyles="{ background: 'var(--player-points-background-color)' }"
            :matchDay="matchDay" class="player-points-season-match" v-for="matchDay in upcomingMatches"
            :key="matchDay.md">
        </player-points-match-day>
    </div>

</template>
  
<script>
import api from "../../api/api";
import { mapGetters } from "vuex";
import PlayerPointsMatchDay from "./PlayerPointsMatchDay";

export default {
    name: "PlayerPoints",
    components: {
        PlayerPointsMatchDay
    },
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
        const { scrollElement } = this.$refs;
        setTimeout(() => {
            scrollElement.scrollLeft = scrollElement.scrollWidth - 820;
        })
    },
    computed: {
        ...mapGetters([
            'getPointsScored',
            'getPlayers',
        ]),
        upcomingMatches() {
            return this.getPlayers[this.player.id]?.nm;
        },
        points() {
            return this.getPointsScored[this.player.id];
        },
        barStyles() {
            if (this.getPointsScored[this.player.id]) {
                const pointsScored = this.getPointsScored[this.player.id];

                // Maximum points ever scored by a player
                const maxPoints = Math.max(
                    ...pointsScored
                        .flatMap((season) => season.m)
                        .map((match) => match.p)
                );

                const result = {};
                for (const season of pointsScored) {
                    for (const match of season.m) {
                        const color = match.p >= 100 ? '#25c28b' : '#ea5f42';
                        const percentage = `${Math.round((match.p / maxPoints) * 100)}%`;
                        result[season.t + match.d] = {
                            background: `linear-gradient(to top, ${color}, ${color}, ${percentage}, var(--player-points-background-color), ${percentage}, var(--player-points-background-color))`
                        };
                    }
                }
                return result;
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
.player-points-root {
    width: 100%;
    display: flex;
    overflow-x: scroll;
}

.player-points-root {
    scrollbar-width: thin;
}

.player-points-root::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #f1f1f1;
}

.player-points-root::-webkit-scrollbar-thumb {
    background: #c1c1c1;
}

.player-points-season {
    display: flex;
}

.player-points-season-match {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    padding-top: 8px;
    max-width: 50px;
}

.player-points-season-match>*:not(:last-child) {
    margin-bottom: 8px;
}

.player-points-season-match>small {
    display: inline-flex;
    justify-content: center;
}

.season-summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d3d7d8;
    border-right: 1px solid #d3d7d8;
    margin-right: 10px;
    padding-left: 1rem;
    padding-right: 1rem;
}

.season-summary * {
    text-align: center;
}

.season-summary-details-value {
    padding-top: 0.2rem;
    font-weight: 600;
    opacity: 87%;
    font-size: medium;
}

.season-summary-details-key {
    font-size: smaller;
    opacity: 60%;
}


* {
    --player-points-background-color: #f5f7f6;
    --player-points-font-color: #000000;
}

@media (prefers-color-scheme: dark) {
    * {
        --player-points-background-color: #f5f7f620;
        --player-points-font-color: #ffffff;
    }
}
</style>