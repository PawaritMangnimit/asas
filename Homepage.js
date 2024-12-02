document.addEventListener("DOMContentLoaded", () => {
    const guestForm = document.getElementById("guestForm");
    const entriesList = document.getElementById("entriesList");

    // ฟังก์ชันบันทึกความคิดเห็นใน localStorage
    function saveEntries(entries) {
        localStorage.setItem("guestEntries", JSON.stringify(entries));
    }

    // ฟังก์ชันโหลดความคิดเห็นจาก localStorage
    function loadEntries() {
        const savedEntries = localStorage.getItem("guestEntries");
        return savedEntries ? JSON.parse(savedEntries) : [];
    }

    // ฟังก์ชันเพิ่มความคิดเห็นไปยังหน้า HTML
    function addEntryToList({ name, email, rating, suggestions }) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>ชื่อ:</strong> ${name}<br>
            <strong>อีเมล:</strong> ${email}<br>
            <strong>ความพึงพอใจ:</strong> ${rating}<br>
            <strong>ความคิดเห็น:</strong> ${suggestions}<br>
        `;
        entriesList.appendChild(listItem);
    }

    // โหลดความคิดเห็นเมื่อเริ่มต้น
    const entries = loadEntries();
    entries.forEach(addEntryToList);

    // เมื่อผู้ใช้ส่งฟอร์ม
    guestForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(guestForm);

        const newEntry = {
            name: formData.get("name"),
            email: formData.get("email"),
            rating: formData.get("rating"),
            suggestions: formData.get("suggestions"),
        };

        // เพิ่มความคิดเห็นใหม่ในหน้า HTML
        addEntryToList(newEntry);

        // อัปเดตความคิดเห็นใน localStorage
        entries.push(newEntry);
        saveEntries(entries);

        // รีเซ็ตฟอร์ม
        guestForm.reset();
    });
});
