const API_KEY = "";
const SEARCH_ENGINE_ID = "";

document.getElementById("searchButton").addEventListener("click", searchBooks);

async function searchBooks() {
    const query = document.getElementById("searchBar").value;
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "Searching...";

    try {
        const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}+filetype:pdf`
        );
        const data = await response.json();

        if (data.items) {
            resultsContainer.innerHTML = "";
            data.items.forEach((item) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${item.title}</span>
                    <a href="${item.link}" target="_blank">View PDF</a>
                `;
                resultsContainer.appendChild(li);
            });
        } else {
            resultsContainer.innerHTML = "No results found!";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = "An error occurred. Please try again.";
    }
}
