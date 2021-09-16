const errorSection = document.getElementById('display-errors');



// call api function 
const callApi = () => {
    const searchInputFeild = document.getElementById('search-input');
    const searchInput = searchInputFeild.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
   if (searchInput === '') {
      console.log('input a name')
   }
   else {
    fetch (url)
    .then (res => res.json())
    .then (data => displayDrinks(data.drinks));
   }

    // clear search input 
    searchInputFeild.value = '';
}

// call callapi function by pressing enter key.
document.getElementById('search-input').onkeydown = function(event) {
    if (event.keyCode == 13) {
        callApi()
    }
}



const displayDrinks = drinks => {
    const drinksSection = document.getElementById('display-drinks');
    // clear html body 
    drinksSection.textContent = '';

    drinks.map(drink => {
        const name = drink.strDrink;
        const image = drink.strDrinkThumb;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 rounder-5">
                <img src="${image}" class="card-img-top w-50 mx-auto border border-3 rounded-5 my-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${name}</h5>
                </div>
            </div>
        `
        drinksSection.appendChild(div);
    })
}