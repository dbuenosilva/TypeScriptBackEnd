/*
##########################################################################
# Project: PROG6003 - Programming Mobile and Cloud Systems - Assigment 1
# File: appointment.ts
# Author: Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
# Date: 30/07/2021
# Description: Backend type-script to the Appointment page.
#
##########################################################################>
# Changelog
# Author:
# Date:
# Description:
#
##########################################################################>*/
// Defining constant with fixed cell positions, only rows are dynamic 
var IDENTIFIER = 0;
var GPNAME = 1;
var DATEAPPOINTMENT = 2;
var TIMEAPPOINTMENT = 3;
var CANCEL = 4;
var MAX_GP = 10; // Number maximum of avaiable GPs
var MIN_GP = 3; // Number minimum of avaiable GPs
var DAYS_IN_MILISECS = 8640000; // Days in miliseconds (60 * 60 * 24 * 1000)
var MAX_DAYS = 180; // Number maximum of days for new appointments
var MIN_DAYS = 30; // Number minimum of days for new appointments
var MAX_HOUR = 17; // Number maximum of days for new appointments
var MIN_HOUR = 8; // Number minimum of days for new appointments
var MAX_APP = 30; // Number maximum of avaiable appointments to show
/**  Defining a array to save the availableAppointments records
 * and bookedAppointments records.
 * availableAppointments is the master database with all avaiable appointments by
 * GP. The bookedAppointments is the database with all appointments made by
 * the user. Since this app is not using a persistente database,
 * the availableAppointments and bookedAppointments are temporary and
 * they are keep the data while the app is running. Refreshing the
 * page or re-open will clean the temporary database.
 */
var availableAppointments = new Array();
var bookedAppointments = new Array();
/** Defining the variable that controls the HTML table view.
* The viewBookedAppointmentsTable is loaded according to the search
* and new records added or updated to the temp database.
*/
var viewBookedAppointmentsTable = document.getElementById("bookedAppointmentsTable");
/** loadAvailableAppointments function
 * Description: Method to load the availableAppointments.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      none
 * */
function loadAvailableAppointments() {
    for (var i = 1; i <= MAX_APP; i++) {
        // Creating a instance of availableAppointments
        var newAppointment = { id: nextIDforAppointment(), GpName: getGPsAvaiable(), dateAppointment: getDateAvailable(), time: getTimeAvaiable() };
        // Adding to new created instance to the list of appointments
        if (!existAppointment(newAppointment)) { // Check if this appointment has already been created 
            availableAppointments.push(newAppointment);
        }
    }
    // Update the list of GPs available on input Select
    updateSelectView();
}
/** nextIDforAppointment function
 * Description: Method to return the next ID as suggestion.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      nextID: nubmer
 * */
function nextIDforAppointment() {
    var nextID = 0;
    for (var i = 0; i < availableAppointments.length; i++) {
        if (availableAppointments[i].id > nextID) {
            nextID = availableAppointments[i].id;
        }
    }
    return (nextID + 1);
}
/** getGPsAvaiable function
 * Description: Method to return random names of GPs.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      GPname: String
 * */
function getGPsAvaiable() {
    var GPname = "TBD";
    var random = Math.floor(Math.random() * (MAX_GP - MIN_GP + 1) + MIN_GP);
    switch (random) {
        case 1: {
            GPname = "Dr Natasha";
            break;
        }
        case 2: {
            GPname = "Dr Lyndall";
            break;
        }
        case 3: {
            GPname = "Dr Mary";
            break;
        }
        case 4: {
            GPname = "Dr Chris";
            break;
        }
        case 5: {
            GPname = "Dr Peter";
            break;
        }
        case 6: {
            GPname = "Dr Mark";
            break;
        }
        case 7: {
            GPname = "Dr Robert";
            break;
        }
        case 8: {
            GPname = "Dr Andrew";
            break;
        }
        case 9: {
            GPname = "Dr Paul";
            break;
        }
        case 10: {
            GPname = "Dr Michael";
            break;
        }
        default: {
            GPname = "On call";
            break;
        }
    }
    return (GPname);
}
/** getDateAvailable function
 * Description: Method to return random date avaiable for appointment
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      dateApp: Date
 * */
function getDateAvailable() {
    var dateApp = new Date();
    var random = Math.floor(Math.random() * (MAX_DAYS - MIN_DAYS + 1) + MIN_DAYS);
    return (new Date(dateApp.getTime() + (random * DAYS_IN_MILISECS)));
}
/** getTimeAvaiable function
 * Description: Method to return random time available in bussiness hour.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function getTimeAvaiable() {
    var time = "";
    var random = Math.floor(Math.random() * (MAX_HOUR - MIN_HOUR + 1) + MIN_HOUR);
    time = String(random);
    return (String("00".substring(0, 2 - time.length) + time) + ":00:00");
}
/** updateSelectView function
 * Description: Method to update the options of GP's available for the user
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function updateSelectView() {
    var select = document.getElementById("selectAppointments");
    // Cleanning up the select view to re-load
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
        select.removeChild(options[i]);
        i--; //options changed length after removing item
    }
    // Sort the appointment according to the date
    availableAppointments.sort(compareDateAndTime);
    // Re-loading the select options
    var optionDefault = document.createElement("option");
    optionDefault.textContent = "Select one of GPs avaiable";
    optionDefault.value = "default";
    select.add(optionDefault);
    // Loading further records
    for (var i = 0; i < availableAppointments.length; i++) {
        var option = document.createElement("option");
        option.textContent = String(availableAppointments[i].GpName) + " on " + availableAppointments[i].dateAppointment.toLocaleDateString() + " at " + String(availableAppointments[i].time);
        option.value = String(availableAppointments[i].id);
        select.add(option);
    }
}
/** compareDateAndTime function
 * Description: Method to compare the dates + time available for the user
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function compareDateAndTime(a, b) {
    if (a.dateAppointment.getTime() + Number(a.time.substring(0, 1)) < b.dateAppointment.getTime() + Number(b.time.substring(0, 1))) {
        return -1;
    }
    if (a.dateAppointment.getTime() + Number(a.time.substring(0, 1)) > b.dateAppointment.getTime() + Number(b.time.substring(0, 1))) {
        return 1;
    }
    return 0;
}
/** existAppointment function
* Description: Method to check if Appointment exists.
* Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
* Date:        15/08/2021
* Parameters:  IAppointments - a new record to check
* Return:      true if exists, false instead of.
* */
function existAppointment(newAppointment) {
    for (var i = 0; i < availableAppointments.length; i++) {
        if (availableAppointments[i].GpName == newAppointment.GpName
            && availableAppointments[i].dateAppointment == newAppointment.dateAppointment
            && availableAppointments[i].time == newAppointment.time) {
            return (true);
        }
    }
    return (false);
}
/** getIndexByID function
 * Description: Method to check if Appointment exists.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  identifier: Number - an ID for appointment, appoinments: Array<IAppointments> - the list of appointments
 * Return:      index: Number - the index in the appointments array, -1 if not found
 * */
function getIndexByID(identifier, appointments) {
    for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].id == identifier) {
            return (i);
        }
    }
    return (-1);
}
/** addAppointment function
 * Description: Method to add a new appointment
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function addAppointment() {
    // Evaluating all inputs
    if (!checkSelected()) {
        return;
    }
    var select = document.getElementById("selectAppointments");
    var indexAvailableAppointment = getIndexByID(Number(select.value), availableAppointments);
    var currentBooked = bookedAppointments.length;
    // Moving the appointment from the availableAppointments to the bookedAppointments record
    // Splice returns a array with only the removed from the availableAppointments.
    // If the removed record from availableAppointments is added to bookedAppointments, 
    // the size of bookedAppointments if greater than currentBooked
    if (indexAvailableAppointment >= 0
        && bookedAppointments.push(availableAppointments.splice(indexAvailableAppointment, 1)[0]) > currentBooked) {
        // Updating the HTML view
        var row = viewBookedAppointmentsTable.insertRow(viewBookedAppointmentsTable.rows.length);
        // Creating objs cells elements in the row created above
        var idCol = row.insertCell(IDENTIFIER);
        var nameGpCol = row.insertCell(GPNAME);
        var dateCol = row.insertCell(DATEAPPOINTMENT);
        var timeCol = row.insertCell(TIMEAPPOINTMENT);
        // Inserting the inputted values into the View HTML table
        idCol.innerHTML = String(bookedAppointments[bookedAppointments.length - 1].id);
        idCol.id = String(bookedAppointments[bookedAppointments.length - 1].id); // define the Primary Key for the table of appointments
        nameGpCol.innerHTML = String(bookedAppointments[bookedAppointments.length - 1].GpName);
        dateCol.innerHTML = bookedAppointments[bookedAppointments.length - 1].dateAppointment.toLocaleDateString();
        timeCol.innerHTML = String(bookedAppointments[bookedAppointments.length - 1].time);
        // Adding options of updating or deleting the new row added.
        addCancelOption(viewBookedAppointmentsTable, viewBookedAppointmentsTable.rows.length - 1);
        // Notify the user
        alert("Appointment success added");
        // reset the select to default value
        select.value = "default";
        // Refresh the select view
        updateSelectView();
    }
    else {
        alert("Error to add appointment");
    }
}
/** checkSelected function
* Description: Method to check if some appointment has been selected .
* Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
* Date:        15/08/2021
* Parameters:  none
* Return:      true if selectec, false instead of.
* */
function checkSelected() {
    var select = document.getElementById("selectAppointments");
    if (select.value === "default") {
        alert("Select one appointment available!");
        return (false);
    }
    return (true);
}
/** addCancelOption function
* Description: Method to add an update and delete buttons to each row in the view HTML table element
* Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
* Date:        06/08/2021
* Parameters:  tableToAdd: HTMLTableElement
*
* Return:      none
* */
function addCancelOption(tableToAdd, rowToAddOptions) {
    if (tableToAdd.rows.length > 0 && rowToAddOptions >= 0) {
        var cancelButton = tableToAdd.rows[rowToAddOptions].insertCell(CANCEL);
        cancelButton.innerHTML = '<button onClick="cancelAppointment(getRow(this))" >Cancel</button>';
    }
    return;
}
/** cancelAppointment function
 * Description: Method to cancel a booked appointment.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  rowIndex: number - the index of the selected row
 * Return:      none
 * */
function cancelAppointment(rowClicked) {
    var rowIndex = rowClicked.rowIndex;
    if (rowIndex == null || viewBookedAppointmentsTable.rows.length === 0) {
        alert("Invalid index row to cancel");
        return;
    }
    // Loading the record to the select view
    var id = viewBookedAppointmentsTable.rows[rowIndex].cells[IDENTIFIER].innerText;
    var GpName = viewBookedAppointmentsTable.rows[rowIndex].cells[GPNAME].innerText;
    var date = viewBookedAppointmentsTable.rows[rowIndex].cells[DATEAPPOINTMENT].innerText;
    var time = viewBookedAppointmentsTable.rows[rowIndex].cells[TIMEAPPOINTMENT].innerText;
    // Evaluate if the record exists in bookedAppointments
    var indexToCancel = getIndexByID(Number(id), bookedAppointments);
    if (indexToCancel >= 0) {
        if (confirm("Do you confirm cancelling the appointment on " + date + " at " + time + " with " + GpName + "?")) {
            var currentAvailable = availableAppointments.length;
            // Moving the appointment from the bookedAppointments to the availableAppointments record
            // Splice returns a array with only the removed from the bookedAppointments.
            // If the removed record from bookedAppointments is added to availableAppointments, 
            // the size of availableAppointments if greater than currentAvailable
            if (availableAppointments.push(bookedAppointments.splice(indexToCancel, 1)[0]) > currentAvailable) {
                alert("Appointment on " + date + " at " + time + " with " + GpName + " cancelled!");
                // Re-loading the select option to add the cancel appointment
                updateSelectView();
                // Re-loading the booked appointments view
                clearAppointmentFilter();
            }
            else {
                alert("Error trying to cancel the appointment on " + date + " at " + time + " with " + GpName);
            }
        }
    }
    else {
        alert("Error to load appointment to cancel. The appointment selected does not exist in the list of booked appointments.");
    }
    return;
}
/** getRow function
 * Description: Method to get the row clicked by the user.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 *              Adapted from: //https://www.aspforums.net/Threads/692989/Get-HTML-Table-RowIndex-on-Button-Click-using-JavaScript-and-jQuery/
 * Date:        07/08/2021
 * Parameters:  element: Element
 * Return:      row: HTMLTableRowElement
 * */
function getRow(element) {
    var row = element.parentNode.parentNode;
    return (row);
}
/** cleanUpHTMLTable function
 * Description: Method to clean up an HTML table element
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  tableToCleanUp: HTMLTableElement
 * Return:      none
 * */
function cleanUpHTMLTable(tableToCleanUp) {
    for (var i = tableToCleanUp.rows.length; i > 0; i--) {
        tableToCleanUp.deleteRow(i - 1);
    }
    return;
}
/** updateBookedAppointmentsView function
 * Description: Method to refresh the booked appointment in the HTML view
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function updateBookedAppointmentsView() {
    // Clean the table view
    cleanUpHTMLTable(viewBookedAppointmentsTable);
    // Reload with the current values of booked appointments.
    for (var i = 0; i < bookedAppointments.length; i++) {
        // Updating the HTML view
        var row = viewBookedAppointmentsTable.insertRow(viewBookedAppointmentsTable.rows.length);
        // Creating objs cells elements in the row created above
        var idCol = row.insertCell(IDENTIFIER);
        var nameGpCol = row.insertCell(GPNAME);
        var dateCol = row.insertCell(DATEAPPOINTMENT);
        var timeCol = row.insertCell(TIMEAPPOINTMENT);
        // Inserting the inputted values into the View HTML table
        idCol.innerHTML = String(bookedAppointments[i].id);
        idCol.id = String(bookedAppointments[i].id); // define the Primary Key for the table of appointments
        nameGpCol.innerHTML = String(bookedAppointments[i].GpName);
        dateCol.innerHTML = bookedAppointments[i].dateAppointment.toLocaleDateString();
        timeCol.innerHTML = String(bookedAppointments[i].time);
        //Adding options of updating or deleting the new row added.
        addCancelOption(viewBookedAppointmentsTable, viewBookedAppointmentsTable.rows.length - 1);
    }
}
/** searchAppointmentByGpName function
 * Description: Method to search a appointment by GP name
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function searchAppointmentByGpName() {
    // Define local variables and casting the content from HTML file.
    var searchedGpName = String(document.getElementById("searchedGpName").value);
    var foundItems = 0;
    cleanUpHTMLTable(viewBookedAppointmentsTable); // Clening up the HTML current table view
    // Searching the GP name from the list of appointment and filtering it to the HTML table view
    for (var i = 0; i < bookedAppointments.length; i++) {
        // Check if there are some GP with name that contains the searched text
        if (bookedAppointments[i].GpName.toLowerCase().indexOf(searchedGpName.toLowerCase()) !== -1) {
            // Updating foundItems variable to define view message{
            foundItems++;
            // Inserting the found appointment into the viewBookedAppointmentsTable
            var row = viewBookedAppointmentsTable.insertRow(viewBookedAppointmentsTable.rows.length);
            // Creating objs cells elements in the row created above
            var idCol = row.insertCell(IDENTIFIER);
            var nameCol = row.insertCell(GPNAME);
            var dateCol = row.insertCell(DATEAPPOINTMENT);
            var timeCol = row.insertCell(TIMEAPPOINTMENT);
            // Updating the HTML view
            idCol.innerHTML = String(bookedAppointments[i].id);
            nameCol.innerHTML = String(bookedAppointments[i].GpName);
            dateCol.innerHTML = bookedAppointments[i].dateAppointment.toLocaleDateString();
            timeCol.innerHTML = String(bookedAppointments[i].time);
            // Adding options of updating or deleting the searched records.
            addCancelOption(viewBookedAppointmentsTable, viewBookedAppointmentsTable.rows.length - 1);
        }
    }
    if (foundItems > 0) {
        alert(String(foundItems) + " appointment" + (foundItems == 1 ? "" : "s") + " found :)");
    }
    else {
        alert("Not found appointments booked with the GP named " + searchedGpName + " :(");
        clearAppointmentFilter();
    }
    return;
}
/** clearAppointmentFilter function
 * Description: Method to clean to filters and refresh booked appointment view table.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        15/08/2021
 * Parameters:  none
 * Return:      none
 * */
function clearAppointmentFilter() {
    // Clening up the text field search
    var searchedGpNameField = document.getElementById("searchedGpName");
    searchedGpNameField.value = "";
    // Rollback the booked appointments view to original values
    updateBookedAppointmentsView();
}
