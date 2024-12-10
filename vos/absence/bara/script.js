var subjectLimits = {
    "anj": {limit: 50, totalHours: 48},
    "ano": {limit: 50, totalHours: 32},
    "aso": {limit: 70, totalHours: 32},
    "cad": {limit: 60, totalHours: 32},
    "dat": {limit: 60, totalHours: 32},
    "efi": {limit: 60, totalHours: 48},
    "isr": {limit: 60, totalHours: 32},
    "kod": {limit: 50, totalHours: 32},
    "pjr": {limit: 60, totalHours: 32},
    "spr": {limit: 60, totalHours: 224}
};

function updateInfo() {
    var subject = document.getElementById("subject").value;
    if (subject === "") {
        document.getElementById("subjectInfo").innerHTML = "";
        return;
    }
    var limit = subjectLimits[subject].limit;
    var totalHours = subjectLimits[subject].totalHours;
    document.getElementById("subjectInfo").innerHTML = "<div>" + 
                                                            "<div class=\"flex-item\">" + 
                                                                "<p><strong>Limit absence:</strong></p>" +
                                                                "<p>" + limit + "%</p>" +
                                                            "</div>" +
                                                            "<div class=\"flex-item\">" + 
                                                                "<p><strong>Celkový počet hodin:</strong></p>" +
                                                                "<p>" + totalHours + "</p>" + //(3x &nbsp;)
                                                            "</div>" +
                                                        "</div>"
}

var hrDisplayed = false;

function calculateAbsence() {
    var subject = document.getElementById("subject").value;
    var missedHours = document.getElementById("missedHours").value;

    if (subject === "" || missedHours === "") {
        alert("Prosím, vyberte předmět a zadejte počet zameškaných hodin.");
        return;
    }

    var absenceLimit = subjectLimits[subject].limit;
    var totalHours = subjectLimits[subject].totalHours;

    var percentageAbsence = (missedHours / totalHours) * 100;

    var remainingHours = Math.floor((absenceLimit * totalHours / 100) - missedHours);

    document.getElementById("result").innerHTML = "<div>" +
                                                        "<div class=\"flex-item\">" +
                                                            "<p><strong>Procentuální absence:</strong>" +
                                                            "<p>" + percentageAbsence.toFixed(2) + "%</p>" +
                                                        "</div>" +
                                                        "<div class=\"flex-item\">" +
                                                            "<p><strong>Zbývající hodiny, které lze zameškat:</strong></p>" +
                                                            "<p>" + remainingHours + "</p>";
                                                        "</div>" + 
                                                    "</div>";
    
    if (!hrDisplayed) {
        document.getElementById("subjectInfo").innerHTML += "<hr>";
        hrDisplayed = true;
    }
}

updateInfo();

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateAbsence();
        console.log("funguj kurva");
    }
}