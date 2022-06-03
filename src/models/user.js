export default class User {
    constructor(username, password, createTime, role, token, id) {
        this.username = username;
        this.password = password;
        this.createTime= createTime;
        this.role = role;
        this.token = token;
        this.id = id;
    }
}