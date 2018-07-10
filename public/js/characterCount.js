let chirpText = document.getElementById('chirp-form__input');
let availableCharCount = document.getElementById('available-chars');

chirpText.addEventListener('keyup', function(event) {
  availableCharCount.innerHTML = 280 - event.target.value.length;
});