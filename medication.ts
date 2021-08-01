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

// Defining a interface for a medication control object
interface IMedication {id: number, name: String, dose: number, repeats: number}

// Defining constant with fixed cell positions, only rows are dynamic 
const ID = 0;
const NAME = 1; 
const DOSE = 2;
const REPEATS = 3;

/**  Defining a array to save the medication control objects.
 * medicationRecords is the master database, since this app
 * is not using a persistente database, the medicationRecords is temporary 
 * and it is keeps the data while only the app is running. Refreshing the 
 * page or re-open will clean the temporary database medicationRecords. 
 */
let medicationRecords: Array<IMedication> = new Array<IMedication>();

/** Defining the variable that controls the HTML table view.
 * The viewMedicationTable is loaded according to the search 
 * and new records added or updated to the temp database.
 */
let viewMedicationTable = document.getElementById("medicationsTable") as HTMLTableElement;

/** addMedication function
 * Description: Method to add a new medication 
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        30/07/2021
 * Parameters:  none
 * Return:      none
 * */ 
function addMedication() {

    // Define local variables and casting the content from HTML file.
    let identifier: number = Number((document.getElementById("addedIdentifier") as HTMLInputElement).value);
    let medicationName: string = String((document.getElementById("addedMedicationName") as HTMLInputElement).value);
    let dailyDose: number = Number((document.getElementById("addedDailyDose") as HTMLInputElement).value);
    let numberOfRepeats: number = Number((document.getElementById("addedNumberOfRepeats") as HTMLInputElement).value);

    // Creating a instance of IMedication
    let medication: IMedication = {id: identifier, name: medicationName, dose: dailyDose, repeats: numberOfRepeats}

    // Adding to new created instance to the list of medications

    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     * 
     */

    medicationRecords.push(medication)

    // Creating a obj row element
    let row = viewMedicationTable.insertRow(viewMedicationTable.rows.length) as HTMLTableRowElement;

    // Creating objs cells elements in the row created above
    let idCol      = row.insertCell(ID) as HTMLTableCellElement;
    let nameCol    = row.insertCell(NAME) as HTMLTableCellElement;
    let doseCol    = row.insertCell(DOSE) as HTMLTableCellElement;
    let repeatsCol = row.insertCell(REPEATS) as HTMLTableCellElement;

    // 
    idCol.innerHTML = String(identifier);
    nameCol.innerHTML = medicationName;
    doseCol.innerHTML = String(dailyDose);        
    repeatsCol.innerHTML = String(numberOfRepeats);    
    
}

/** updateMedication function
 * Description: Method to update a medication 
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  none
 * Return:      none
 * */ 
function updateMedication() {

    // Define local variables and casting the content from HTML file.
    let identifier: number = Number((document.getElementById("updatedIdentifier") as HTMLInputElement).value);
    let medicationName: string = String((document.getElementById("updatedMedicationName") as HTMLInputElement).value);
    let dailyDose: number = Number((document.getElementById("updatedDailyDose") as HTMLInputElement).value);
    let numberOfRepeats: number = Number((document.getElementById("updatedNumberOfRepeats") as HTMLInputElement).value);

    // Updating the new values in the list of medications

    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     * 
     * Need to validate all fiels!
     */

    for(let i=0; i< medicationRecords.length; i++) {
        if(medicationRecords[i].id == identifier) {
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
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  none
 * Return:      none
 * */ 
 function deleteMedication() {

    // Define local variables and casting the content from HTML file.
    let identifier: number = Number((document.getElementById("deletedIdentifier") as HTMLInputElement).value);
    let medicationName: string = String((document.getElementById("deletedMedicationName") as HTMLInputElement).value);

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

    for(let i=0; i< medicationRecords.length; i++) {
        if(medicationRecords[i].id == identifier || medicationRecords[i].name == medicationName) {
            let removedRecord = medicationRecords.splice(i, 1)[0]; // splice returns a array with only the removed IMedication object
 
            // If the item has been found and deleted from the medicationRecords temp db, update the view
            if ( removedRecord != null && removedRecord.id > 0 ){
                viewMedicationTable.deleteRow(i);
            }
            break;
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
    let searchedMedicationName: string = String((document.getElementById("searchedMedicationName") as HTMLInputElement).value);
    let foundItems: number = 0;
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

    for(let i=0; i< medicationRecords.length; i++) {

        // Check if there are some medication with name that contains the searched text
        if(medicationRecords[i].name.toLowerCase().indexOf(searchedMedicationName.toLowerCase()) !== -1 ) {

            // Updating foundItems variable to define view message{
            foundItems++;

            // Inserting a IMedication into the viewMedicationTable
            let row = viewMedicationTable.insertRow(viewMedicationTable.rows.length) as HTMLTableRowElement;

            // Creating objs cells elements in the row created above
            let idCol      = row.insertCell(ID) as HTMLTableCellElement;
            let nameCol    = row.insertCell(NAME) as HTMLTableCellElement;
            let doseCol    = row.insertCell(DOSE) as HTMLTableCellElement;
            let repeatsCol = row.insertCell(REPEATS) as HTMLTableCellElement;
            
            // Updating the HTML view
            idCol.innerHTML = String(medicationRecords[i].id);
            nameCol.innerHTML = String(medicationRecords[i].name);
            doseCol.innerHTML = String(medicationRecords[i].dose);        
            repeatsCol.innerHTML = String(medicationRecords[i].repeats);    
        
            //break; => It shows all found items
        }
    } 

    if (foundItems > 0 ) {
        notifyUser(String(foundItems) + " medication" + (foundItems == 1 ? "":"s") +  " found :)");
    }
    else {
        notifyUser("Medication name " + searchedMedicationName + " did not find :(")
    }
}

/** notifyUser function
 * Description: Method to notify the user an event 
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  message: string - the text to show to the user
 *              type: string - the type of message to show
 * Return:      answare: boolean - true in case the user confirm, false instead of.
 * */ 
function notifyUser(message: string, type: string = "alert") {

    let answare: boolean = false;

    if (type == null || type == "alert") {
        alert(message);        
    }
    else if (type == "confirm") {
        answare = confirm(message);
    }
    else if (type == "prompt") {
        prompt(message);
    }
    return(answare);
}

/** cleanUpHTMLTable function
 * Description: Method to clean up an HTML table element
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        01/08/2021
 * Parameters:  tableToCleanUp: HTMLTableElement
 * Return:      none
 * */ 
function cleanUpHTMLTable(tableToCleanUp: HTMLTableElement){

    for (let i=tableToCleanUp.rows.length; i>0;i--) {
        tableToCleanUp.deleteRow(i-1);
    }
}
