const FILTERS = [
   {
      header: 'Species',
      categories: ['human', 'mytholog', 'other species'],
   },
   {
      header: 'Gender',
      categories: ['male', 'female'],
   },
   {
      header: 'Origin',
      categories: [
         'unknown',
         'post-apocalyptic earth',
         'nuptia',
         'other origins',
      ],
   },
];

let filterChangeNotifier;

const createElem = (tageName, className = '') => {
   const element = document.createElement(tageName);
   element.setAttribute('class', className);
   return element;
};

const onChkBoxChange = (event) => {
   const header = event.target.parentNode.parentNode.getElementsByTagName(
      'header'
   );
   const groupName = header[0].innerHTML;
   filterChangeNotifier(groupName, event.target.id, event.target.checked);
};

const createCheckboxElem = (val) => {
   let container = createElem('div', 'form-check');

   let checkbox = createElem('input', 'form-check-input');
   checkbox.type = 'checkbox';
   checkbox.name = val;
   checkbox.value = 'value';
   checkbox.id = val;

   checkbox.onclick = onChkBoxChange;

   let label = createElem('label', 'form-check-label text-capitalize');
   label.htmlFor = val;
   label.appendChild(document.createTextNode(val));

   container.appendChild(checkbox);
   container.appendChild(label);
   return container;
};

const createFilerGroup = (data) => {
   const filterGroup = createElem('div', 'filter-container');
   const header = createElem('header', 'text-strong');
   header.appendChild(document.createTextNode(data.header));
   filterGroup.appendChild(header);
   data.categories.forEach((elm) =>
      filterGroup.appendChild(createCheckboxElem(elm))
   );
   return filterGroup;
};

const createFilters = (notifier) => {
   filterChangeNotifier = notifier;
   const filters = document.getElementById('filters');
   FILTERS.forEach((element) => filters.appendChild(createFilerGroup(element)));
};

const onCloseFilterClk = (event) => {
   const id = event.target.parentElement.id;
   const IDs = id.split('-');
   document.getElementById(IDs[1]).checked = false;
   filterChangeNotifier(IDs[0], IDs[1], false);
};

const addSelectedFilter = (group, filter) => {
   const selectedFilters = document.getElementById('selectedFilters');

   const container = createElem('div', 'selected-filter text-capitalize');
   container.id = group + '-' + filter;
   const txt = document.createTextNode(filter);
   const close = createElem('span', 'close');
   close.onclick = onCloseFilterClk;
   const t = document.createTextNode('X');
   close.appendChild(t);
   container.appendChild(txt);
   container.appendChild(close);

   selectedFilters.appendChild(container);
};

const removeSelectedFilter = (filterId) => {
   const item = document.getElementById(filterId);
   item.parentNode.removeChild(item);
};

export { createFilters, addSelectedFilter, removeSelectedFilter };
