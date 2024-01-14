fetch('http://localhost:5000/api/parking-slots')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.json();
      })
      .then(data => {
        // Insert data into HTML
        

        const table = document.getElementById('parkingSlotTable');

        data.forEach(item => {
            
            const row = table.insertRow();

            const id = row.insertCell();
            id.textContent = item.ID[0];

            const status = row.insertCell();
            if(item.Status === "Available"){
                status.textContent = "Available";
            }else{
                status.textContent = "Occupied";
            }

            const licensePlate = row.insertCell();
            licensePlate.textContent = item.LicensePlate;



        });



      })
      .catch(error => {
        console.error('Fetch error:', error);
      });