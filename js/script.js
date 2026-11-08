
const apiKey = "ZLJnH7qKnkPKjxR4JtN6adLJiebc5kT5";

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-button");
const searchInput = document.querySelector("#search-input");
const message = document.querySelector("#message");

// Fetch GIFs when the button is clicked
fetchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim() || "football";

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12`;

  gifContainer.innerHTML = "";
  message.textContent = "Loading GIFs...";
  fetchButton.disabled = true;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch GIFs");
    }

    const data = await response.json();

    // Store the GIF URLs in an array
    const images = data.data.map(gif => gif.images.original.url);

    console.log("GIF URLs:", images);

    message.textContent = "";

    if (images.length === 0) {
      message.textContent = "No GIFs found. Try another search.";
      return;
    }

    // Display GIFs on the page
    images.forEach(image => {
      gifContainer.innerHTML += `
        <img src="${image}" class="col-3 mb-3" alt="GIF search result">
      `;
    });

  } catch (error) {
    console.error("Error:", error);
    message.textContent = "Error loading GIFs. Please try again.";
  } finally {
    fetchButton.disabled = false;
  }
});

