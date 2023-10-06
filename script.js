let currentPokemonId = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetchPokemonData(currentPokemonId);

    document.getElementById("prevButton").addEventListener("click", () => {
        if (currentPokemonId > 1) {
            currentPokemonId--;
            fetchPokemonData(currentPokemonId);
        }
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (currentPokemonId < 1000) {
            currentPokemonId++;
            fetchPokemonData(currentPokemonId);
        }
    });

      document.getElementById("infoButton").addEventListener("click", () => {
          document.getElementById("infoButton").classList.remove("inactive");
          document.getElementById("infoButton").classList.add("active");
          document.getElementById("movesButton").classList.remove("active");
          document.getElementById("detailTitle").textContent = "Info";
          fetchPokemonData(currentPokemonId, "info");
      });
      
      document.getElementById("movesButton").addEventListener("click", () => {
          document.getElementById("movesButton").classList.add("active");
          document.getElementById("infoButton").classList.remove("active");
          document.getElementById("infoButton").classList.add("inactive");
          document.getElementById("detailTitle").textContent = "Moves";
          fetchPokemonData(currentPokemonId, "moves");
      });
});

function fetchPokemonData(id, mode = "info") {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("pokemonImage").src = data.sprites.front_default;
            document.getElementById("pokemonName").innerText = data.name;

            let types = "";
            data.types.forEach(type => {
                types += `<span class="type ${type.type.name}">${type.type.name}</span> `;
            });
            document.getElementById("pokemonTypes").innerHTML = types;

            let details = "";
            if (mode === "info") {
                details += `
                    <p>Height: ${data.height / 10}m</p>
                    <p>Weight: ${data.weight / 10}kg</p>
                    <p>HP: ${data.stats[0].base_stat}</p>
                    <p>Attack: ${data.stats[1].base_stat}</p>
                    <p>Defense: ${data.stats[2].base_stat}</p>
                    <p>Special Attack: ${data.stats[3].base_stat}</p>
                    <p>Special Defense: ${data.stats[4].base_stat}</p>
                    <p>Speed: ${data.stats[5].base_stat}</p>
                `;
            } else {
                data.moves.forEach(move => {
                    details += `<p>${move.move.name}</p>`;
                });
            }
            document.getElementById("pokemonAttributes").innerHTML = details;
        });
}
