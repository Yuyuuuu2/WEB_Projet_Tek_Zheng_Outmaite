const formulaire = document.getElementById("form-contact");
const message = document.getElementById("message-confirmation");

formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const sexe = document.getElementById("sexe").value;
    const age = document.getElementById("age").value;
    const question = document.getElementById("question").value;

    if (nom === "" || prenom === "" || email === "" ||
        sexe === "" || age === "" || question === "") {
        message.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    message.textContent = "Merci " + prenom + " ! Votre formulaire a bien été rempli.";

    formulaire.reset();
});