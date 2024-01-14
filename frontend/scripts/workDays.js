function WorkDayInit() {
    createStaffTable();
    fillStaffDropdown();
    
  
  }
  
  async function getStaff() {
    
    fetch('http://localhost:5000/api/staffs')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  }
  
  
async function createStaffTable() {
    try {
        var staffData = await getStaff(); // Wait for the staff data to be fetched
        var tableBody = document.getElementById('staffTableBody');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Populate the table with data
        staffData.forEach(function (employee) {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.textContent = employee.IdentityNumber;
            cell2.textContent = employee.FirstName;
            cell3.textContent = employee.LastName;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getStaff() {
    try {
        const response = await fetch('http://localhost:5000/api/staffs');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return []; // Return an empty array in case of error
    }
}
  
  
async function fillStaffDropdown() {
    try {
        var staffMembers = await getStaff();
        var dropdown1 = document.getElementById("dropdownAddStaff");
        

        staffMembers.forEach(function (staffMember) {
            var option1 = document.createElement("option");
            option1.text = staffMember.FirstName+" "+staffMember.LastName+ "-"+staffMember.IdentityNumber;
            option1.value = staffMember.ID[0];
            dropdown1.appendChild(option1);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
  


document.addEventListener("DOMContentLoaded", function() {
    var submitWorkDayButton = document.getElementById('submitWorkDaybtn');
    submitWorkDayButton.addEventListener('click', submitWorkDay);
});

async function submitWorkDay() {
    console.log("submitWorkDay is called");
    var form = document.getElementById('submitWorkDayForum');
    var formData = new FormData(form);

    var StaffID = formData.get('dropdownAddStaff')[0];
    
    var DateInput = document.getElementById('stringBoxAddDate');
    var Date = DateInput.value;
    Date = `${Date}T00:00:00.000Z`.toString();
    
    
    console.log("logging date " + Date);

    var StartHourInput = document.getElementById('stringBoxAddStartHour');
    var StartHour = StartHourInput.value;
    StartHour =`1970-01-01T${StartHour}:00.000Z`.toString();

    console.log("logging startHour "+StartHour);

    var EndHourInput = document.getElementById('stringBoxAddEndHour');
    var EndHour = EndHourInput.value;
    EndHour = `1970-01-01T${EndHour}:00.000Z`.toString();
    
    console.log("logging EndHour "+EndHour);

    

    const data = {
        "StaffID":StaffID,
        "Date": Date,
        "EntryTime":StartHour,
        "ExitTime":EndHour
    };

    try {
        const response = await fetch("http://localhost:5000/api/work-days", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          alert("Work day not added!");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        console.log("work day added")
        alert("Work day added!");

        

        // Your additional logic based on the server response goes here
      } catch (error) {
        console.error('Fetch error:', error);
      }

}

