let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppend(result) {

    let {
        title,
        link,
        description
    } = result;
    // container --- result-item
    let resultItemCon = document.createElement("div");
    resultItemCon.classList.add("result-item");
    searchResults.appendChild(resultItemCon);

    //Anchor - title ----result-title
    let achorTitle = document.createElement("a");
    achorTitle.classList.add("result-title");
    achorTitle.href = link;
    achorTitle.target = "_blank";
    achorTitle.textContent = title;
    resultItemCon.appendChild(achorTitle);

    // break-title ---
    let breakTitle = document.createElement("br");
    resultItemCon.appendChild(breakTitle);

    //url -title ---result-url
    let urlTitle = document.createElement("a");
    urlTitle.classList.add("result-url");
    urlTitle.href = link;
    urlTitle.target = "_blank";
    urlTitle.textContent = link
    resultItemCon.appendChild(urlTitle);

    //break-url
    let breakUrl = document.createElement("br");
    resultItemCon.appendChild(breakUrl);

    // discreption--- link-description
    let descriptionpara = document.createElement("p");
    descriptionpara.classList.add("link-description");
    descriptionpara.textContent = description;
    resultItemCon.appendChild(descriptionpara);
}




function searchWebDisplaying(search_results) {
    spinnerEl.classList.toggle("d-none")
    for (let result of search_results) {

        createAndAppend(result);
    }

}



function SearchWikipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
        console.log(searchInputValue);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "GET",
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                searchWebDisplaying(search_results);
            })

    }
}

searchInput.addEventListener("keydown", SearchWikipedia);