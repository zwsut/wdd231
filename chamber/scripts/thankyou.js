const currentUrl = window.location.href;

const formData = currentUrl.split('?')[1].split('&');
console.log(formData);
function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.replace('%40','@');
        }
    })
    return(result.split('=')[1]);
}

const encodedDateStr = show('timestamp');
const decodedDateStr = decodeURIComponent(encodedDateStr);
const dateObj = new Date(decodedDateStr);
const formattedDate = dateObj.toLocaleString();

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
    <p><strong>Name:</strong> ${show('first-name')} ${show('last-name')}.</p>
    <p><strong>Organization Title:</strong> ${show('organization-title')}</p>
    <p><strong>Email Address:</strong> <a href="mailto:${show('email')}">${show('email')}</a></p>
    <p><strong>Phone:</strong> ${show('mobile')}</p>
    <p><strong>Organization:</strong> ${show('organization')}</p>
    <p><strong>Organization Description:</strong> ${show('description')}</p>
    <p><strong>Membership level:</strong> ${show('membership-level')}</p><br>
    
    <p><strong>Time submitted:</strong> ${formattedDate}</p>
    <p><strong>Thank you for your application!</strong></p>
    `;

