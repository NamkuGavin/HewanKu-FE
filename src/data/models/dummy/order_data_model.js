// models/order_model.js

export class OrderActivity {
  constructor({
    title,
    date,
    status, // 'completed' | 'warning' | 'pending' | 'rejected'
    phone = null,
    note = null,
  }) {
    this.title = title;
    this.date = date;
    this.status = status;
    this.phone = phone;
    this.note = note;
  }
}

export class OrderActivities {
  constructor({ form = [], payment = [] }) {
    this.form = form.map((item) =>
      item instanceof OrderActivity ? item : new OrderActivity(item)
    );

    this.payment = payment.map((item) =>
      item instanceof OrderActivity ? item : new OrderActivity(item)
    );
  }
}

export class OrderData {
  constructor({
    orderId,
    animalCount,
    estimatedTime,
    price,
    orderDate,
    formStatus, // 'pending' | 'approved' | 'rejected'
    paymentStatus, // 'pending' | 'processing' | 'success' | 'failed'
    activities,
  }) {
    this.orderId = orderId;
    this.animalCount = animalCount;
    this.estimatedTime = estimatedTime;
    this.price = price;
    this.orderDate = orderDate;
    this.formStatus = formStatus;
    this.paymentStatus = paymentStatus;
    this.activities = new OrderActivities(activities);
  }

  /* ======================
     Helper / computed
     ====================== */

  get isFormApproved() {
    return this.formStatus === "approved";
  }

  get isPaymentAccessible() {
    return this.isFormApproved;
  }

  get isPaymentSuccess() {
    return this.paymentStatus === "success";
  }
}
