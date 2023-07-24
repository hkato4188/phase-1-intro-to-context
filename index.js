// Employees always check in and out on the hour
// 24 hour clock in string format "YYY-MM-DD 1800"
// Employees never work across days

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(nestedArr) {
  return nestedArr.map((arr) => createEmployeeRecord(arr));
}

function createTimeInEvent(employeeRecord, dateString) {
  let [date, hour] = dateString.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateString) {
  let [date, hour] = dateString.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, calcDate) {
  let timeIn = employeeRecord.timeInEvents.find(
    (event) => event.date === calcDate
  );
  let timeOut = employeeRecord.timeOutEvents.find(
    (event) => event.date === calcDate
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, calcDate) {
  return (
    hoursWorkedOnDate(employeeRecord, calcDate) * employeeRecord.payPerHour
  );
}

function allWagesFor(employeeRecord) {
  let daysWorked = employeeRecord.timeInEvents.map((event) => event.date);
  let totalWages = daysWorked.reduce((acc, currDate) => acc + wagesEarnedOnDate(employeeRecord, currDate), 0);
  return totalWages;
}

function calculatePayroll(employees){
  return employees.reduce((acc, currEmpRec) => acc + allWagesFor(currEmpRec),0)
}

