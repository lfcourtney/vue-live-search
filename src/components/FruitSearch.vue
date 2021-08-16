<template>
  <input type="text" name="search-box" @keyup="search" />
  <template v-if="!state.noSearch && state.searchResults.length > 0">
  <div class="search-item" v-for="(result, index) in state.searchResults" :key="index">
      <hr v-if="index > 0">
      <p>{{result}}</p>
  </div>
  </template>
    <template v-else-if="!state.noSearch">
  <div class="search-item">
      <p>Sorry. No Results.</p>
  </div>
  </template>
</template>

<script>
import {reactive} from 'vue';
import axios from 'axios';

export default {
    name: 'FruitSearch',
    setup(){

        const state = reactive({
            searchResults: [],
            noSearch: true
        });

        function search(e){
            let search = e.target.value.trim();
            axios.post('/api/search', {
                search
            }).then(res => {
                if(search === ''){
                    state.noSearch = true;
                    return;
                }
                state.noSearch = false;
                state.searchResults = res.data.map(fruit => fruit.name);
            }).catch(err => {throw new Error(err)});
        }

        return{search, state}
    }
}
</script>

<style>
    input[name="search-box"]{
        display: block;
        margin: 2rem auto;
        max-width: 500px;
        width: 95%;
        padding: 0.5rem 1rem;
    }
    .search-item{
        margin: 2rem auto;
        max-width: 500px;
        width: 95%;
        font-weight: 600;
        font-size: 1.25rem;
    }
    .search-item hr{
        color: lightgray;
        border-top: none;
        margin: -1.3rem 0 0.5rem 0;
    }
</style>