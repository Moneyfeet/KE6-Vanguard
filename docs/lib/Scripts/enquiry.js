// enquiry submition
function submit() {
    const name = document.getElementById("Name").value.trim(); 
    const email = document.getElementById("Email").value.trim();
    const contact = document.getElementById("Contact").value.trim();
    if (name === "" || email === "" || contact.value === "") {
        alert("Please fill in all fields.");
        return;
    } 
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    } 
    const contactInput = document.getElementById("Contact");
    if (!contactInput) {
        console.error("Element with ID 'Contact' not found");
        return;
    }

    const phonePattern = /^\d{5,15}$/;
    if (!phonePattern.test(contact)) {
        alert("Please enter a valid 5-15 digit contact number.");
        return;
    }
    alert("Enquiry Submitted!");
};
