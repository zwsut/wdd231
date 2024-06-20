function toggleMenu() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');

    var ul = nav.querySelector('ul');
    if (nav.classList.contains('active')) {
        ul.style.maxHeight = ul.scrollHeight + 'px';
    } else {
        ul.style.maxHeight = '0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');
    const memberContainer = document.getElementById('member-container');

    async function fetchMembers() {
        const response = await fetch('data/members.json');
        const members = await response.json();
        return members;        
    }

    function generateMemberCards(members) {
        memberContainer.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                <p>${member.otherInfo}</p>
            `;
            memberContainer.appendChild(card);
        });
    }

    fetchMembers().then(members => {
        generateMemberCards(members);
    });

    gridButton.addEventListener('click', function() {
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
    });

    listButton.addEventListener('click', function() {
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
    });
});
