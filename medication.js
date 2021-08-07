/*
##########################################################################
# Project: PROG6003 - Programming Mobile and Cloud Systems - Assigment 1
# File: medication.ts
# Author: Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
# Date: 30/07/2021
# Description: Backend type-script to the Medication control page.
#
##########################################################################>
# Changelog
# Author:
# Date:
# Description:
#
##########################################################################>*/
// Defining constant with fixed cell positions, only rows are dynamic 
var ID = 0;
var NAME = 1;
var DOSE = 2;
var REPEATS = 3;
var EDIT = 4;
var DELETE = 5;
var UPDATE = 0; // Used in evaluations
var INSERT = 1; // Used in evaluations
var MAX_REPEAT_DAY = 24;
/**  Defining a array to save the medication control objects.
 * medicationRecords is the master database, since this app
 * is not using a persistente database, the medicationRecords is temporary
 * and it is keeps the data while only the app is running. Refreshing the
 * page or re-open will clean the temporary database medicationRecords.
 */
var medicationRecords = new Array();
/** Defining the variable that controls the HTML table view.
 * The viewMedicationTable is loaded according to the search
 * and new records added or updated to the temp database.
 */
var viewMedicationTable = document.getElementById("medicationsTable");
/** addMedication function
 * Description: Method to add a new medication
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        30/07/2021
 * Parameters:  none
 * Return:      none
 * */
function addMedication() {
    // Evaluating all inputs
    if (!checkInput(INSERT)) {
        return;
    }
    // Define local variables 
    var identifier = document.getElementById("identifier");
    var medicationName = document.getElementById("medicationName");
    var dailyDose = document.getElementById("dailyDose");
    var numberOfRepeats = document.getElementById("numberOfRepeats");
    // Casting the content from HTML file.
    var identifierValue = Number(identifier.value);
    var medicationValue = String(medicationName.value);
    var dailyDoseValue = Number(dailyDose.value);
    var numberOfRepeatsValue = Number(numberOfRepeats.value);
    // Creating a instance of IMedication
    var medication = { id: identifierValue, name: medicationValue, dose: dailyDoseValue, repeats: numberOfRepeatsValue };
    // Adding to new created instance to the list of medications
    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     *
     */
    medicationRecords.push(medication);
    // Creating a obj row element
    var row = viewMedicationTable.insertRow(viewMedicationTable.rows.length);
    // Creating objs cells elements in the row created above
    var idCol = row.insertCell(ID);
    var nameCol = row.insertCell(NAME);
    var doseCol = row.insertCell(DOSE);
    var repeatsCol = row.insertCell(REPEATS);
    // Inserting the inputted values into the View HTML table
    idCol.innerHTML = String(identifierValue);
    nameCol.innerHTML = medicationValue;
    doseCol.innerHTML = String(dailyDoseValue);
    repeatsCol.innerHTML = String(numberOfRepeatsValue);
    // Adding options of updating or deleting the new row added.
    addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1);
    // Clening up the text fields
    identifier.value = String(nextID());
    medicationName.value = "";
    dailyDose.value = "";
    numberOfRepeats.value = "";
    return;
}
/** updateMedication function
 * Description: Method to update a medication
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  none
 * Return:      none
 * */
function updateMedication() {
    // Evaluating all inputs
    if (!checkInput(UPDATE)) {
        return;
    }
    // Define local variables 
    var identifier = document.getElementById("identifier");
    var medicationName = document.getElementById("medicationName");
    var dailyDose = document.getElementById("dailyDose");
    var numberOfRepeats = document.getElementById("numberOfRepeats");
    // Casting the content from HTML file.
    var identifierValue = Number(identifier.value);
    var medicationValue = String(medicationName.value);
    var dailyDoseValue = Number(dailyDose.value);
    var numberOfRepeatsValue = Number(numberOfRepeats.value);
    // Updating the new values in the list of medications
    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     *
     * Need to validate all fiels!
     */
    // Updating the master 
    var itemFound = false;
    for (var i = 0; i < medicationRecords.length; i++) {
        if (medicationRecords[i].id == identifierValue) {
            medicationRecords[i].name = medicationValue;
            medicationRecords[i].dose = dailyDoseValue;
            medicationRecords[i].repeats = numberOfRepeatsValue;
            itemFound = true;
            break;
        }
    }
    // Check if ID exists and has been updated
    if (!itemFound) {
        notifyUser("Item " + String(identifierValue) + " not found!");
    }
    else {
        // Updating the view. In case it is filtered, View and master are different
        for (var i = 0; i < viewMedicationTable.rows.length; i++) {
            if (Number(viewMedicationTable.rows[i].cells[ID].innerHTML) === identifierValue) {
                viewMedicationTable.rows[i].cells[NAME].innerHTML = medicationValue;
                viewMedicationTable.rows[i].cells[DOSE].innerHTML = String(dailyDoseValue);
                viewMedicationTable.rows[i].cells[REPEATS].innerHTML = String(numberOfRepeatsValue);
                break;
            }
        }
        // Clening up the text fields
        identifier.value = String(nextID());
        medicationName.value = "";
        dailyDose.value = "";
        numberOfRepeats.value = "";
    }
    return;
}
/** deleteMedication function
 * Description: Method to delete a medication
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  none
 * Return:      none
 * */
function deleteMedication(rowClicked) {
    var rowIndex = rowClicked.rowIndex;
    if (rowIndex == null || viewMedicationTable.rows.length === 0) {
        notifyUser("Invalid index row to delete");
        return;
    }
    // Getting medication name to delete
    var medicationNameToDelete = String(viewMedicationTable.rows[rowIndex].cells[NAME].innerText).trim();
    // Confirming with user before deleting
    if (notifyUser("Confirm deleting '" + medicationNameToDelete + "' medication?", "confirm") == false) {
        return; // Aborted by user
    }
    else {
        // Deleting from the master medicationRecords
        var removedRecord = medicationRecords.splice(rowIndex, 1)[0]; // splice returns a array with only the removed IMedication object
        // If the item has been found and deleted from the master medicationRecords temp db, update the view
        if (removedRecord != null && removedRecord.id > 0) {
            viewMedicationTable.deleteRow(rowIndex);
            notifyUser(" '" + medicationNameToDelete + "' medication deleted!");
        }
    }
}
/** searchMedication function
 * Description: Method to search a medication by name or by id
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  none
 * Return:      none
 * */
function searchMedication() {
    // Define local variables and casting the content from HTML file.
    var searchedMedicationName = String(document.getElementById("searchedMedicationName").value);
    var foundItems = 0;
    cleanUpHTMLTable(viewMedicationTable); // Clening up the HTML current table view
    // Searching the search record from the list of medications and adding it to the HTML search results table view
    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     *
     * Need to validate all fiels!
     *
     * Option to delete by name
     *
     */
    for (var i = 0; i < medicationRecords.length; i++) {
        // Check if there are some medication with name that contains the searched text
        if (medicationRecords[i].name.toLowerCase().indexOf(searchedMedicationName.toLowerCase()) !== -1) {
            // Updating foundItems variable to define view message{
            foundItems++;
            // Inserting a IMedication into the viewMedicationTable
            var row = viewMedicationTable.insertRow(viewMedicationTable.rows.length);
            // Creating objs cells elements in the row created above
            var idCol = row.insertCell(ID);
            var nameCol = row.insertCell(NAME);
            var doseCol = row.insertCell(DOSE);
            var repeatsCol = row.insertCell(REPEATS);
            // Updating the HTML view
            idCol.innerHTML = String(medicationRecords[i].id);
            nameCol.innerHTML = String(medicationRecords[i].name);
            doseCol.innerHTML = String(medicationRecords[i].dose);
            repeatsCol.innerHTML = String(medicationRecords[i].repeats);
            // Adding options of updating or deleting the searched records.
            addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1);
        }
    }
    if (foundItems > 0) {
        notifyUser(String(foundItems) + " medication" + (foundItems == 1 ? "" : "s") + " found :)");
    }
    else {
        notifyUser("Medication name " + searchedMedicationName + " did not find :(");
    }
    return;
}
/** notifyUser function
 * Description: Method to notify the user an event
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  message: string - the text to show to the user
 *              type: string - the type of message to show
 * Return:      answare: boolean - true in case the user confirm, false instead of.
 * */
function notifyUser(message, type) {
    if (type === void 0) { type = "alert"; }
    var answare = false;
    if (type == null || type == "alert") {
        alert(message);
    }
    else if (type == "confirm") {
        answare = confirm(message);
    }
    else if (type == "prompt") {
        prompt(message);
    }
    return (answare);
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
/** clearFilter function
 * Description: Method to clean up filters in the HTML View table element
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        06/08/2021
 * Parameters:  none
 * Return:      none
 * */
function clearFilter() {
    // Clening up the HTML current table view with filters    
    cleanUpHTMLTable(viewMedicationTable);
    // Clening up the text field search
    var searchedMedicationField = document.getElementById("searchedMedicationName");
    searchedMedicationField.value = "";
    for (var i = 0; i < medicationRecords.length; i++) {
        // Inserting a IMedication into the viewMedicationTable
        var row = viewMedicationTable.insertRow(viewMedicationTable.rows.length);
        // Creating objs cells elements in the row created above
        var idCol = row.insertCell(ID);
        var nameCol = row.insertCell(NAME);
        var doseCol = row.insertCell(DOSE);
        var repeatsCol = row.insertCell(REPEATS);
        // Updating the HTML view
        idCol.innerHTML = String(medicationRecords[i].id);
        nameCol.innerHTML = String(medicationRecords[i].name);
        doseCol.innerHTML = String(medicationRecords[i].dose);
        repeatsCol.innerHTML = String(medicationRecords[i].repeats);
        // Adding options of updating or deleting to all records.
        addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1);
    }
    return;
}
/** addUpdateAndDeleteOptions function
* Description: Method to add an update and delete buttons to each row in the view HTML table element
* Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
* Date:        06/08/2021
* Parameters:  tableToAdd: HTMLTableElement
*
* Return:      none
* */
function addUpdateAndDeleteOptions(tableToAdd, rowToAddOptions) {
    if (tableToAdd.rows.length > 0 && rowToAddOptions >= 0) {
        var editButton = tableToAdd.rows[rowToAddOptions].insertCell(EDIT);
        var deleteButton = tableToAdd.rows[rowToAddOptions].insertCell(DELETE);
        editButton.innerHTML = '<button onClick="loadForUpdate(getRow(this))" >Edit</button>';
        deleteButton.innerHTML = '<button onClick="deleteMedication(getRow(this))" >Delete</button>';
    }
    return;
}
/** loadForUpdate function
 * Description: Method to load select record to a user updates a medication details.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  rowIndex: number - the index of the selected row
 * Return:      none
 * */
function loadForUpdate(rowClicked) {
    var rowIndex = rowClicked.rowIndex;
    if (rowIndex == null || viewMedicationTable.rows.length === 0) {
        notifyUser("Invalid index row to edit");
        return;
    }
    // Define local variables and casting the content from HTML file.
    var identifier = document.getElementById("identifier");
    var medicationName = document.getElementById("medicationName");
    var dailyDose = document.getElementById("dailyDose");
    var numberOfRepeats = document.getElementById("numberOfRepeats");
    // Loading the text fields with values to edit
    identifier.value = String(viewMedicationTable.rows[rowIndex].cells[ID].innerText);
    medicationName.value = String(viewMedicationTable.rows[rowIndex].cells[NAME].innerText);
    dailyDose.value = String(viewMedicationTable.rows[rowIndex].cells[DOSE].innerText);
    numberOfRepeats.value = String(viewMedicationTable.rows[rowIndex].cells[REPEATS].innerText);
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
/** checkInput function
 * Description: Method to evaluate the values inputted to insert/update a medication.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      result: boolean - true/false
 * */
function checkInput(option) {
    // Define local variables and casting the content from HTML file.
    var identifier = document.getElementById("identifier");
    var medicationName = document.getElementById("medicationName");
    var dailyDose = document.getElementById("dailyDose");
    var numberOfRepeats = document.getElementById("numberOfRepeats");
    // Evaluating ID data type and unique key
    if (Number.isNaN(Number(identifier.value))) {
        notifyUser("The Identifier " + String(identifier.value) + " must be a number!");
        return false;
    }
    // Evaluating if ID already exists
    if (option == INSERT && ExistID(Number(identifier.value))) {
        notifyUser("The Identifier " + String(identifier.value)
            + " already exist!"
            + "\n\nTry 'Update medication' ");
        return false;
    }
    // Checking if the medication name is informed
    if (String(medicationName.value) === "" || identifier.value == null) {
        notifyUser("The medication name must be informed!");
        return false;
    }
    // Checking the daily dose value
    if (Number.isNaN(Number(dailyDose.value))) {
        notifyUser("The measurement of daily dose must be a number!");
        return false;
    }
    else if (Number(dailyDose.value) <= 0) {
        notifyUser("The measurement of daily dose must be greater than zero!");
        return false;
    }
    // Evaluating the number of repeats per day
    var repeats = Number(numberOfRepeats.value);
    if (Number.isNaN(repeats)) {
        notifyUser("The number of repeat per day invalid!");
        return false;
    }
    else if ((!Number.isInteger(repeats)) || repeats <= 0 || repeats > MAX_REPEAT_DAY) {
        notifyUser("The number of repeat per day must be integer, greater than zero and be not more than " + String(MAX_REPEAT_DAY) + " !");
        return false;
    }
    // If the program reachs here, all good!
    return true;
}
/** nextID function
 * Description: Method to return the next ID as suggestion.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      nextID: nubmer
 * */
function nextID() {
    var nextID = 0;
    for (var i = 0; i < medicationRecords.length; i++) {
        if (medicationRecords[i].id > nextID) {
            nextID = medicationRecords[i].id;
        }
    }
    return (nextID + 1);
}
/** loadNextID function
 * Description: Method to load the next ID as suggestion.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      nextID: nubmer
 * */
function loadNextID() {
    var identifier = document.getElementById("identifier");
    identifier.value = String(nextID());
}
/** ExistID function
 * Description: Method to evaluate if the ID already exists.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      result: boolean
 * */
function ExistID(newID) {
    for (var i = 0; i < medicationRecords.length; i++) {
        if (medicationRecords[i].id == newID) {
            return (true);
        }
    }
    return (false);
}
