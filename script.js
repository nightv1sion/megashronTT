document.getElementById("loginForm").addEventListener("submit", (event) => {
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", 'http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech#Login');
    
    let sr = `<?xml version="1.0" encoding="UTF-8"?>
    <env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns1="urn:ICUTech.Intf-IICUTech" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:enc="http://www.w3.org/2003/05/soap-encoding">
        <env:Body><ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">\
            <UserName xsi:type="xsd:string">${usernameInput.value}</UserName>
            <Password xsi:type="xsd:string">${passwordInput.value}</Password>
            <IPs xsi:type="xsd:string"></IPs></ns1:Login>
        </env:Body>
    </env:Envelope>`
    
    xmlhttp.onload = function() {
        let result = JSON.parse(xmlhttp.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML);

        if(result.ResultCode){
            setErrorStatusMessage(result.ResultMessage);
        }
        else {
            setSuccessStatusMessage(`Hello, ${result.FirstName} ${result.LastName}! You are successfully logged in!`);
        }
        
    }

    xmlhttp.onerror = function(){
        setErrorStatusMessage("Unhandled Error!");
    }

    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xmlhttp.send(sr);

    event.preventDefault();
})

function setSuccessStatusMessage(message){
    let statusNode = document.getElementById("status-message");
    statusNode.innerHTML = message
    statusNode.style = "color: green;font-size:20px;";
    statusNode.hidden = false;
    setTimeoutForNode(statusNode);
}

function setErrorStatusMessage(message){
    let statusNode = document.getElementById("status-message");
    statusNode.innerHTML = message
    statusNode.style = "color: red;font-size:24px;";
    statusNode.hidden = false;
    setTimeoutForNode(statusNode);
}

function setTimeoutForNode(node){
    setTimeout(() => {
        node.hidden = true;
        node.innerHTML = null;
        node.style = null;
    }, 10000)
}