document.getElementById('timestamp').value = new Date().toISOString();

function displayModal(name, description, price) {
    let modal = document.getElementById('modalBox');

    modal.innerHTML = '';
    modal.innerHTML = `
        <button id='closeModal'>❌</button>
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${price}</p>
    `;
    modal.showModal();

    document.getElementById('closeModal').addEventListener("click", () => {
        modal.close();
    });
}
