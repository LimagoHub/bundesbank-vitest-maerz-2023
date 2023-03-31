<template>
    <div id="app">
        <h1>Shopping List</h1>
    </div>
    <button @click="add({id: 10, bezeichnung: 'Vitamin C', preis: 3.67})">Drück mich</button>
    
    <ul>
        <li v-for="product in products" >
            {{ product.summary }}
        </li>
    </ul>
</template>

<script>
    import { ref } from "vue";
    import axios from "axios";
    export default {
        name: "App",
        setup() {
            const products = ref([]);
            async function add(product) {
                try {
                    const res = await axios.post(`http://localhost:8081/products`, product);

                } catch (error) {
                    console.log(error);
                }
            };
            async function update(product) {
                try {
                    const res = await axios.put(`http://localhost:8081/products/${product.id}`, product);

                } catch (error) {
                    console.log(error);
                }
            };

            async function remove(product) {
                try {
                    const res = await axios.delete(`http://localhost:8081/products/${product.id}`);

                } catch (error) {
                    console.log(error);
                }
            };
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
