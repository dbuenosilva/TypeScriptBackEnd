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

// The interface have to be created here to use Number javaScript methods
//https://stackoverflow.com/questions/32967380/how-compatible-is-will-be-typescript-to-es6-ecmascript-2015
interface NumberConstructor {
    /**
      * Returns true if the value passed is an integer, false otherwise.
      * @param number A numeric value.
      */
    isInteger(number: number): boolean;

    /**
      * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a
      * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
      * to a number. Only values of the type number, that are also NaN, result in true.
      * @param number A numeric value.
      */
    isNaN(number: number): boolean;

    /**
      * Converts A string to an integer.
      * @param s A string to convert into a number.
      * @param radix A value between 2 and 36 that specifies the base of the number in numString.
      * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
      * All other strings are considered decimal.
      */
    parseInt(string: string, radix?: number): number;
}


// Defining a interface for a medication control object
interface IMedication {id: number, name: String, dose: number, repeats: number}

// Defining constant with fixed cell positions, only rows are dynamic 
const ID = 0;
const NAME = 1; 
const DOSE = 2;
const REPEATS = 3;
const EDIT = 4;
const DELETE = 5;
const UPDATE = 0; // Used in evaluations
const INSERT = 1; // Used in evaluations
const MAX_REPEAT_DAY = 24;

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

    // Evaluating all inputs
    if ( ! checkInput( INSERT ) ) {
        return;
    } 

    // Define local variables 
    let identifier = document.getElementById("identifier") as HTMLInputElement;
    let medicationName = document.getElementById("medicationName") as HTMLInputElement;
    let dailyDose = document.getElementById("dailyDose") as HTMLInputElement
    let numberOfRepeats = document.getElementById("numberOfRepeats") as HTMLInputElement;
    
    // Casting the content from HTML file.
    let identifierValue: number = Number(identifier.value);
    let medicationValue: string = String(medicationName.value);
    let dailyDoseValue: number = Number(dailyDose.value);
    let numberOfRepeatsValue: number = Number(numberOfRepeats.value);

    // Creating a instance of IMedication
    let medication: IMedication = {id: identifierValue, name: medicationValue, dose: dailyDoseValue, repeats: numberOfRepeatsValue}

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

    // Inserting the inputted values into the View HTML table
    idCol.innerHTML = String(identifierValue);
    nameCol.innerHTML = medicationValue;
    doseCol.innerHTML = String(dailyDoseValue);        
    repeatsCol.innerHTML = String(numberOfRepeatsValue);    

    // Adding options of updating or deleting the new row added.
    addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1 )

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
    if ( ! checkInput( UPDATE ) ) {
        return;
    } 

    // Define local variables 
    let identifier = document.getElementById("identifier") as HTMLInputElement;
    let medicationName = document.getElementById("medicationName") as HTMLInputElement;
    let dailyDose = document.getElementById("dailyDose") as HTMLInputElement
    let numberOfRepeats = document.getElementById("numberOfRepeats") as HTMLInputElement;
    
    // Casting the content from HTML file.
    let identifierValue: number = Number(identifier.value);
    let medicationValue: string = String(medicationName.value);
    let dailyDoseValue: number = Number(dailyDose.value);
    let numberOfRepeatsValue: number = Number(numberOfRepeats.value);

    // Updating the new values in the list of medications

    /** To Do
     * ID must be int number no negative
     * ID is identity and can is can't repeat
     * 
     * Need to validate all fiels!
     */

    // Updating the master 
    let itemFound: boolean = false;
    for(let i=0; i< medicationRecords.length; i++) {
        if(medicationRecords[i].id == identifierValue) {
            medicationRecords[i].name = medicationValue;
            medicationRecords[i].dose = dailyDoseValue;
            medicationRecords[i].repeats = numberOfRepeatsValue;            
            itemFound = true;
            break;
        }
    } 

    // Check if ID exists and has been updated
    if (! itemFound) {
        notifyUser("Item " + String(identifierValue) + " not found!" );
    }
    else {
    // Updating the view. In case it is filtered, View and master are different
        for(let i=0; i< viewMedicationTable.rows.length; i++) {
            if( Number(viewMedicationTable.rows[i].cells[ID].innerHTML) === identifierValue) {

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
 function deleteMedication(rowClicked: HTMLTableRowElement) {

    let rowIndex = rowClicked.rowIndex;

    if (rowIndex == null || viewMedicationTable.rows.length === 0 ) {
        notifyUser("Invalid index row to delete");
        return;
    }

    // Getting medication name to delete
    let medicationNameToDelete = String(viewMedicationTable.rows[rowIndex].cells[NAME].innerText).trim();

    // Confirming with user before deleting
    if (notifyUser("Confirm deleting '" + medicationNameToDelete + "' medication?", "confirm") == false ) {
        return; // Aborted by user
    } else {

        // Deleting from the master medicationRecords
        let removedRecord = medicationRecords.splice(rowIndex, 1)[0]; // splice returns a array with only the removed IMedication object
 
        // If the item has been found and deleted from the master medicationRecords temp db, update the view
        if ( removedRecord != null && removedRecord.id > 0 ){
            viewMedicationTable.deleteRow(rowIndex);
            notifyUser(" '" + medicationNameToDelete + "' medication deleted!")
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
            
            // Adding options of updating or deleting the searched records.
            addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1 )            
        }
    } 

    if (foundItems > 0 ) {
        notifyUser(String(foundItems) + " medication" + (foundItems == 1 ? "":"s") +  " found :)");
    }
    else {
        notifyUser("Medication name " + searchedMedicationName + " did not find :(")
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
    let searchedMedicationField = document.getElementById("searchedMedicationName") as HTMLInputElement;
    searchedMedicationField.value = "";

    for(let i=0; i< medicationRecords.length; i++) {

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

        // Adding options of updating or deleting to all records.
        addUpdateAndDeleteOptions(viewMedicationTable, viewMedicationTable.rows.length - 1 )                    
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
function addUpdateAndDeleteOptions(tableToAdd: HTMLTableElement, rowToAddOptions: number ){

    if (tableToAdd.rows.length > 0 && rowToAddOptions >= 0) {
        let editButton    = tableToAdd.rows[rowToAddOptions].insertCell(EDIT) as HTMLTableCellElement;
        let deleteButton = tableToAdd.rows[rowToAddOptions].insertCell(DELETE) as HTMLTableCellElement;

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
 function loadForUpdate(rowClicked: HTMLTableRowElement) {

    let rowIndex = rowClicked.rowIndex;

    if (rowIndex == null || viewMedicationTable.rows.length === 0 ) {
        notifyUser("Invalid index row to edit");
        return;
    }

    // Define local variables and casting the content from HTML file.
    let identifier = document.getElementById("identifier") as HTMLInputElement;
    let medicationName = document.getElementById("medicationName") as HTMLInputElement;
    let dailyDose = document.getElementById("dailyDose") as HTMLInputElement
    let numberOfRepeats = document.getElementById("numberOfRepeats") as HTMLInputElement;

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

function getRow(element: Element) {
    let row = element.parentNode!.parentNode;
    return(row);
}

/** checkInput function
 * Description: Method to evaluate the values inputted to insert/update a medication.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      result: boolean - true/false
 * */ 
 function checkInput(option: number) { 

    // Define local variables and casting the content from HTML file.
    let identifier = document.getElementById("identifier") as HTMLInputElement;
    let medicationName = document.getElementById("medicationName") as HTMLInputElement;
    let dailyDose = document.getElementById("dailyDose") as HTMLInputElement
    let numberOfRepeats = document.getElementById("numberOfRepeats") as HTMLInputElement;

    // Evaluating ID data type and unique key
    if (Number.isNaN(Number(identifier.value)))  {
        notifyUser("The Identifier " + String(identifier.value) + " must be a number!");
        return false;
    }

    // Evaluating if ID already exists
    if( option == INSERT && ExistID(Number(identifier.value))) {
        notifyUser("The Identifier " + String(identifier.value) 
        + " already exist!" 
        + "\n\nTry 'Update medication' ");
        return false;        
    }

    // Checking if the medication name is informed
    if (String(medicationName.value) === "" || identifier.value == null )  {
        notifyUser("The medication name must be informed!");
        return false;
    }

    // Checking the daily dose value
    if (Number.isNaN(Number(dailyDose.value))) {
        notifyUser("The measurement of daily dose must be a number!");
        return false;
    } else if ( Number(dailyDose.value) <= 0 ) {
        notifyUser("The measurement of daily dose must be greater than zero!");
        return false;
    }

    // Evaluating the number of repeats per day
    let repeats = Number(numberOfRepeats.value);
    if (Number.isNaN(repeats)) {
        notifyUser("The number of repeat per day invalid!");
        return false;
    } else if ((! Number.isInteger(repeats)) || repeats <= 0 || repeats > MAX_REPEAT_DAY ) {
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

    let nextID: number = 0;
    for(let i=0; i< medicationRecords.length; i++) {
        if(medicationRecords[i].id > nextID) {
            nextID = medicationRecords[i].id ;
        }
    } 

    return( nextID + 1 );
}

/** loadNextID function
 * Description: Method to load the next ID as suggestion.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      nextID: nubmer 
 * */ 
function loadNextID() {

    let identifier = document.getElementById("identifier") as HTMLInputElement;

    identifier.value = String(nextID());

}

/** ExistID function
 * Description: Method to evaluate if the ID already exists.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        07/08/2021
 * Parameters:  none
 * Return:      result: boolean 
 * */ 
 function ExistID(newID: number) {

    for(let i=0; i< medicationRecords.length; i++) {
        if(medicationRecords[i].id == newID) {
            return(true)
        }
    } 
    return( false );
}