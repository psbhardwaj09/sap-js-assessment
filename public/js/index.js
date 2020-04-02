const getData = async url => {
   const options = {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   };
   const response = await fetch(url, options);
   return await response.json();
};

const createElem = (tageName, className) => {
    const element = document.createElement(tageName);
    element.setAttribute('class', className);
    return element;
}

const createCharCard = details => {
    const charContainer = createElem('div', 'col-6 col-md-3 float-left');
    const card = charContainer.appendChild(createElem('div', 'card'));
    const cardBody = card.appendChild(createElem('div', 'card-body'));
    const cardTitle = cardBody.appendChild(createElem('h5', 'card-title'));
    const t = document.createTextNode(details.name);
    cardTitle.appendChild(t);

    return charContainer;
};

const createCharStr = detail => {
    return `<div class="col-6 col-md-3 float-left">
    <div class="card">
      <img class="card-img-top" src="${detail.image}" alt="${detail.name}">
      <div class="card-body">
        <h5 class="card-title">${detail.name}</h5>
        Id: <span class="card-text">${detail.id}</span>
        Created: <span class="card-text">${detail.created}</span>
      </div>
      <ul class="list-group list-group-flush">
    
        <li class="list-group-item row m-0 p-0">
          <div class="col-5 float-left">STATUS</div>
          <div class="col-7 float-left text-right text-warning">${detail.status}</div>
        </li>
    
        <li class="list-group-item row m-0 p-0">
          <div class="col-5 float-left">SPECIES</div>
          <div class="col-7 float-left text-right text-warning">${detail.species}</div>
        </li>
    
        <li class="list-group-item row m-0 p-0">
          <div class="col-5 float-left">GENDER</div>
          <div class="col-7 float-left text-right text-warning">${detail.gender}</div>
        </li>
    
        <li class="list-group-item row m-0 p-0">
          <div class="col-5 float-left">ORIGIN</div>
          <div class="col-7 float-left text-right text-warning">${detail.origin.name} </div>
        </li>
    
        <li class="list-group-item row m-0 p-0">
          <div class="col-5 float-left">Last Location</div>
          <div class="col-7 float-left text-right text-warning">${detail.location.name}</div>
        </li>
      </ul>
    </div>
    </div>`;
}

const onDataLoad = data => {
    const charList = document.getElementById('charList');
    data.results.forEach(element => {
      // const charElement = createCharCard(element);
      // charList.appendChild(charElement);
      charList.innerHTML+= createCharStr(element);
    });
 };

const loadData = () => {
   getData('https://rickandmortyapi.com/api/character/')
      .then(onDataLoad)
      .catch(error => {
         console.error(
            'There has been a problem with your fetch operation:',
            error
         );
      });
};


window.onload = loadData;