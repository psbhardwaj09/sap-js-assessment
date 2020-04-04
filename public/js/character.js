const createCharStr = detail => {
   return `<div class="item_container">
     <div class="card list-item">
       <div class="item-header">
         <img class="card-img-top" src="${detail.image}" alt="${detail.name}">
         <div class="item-details">
           <h5 class="item-title">${detail.name}</h5>
           <p class="item-id"> id: ${detail.id} - created ${detail.created} ago </p>
         </div>
       </div>
       <div class="item-data">
         <ul>
           <li><span>STATUS</span><span class="info">${detail.status}</span></li>
           <li><span>SPECIES</span><span class="info">${detail.species}</span></li>
           <li><span>GENDER</span><span class="info">${detail.gender}</span></li>
           <li><span>ORIGIN</span><span class="info">${detail.origin.name}</span></li>
           <li><span>LAST LOCATION</span><span class="info">${detail.location.name}</span></li>
         </ul>
       </div>
     </div>
   </div>`;
};

export const getCharacters = data => {
   let childItems = '';
   if (!data) return childItems;

   data.forEach(element => (childItems += createCharStr(element)));
   return childItems;
};
