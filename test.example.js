module.exports.update = () => {
    let user;
    if (!user) throw new Error('Not Found.');
    else {
        console.log("USER", user);
        
        return user;
    }
}