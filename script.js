function setSuccessStatusMessage(e){let s=document.getElementById("status-message");s.innerHTML=e,s.style="color: green;font-size:20px;",s.hidden=!1,setTimeoutForNode(s)}function setErrorStatusMessage(e){let s=document.getElementById("status-message");s.innerHTML=e,s.style="color: red;font-size:24px;",s.hidden=!1,setTimeoutForNode(s)}function setTimeoutForNode(e){setTimeout(()=>{e.hidden=!0,e.innerHTML=null,e.style=null},1e4)}document.getElementById("loginForm").addEventListener("submit",e=>{let s=document.getElementById("username"),t=document.getElementById("password"),n=new XMLHttpRequest;n.open("POST","http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech#Login");let o=`<?xml version="1.0" encoding="UTF-8"?>
    <env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns1="urn:ICUTech.Intf-IICUTech" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:enc="http://www.w3.org/2003/05/soap-encoding">
        <env:Body><ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">\
            <UserName xsi:type="xsd:string">${s.value}</UserName>
            <Password xsi:type="xsd:string">${t.value}</Password>
            <IPs xsi:type="xsd:string"></IPs></ns1:Login>
        </env:Body>
    </env:Envelope>`;n.onload=function(){let e=JSON.parse(n.responseXML.documentElement.getElementsByTagName("return")[0].innerHTML);e.ResultCode?setErrorStatusMessage(e.ResultMessage):setSuccessStatusMessage(`Hello, ${e.FirstName} ${e.LastName}! You are successfully logged in!`)},n.onerror=function(){setErrorStatusMessage("Unhandled Error!")},n.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.send(o),e.preventDefault()});