
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "SCHOOL-DB";
var empRelationName = "STUDENT-TABLE";
var connToken = "90938154|-31949270451022857|90955013";
$("#empid").focus();
function saveRecNO2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}
function getEmpIdAsJsonObj() {
    var empid = $('#empid').val();
    var jsonStr = {
        id: empid,
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNO2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#empname").val(record.name);
    $("#Class").val(record.class);
    $("#BirthDate").val(record.BirthDate);
    $("#Address").val(record.Address);
    $("#Enrollment").val(record.EnrollmentDate);
}
// Reset Function 
function resetForm() {
    $("#empid").val("");
    $("#empname").val("");
    $("#Class").val("");
    $("#BirthDate").val("");
    $("#Address").val("");
    $("#Enrollment").val("");
    $("#empid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#empid").focus();
}
function validateData() {
    var empid, empname, Class, BirthDate, Address, Enrollment;
    empid = $("#empid").val();
    empname = $("#empname").val();
    Class = $("#Class").val();
    BirthDate = $("#BirthDate").val();
    Address = $("#Address").val();
    Enrollment = $("#Enrollment").val();

    if (empid === "") {
        alert("Roll Number Missing");
        $("#empid").focus();
        return "";
    }
    if (empname === "") {
        alert("Full Name Missing");
        $("#empname").focus();
        return "";
    }
    if (Class === '') {
        alert("Student Class Missing");
        $("#Class").focus();
        return "";
    }
    if (BirthDate === '') {
        alert("Date of Birth Missing");
        $("#BirthDate").focus();
        return "";
    }
    if (Address === '') {
        alert("Address Missing");
        $("#Address").focus();
        return "";
    }
    if (Enrollment === '') {
        alert("Enrollment Date Missing");
        $("#Enrollment").focus();
        return "";
    }

    var jsonStrObj = {
        id: empid,
        name: empname,
        Class: Class,
        BirthDate: BirthDate,
        Address: Address,
        Enrollment: Enrollment,
    };
    return JSON.stringify(jsonStrObj);
}
function getEmp() {
    var getEmpIdAsJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, EmpIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#empid").focus();

    } else if (resJsonObj.status === 200) {
        $("#empid").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();empsal
    }
}
function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('empid').focus();
} 
// ChangeData Function
function changeData() {
    $('#change').prop("disabled", true);
    jsonChg = validateDate();
    var updateRequest = createUPADATERecordRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('empid').focus();
}   

