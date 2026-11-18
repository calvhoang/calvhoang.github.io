document.querySelector("#mealSearchForm").addEventListener("submit", validateForm);
document.addEventListener("DOMContentLoaded", loadCategories);

const categoryList = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"

async function validateForm(event) {
    event.preventDefault();

    const selected = document.querySelector("input[name=searchType]:checked");
    const selectAlert = document.querySelector("#selectAlert");

    selectAlert.hidden = true;

    if (!selected) {
        selectAlert.hidden = false;
        return;
    }

    const searchInput = document.querySelector("#searchInput").value;
    const categorySelect = document.querySelector("#categorySelect").value;
    const inputAlert = document.querySelector("#inputAlert");

    inputAlert.hidden = true;

    const type = selected.value;

    if ((type === "name" || type === "mainIngredient") && searchInput === "") {
        inputAlert.textContent = "Please enter text."
        inputAlert.hidden = false;
        return;
    }
    if (type === "category" && categorySelect === "") {
        inputAlert.textContent = "Please select a category."
        inputAlert.hidden = false;
        return;
    }

    let input = "";
    let url = "";

    if (type === "name") {
        input = document.querySelector("#searchInput").value;
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    } else if (type === "mainIngredient") {
        input = document.querySelector("#searchInput").value;
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
    } else if (type === "category") {
        input = document.querySelector("#categorySelect").value;
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`
    }

    if (url) {
        const data = await apiFetch(url)
        displayResults(data)
    }
}

const radios = document.querySelectorAll(`input[name="searchType"]`);

for (const radio of radios) {
    radio.addEventListener("click", onRadioClick)
}

function onRadioClick() {
    const search = document.querySelector("#searchContainer");
    const category = document.querySelector("#categoryContainer");
    const selectAlert = document.querySelector("#selectAlert");

    search.hidden = true;
    category.hidden = true;
    selectAlert.hidden = true;

    if (this.value === "name" || this.value === "mainIngredient") {
        search.hidden = false;
    } else if (this.value === "category") {
        category.hidden = false;
    }
}

async function apiFetch(url) {
    try {
        const response = await fetch(url)
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function loadCategories() {
    let categories = document.querySelector("#categorySelect");

    categories.textContent = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    categories.appendChild(defaultOption);

    const data = await apiFetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")

    if (data !== null & data.meals !== null) {
        for (const item of data.meals) {
            let option = document.createElement("option");
            option.value = item.strCategory;
            option.textContent = item.strCategory;
            categories.appendChild(option);
        }
    } else {
        categories.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load categories";
        categories.appendChild(errorOption);
    }
}

async function displayResults(data) {
    const results = document.querySelector("#resultsCard");

    results.hidden = false;
    results.innerHTML = `<h3 id="resultsTitle" class="fw-semibold">Results</h3>`;

    if (data && data.meals) {
        for (const item of data.meals) {
            const card = document.createElement("div");
            card.className = "card m-2 p-3 mx-auto";

            card.innerHTML = `
                <h4 class="fw-semibold">${item.strMeal}</h4>
                <img src="${item.strMealThumb}" alt="Image of ${item.strMeal}" 
                class="rounded">
                <h5>Country of origin:</h5>
                <p>${item.strCountry}</p>
                <h5>Instructions:</h5>
                <p class="instructions">${item.strInstructions || "Search by name to view recipe."}</p>
            `;

            results.appendChild(card);
        }
    } else {
        results.innerHTML = `
        <h3 id="resultsTitle" class="fw-semibold">Results</h3>
        <p>No results found.</p>
        `;
    }
}