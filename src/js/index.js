import {
   createFilters,
   addSelectedFilter,
   removeSelectedFilter,
} from './filters.js';
import { getData, getFilteredData } from './service.js';
import { getCharacters } from './character.js';

import '../css/main.css';

let filteredData = [];

const updateCharacterList = (data) => {
   filteredData = data;
   const charList = document.getElementById('charList');
   charList.innerHTML = getCharacters(data);
};

const onFilterChange = (group, name, val) => {
   const filteredData = getFilteredData({ group, name, val });
   updateCharacterList(filteredData);
   if (val) {
      addSelectedFilter(group, name);
   } else {
      removeSelectedFilter(group + '-' + name);
   }
};

const sortFilter = (item1, item2) => (item1.id > item2.id ? 1 : -1);

const registerSortBy = () => {
   document
      .getElementById('sort-filter')
      .addEventListener('change', function () {
         if (this.value == 'ascending') {
            filteredData.sort((a, b) => sortFilter(a, b));
         } else {
            filteredData.sort((a, b) => sortFilter(b, a));
         }
         updateCharacterList(filteredData);
      });
};

const loadData = () => {
   createFilters(onFilterChange);
   registerSortBy();
   getData('https://rickandmortyapi.com/api/character/')
      .then((data) => updateCharacterList(data))
      .catch((error) => {
         console.error(
            'There has been a problem with your fetch operation:',
            error
         );
      });
};

window.onload = loadData;
