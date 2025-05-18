export class User {
    name;
    email;
    password;
    photoUrl;
    id;
    constructor(name, email, password, photoUrl, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photoUrl = photoUrl;
        this.id = id;
    }
}
