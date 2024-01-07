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
            data.forEach(record => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.FirstName} ${record.LastName}</td>
                    <td>${record.LicensePlate}</td>
                    <td>${record.DeparturePlace}</td>
                    <td>${record.ArrivalPlace}</td>
                    <td>${record.Description}</td>
                    <td>${new Date(record.Date).toLocaleDateString()}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

async function handleSubmitMalfunction(event) {
    event.preventDefault();  // Prevent the default form submission

    // Your form processing logic goes here
    // For example, you can fetch data, validate, or perform other actions

    var formData = new FormData(document.getElementById("malfunctionForm"));

    console.log(formData.get('staffSelect'));
    const malfunction = {
      "StaffID": StaffID,
      "MalfunctionDefinition": definition,
      "MachineID": MachineID
    };

    

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
}


const form = document.getElementById('malfunctionForm');
form.addEventListener('submit', handleSubmitMalfunction);

fetchStaffs();

fetchStaffMovements();