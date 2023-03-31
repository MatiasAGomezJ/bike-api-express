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
    container = document.getElementById("bike-container");
    let data = await getData();
    data.forEach((bike) => {
        let div = document.createElement("div");
        div.classList.add("bike");
        
        for (const item in bike) {
            const element = bike[item];
            if (item === "_id") {
                let h2 = document.createElement("h2");
                h2.innerHTML = element;
                div.appendChild(h2);
                continue;
            }
            let p = document.createElement("p");
            p.innerHTML = `${item}: ${element}`;
            div.appendChild(p);
        }
        container.appendChild(div);
    });
}

show();
