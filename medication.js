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
/**  Defining a array to save the medication control objects.
 * medicationRecords is the master database, since this app
 * is not using a persistente database, the medicationRecords is temporary
 * and it is keeps the data while only the app is running. Refreshing the
 * page or re-open will clean the temporary database medicationRecords.
 */
var medicationRecords = new Array();
// Creating the ts variable table to access the html content
var viewMedicationTable = document.getElementById("medicationsTable");
/** addMedication function
 * Description: Method to add a new medication
 * Parameters:  none
 * Return:      none
 * */
function addMedication() {
    // Define local variables and casting the content from HTML file.
    var identifier = Number(document.getElementById("addedIdentifier").value);
    var medicationName = String(document.getElementById("addedMedicationName").value);
    var dailyDose = Number(document.getElementById("addedDailyDose").value);
    var numberOfRepeats = Number(document.getElementById("addedNumberOfRepeats").value);
    // Creating a instance of IMedication
    var medication = { id: identifier, name: medicationName, dose: dailyDose, repeats: numberOfRepeats };
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
    // 
    idCol.innerHTML = String(identifier);
    nameCol.innerHTML = medicationName;
    doseCol.innerHTML = String(dailyDose);
    repeatsCol.innerHTML = String(numberOfRepeats);
}
/** updateMedication function
 * Description: Method to update a medication
 * Parameters:  none
 * Return:      none
 * */
function updateMedication() {
    // Define local variables and casting the content from HTML file.
    var identifier = Number(document.getElementById("updatedIdentifier").value);
    var medicationName = String(document.getElementById("updatedMedicationName").value);
    var dailyDose = Number(document.getElementById("updatedDailyDose").value);
    var numberOfRepeats = Number(document.getElementById("updatedNumberOfRepeats").value);
    // Updating the new values in the list of medications
    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     *
     * Need to validate all fiels!
     */
    for (var i = 0; i < medicationRecords.length; i++) {
        if (medicationRecords[i].id == identifier) {
            medicationRecords[i].name = medicationName;
            medicationRecords[i].dose = dailyDose;
            medicationRecords[i].repeats = numberOfRepeats;
            viewMedicationTable.rows[i].cells[NAME].innerHTML = medicationName;
            viewMedicationTable.rows[i].cells[DOSE].innerHTML = String(dailyDose);
            viewMedicationTable.rows[i].cells[REPEATS].innerHTML = String(numberOfRepeats);
            break;
        }
    }
}
/** deleteMedication function
 * Description: Method to delete a medication
 * Parameters:  none
 * Return:      none
 * */
function deleteMedication() {
    // Define local variables and casting the content from HTML file.
    var identifier = Number(document.getElementById("deletedIdentifier").value);
    var medicationName = String(document.getElementById("deletedMedicationName").value);
    // Deleting the selected record from the list of medications
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
        if (medicationRecords[i].id == identifier || medicationRecords[i].name == medicationName) {
            var removedRecord = medicationRecords.splice(i, 1)[0]; // splice returns a array with only the removed IMedication object
            // If the item has been found and deleted from the medicationRecords temp db, update the view
            if (removedRecord != null && removedRecord.id > 0) {
                viewMedicationTable.deleteRow(i);
            }
            break;
        }
    }
}
/** searchMedication function
 * Description: Method to search a medication by name or by id
 * Parameters:  none
 * Return:      none
 * */
function searchMedication() {
    // Define local variables and casting the content from HTML file.
    var searchedMedicationName = String(document.getElementById("searchedMedicationName").value);
    var viewSearchResultsTable = document.getElementById("searchResultsTable");
    var foundItems = false;
    cleanUpHTMLTable(viewSearchResultsTable); // Clening up the HTML search results table view
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
            // Updating foundItems variable to define view message
            if (!foundItems) {
                foundItems = true;
            }
            // Inserting a IMedication into the viewSearchResultsTable
            var row = viewSearchResultsTable.insertRow(viewSearchResultsTable.rows.length);
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
            //break; => It shows all found items
        }
    }
    if (foundItems) {
        var searchMessage = document.getElementById("searchMessage");
        searchMessage.innerHTML = "Item found!";
    }
}
/** notifyUser function
 * Description: Method to notify the user an event
 * Parameters:  type: String
 * Return:      nome
 * */
function notifyUser(type) {
    alert("test");
}
/** cleanUpHTMLTable function
 * Description: Method to clean up an HTML table element
 * Parameters:  tableToCleanUp: HTMLTableElement
 * Return:      none
 * */
function cleanUpHTMLTable(tableToCleanUp) {
    for (var i = tableToCleanUp.rows.length; i > 0; i--) {
        tableToCleanUp.deleteRow(i);
    }
}
