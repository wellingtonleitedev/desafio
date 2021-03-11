const jogosLista = document.getElementById("jogos-lista");
const select = document.getElementById("sort");
const search = document.getElementById("search");

select.options[select.selectedIndex].classList.add('selected');

select.addEventListener('change', event => {
  document.querySelector('.selected').classList.remove('selected');

  select.options[select.selectedIndex].classList.add('selected');

  sortBy[select.options[select.selectedIndex].value]();
});

search.addEventListener('input', () => {
  newOfertas = ofertas.filter(item => {
    if(search.value && item.title.toLocaleLowerCase().match(search.value.toLocaleLowerCase())){
      return item;
    }
  });

  addItemsToDom(newOfertas);
});

let ofertas = [];

const sortBy = {
  percent: () => {
    ofertas = ofertas.sort((itemA, itemB) => itemA.percent - itemB.percent);
    addItemsToDom();
  },
  graterThan: () => {
    ofertas = ofertas.sort((itemA, itemB) => {
      if(parseFloat(itemA.salePrice.replace(',', '.')) > parseFloat(itemB.salePrice.replace(',', '.'))) return -1;
    })
    addItemsToDom();
  },
  lessThan: () => {
    ofertas = ofertas.sort((itemA, itemB) => { 
      if(parseFloat(itemA.salePrice.replace(',', '.')) < parseFloat(itemB.salePrice.replace(',', '.'))) return -1;
    });
    addItemsToDom();
  },
  title: () => {
    ofertas = ofertas.sort((itemA, itemB) => {
      if(itemA.title.toLocaleLowerCase() < itemB.title.toLocaleLowerCase()) return -1;
      if(itemA.title.toLocaleLowerCase() > itemB.title.toLocaleLowerCase()) return 1;
      return 0;
    })

    addItemsToDom();
  },
}

async function calculatePercent() {
  ofertas = ofertas.map((oferta) => {
    const percent = Math.round(oferta.salePrice.replace(',', '.') / oferta.normalPrice.replace(',', '.') * 100) - 100;

    return {
      ...oferta,
      percent
    }
  });
}

function addItemsToDom (newOfertas = []) {
  jogosLista.innerHTML = "";

  items = newOfertas.length ? newOfertas : ofertas;

  items.map((oferta) => {
    jogosLista.innerHTML += `
      <article class="oferta">
        <figure>
          <img src="https://cdn.akamai.steamstatic.com/steam/apps/${oferta.steamAppID}/header.jpg" alt="${oferta.title}">
          <figcaption>
            <h4>${oferta.title}</h4>
            <section>
              <button>DETALHES</button>
              <div>
                <div>
                  <small class="preco-normal">$ ${oferta.normalPrice}</small>
                  <h5 class="preco-oferta">$ ${oferta.salePrice}</h5>
                </div>
                <span>${oferta.percent == -100 ? `GRÁTIS` : `${oferta.percent}%`}</span>
              </div>
            </section>
          </figcaption> 
        </figure>
      </article>
      `;
  });
}

function getSales(){
  fetch('https://www.cheapshark.com/api/1.0/deals?pageNumber=0&pageSize=12&storeID=1&onSale=1&AAA=1')
    .then(async response => {
      if(response.ok){
        ofertas = await response.json();

        calculatePercent()
          .then(() => sortBy.percent());
      }
    });
}

window.onload = () => {
  getSales();
};
