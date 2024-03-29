const characterContainer = document.querySelector(".contentList");
const prevButton = document.getElementById("previousPage");
const nextButton = document.getElementById("nextPage");
const nameValue = document.getElementById("headerForm").value;
let initialPage = 1;

const renderOnDisplay = (character) => {
  const userCard = document.createElement("div");
  const userCardImage = document.createElement("div");
  const userCardText = document.createElement("div");
  userCard.classList.add("userCard");
  userCardImage.classList.add("userCardImage");
  userCardText.classList.add("userCardText");

  userCardImage.innerHTML = `
    <img src='${character.image}' alt=''>
    `;
  userCardText.innerHTML = `
    <h3> ${character.name} </h3>
    <p> ${character.status} - ${character.species} </p>
    <p> <span>Última localização conhecida</span> </p>
    <p> ${character.location.name} </p>
    <p> <span>Visto a última vez em:</span> </p>
    <p> Episódio ${character.episode.length} </p>
  `;

  userCard.appendChild(userCardImage);
  userCard.appendChild(userCardText);
  characterContainer.appendChild(userCard);
};

async function getCharacters() {
  try {
    const response = await api.get(`/character/?page=${initialPage}`);
    const characters = response.data.results;
    characters.forEach((character) => {
      renderOnDisplay(character);
    });
    pageNumber.textContent = `Página atual: ${initialPage}`;
  } catch (error) {
    characterContainer.innerHTML = `
    <h2>Ocorreu um erro. ${error}</h2>
    `;
  }
}
getCharacters();

async function getCharactersByName() {
  try {
    const response = await api.get(`/character/?name=${nameValue}`);
    const characters = response.data.results;

    characterContainer.innerHTML = "";

    characters.forEach((character) => {
      renderOnDisplay(character);
    });
    nameValue.innerHTML = "";
  } catch (error) {
    characterContainer.innerHTML = `
    <h2>Ocorreu um erro. ${error}</h2>
    `;
  }
}

function nextPage() {
  initialPage += 1;

  characterContainer.innerHTML = "";

  getCharacters();
}

function previousPage() {
  if (initialPage > 1) {
    initialPage -= 1;
  }
  characterContainer.innerHTML = "";

  getCharacters();
}
