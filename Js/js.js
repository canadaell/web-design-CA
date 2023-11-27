function myFunction(){
    let user = prompt("Enter your name");
    if(user !== null) {
        alert("Welcome " + user);
        let content = "";
        for(let i = 1; i <= 100; i++) {
            content += ("<h5>" + user + "</h5>");
        }
        document.getElementById("main").innerHTML = content;
    } else {
        alert("No name entered");
    }
}
