document.getElementById("loginForm").addEventListener("submit", (event) => {
    let usernameInput = document.getElementById('username');
    if(!usernameInput)
    {
        // ...
        return;
    }
    let passwordInput = document.getElementById('password');
    if(!passwordInput)
    {
        // ...
        return;
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", 'http://isapi.mekashron.com', true);
    let sr = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<env:Envelope xmlns:env=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:ns1=\"urn:ICUTech.Intf-IICUTech\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:enc=\"http://www.w3.org/2003/05/soap-encoding\"><env:Body><ns1:Login env:encodingStyle=\"http://www.w3.org/2003/05/soap-encoding\"><UserName xsi:type=\"xsd:string\">${usernameInput.value}</UserName><Password xsi:type=\"xsd:string\">${passwordInput.value}</Password><IPs xsi:type=\"xsd:string\"></IPs></ns1:Login></env:Body></env:Envelope>\n`
    
    xmlhttp.onload = function() {
        console.log(this.responseText);
    }

    xmlhttp.onerror = function(){
        console.log("Error: " + this.status);
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);


    // fetch(`http://isapi.icu-tech.com/icutech-test.dll/Logi?UserName=${usernameInput.value}&Password=${passwordInput.value}`,
    //     {method: 'POST'})
    //     .then((response) => {console.log(response); return response.json();})
    //     .then(data => console.log(data))
    //     .catch((error) => console.log(error));

    event.preventDefault();
})