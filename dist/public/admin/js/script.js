// Button change status Topic

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

// Button change Songs  

if (listButtonChangeStatus){
    const formChangeStatus = document.querySelector("[form-change-status ]")
    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const songId = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");

            const path = formChangeStatus.getAttribute("data-path");
            const action = path + `/${status}/${songId}?_method=PATCH`;

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

// Preview audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio){

    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    
    uploadAudioInput.addEventListener("change", () => {
        const file = uploadAudioInput.files[0];
        if (file){
            uploadAudioPlay.src = URL.createObjectURL(file);
            uploadAudioPlay.load()
        }
    })
}
// Preview audio 

// Button delete (confirm)
const listButtonDelete = document.querySelectorAll("[button-delete]");
if (listButtonDelete.length > 0){
    listButtonDelete.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const isConfirm = confirm(button.getAttribute("button-delete-confirm") || "Bạn có chắc muốn xóa?");
            if (isConfirm){
                window.location.href = button.getAttribute("href");
            }
        })
    })
}
// End button delete

// Submit permissions
const buttonSubmitPermissions = document.querySelector("[button-submit-permissions]");
if (buttonSubmitPermissions){
    buttonSubmitPermissions.addEventListener("click", () => {
        const tablePermissions = document.querySelector("[table-permissions]");
        const formChangePermissions = document.querySelector("[form-change-permissions]");
        if (!tablePermissions || !formChangePermissions) return;

        // Danh sách id nhóm quyền theo thứ tự từng cột
        const ids = [];
        const rowId = tablePermissions.querySelector(`tr[data-name="id"]`);
        rowId.querySelectorAll(".role-id").forEach((input) => {
            ids.push(input.value);
        })

        const result = [];
        ids.forEach((id, indexColumn) => {
            const permissions = [];

            // Duyệt từng dòng (bỏ qua dòng ẩn chứa id)
            const rows = tablePermissions.querySelectorAll("tbody tr[data-name]");
            rows.forEach((row) => {
                const name = row.getAttribute("data-name");
                if (name === "id" || name === "view" || name === "create" || name === "edit" || name === "delete") return;

                const checkbox = row.querySelectorAll("input[type=checkbox]")[indexColumn];
                if (checkbox && checkbox.checked){
                    permissions.push(name);
                }
            })

            result.push({
                id: id,
                permissions: permissions
            })
        })

        const inputRoles = formChangePermissions.querySelector("input[name=roles]");
        inputRoles.value = JSON.stringify(result);

        formChangePermissions.submit();
    })
}
// End submit permissions