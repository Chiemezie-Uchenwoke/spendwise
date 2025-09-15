const uploadProfileImage = async (file) => {
    const apiUrl = "http://localhost:3000/profile/upload";

    const formData = new FormData();
    formData.append("profileImage", file); // "profileImage" must match your backend field name

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            credentials: "include",
            body: formData
        });
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err);
        return null;
    }
}

export default uploadProfileImage;