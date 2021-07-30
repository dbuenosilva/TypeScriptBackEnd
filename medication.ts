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

// Defining a array to save the medication control objects.
let medicationRecords: Array<IMedication> = new Array<IMedication>();

// Creating the ts variable table to access the html content
let viewMedicationTable = document.getElementById("medicationTable") as HTMLTableElement;

// Method to add a new medication
function addMedication() {

    // Define local variables and casting the content from HTML file.
    let identifier: number = Number((document.getElementById("identifier") as HTMLInputElement).value);
    let medicationName: string = String((document.getElementById("medicationName") as HTMLInputElement).value);
    let dailyDose: number = Number((document.getElementById("dailyDose") as HTMLInputElement).value);
    let numberOfRepeats: number = Number((document.getElementById("numberOfRepeats") as HTMLInputElement).value);

    // Creating a instance of IMedication
    let medication: IMedication = {id: identifier, name: medicationName, dose: dailyDose, repeats: numberOfRepeats}

    // Adding to new created instance to the list of medications
    medicationRecords.push(medication)

    // Creating a obj row element
    let row = viewMedicationTable.insertRow(viewMedicationTable.rows.length) as HTMLTableRowElement;

    // Creating objs cells elements in the row created above
    let idCol      = row.insertCell(0) as HTMLTableCellElement;
    let nameCol    = row.insertCell(1) as HTMLTableCellElement;
    let doseCol    = row.insertCell(2) as HTMLTableCellElement;
    let repeatsCol = row.insertCell(3) as HTMLTableCellElement;

    idCol.innerHTML = String(identifier);
    nameCol.innerHTML = medicationName;
    doseCol.innerHTML = String(dailyDose);        
    repeatsCol.innerHTML = String(numberOfRepeats);    
    
}


function notifyUser() {
    alert("test");
}