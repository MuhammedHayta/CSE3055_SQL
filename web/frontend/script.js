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

function WorkDayInit() {
  createStaffTable();
  fillStaffDropdown();
  fillStaffDateDropdown();

}

function getStaff() {
  var staff = [
    { name: "John", age: 34, position: "developer" },
    { name: "Jane", age: 28, position: "designer" },
    { name: "Jack", age: 45, position: "manager" },
    { name: "Jill", age: 38, position: "developer" },
    { name: "James", age: 29, position: "designer" },
    { name: "Jenny", age: 35, position: "developer" },
  ];
  return staff;
}

function getStaffDates() {
  var dates = [
    "2020-01-01",
    "2020-01-02",
    "2020-01-03",
    "2020-01-04",
    "2020-01-05",
    "2020-01-06",
    "2020-01-07",
    "2020-01-08",
    "2020-01-09",
    "2020-01-10",
    "2020-01-11",
    "2020-01-12",
    "2020-01-13",
    "2020-01-14",
    "2020-01-15",
    "2020-01-16",
    "2020-01-17",
    "2020-01-18",
    "2020-01-19",
    "2020-01-20",
    "2020-01-21",
    "2020-01-22",
    "2020-01-23",
    "2020-01-24",
    "2020-01-25",
    "2020-01-26",
    "2020-01-27",
    "2020-01-28",
    "2020-01-29",
    "2020-01-30",
    "2020-01-31",
  ];
  return dates;
}

function createStaffTable() {
  var staffData = getStaff();
  var tableBody = document.getElementById('staffTableBody');

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Populate the table with data
  staffData.forEach(function (employee) {
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.textContent = employee.name;
      cell2.textContent = employee.age;
      cell3.textContent = employee.position;
  });
}


function fillStaffDropdown(){
  var staffMembers = getStaff();
  var dropdown1 = document.getElementById("dropdownAddStaff");
  var dropdown2 = document.getElementById("dropdownRemoveStaff");

  staffMembers.forEach(function (staffMember) {
    var option1 = document.createElement("option");
    option1.text = staffMember.name;
    dropdown1.appendChild(option1);

    var option2 = document.createElement("option");
    option2.text = staffMember.name;
    dropdown2.appendChild(option2);
  });
}

function fillStaffDateDropdown(){
  var dropdown = document.getElementById("dropdownRemoveStaffDate");
  var dates = getStaffDates();
  dates.forEach(function (date) {
    var option = document.createElement("option");
    option.text = date;
    dropdown.appendChild(option);
  });
}
