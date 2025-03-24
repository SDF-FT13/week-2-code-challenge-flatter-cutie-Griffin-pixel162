document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
  
    let totalVotes = 0;
  
    // Display loading indicator
    const loadingSpan = document.createElement("span");
    loadingSpan.textContent = "Loading...";
    characterBar.appendChild(loadingSpan);
  
    console.log("Fetching characters from:", baseUrl);
    
    fetch(baseUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(characters => {
        console.log("Characters loaded:", characters);
        
        // Remove loading indicator
        characterBar.innerHTML = "";
        
        if (!Array.isArray(characters) || characters.length === 0) {
          const emptySpan = document.createElement("span");
          emptySpan.textContent = "No characters found";
          characterBar.appendChild(emptySpan);
          return;
        }
  
        // Create character spans
        characters.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name;
          
          span.addEventListener("click", () => {
            console.log("Selected character:", character);
            displayCharacter(character);
          });
          
          characterBar.appendChild(span);
        });
        
        // Display first character by default
        if (characters.length > 0) {
          displayCharacter(characters[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
        
        // Clear loading indicator
        characterBar.innerHTML = "";
        
        // Show error message
        const errorSpan = document.createElement("span");
        errorSpan.textContent = "Error loading characters. Check server connection.";
        characterBar.appendChild(errorSpan);
      });
  
    function displayCharacter(character) {
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCount.textContent = character.votes;
      imageElement.dataset.id = character.id;
      totalVotes = character.votes;
    }
  
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newVotes = parseInt(voteInput.value) || 0;
      if (newVotes > 0) {
        totalVotes += newVotes;
        voteCount.textContent = totalVotes;
        voteInput.value = "";
      } else {
        alert("Please enter a valid number of votes.");
      }
    });
  
    resetButton.addEventListener("click", () => {
      totalVotes = 0;
      voteCount.textContent = totalVotes;
    });
  });