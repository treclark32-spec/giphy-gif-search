
const apiKey = "ZLJnH7qKnkPKjxR4JtN6adLJiebc5kT5";

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-button");
const searchInput = document.querySelector("#search-input");
const message = document.querySelector("#message");

fetchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim() || "anime";

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12`;

  gifContainer.innerHTML = "";
  message.textContent = "Loading GIFs...";

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch GIFs");
    }

    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);

    console.log(images);

    message.textContent = "";

    if (images.length === 0) {
      message.textContent = "No GIFs found. Try another search.";
      return;
    }

    images.forEach(image => {
      gifContainer.innerHTML += `
        <img src="${image}" class="col-3 mb-3" alt="Search result GIF">
      `;
    });

  } catch (error) {
    console.error("Error:", error);
    message.textContent = "Error loading GIFs. Please try again.";
  }
});
