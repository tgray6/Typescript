"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sql = require("mssql");
/*
███████████████████████████████████████████████████████████████████████████████████████
        HAL_Stage uses query `select * from info_zip_fips`
        HAL uses query `select * from info_zip_fips_stage`
███████████████████████████████████████████████████████████████████████████████████████
*/
const sqlConfig = {
    user: "ReconciliationAutomation",
    password: "Rt7&ja5!9M",
    database: "HAL",
    server: "3.93.123.180",
    // pool: {
    //   max: 10,
    //   min: 0,
    //   idleTimeoutMillis: 30000,
    // },
    options: {
        encrypt: true,
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        yield sql.connect(sqlConfig);
        const result = yield sql.query `select * from info_zip_fips;`;
        // console.log(result.recordsets[0].length);
        //ADD TESTS HERE, RESULT VAR ABOVE HAS THE RETURNED QUERY TABLE
        let objectDoesNotMeetInterface = [];
        let zipCodeLengthIsNot5 = [];
        let fipsLengthIsNot5 = [];
        let fipAndZipsBothNot5 = [];
        const resultsLength = 41061;
        //GET DUPLICATE ZIPS
        const resultsZipsMapped = result.recordsets[0].map((a) => a.zip);
        const toFindDuplicates = (resultsZipsMapped) => resultsZipsMapped.filter((item, index) => resultsZipsMapped.indexOf(item) !== index);
        const duplicateElementa = toFindDuplicates(resultsZipsMapped);
        //CHECK IF EACH OBJECT IS OF TYPE IRecord AND RETURN TRUE OR FALSE
        function instanceOfresult(object) {
            return ("zip" in object &&
                "fips" in object &&
                "state" in object &&
                "county" in object);
        }
        for (let i = 0; i < result.recordsets[0].length; i++) {
            if (instanceOfresult(result.recordsets[0][i]) === false) {
                objectDoesNotMeetInterface.push(result.recordsets[0][i]);
            }
            else if (result.recordsets[0][i].zip.length !== 5 &&
                result.recordsets[0][i].fips.length !== 5) {
                fipAndZipsBothNot5.push(result.recordsets[0][i]);
            }
            else if (result.recordsets[0][i].zip.length !== 5) {
                zipCodeLengthIsNot5.push(result.recordsets[0][i]);
            }
            else if (result.recordsets[0][i].fips.length !== 5) {
                fipsLengthIsNot5.push(result.recordsets[0][i]);
            }
        }
        console.log(`__________________________RESULTS__________________________`);
        if (duplicateElementa.length > 0) {
            console.log(`Found Duplicates: ${duplicateElementa}`);
        }
        if (result.recordsets[0].length !== resultsLength) {
            console.log(`Expected a length of ${resultsLength} but instead got ${result.recordsets[0].length}`);
        }
        if (objectDoesNotMeetInterface.length !== 0) {
            console.log(`${objectDoesNotMeetInterface.length} object(s) below does not meet interface type`, "\n", objectDoesNotMeetInterface);
        }
        if (zipCodeLengthIsNot5.length !== 0) {
            console.log(`${zipCodeLengthIsNot5.length} object(s) below does not have a zip code length of 5`, "\n", zipCodeLengthIsNot5);
        }
        if (fipsLengthIsNot5.length !== 0) {
            console.log(`${fipsLengthIsNot5.length} object(s) below does not have a fip code length of 5`, "\n", fipsLengthIsNot5);
        }
        if (fipAndZipsBothNot5.length !== 0) {
            console.log(`${fipAndZipsBothNot5.length} object(s) below does not have both a zip code and a fip code length of 5`, "\n", fipAndZipsBothNot5);
        }
        if (objectDoesNotMeetInterface.length === 0 &&
            zipCodeLengthIsNot5.length === 0 &&
            fipsLengthIsNot5.length === 0 &&
            fipAndZipsBothNot5.length === 0 &&
            result.recordsets[0].length === resultsLength &&
            duplicateElementa.length === 0) {
            console.log(`***SUCCESS*** Expected ${resultsLength} rows and found ${result.recordsets[0].length} rows && All Objects match interface type && Have Zip Code Length of 5 && fips length of 5`);
        }
        console.log(`___________________________________________________________`);
    }
    catch (err) {
        console.log(err);
    }
}))();
