

var likeChirpIcon = Array.from(document.getElementsByClassName('chirp-content__likes'));

likeChirpIcon.forEach(function(chirpLike) {
  chirpLike.addEventListener('click', toggleChirpLike);
});

function toggleChirpLike() {
  let likedOrUnlikedChirpForm = getLikedOrUnlikedChirpForm(this);
  console.log(likedOrUnlikedChirpForm); //string

  var isLiked = this.classList.toggle('isLiked');

  likedOrUnlikedChirpForm.submit();
  //what elements do I need to do front-end classes and back-end logic?

}

function getLikedOrUnlikedChirpForm(like) {
  let chirp = like.firstElementChild;
  return chirp; //"chirpId" syntax is required due to dataset property.
}

