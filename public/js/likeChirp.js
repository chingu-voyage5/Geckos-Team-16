
var likeChirpIcons = Array.from(document.getElementsByClassName('chirp-content__likes'));

likeChirpIcons.forEach(function(likeElement) {
  likeElement.addEventListener('click', toggleLikeStatus);

  loadedLikeStatus = getLikedOrUnlikedChirpFormInput(likeElement).value
  if (loadedLikeStatus === 'true') {
    likeElement.classList.add('isLiked');
  }
});

function toggleLikeStatus() {
  let likedOrUnlikedChirpForm = getLikedOrUnlikedChirpForm(this);
  let likedOrUnlikedChirpFormInput = getLikedOrUnlikedChirpFormInput(this);
  let toggledlikedOrUnlikedChirpFormInputValue = usersNewLikeStatus(this);
  likedOrUnlikedChirpFormInput.value = toggledlikedOrUnlikedChirpFormInputValue;
  likedOrUnlikedChirpForm.submit(); 
}

function getLikedOrUnlikedChirpForm(likedOrUnlikedElement) {
  let form = likedOrUnlikedElement.firstElementChild;
  return form; 
}

function getLikedOrUnlikedChirpFormInput(likedOrUnlikedElement) {
  let input = likedOrUnlikedElement.firstElementChild.firstElementChild
  return input;
}

function usersNewLikeStatus(likedOrUnlikedElement) {
  let val = likedOrUnlikedElement.firstElementChild.firstElementChild.value;
  if (val === 'true'){
    newVal = 'false';
    likedOrUnlikedElement.classList.toggle('isLiked');
  } else {
    newVal = 'true';
    likedOrUnlikedElement.classList.toggle('isLiked');
  }
  return newVal;
}