
async function fetchMalfunctions() {

fetch('http://localhost:5000/api/malfunctions')
      .then(response => {
        if (!response.ok) {
          alert("Malfunctions not found!" + response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        

        const table = document.getElementById('malfunctionTable');

        const dropdown = document.getElementById('dropdown3');

        const dropdown2 = document.getElementById('dropdown2');
        
        // Clear all current table rows
        while(table.rows.length > 1) {
          table.deleteRow(1);
        }

        // Clear all the current dropdown options
        while(dropdown.options.length > 0) {
          dropdown.remove(0);
        }


        data.forEach(item => {
          const row = table.insertRow();  
          const issuedBy = row.insertCell();
          issuedBy.textContent = item.FirstName + " " + item.LastName;
          
          const descriptionCell = row.insertCell();
          descriptionCell.textContent = item.Description;
          
          const MalfunctionDefinitionCell = row.insertCell();
          MalfunctionDefinitionCell.textContent = item.MalfunctionDefinition;
          
          const startdateCell = row.insertCell();
          startdateCell.textContent = item.StartDate;

          const endDateCell = row.insertCell();
          endDateCell.textContent = item.EndDate;

          const fixedByCell = row.insertCell();
          fixedByCell.textContent = item.FixedBy;

          const performedProccessCell = row.insertCell();
          performedProccessCell.textContent = item.PerformedProcess;

          const statusCell = row.insertCell();
          statusCell.textContent = item.Status;


          if(item.Status == "Open"){
            const option = document.createElement('option');
            option.value = item.ID[0]; // Use a property from the API data for the value
            option.textContent = item.Description;
            dropdown.appendChild(option);

            for (var i = dropdown2.options.length - 1; i >= 0; i--) {
              if (dropdown2.options[i].value  == item.MachineID) {
                dropdown2.remove(i);
                
              }
            }
          }


        });



      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
}


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
        

        const dropdown = document.getElementById('dropdown1');

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

async function fetchMachines() {
fetch('http://localhost:5000/api/machines')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        // Insert data into HTML
        const dropdown = document.getElementById('dropdown2');

        data.forEach(item => {
          
          const option = document.createElement('option');
          option.value = item.ID[0]; // Use a property from the API data for the value
          option.textContent = item.Description
          dropdown.appendChild(option);
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

        const StaffID = formData.get('dropdown1');
        const definition = formData.get('definition');
        const MachineID = formData.get('dropdown2');

        const malfunction = {
          "StaffID": StaffID,
          "MalfunctionDefinition": definition,
          "MachineID": MachineID
        };

        try {
          const response = await fetch("http://localhost:5000/api/malfunctions", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(malfunction),
          });
  
          if (!response.ok) {
            alert("Malfunction not added!");
            throw new Error(`HTTP error! Status: ${response.status}`);
          }


          alert("Malfunction added successfully!");
          
          await fetchMalfunctions();
  
          // Your additional logic based on the server response goes here
        } catch (error) {
          console.error('Fetch error:', error);
        }
        

        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
}

async function handleFixMalfunction(event) {
  event.preventDefault();  // Prevent the default form submission

  var formData = new FormData(document.getElementById("fixedForm"));


  const MalfunctionID = formData.get('dropdown3');
  const FixedBy = formData.get('mechanicInformation');
  const PerformedProcess = formData.get('performedProcess');
  

  const malfunction = {
    "ID": MalfunctionID,
    "FixedBy": FixedBy,
    "PerformedProcess": PerformedProcess
  };

  try {
    const response = await fetch("http://localhost:5000/api/malfunctions", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(malfunction),
    });

    if (!response.ok) {
      alert("Malfunction not fixed!");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert("Malfunction fixed successfully!");

    await fetchMalfunctions();
    

  } catch (error) {
    console.error('Fetch error:', error);
  }
      

      


}





      // Attach the event listener to the submit button
const malfunctionButton = document.getElementById('malfunctionButton');
malfunctionButton.addEventListener('click', handleSubmitMalfunction);
const fixButton = document.getElementById('fixedButton');
fixButton.addEventListener('click', handleFixMalfunction);
fetchMachines();
fetchStaffs();
fetchMalfunctions();
