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

// Defining a interface for a appointments object
interface IAppointments {id: number, GpName: String, dateAppointment: Date, time: String}

// Defining constant with fixed cell positions, only rows are dynamic 
const ID = 0;
const GPNAME = 1; 
const DATEAPPOINTMENT = 2;
const TIMEAPPOINTMENT = 3;
const EDIT = 4;
const DELETE = 5;
const UPDATE = 0; // Used in evaluations
const INSERT = 1; // Used in evaluations
const MAX_GP = 10 // Number maximum of avaiable GPs
const MIN_GP = 3 // Number minimum of avaiable GPs
const MAX_DAYS = 180 // Number maximum of days for new appointments
const MIN_DAYS = 30 // Number minimum of days for new appointments
const MAX_APP = 30 // Number maximum of avaiable appointments to show

/**  Defining a array to save the availableAppointments records
 * and bookedAppointments records.
 * availableAppointments is the master database with all avaiable appointments by
 * GP. The bookedAppointments is the database with all appointments made by
 * the user. Since this app is not using a persistente database, 
 * the availableAppointments and bookedAppointments are temporary and  
 * they are keep the data while the app is running. Refreshing the 
 * page or re-open will clean the temporary database. 
 */
let availableAppointments: Array<IAppointments> = new Array<IAppointments>();
let bookedAppointments: Array<IAppointments> = new Array<IAppointments>();

/** loadAvailableAppointments function
 * Description: Method to load the availableAppointments.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      none
 * */ 
 function loadAvailableAppointments() {

    for(let i=1; i <= MAX_APP; i++) {
        // Creating a instance of availableAppointments
        let newAppointment: IAppointments = {id: nextIDforAppointment(), GpName: getGPsAvaiable(), dateAppointment: getDateAvailable(), time: ' '}

        // Adding to new created instance to the list of appointments
        availableAppointments.push(newAppointment); 
    } 
}


/** nextIDforAppointment function
 * Description: Method to return the next ID as suggestion.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      nextID: nubmer 
 * */ 
 function nextIDforAppointment() : number {

    let nextID: number = 0;
    for(let i=0; i< availableAppointments.length; i++) {
        if(availableAppointments[i].id > nextID) {
            nextID = availableAppointments[i].id ;
        }
    } 

    return( nextID + 1 );
}


/** getGPsAvaiable function
 * Description: Method to return random names of GPs.
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      GPname: String 
 * */ 
 function getGPsAvaiable() : String {
    let GPname = "TBD";
    let random: number = Math.floor(Math.random()*(MAX_GP-MIN_GP+1)+MIN_GP);

    switch(random) { 
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
     
    return( GPname );
}



/** getDateAvailable function
 * Description: Method to return random date avaiable for appointment
 * Author:      Diego Bueno - d.bueno.da.silva.10@student.scu.edu.au
 * Date:        11/08/2021
 * Parameters:  none
 * Return:      dateApp: Date 
 * */ 
 function getDateAvailable() : Date {
    let dateApp: Date = new Date();
    let random: number = Math.floor(Math.random()*(MAX_DAYS-MIN_DAYS+1)+MIN_DAYS);

    return( dateApp.setDate(dateApp.getDate())  + random ));
}