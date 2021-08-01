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

// Defining a interface for a medication control object
interface IAppointments {id: number, name: String, dose: number, repeats: number}

// Defining constant with fixed cell positions, only rows are dynamic 


/**  Defining a array to save the medication control objects.
 * medicationRecords is the master database, since this app
 * is not using a persistente database, the medicationRecords is temporary 
 * and it is keeps the data while only the app is running. Refreshing the 
 * page or re-open will clean the temporary database medicationRecords. 
 */
let masterAppointments: Array<IAppointments> = new Array<IAppointments>();
let usersAppointments: Array<IAppointments> = new Array<IAppointments>();
