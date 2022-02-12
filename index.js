console.log("THIS IS POSTMASTER...!");

let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

let json = document.getElementById('jsonFormat');
json.addEventListener('click', () => {
    document.getElementById('wholeBoxJson').style.display = 'block';
    document.getElementById('parameterBox').style.display = 'none';
})

let params = document.getElementById('parameterFormat');
params.addEventListener('click', () => {
    document.getElementById('wholeBoxJson').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})

// Create a div for adding params input
function getString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parameterIndex = 0;

let addRequestValue = document.getElementById('addRequestValue');
addRequestValue.addEventListener('click', () => {
    let newBox = document.getElementById('newBox');
    let string = `
            <div class="row my-2 ">
                <label for="param" class="col-sm-2 col-form-label"> <b><var>Parameter ${parameterIndex + 2}</var></b></label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id ="paramKey${parameterIndex + 2}" placeholder="Enter Key ${parameterIndex + 2} here" style="font-style:italic">
                    <br>
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id ="paramValue${parameterIndex + 2}" placeholder="Enter Value ${parameterIndex + 2} here" style="font-style:italic">
                    <br>
                </div>
                
                <button class="btn btn-primary deleteParam col-md-1 newOne" style = "width:40px; height:37px;" > - </button>
            </div>
    `;
    let newDiv = getString(string);
    newBox.appendChild(newDiv);

    // Deleting item from parent node
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }
    parameterIndex++;
})

let submitBtnRequest = document.getElementById('submitBtnRequest');
submitBtnRequest.addEventListener('click', () => {
    document.getElementById("finalResult").innerHTML = 'Please wait for processing...!';

    let url = document.getElementById("url").value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value


    if (contentType == 'param') {
        data = {};
        for (let i = 0; i < parameterIndex + 1; i++) {
            if (document.getElementById('paramkey' + (i + 1)) !== undefined) {
                console.log('yes');

                let key = document.getElementById('paramKey' + (i + 1)).value;
                let value = document.getElementById('paramValue' + (i + 1)).value;
                data[key] = value;

            }

        }
        data = JSON.stringify(data);

    }
    else {
        data = document.getElementById('jsonBoxRequest').value 
        console.log(data)
    }

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.text())
            .then((text) => {
                // document.getElementById('finalResult').value = text;
                document.getElementById('finalResult').innerHTML = text;
                data = document.getElementById('jsonBoxRequest').value;

                Prism.highlightAll();
            })

    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.text())
            .then((text) => {
                document.getElementById('finalResult').innerHTML = text;
                Prism.highlightAll();

            })
    }

})
