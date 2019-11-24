var obj = {
    xhr: new XMLHttpRequest(),
    getdata: function() {
        this.xhr.onreadystatechange = this.showdata;
        this.xhr.open("POST", "http://127.0.0.1:5000/getData", true);
        this.xhr.setRequestHeader("Content-type", "application/json");
        this.xhr.setRequestHeader("Authorization", "Basic a2Vyb==");
        var data = document.getElementById('state').innerHTML;
        state = state.toLowerCase();
        data = '{"state": "' + data + '"}';
        data = JSON.stringify(data);
        this.xhr.send(data);
    },
    showdata: function() {
        if(this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            obj1.createForm(res);        
        }
    }
}
var obj1 = {
   
    createForm: function(res) {
        // alert(res);
        var getId = document.getElementById("places");
        if (typeof(getId) != 'undefined' && getId != null) {
            console.log("created child already");
        }
        else {
            var select = document.createElement("SELECT");
            select.setAttribute("id", "places");
            select.onchange = this.displayVal;
        
            for (var i = 0; i < res.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", res[i]);
                var text = document.createTextNode(res[i]);
                option.appendChild(text);
                select.appendChild(option);
            }

            var modal_body = document.getElementsByClassName('modal-body');
            modal_body[0].appendChild(select);
        }
    },    
    displayVal: function() {
        var selected = document.getElementById("places").value;
        obj2.getrec(selected);
    }
}

var obj2 = {
    xhr: new XMLHttpRequest(), 
    getrec: function(selected) {
        this.xhr.onreadystatechange = this.showrec;
        this.xhr.open("POST", "http://127.0.0.1:5000/getRec", true);
        this.xhr.setRequestHeader("Content-type", "application/json");
        this.xhr.setRequestHeader("Authorization", "Basic a2Vyb==");
        var state = document.getElementById("state").innerHTML;
        state = state.toLowerCase();
        var data = '{"place":"' + selected + '", "state" : "'+ state+ '"}';
        this.xhr.send(data);
    },
    showrec: function() {
        if(this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            var para = document.createElement('p');
            para.setAttribute("id", "recommend");
            
            para.innerHTML = "<br><br>Similar Places for you: <br><ul>";
            for (i = 0; i < res.length; i++) {
                para.innerHTML += "<li>" + res[i] + "</li>";
            }
            para.innerHTML += "</ul><br>";

            var modal_body = document.getElementsByClassName('modal-body');
            var getId = document.getElementById("recommend");
            if (typeof(getId) != 'undefined' && getId != null) {
                modal_body[0].removeChild(modal_body[0].children[1]);
            }
            modal_body[0].appendChild(para);
          }
    }
}