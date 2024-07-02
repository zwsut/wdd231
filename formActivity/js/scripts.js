const currentUrl = window.location.href;

const formData = currentUrl.split('?')[1].split('&');

function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.replace('%40','@');
        }
    })
    return(result.split('=')[1]);
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
    <p>Appointment for ${show('first')} ${show('last')}.</p>
    <p>Proxy ${show('ordinance')} on ${show('fecha')} in the ${show('location')} Temple.</p>
    <p>Appointment for ${show('first')} ${show('last')}.</p>
    <p>Your phone: ${show('phone')}</p>
    <p>Your email: <a href="mailto:${show('email')}">${show('email')}</a></p>
    <p>Thank you for scheduling!</p>
    `;