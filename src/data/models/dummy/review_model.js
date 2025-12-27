export class Review {
  constructor({ id, userName, userAvatar, time, rating, comment }) {
    this.id = id;
    this.userName = userName;
    this.userAvatar = userAvatar;
    this.time = time;
    this.rating = rating;
    this.comment = comment;
  }
}
