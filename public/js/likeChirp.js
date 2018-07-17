var likeChirpIcons = Array.from(document.getElementsByClassName('chirp-content__likes'));
    likeChirpIcons.forEach(function(likeElement) {
      likeElement.addEventListener('click', toggleLikeStatus);
    });

function toggleLikeStatus() {

  let likedOrUnlikedChirpForm = getLikedOrUnlikedChirpForm(this);
  let likedOrUnlikedChirpFormInputValue = usersNewLikeStatus(this);
  console.log(likedOrUnlikedChirpFormInputValue);
  // likedOrUnlikedChirpForm.submit();
}

function getLikedOrUnlikedChirpForm(likedOrUnlikedElement) {
  let form = likedOrUnlikedElement.firstElementChild;
  return form; 
}

function usersNewLikeStatus(likedOrUnlikedElement) {
  let val = likedOrUnlikedElement.firstElementChild.firstElementChild.value;
  if (val === 'true'){
    val = 'false';
    likedOrUnlikedElement.classList.toggle('isLiked');
  } else if (val === 'false') {
    val = 'true';
    likedOrUnlikedElement.classList.toggle('isLiked');
  } else {
    val = ''
  }
  return val;
}