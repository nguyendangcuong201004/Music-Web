// Button change status

const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("[form-change-status ]")
    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const topicId = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");

            const path = formChangeStatus.getAttribute("data-path");
            const action = path + `/${status}/${topicId}?_method=PATCH`;

            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}

// Button change status


// Preview image 
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    
    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if (file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// Preview image 


// Show alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert){
    const time = showAlert.getAttribute("data-time");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, parseInt(time))
}
// Close alert
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert){
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}