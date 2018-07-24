

chirpText.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    chirpFormButton.click()
  }
});


