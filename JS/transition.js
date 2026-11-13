
document.addEventListener("DOMContentLoaded", function() {

    document.body.classList.add("page-visible");

    const liens = document.querySelectorAll(".navigation a");

    liens.forEach(function(lien) {
        lien.addEventListener("click", function(event) {

            const destination = lien.getAttribute("href");

            if (!destination || destination.startsWith("#")) {
                return;
            }

            event.preventDefault();

            document.body.classList.remove("page-visible");
            document.body.classList.add("page-cachee");

            setTimeout(function() {
                window.location.href = destination;
            }, 500);

        });
    });

});
