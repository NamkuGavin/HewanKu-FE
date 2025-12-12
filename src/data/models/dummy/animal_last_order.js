export class OrderAnimalItem {
  constructor({
    id,
    image,
    name,
    gender,
    ageText,
    category,
    price,
    quantity,
    healthStatus,
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.gender = gender;
    this.ageText = ageText;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.healthStatus = healthStatus;
  }
}

export class OrderAdopsi {
  constructor({ orderId, status, dateTimeText, total, items = [] }) {
    this.orderId = orderId;
    this.status = status;
    this.dateTimeText = dateTimeText;
    this.total = total;
    this.items = items;
  }
}
