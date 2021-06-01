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