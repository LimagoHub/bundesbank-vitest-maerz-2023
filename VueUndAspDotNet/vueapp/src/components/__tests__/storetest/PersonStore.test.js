import { setActivePinia, createPinia } from 'pinia'
import { describe,beforeEach, it, expect, vi , test} from 'vitest'
import { usePersonStore } from '../../../stores/PersonStore'


// Alle Module aus dem Store im Test einbinden
import  {v4 as uuidv4}   from 'uuid'
import axios from 'axios'

// Alle Module mocken
vi.mock('axios');
vi.mock('uuid');

describe('Persons Store', () => {
    beforeEach(()=>{
        setActivePinia(createPinia());
        vi.restoreAllMocks();
        axios.get.mockReset();
        axios.post.mockReset();
        axios.delete.mockReset();
        axios.put.mockReset();
    });

    it('resetPerson should intitialize fields with default values', async () => {
        
        // Arrange
        // Record
        uuidv4.mockReturnValue('123456789');
        const store = usePersonStore();
        // Action
        await store.resetPerson();
        //Assertion
        expect(store.person.id).toEqual('123456789');
        expect(store.person.firstname).toBe('');
        expect(store.person.lastname).toBe('');
        expect(store.person.age).toBe(0);

    });

    it('getClassFromAge(13)->"Child"',   () => {

   
    
        const store = usePersonStore()
        
        expect(store.getClassFromAge(13)).toEqual("child");
       
    
      })
    
      
      it('getClassFromAge(23)->"Adult"',   () => {
    
       
        
        const store = usePersonStore()
        
        expect(store.getClassFromAge(23)).toEqual("adult");
       
    
      })
    
        
      it('getClassFromAge(73)->"Senior"',   () => {
    
       
        
        const store = usePersonStore()
        
        expect(store.getClassFromAge(73)).toEqual("senior");
       
    
      })

      it('fetchPersons success',async () => {

        // Arrange
        const store = usePersonStore()
        const personsMockData = [
          {'id':1,'firstname':'John', 'lastname':'Doe','age':13},
          {'id':2,'firstname':'John', 'lastname':'Rambo','age':23},
          {'id':3,'firstname':'John', 'lastname':'Wayne','age':73}
        ]
        axios.get.mockResolvedValue({
          data: personsMockData,
        });
        // Action
        await store.fetchPersons();
        // Assertion
        expect(store.persons).toStrictEqual(personsMockData);
        expect(axios.get).toHaveBeenCalledWith('http://limago.net:8080/persons');
      })

      it('addPerson success',async () => {
        // Arrange
        
        const store = usePersonStore();
        const fetchSpy= vi.spyOn(store, 'fetchPersons');
        store.person = {'id':1,'firstname':'John', 'lastname':'Doe','age':13};

        // Action
        await store.addPerson();
        expect(axios.post).toHaveBeenCalledWith('http://limago.net:8080/persons',{'id':1,'firstname':'John', 'lastname':'Doe','age':13} );
        expect(fetchSpy).toHaveBeenCalledOnce();
      })

      it('addPerson alternative success',async () => {
        // Arrange
        
        const store = usePersonStore();
        
        const personsMockData = [
          {'id':1,'firstname':'John', 'lastname':'Doe','age':13},
          {'id':2,'firstname':'John', 'lastname':'Rambo','age':23},
          {'id':3,'firstname':'John', 'lastname':'Wayne','age':73}
        ]
        axios.get.mockResolvedValue({
          data: personsMockData,
        });

        store.person = {'id':1,'firstname':'John', 'lastname':'Doe','age':13};

        // Action
        await store.addPerson();
        expect(axios.post).toHaveBeenCalledWith('http://limago.net:8080/persons',{'id':1,'firstname':'John', 'lastname':'Doe','age':13} );
        expect(store.persons.length).toBe(3);
      })

      it('updatePerson', async () => {
      })
      
      it('deletePerson', async () => {
      })


})