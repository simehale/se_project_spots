const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgId = inputEl.id + "-error";
  const errorMsgEl = document.querySelector("#" + errorMsgId);
  errorMsgEl.textContent = errorMsg;
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } //else {
    //hideInputError(formElement, inputElement);
    //}
};

const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
    const buttonEl = formEl.querySelector(".modal__save-btn");
    //toggleButtonState(inputList, buttonEl);
   
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      
      //toggleButtonState(inputList, buttonEl);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
     setEventListeners(formEl);
  });
};

enableValidation();