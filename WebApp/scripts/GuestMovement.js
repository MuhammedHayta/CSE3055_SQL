function toggleGuestForms() {
  var guestTypeSelect = document.getElementById("guestType");
  var existingGuestDropdown = document.getElementById("existingGuestDropdown");
  var newGuestForm = document.getElementById("newGuestForm");

  if (guestTypeSelect.value === "existing") {
    existingGuestDropdown.style.display = "block";
    newGuestForm.style.display = "none";
  } else if (guestTypeSelect.value === "new") {
    existingGuestDropdown.style.display = "none";
    newGuestForm.style.display = "block";
  }
}

async function fetchGuests() {
  fetch("http://localhost:5000/api/guests")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      const dropdown = document.getElementById("existingGuest");
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID[0]; // Use a property from the API data for the value
        option.textContent = item.FirstName + " " + item.LastName;
        dropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function fetchStaffs() {
  fetch("http://localhost:5000/api/staffs")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      const dropdown = document.getElementById("whomToVisit");
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID[0]; // Use a property from the API data for the value
        option.textContent = item.FirstName + " " + item.LastName;
        dropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function handleStartMovementButton() {
  event.preventDefault();

  var formData = new FormData(document.getElementById("guestForm"));

  var guestTypeSelect = document.getElementById("guestType");

  //if guestTypeSelect is new, create new guest
  //const {FirstName, LastName, Birthdate, PhoneNumber, IdentityNumber, Company} = req.body;
  var guestID;
  if (guestTypeSelect.value === "new") {
    var newGuest = {
      FirstName: formData.get("FirstName"),
      LastName: formData.get("LastName"),
      Birthdate: formData.get("Birthdate"),
      PhoneNumber: formData.get("PhoneNumber"),
      IdentityNumber: formData.get("IdentityNumber"),
      Company: formData.get("Company"),
    };

    fetch("http://localhost:5000/api/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGuest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  } else if (guestTypeSelect.value === "existing") {
    guestID = formData.get("existingGuest");
  }

  //create new guest movement
  //const { GuestID, VehicleID, EnterDate, VisitingReason, WhoToVisit } = req.body

  var newGuestMovement = {
    GuestID: guestID,
    LicensePlate: formData.get("vehicleInfo"),
    //Current date
    EnterDate: new Date().toISOString().slice(0, 10),
    VisitingReason: formData.get("VisitingReason"),
    WhoToVisit: formData.get("whomToVisit"),
  };

  fetch("http://localhost:5000/api/guest-movements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGuestMovement),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("guestForm");
  form.addEventListener("submit", handleStartMovementButton);
});

fetchGuests();
fetchStaffs();
