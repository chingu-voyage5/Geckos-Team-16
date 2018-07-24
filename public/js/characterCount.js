let chirpText = document.getElementById('chirp-form__input');
let availableCharCount = document.getElementById('available-chars');
var chirpFormButton = document.getElementsByClassName('chirp-form__button')[0];

chirpText.addEventListener('keyup', function(event) {
  let currentChirpTextLength = this.value.length;

  
  if (currentChirpTextLength > 0) {
    chirpFormButton.removeAttribute('disabled');
  } else {
    chirpFormButton.setAttribute('disabled', '');
  }

  availableCharCount.innerHTML = 280 - currentChirpTextLength;

});

