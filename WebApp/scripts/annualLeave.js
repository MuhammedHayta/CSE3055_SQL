async function getStaff() {
    
    fetch('http://localhost:5000/api/staffs')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
    })
    .then(data => {
      
        return data;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  }



function toggleSectionContent(value) {
    var sections = ["createRequest", "approveDeny", "deleteRequest"];
    sections.forEach(function(section) {
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
    sectionDropdown.style.display = sectionDropdown.style.display === "none" ? "block" : "none";
  }
  
  function fillAnnualLeaveDropdown(){
    var staffMembers = getStaff();
    var dropdown1 = document.getElementById("dropdownAddAnnualLeave");
    var dropdown2 = document.getElementById("dropdownProcessAnnualLeave");
    var dropdown3 = document.getElementById("dropdownDeleteAnnualLeave");
  
    staffMembers.forEach(function (staffMember) {
      var option1 = document.createElement("option");
      option1.text = staffMember.name;
      dropdown1.appendChild(option1);
  
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
  
  function fillAnnualLeaveRequesetDropdown(){
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
    var tableBody = document.getElementById('AnnuealLeaveRequestTable');
  
    // Clear existing table rows
    tableBody.innerHTML = '';
  
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
    var tableBody = document.getElementById('AnnuealLeaveRemoveTable');
  
    // Clear existing table rows
    tableBody.innerHTML = '';
  
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