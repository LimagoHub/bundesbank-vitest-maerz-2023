import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const BASE_URL = 'http://limago.net:8080/persons';

export const usePersonStore = defineStore({
    id: 'personStore',
    state: () => ({
      persons: [],
      person: {'id':0,'firstname':'', 'lastname':'','age':0},
      loading: false,
      error: null
    }),
    getters: {
        getPersonsPerLastname: (state) => {
          return (lastname) => state.persons.filter((person) => person.lastname === lastname)
        }
    }, 
    actions: {
        async fetchPersons() {
            this.loading = true;
            try {
              
              this.resetPerson();
              const res = await axios.get(`${BASE_URL}`);
              this.persons = res.data;
            } catch (error) {
              this.error = error;
              console.log(error);
            }
            this.loading = false;
      
        },
        async fetchPerson(id) {
            this.loading = true;
            try {
                const res = await axios.get(`${BASE_URL}/${id}`);
                this.person = res.data;
            } catch (error) {
                
                this.error = error;
                console.log(error);
            }
            this.loading = false;
        },
        async addPerson() {
            try {
              const res = await axios.post(`${BASE_URL}`, this.person);
              this.fetchPersons();
            } catch (error) {
              this.error = error;
              console.log(error);
            }
            
          },
          async updatePerson() {
            try {
              const res = await axios.put(`${BASE_URL}/${this.person.id}`, this.person);
              this.fetchPersons();
            } catch (error) {
              this.error = error;
              console.log(error);
            }
            
          },

          async deletePerson(id) {
      
            try {
              const res = await axios.delete(`${BASE_URL}/${id}`);
              this.fetchPersons();
            } catch (error) {
              this.error = error;
              console.log(error);
            }
            
         
            console.log("deletePerson");
          },

          getClassFromAge(age) {
            if (age<18) {
              return "child";
             
            }
            if (age < 65) {
             
              return "adult";
            }
            return "senior";
           
          
          },
      
          async resetPerson(age) {
            this.person =  {'id':uuidv4(),'firstname':'', 'lastname':'','age':0}
          }
      
      
    }
});