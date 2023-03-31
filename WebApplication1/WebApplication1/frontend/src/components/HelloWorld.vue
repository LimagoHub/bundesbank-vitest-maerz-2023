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
                products, add, update, remove
            };
        },
        async created() {
            try {
                const res = await axios.get("/WeatherForecast");
                this.products = res.data;
            } catch (error) {
                console.log(error);
            }
        },
    };
</script>


<style scoped>
    header {
        line-height: 1.5;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    @media (min-width: 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }
    }
</style>
