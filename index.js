getBirds();

function getBirds() {
    document.getElementById("errors").innerHTML = "";

    fetch("http://localhost:3000/Error-codes")
        .then(res => res.json())
        .then(errors => errors.forEach(renderError));
}

function renderError(error) {
    const errorDiv = document.createElement("div");
    const errorImage = document.createElement("img");
    const errorCode = document.createElement("h4");
    const errorShortDescription = document.createElement("p");
    const errorLongDescription = document.createElement("p");

    errorDiv.className = "shrunk";
    errorImage.src = error.image;
    errorCode.textContent = error["error-code"];
    errorShortDescription.textContent = error["error-short-description"];
    errorShortDescription.className = "short";
    errorLongDescription.textContent = error["error-long-description"];
    errorLongDescription.className = "long";
    errorLongDescription.style.display = "none"

    document.getElementById("errors").appendChild(errorDiv);
    errorDiv.append(errorImage, errorCode, errorShortDescription, errorLongDescription);

    errorDiv.addEventListener("click", e => {
        if (errorLongDescription.style.display == "block") {
            errorLongDescription.style.display = "none";
            errorDiv.className = "shrunk";
        } else {
            errorLongDescription.style.display = "block";
            errorDiv.className = "error-div";
        }
    })
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
        "error-long-description" : e.target["new-long-description"].value
    } 
    fetch("http://localhost:3000/Error-codes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newError)
    })
    .then(() => getBirds())
    .then(() => e.target.reset());
})