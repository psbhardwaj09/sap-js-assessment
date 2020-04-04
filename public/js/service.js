let data;
let activeFilters = {};

const formatData = (data) => {
   return data.results.map(item => {
      const currentYear = new Date().getFullYear();
      const itemCreatedYear = new Date(item.created).getFullYear();
      item.created = currentYear - itemCreatedYear +' years';
      return item;
   });
}

export const getData = async url => {
   const options = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   };
   const response = await fetch(url, options);
   data = formatData(await response.json());
   return data;
};

const updateActiveFilters = filter => {
   if (!filter || !filter.group || !filter.name) {
      return;
   }
   let filterGroup = activeFilters[filter.group];
   if(!filterGroup){
      activeFilters[filter.group] = [filter.name];
   }else{
      if (!filter.val) {
         const index = filterGroup.findIndex(item => item == filter.name);
         filterGroup.splice(index, 1);
      }else{
         filterGroup.push(filter.name)
      }
   }
};

const filterGender = (filters, dataToFilter) =>{
   if(filters.length == 0) return dataToFilter;
   return dataToFilter.filter(item => filters.includes(item.gender.toLowerCase()));
}

const filterOrigins = (filters, dataToFilter) =>{
   if(filters.length == 0) return dataToFilter;
   return dataToFilter.filter(item => filters.includes(item.origin.name.toLowerCase()));
}

const filterSpecies = (filters, dataToFilter) =>{
   if(filters.length == 0) return dataToFilter;
   return dataToFilter.filter(item => {
      const species = item.species.toLowerCase();
      return (filters.includes(species) ||
             (filters.includes('other species') && species != 'human' 
                                                && species != 'mytholog'));
   });
}

const filterDataByCategory = (filter, data) =>{
   let filterData = data;
   switch(filter.toLowerCase()){
      case 'gender':
         filterData = filterGender(activeFilters[filter], filterData);
         break;
      case 'origin':
         filterData = filterOrigins(activeFilters[filter], filterData);
         break;
      case 'species':
         filterData = filterSpecies(activeFilters[filter], filterData);
         break;
   }
   return filterData;
}

export const getFilteredData = filter => {
   updateActiveFilters(filter);
   console.log('Active Filters: ', activeFilters);
   let filteredData = data;
   
   for(const filter in activeFilters){
      filteredData = filterDataByCategory(filter, filteredData);
   }
   return filteredData;
};

