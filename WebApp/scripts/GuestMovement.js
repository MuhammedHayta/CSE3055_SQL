$(document).ready(function () {
    // Initialize Select2 for the existingGuest dropdown
    $('#existingGuest').select2({
        placeholder: 'Search for existing guest',
        width: '100%', // Adjust the width to 100%
    });
});

function toggleGuestForms() {
    var guestTypeSelect = document.getElementById('guestType');
    var existingGuestDropdown = document.getElementById('existingGuestDropdown');
    var newGuestForm = document.getElementById('newGuestForm');

    if (guestTypeSelect.value === 'existing') {
        existingGuestDropdown.style.display = 'block';
        newGuestForm.style.display = 'none';
    } else if (guestTypeSelect.value === 'new') {
        existingGuestDropdown.style.display = 'none';
        newGuestForm.style.display = 'block';
    }
}

function endMovement() {
    // Implement your logic for ending movement here
    alert('End Movement triggered for selected guest.');
}

fetch('localhost:5000//api/guest-movements').then(function (response) {
    return response.json();
}
).then(function (data) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(data);
}
).catch(function (err) {
    console.log(err);
}
);
