<script setup>
    import { RouterLink } from 'vue-router';
    import { storeToRefs } from 'pinia'
    import { usePersonStore } from '../stores/PersonStore'

    const { persons, person, loading, error } = storeToRefs(usePersonStore());
    const { fetchPersons, addPerson, deletePerson,getClassFromAge } = usePersonStore();
    fetchPersons();

    function  submitItem(evt){
       
      addPerson();
      
   }
</script>



<template>
    <main>
        <p v-if="loading">Loading persons...</p>
        <p v-if="error">{{ error.message }}</p>
        <form id="personform" ref="personform">
        <table class="table table-bordered">
            <tr>
            <td>
                <input v-model="person.id" required />
            </td>
            </tr>
            <tr>
            <td>
            <input v-model="person.firstname" required minlength="2" maxlength="30"/>
            </td>
            </tr>
            <tr>
            <td>
                <input v-model="person.lastname" required minlength="2" maxlength="30"/>
            </td>
            </tr>
            <tr>
            <td>
                <input v-model="person.age" type="number" required min="0"/>
            </td>
            </tr>
            <tr>
            <td>
                <input type="button" id="btn" class="btn" @click="submitItem(evt)" value="neu" >
            </td>
            </tr> 
            </table>
    </form>
        <table class="table table-bordered" v-if="persons" id="data">
            <tr v-for="p in persons" :key="p.id" :class="getClassFromAge(`${p.age}`)">
                <td>{{ p.id }}</td>
                <td>{{ p.firstname }}</td>
                <td>{{ p.lastname }}</td>
                <td>{{ p.age }}</td>
                <td><button @click="deletePerson(`${p.id}`)">loeschen</button></td>
            </tr>
    </table>
    </main>
</template>

<style scoped>
.child {
  color: red;
}
.adult {
  color: green;
}
.senior {
  color: blue;
}

input:invalid {
  border: 2px dashed red;
}

input:valid {
  border: 2px solid black;
}

input:invalid:required {
  background-image: linear-gradient(to right, pink, lightgreen);
}
</style>