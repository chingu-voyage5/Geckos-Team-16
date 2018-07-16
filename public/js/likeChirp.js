

var likeChirpIcon = Array.from(document.getElementsByClassName('chirp-content__likes'));

likeChirpIcon.forEach(function(chirpLike) {
  chirpLike.addEventListener('click', toggleChirpLike);
});

function toggleChirpLike() {

  

  let likedOrUnlikedChirpForm = getLikedOrUnlikedChirpForm(this);
  let likedOrUnlikedChirpFormInputValue = toggleLikeStatus(this)
  console.log(likedOrUnlikedChirpForm); //string
  console.log(likedOrUnlikedChirpFormInputValue);

  

  likedOrUnlikedChirpForm.submit();
  

}

function getLikedOrUnlikedChirpForm(like) {
  let form = like.firstElementChild;
  return form; //"chirpId" syntax is required due to dataset property.
}

function toggleLikeStatus(like) {
  let val = like.firstElementChild.firstElementChild.value;
  return val;
}