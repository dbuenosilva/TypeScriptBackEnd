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
// Defining a array to save the medication control objects.
var medicationRecords = new Array();
// Creating the ts variable table to access the html content
var viewMedicationTable = document.getElementById("medicationTable");
// Method to add a new medication
function addMedication() {
    // Define local variables and casting the content from HTML file.
    var identifier = Number(document.getElementById("identifier").value);
    var medicationName = String(document.getElementById("medicationName").value);
    var dailyDose = Number(document.getElementById("dailyDose").value);
    var numberOfRepeats = Number(document.getElementById("numberOfRepeats").value);
    // Creating a instance of IMedication
    var medication = { id: identifier, name: medicationName, dose: dailyDose, repeats: numberOfRepeats };
    // Adding to new created instance to the list of medications
    medicationRecords.push(medication);
    // Creating a obj row element
    var row = viewMedicationTable.insertRow(viewMedicationTable.rows.length);
    // Creating objs cells elements in the row created above
    var idCol = row.insertCell(0);
    var nameCol = row.insertCell(1);
    var doseCol = row.insertCell(2);
    var repeatsCol = row.insertCell(3);
    idCol.innerHTML = String(identifier);
    nameCol.innerHTML = medicationName;
    doseCol.innerHTML = String(dailyDose);
    repeatsCol.innerHTML = String(numberOfRepeats);
}
function notifyUser() {
    alert("test");
}
