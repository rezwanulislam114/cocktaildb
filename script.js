const searchButton = document.getElementById('search-button');
const searchInputFeild = document.getElementById('search-input');
const errorSection = document.getElementById('display-errors');




// call from api function 
searchButton.addEventListener('click', () => { 
    
    const searchInput = searchInputFeild.value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
    if (searchInput === '') {
        errorSection.innerHTML = `<h2 class="text-center mt-5">Please search by any key words.</h2>`
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayDrinks(data.drinks));
    }

    // clear search input 
    searchInputFeild.value = '';
})

// call api function by pressing enter key.
searchInputFeild.onkeydown = function (event) {
    if (event.keyCode == 13) {
        searchButton.click();
    }
}



const displayDrinks = drinks => {
    const drinksSection = document.getElementById('display-drinks');
    // clear html body 
    drinksSection.innerHTML = '';
    errorSection.innerHTML = '';

    if (drinks === null) {
        errorSection.innerHTML = `<h2 class="text-center mt-5">Sorry. No drinks found by this name.</h2>`
    }

    else {
        drinks.map(drink => {
            const name = drink.strDrink;
            const image = drink.strDrinkThumb;
            const catagory = drink.strCategory;
            const instraction = drink.strInstructions;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 rounder-5">
                    <img src="${image}" class="card-img-top w-50 mx-auto border border-3 rounded-5 my-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${name}</h5>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary d-block mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Catagory: ${catagory}</p>                                        
                                        <p>${instraction.slice(0, 250)}</p>                                        
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            drinksSection.appendChild(div);
        })
    }
}