function showPage(pageId) {
  // Hide all pages
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  // Show the selected page
  var selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.style.display = "block";
  }
}

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
          option.value = item.ID; // Use a property from the API data for the value
          option.textContent = item.FirstName + " " + item.LastName;
          dropdown.appendChild(option);
        });



      })
      .catch(error => {
        console.error('Fetch error:', error);
      });



fetch('http://localhost:5000/api/machines')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        // Insert data into HTML
        
        console.log(data)
        const dropdown = document.getElementById('dropdown2');

        data.forEach(item => {
          const option = document.createElement('option');
          console.log(item.ID[0])
          option.value = item.ID[0]; // Use a property from the API data for the value
          option.textContent = item.Description
          dropdown.appendChild(option);
        });



      })
      .catch(error => {
        console.error('Fetch error:', error);
      });


async function handleSubmitMalfunction(event) {
        event.preventDefault();  // Prevent the default form submission
  
        // Your form processing logic goes here
        // For example, you can fetch data, validate, or perform other actions
  
        const form = document.getElementById('malfunctionForm');
        const formData = new FormData(form);

        const StaffID = formData.get('dropdown1')[0];
        const definition = formData.get('definition');
        const MachineID = formData.get('dropdown2')[0];
        

        const malfunction = {
          "StaffID": StaffID,
          "MalfunctionDefinition": definition,
          "MachineID": MachineID
        };

        console.log("machine id: " + malfunction.MachineID);

        try {
          const response = await fetch("http://localhost:5000/api/malfunctions", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(malfunction),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }


          console.log("Malfunction added")
  
          
  
          // Your additional logic based on the server response goes here
        } catch (error) {
          console.error('Fetch error:', error);
        }
        

        // for (const [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
}
  
      // Attach the event listener to the submit button
const malfunctionButton = document.getElementById('malfunctionButton');
malfunctionButton.addEventListener('click', handleSubmitMalfunction);