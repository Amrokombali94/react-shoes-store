export default class Purchase {
    constructor(userId, shoesId, price, purchaseTime, imageSrc, id) {
        this.userId = userId;
        this.shoesId =shoesId;
        this.price= price;
        this.purchaseTime= purchaseTime;
        this.imageSrc= imageSrc;
        this.id= id;

    }
}