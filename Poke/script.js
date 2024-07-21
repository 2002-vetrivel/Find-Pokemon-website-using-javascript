document.addEventListener("DOMContentLoaded", function() {
    const find = document.getElementById('Submit');

    find.addEventListener('click', () => {
        const poke = document.getElementById('text').value.trim();
        const image = document.getElementById('image');
        const inputField = document.getElementById('text');
        const develop = document.getElementById('para');
        if (poke === "") {
            image.textContent = "Input field is empty";
            image.style.color = "red";
            return;
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
        .then((result) => {
            if (!result.ok) {
                throw new Error("Pokemon not found");
            }
            return result.json();
        })
        .then((data) => {
            const pokeImage = data.sprites.front_default;
            const pokeName = data.name;
            if (pokeImage) {
                image.innerHTML = `<img src="${pokeImage}" alt="${pokeName}" style="width:200px; height: 200px; border-radius:10px; border:1px solid black">`;
                image.innerHTML += `<div>${pokeName.toUpperCase()}</div>`;
                image.style.color = "blue";
                image.style.textAlign = "center";
                inputField.value = "";
                develop.innerHTML = "";
            } else {
                image.textContent = "Image not found";
                image.style.color = "red";
            }
        })
        .catch((error) => {
            image.textContent = "Error fetching Pokémon data: " + error.message;
            image.style.color = "red";
        });
    });
});
