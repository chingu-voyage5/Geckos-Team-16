

var likeChirpIcon = Array.from(document.getElementsByClassName('chirp-content__likes'));

likeChirpIcon.forEach(function(chirpLike) {
  chirpLike.addEventListener('click', toggleChirpLike);
});

function toggleChirpLike() {
  let likedOrUnlikedChirpId = getLikedOrUnlikedChirpId(this);
  console.log(likedOrUnlikedChirpId); //string

  var isLiked = this.classList.toggle('isLiked');
}

function getLikedOrUnlikedChirpId(like) {
  let chirp = like.parentElement.parentElement.parentElement;
  return chirp.dataset.chirpId; //"chirpId" syntax is required due to dataset property.
}

