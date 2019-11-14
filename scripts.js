const API_URL = 'http://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('.companies');

  program.init(companies);
});

const program = (() => {
  let companySection;
  let container;

  function init(companies) {
    companySection = companies;

    form = companySection.querySelector('form');
    container = companySection.querySelector('.results');

    form.addEventListener('submit', onSubmit);
  }

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function getData() {
    fetch(`${API_URL}${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('villa');
        }
        debugger;
        return response.json();
      })
      .then((data) => {
        showCompany(data.results);
      })
      .catch((error) => {
        console.error('þú fékkst villu', error);
      });
  }

  function showCompany(companyList) {
    if (companyList.length === 0) {
      empty(container);
      container.appendChild(document.createTextNode(error));
      return;
    }

    const [{ name }] = companyList;
    const [{ sn }] = companyList;
    const [{ active }] = companyList;
    const [{ address }] = companyList;

    const div = document.createElement('div');
    const dl = document.createElement('dl');

    const nameElement = document.createElement('dt');
    nameElement.appendChild(document.createTextNode('Nafn'));
    dl.appendChild(nameElement);

    const nameValue = document.createElement('dd');
    nameValue.appendChild(document.createTextNode(name));

    const snElement = document.createElement('dt');
    snElement.appendChild(document.createTextNode('Kennitala'));
    dl.appendChild(snElement);

    const snValue = document.createElement('dd');
    snValue.appendChild(document.createTextNode(sn));

    empty(container);
    div.appendChild(dl);
    container.appendChild(div);
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    getData(input.value);
  }

    /* function el(name, ...children) {
    const element = document.createElement(name);

    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
    return element;
  }*/

  return {
    init,
  };
})();