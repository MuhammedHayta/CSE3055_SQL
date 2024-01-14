async function fetchStaffs() {
    fetch('http://localhost:5000/api/staffs')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
    })
    .then(data => {
      // Insert data into HTML

      const dropdown = document.getElementById('staffSelect');

      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.ID[0]; // Use a property from the API data for the value
        option.textContent = item.FirstName + " " + item.LastName;
        dropdown.appendChild(option);
      });



    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }


  async function fetchStaffMovements() {
    fetch('http://localhost:5000/api/staff-movements')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('staffMovementTable');
            tbody.innerHTML = '';
            data.forEach(record => {

                const deleteButton = document.createElement('input');
                deleteButton.type = "button";
                deleteButton.name = "Delete";
                deleteButton.id = record.ID;
                deleteButton.value = "Delete";
                deleteButton.className = "btn btn-danger";
                deleteButton.onclick = async function() {
                    await sendDeleteReqeust(record.ID[0]);
                }


                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.FirstName} ${record.LastName}</td>
                    <td>${record.LicensePlate}</td>
                    <td>${record.DeparturePlace}</td>
                    <td>${record.ArrivalPlace}</td>
                    <td>${record.Description}</td>
                    <td>${new Date(record.Date).toLocaleDateString()}</td>
                `;

                row.insertCell().appendChild(deleteButton);
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


async  function sendDeleteReqeust(id) {

    try {
        const response = await fetch('http://localhost:5000/api/staff-movements', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ID: id}),
        });

        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
        console.log("id: ", id)

        if (!response.ok) {
            alert("Staff movement not deleted!");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Staff movement deleted! ", id);

        await fetchStaffMovements();

    } catch (error) {
        console.error('Error:', error);
    }
}




async function handleSubmitStaffMovement(event) {
    event.preventDefault();  // Prevent the default form submission

    // Your form processing logic goes here
    // For example, you can fetch data, validate, or perform other actions

    var formData = new FormData(document.getElementById("staffMovementForm"));
    
    const data = {
        StaffID: formData.get('staffSelect'),
        LicensePlate: formData.get('vehiclePlate'),
        DeparturePlace: formData.get('departurePlace'),
        ArrivalPlace: formData.get('arrivalPlace'),
        Description: formData.get('description'),
        Date: formData.get('movementDate')
    };

    try {
        const response = await fetch('http://localhost:5000/api/staff-movements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));

        if (!response.ok) {
            alert("Staff movement not added!");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert("Staff movement added!");

        await fetchStaffMovements();

    } catch (error) {
        console.error('Error:', error);
    }
    

    console.log(data);

}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('staffMovementForm');
    form.addEventListener('submit', handleSubmitStaffMovement);
});

fetchStaffs();
fetchStaffMovements();