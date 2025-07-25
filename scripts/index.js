const initialCards = [
  {
    name: "Golden gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption")

const profileFormElement = editProfileModal.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const cardImageInput = newPostModal.querySelector("#card-image-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");



function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened")
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
   profileName.textContent = profileNameInput.value;
   profileDescription.textContent =profileDescriptionInput.value; 
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement( {
    name: cardCaptionInput.value,
    link: cardImageInput.value,
  });
  cardsList.prepend(cardElement);
  closeModal(newPostModal);
  initialCards.push({name: cardCaptionInput.value, link: cardImageInput.value})
  cardCaptionInput.value = "";
  cardImageInput.value = "";
}

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  
  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewCaption.textContent = data.name;
    console.log("Setting image src to:", data.link);
    openModal(previewModal);
    console.log("Image element:", previewImage);
  });

  
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active")
  });
  
  cardDeleteBtn.addEventListener("click", () => {
    cardDeleteBtn.closest(".card").remove();
  });
  
  
  return cardElement;
  
}  

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
})

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
  profileNameInput.value = "";
  profileDescriptionInput.value = "";
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
  cardImageInput.value = "";
  cardCaptionInput.value ="";
});
addCardFormElement.addEventListener("submit", handleAddCardSubmit);  


initialCards.forEach((data) => {
  let newCard = getCardElement(data);
  cardsList.prepend(newCard);
})

console.log(initialCards);