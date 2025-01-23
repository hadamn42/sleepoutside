const newsletterForm = document.getElementById("newsletterForm");
const confirmationMessage = document.getElementById("confirmationMessage");

newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault(); /*Prevents reloading*/
    
    confirmationMessage.textContent = "You have been subscribed";

});
