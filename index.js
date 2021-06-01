getBirds();

function getBirds() {
    fetch("http://localhost:3000/Error-codes")
        .then(res => res.json())
        .then(errors => errors.forEach(renderError));
}

function renderError(error) {
    const errorDiv = document.createElement("div");
    const errorImage = document.createElement("img");
    const errorCode = document.createElement("h4");
    const errorShortDescription = document.createElement("p");

    errorImage.src = error.image;
    errorCode.textContent = error["error-code"];
    errorShortDescription.textContent = error["error-short-description"];

    document.getElementById("errors").appendChild(errorDiv);
    errorDiv.append(errorImage, errorCode, errorShortDescription);
}

document.querySelector("#search-error").addEventListener("submit", (e) => {
    e.preventDefault()
    let errorsDiv = document.querySelector("#errors")
    errorsDiv.innerHTML = ""
    fetch("http://localhost:3000/Error-codes")
        .then(res => res.json())
        .then(errors => {
            const filter = errors.filter((error) => {
                if (error["error-code"].indexOf(e.target.search.value) == -1) {
                    return false
                } else {
                    return true
                }
            })
            filter.forEach(renderError)
        });
})

document.querySelector("#create-error").addEventListener("submit", (e)=> {
    e.preventDefault()
    const newError= {
        "error-code" : e.target["new-error-code"].value,
        "image" : e.target["new-error-image"].value,
        "error-short-description" : e.target["new-short-description"].value,
    } 
    fetch("http://localhost:3000/Error-codes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newError)
    })
    // .then(resp=> resp.json())
    // .then(data=> renderError(data))
})

