async function getStaff() {
  fetch("http://localhost:5000/api/staffs")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const dropdown = document.getElementById("staffSelect");
      const dropdown2 = document.getElementById("dropdownProcessAnnualLeave");

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.ID[0]; // Use a property from the API data for the value
        option.textContent = item.FirstName + " " + item.LastName;
        dropdown.appendChild(option);

        //dropdown2.appendChild(option);



      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function toggleSectionContent(value) {
  var sections = ["createRequest", "approveDeny", "deleteRequest"];
  sections.forEach(function (section) {
    var sectionDiv = document.getElementById(section);
    sectionDiv.style.display = section === value ? "block" : "none";
  });
}

function annualLeaveInit() {
  toggleAnnualLeaveSection();
  fillAnnualLeaveDropdown();
  fillAnnualLeaveRequesetDropdown();
  createAnnualLeaveRequestTable();
  createAnnualLeaveDeleteTable();
}

function toggleAnnualLeaveSection() {
  var sectionDropdown = document.getElementById("sectionDropdown");
  sectionDropdown.style.display =
    sectionDropdown.style.display === "none" ? "block" : "none";
}

function fillAnnualLeaveDropdown() {
  var staffMembers = getStaff();
  var dropdown1 = document.getElementById("dropdownAddAnnualLeave");
  var dropdown2 = document.getElementById("dropdownProcessAnnualLeave");
  var dropdown3 = document.getElementById("dropdownDeleteAnnualLeave");

  staffMembers.forEach(function (staffMember) {
    console.log("burası 1");
    var option1 = document.createElement("option");
    option1.text = staffMember.name;
    dropdown1.appendChild(option1);
    console.log("burası 2")

    var option2 = document.createElement("option");
    option2.text = staffMember.name;
    dropdown2.appendChild(option2);

    var option3 = document.createElement("option");
    option3.text = staffMember.name;
    dropdown3.appendChild(option3);
  });
}

function getAnnualLeaveRequests() {
  var requests = [
    { name: "John", date: "2020-01-01", status: "pending" },
    { name: "Jane", date: "2020-01-02", status: "approved" },
    { name: "Jack", date: "2020-01-03", status: "denied" },
    { name: "Jill", date: "2020-01-04", status: "pending" },
    { name: "James", date: "2020-01-05", status: "approved" },
    { name: "Jenny", date: "2020-01-06", status: "denied" },
  ];
  return requests;
}

function fillAnnualLeaveRequesetDropdown() {
  var staffMembers = getAnnualLeaveRequests();
  var dropdown = document.getElementById("dropdownProcessAnnualLeaveRequest");

  staffMembers.forEach(function (staffMember) {
    var option = document.createElement("option");
    option.text = staffMember.name;
    dropdown.appendChild(option);
  });
}

function createAnnualLeaveRequestTable() {
  var staffData = getAnnualLeaveRequests();
  var tableBody = document.getElementById("AnnuealLeaveRequestTable");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  staffData.forEach(function (employee) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.textContent = employee.name;
    cell2.textContent = employee.date;
    cell3.textContent = employee.status;
  });
}

function createAnnualLeaveDeleteTable() {
  var staffData = getAnnualLeaveRequests();
  var tableBody = document.getElementById("AnnuealLeaveRemoveTable");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Populate the table with data
  staffData.forEach(function (employee) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.textContent = employee.name;
    cell2.textContent = employee.date;
    cell3.textContent = employee.status;
  });
}

async function handleSubmitAnnualLeaveRequest(event) {
  event.preventDefault(); // Prevent the default form submission

  var formData = new FormData(
    document.getElementById("createAnnualLeaveRequestForm")
  );

  var staffMember = formData.get("staffSelect");
  var startDate = formData.get("stringBoxAddStartDate");
  var endDate = formData.get("stringBoxAddEndDate");
  var description = formData.get("stringBoxAddDescription");
  var annualLeaveRequest = {
    StaffID: staffMember,
    Description: description,
    StartDate: startDate,
    EndDate: endDate,
    ApprovalStatus: "Pending",
  };

  console.log(annualLeaveRequest);

  try {
    const response = await fetch("http://localhost:5000/api/annual-leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(annualLeaveRequest),
    });

    const json = await response.json();
    console.log("Success:", JSON.stringify(json));
    if (!response.ok) {
      alert("Annual leave request not created!");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert("Annual leave request created successfully!");
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createAnnualLeaveRequestForm");
  form.addEventListener("submit", handleSubmitAnnualLeaveRequest);
});

