<template>
    <div id="app">
        <h1>WeatherForecasts</h1>
    </div>


    <ul>
        <li v-for="forecast in forecasts">
            {{ forecast.summary }}
        </li>
    </ul>
</template>

<script>
    import { ref } from "vue";
    import axios from "axios";
    export default {
        name: "App",
        setup() {
            const forecasts = ref([]);

            return {
                forecasts,
            };
        },
        async created() {
            try {
                const res = await axios.get("/WeatherForecast");
                this.forecasts = res.data;
            } catch (error) {
                console.log(error);
            }
        },
    };
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
