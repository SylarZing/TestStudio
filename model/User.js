class User {
    constructor (id, username, phone, email, password, usertype){
        this.ID = id;
        this.UserName = username;
        this.Phone = phone;
        this.Email = email;
        this.Password = password;
        this.UserType = usertype;

    }
}

module.exports = User;