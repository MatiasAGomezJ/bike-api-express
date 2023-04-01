async function getData() {
    try {
        let response = await fetch("http://localhost/api/bike");
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function show() {
    container = document.getElementsByClassName("bike-container")[0];
    let data = await getData();
    data.forEach((bike) => {
        let divImage = document.createElement("div");
        divImage.classList.add("bike-image");
        let img = document.createElement("img");
        img.src = "/resources/bikes/1.png";
        divImage.appendChild(img);

        let divInfo = document.createElement("div");
        divInfo.classList.add("bike-info");
        let divProperties = document.createElement("div");
        divProperties.classList.add("bike-properties");

        for (const key in bike) {
            const value = bike[key];
            if (key === "_id") {
                let title = document.createElement("p");
                title.innerHTML = value;
                title.classList.add("bike-title");
                divInfo.appendChild(title);
                continue;
            }
            let p = document.createElement("p");
            p.classList.add("bike-property");
            p.innerHTML = `<span class="bike-key">${key}:</span>${value}`;
            divProperties.appendChild(p);
        }
        divInfo.appendChild(divProperties);

        let divButtons = document.createElement("div");
        divButtons.classList.add("bike-buttons");
        let modifyButton = document.createElement("a");
        modifyButton.classList.add("bike-button");
        modifyButton.innerHTML = "Modificar";
        modifyButton.href = `http://localhost/bikes/modify/${bike._id}`;
        let deleteButton = document.createElement("a");
        deleteButton.classList.add("bike-button");
        deleteButton.innerHTML = "Eliminar";
        deleteButton.href = `http://localhost/bikes/delete/${bike._id}`;
        divButtons.appendChild(modifyButton);
        divButtons.appendChild(deleteButton);

        let bikeItem = document.createElement("div");
        bikeItem.classList.add("bike-item");

        bikeItem.appendChild(divImage);
        bikeItem.appendChild(divInfo);
        bikeItem.appendChild(divButtons);

        container.appendChild(bikeItem);
    });
}

show();
