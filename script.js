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
        fetch(url)
            .then(res => res.json())
            .then(data => displayDrinks(data.drinks));
    }

    // clear search input 
    searchInputFeild.value = '';
}

// call callapi function by pressing enter key.
document.getElementById('search-input').onkeydown = function (event) {
    if (event.keyCode == 13) {
        callApi()
    }
}



const displayDrinks = drinks => {
    console.log(drinks)
    const drinksSection = document.getElementById('display-drinks');
    // clear html body 
    drinksSection.textContent = '';

    if (drinks === null) {
        console.log('no drinks found')
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