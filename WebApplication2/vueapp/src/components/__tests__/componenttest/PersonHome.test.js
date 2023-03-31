import { createTestingPinia } from '@pinia/testing'

import { describe,beforeEach, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonHome from '../../PersonHome.vue'
import { usePersonStore } from '../../../stores/PersonStore.js'

describe('PersonHome', () => {

    /*
        BeforEach mounted frische Komponente mit frische MockStore

    */
    let wrapper; // Modulglobalen Wrapper deklarieren
    beforeEach(()=>{
        wrapper = mount(PersonHome, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        personStore: {
                            persons : [
                                {'id':1,'firstname':'Jane', 'lastname':'Doe','age':13},
                                {'id':2,'firstname':'Jane', 'lastname':'Rambo','age':23},
                                {'id':3,'firstname':'Jane', 'lastname':'McClain','age':73}
                            ],
                            person : {'id':1,'firstname':'John', 'lastname':'Doe','age':13}
                        }
                    },
                    
                    createSpy: vi.fn,// Alle Methoden im Store gemockt werden
                })],
               

            }
        });
    })
    it('renders properly', () => {
   
      
        expect(wrapper.findAll("#data td").at(1).text()).toBe('Jane')
    })
    it('renders also properly', () => {
  
    
        expect(wrapper.findAll("#data td").at(2).text()).toBe('Doe')
      })
      it('button submit call', async () => {
   
  
        //const store = usePersonStore();
       
        const submitSpy= vi.spyOn(wrapper.vm, 'submitItem')
        
        await wrapper.find("#btn").trigger('click');
        
        expect(submitSpy).toHaveBeenCalledOnce();
        
      })
      it.skip('submit call', async () => {
   
    
        const store = usePersonStore();
           
        await wrapper.vm.submitItem();
        
        expect(store.addPerson).toHaveBeenCalledOnce();
        
      })
})