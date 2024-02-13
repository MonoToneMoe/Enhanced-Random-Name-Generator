// Things we need: 
// 1. an input field for names
// 2. a button to add the name in said input field to the list of names
// 3. save each name added to local storage, load names from local storage when site loads, and a function to remove a name from local storage
// 4. an area to display the names added to the list
// 5. a button next to each name that removes the name from the list
// 6. a button to get random groups, I choose that there's groups of 3 but I'll add functionality to change group size if I have time

import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";


let nameInput = document.getElementById('nameInput');
let addNameBtn = document.getElementById('addNameBtn');
let removeNameButton = document.getElementById('removeNameButton');
let randomGroupsButton = document.getElementById('randomGroupsButton');
let groupSizeSlider = document.getElementById('groupSizeSlider');
let randomNameButton = document.getElementById('randomNameButton')
let nameDisplay = document.getElementById('nameDisplay');
let randomDisplay = document.getElementById('randomDisplay');


addNameBtn.addEventListener('click', async ()=>{
    let name = await nameInput.value;
    console.log(name);
    if(name !== '') {
        await saveToLocalStorage(name);
        await updateNameDisplay();
        nameInput.value = await '';
    }
});

const updateNameDisplay = async () => {
    let names = await getlocalStorage();

    nameDisplay.textContent = await '';

    await names.map(name => {
        let p = document.createElement('p');

        p.textContent = name;
        p.className =  "text-lg font-medium text-gray-900 dark:text-white d-flex justify-content-between";

        let button = document.createElement('button');

        button.type = 'button';
        button.textContent = "Delete"
        button.className = "btn btn-danger";

        button.addEventListener('click', ()=>{
            removeFromLocalStorage(name);

            p.remove();
        })

        p.append(button);
        nameDisplay.append(p)

    })
}

updateNameDisplay()

const randomNameGen = async () => {
    let h1 = document.createElement('h1');
    h1.className = "modal-title fs-5 text-center";
    h1.id = "exampleModalLabel";
    let names = await getlocalStorage();

    let randomIndex = await Math.floor(Math.random() * (names.length))

    randomDisplay.textContent = '';
    if(names.length === 0) {
        console.log('yippee')
        h1.textContent = "You don't have any names :/"
    } else {
        console.log(names[randomIndex]);
        h1.textContent = names[randomIndex];
    }
    randomDisplay.append(h1)
}
randomNameGen()

const randomGroupGen = async () => {
    let names = await getlocalStorage();
    let shuffledNames = await names.sort(() => Math.random() - 0.5);
    let groups = await [];
    for (let i = 0; i < shuffledNames.length; i += groupSizeSlider.value) {
        let group = shuffledNames.slice(i, i + groupSizeSlider.value);
        groups.push(group);
    }

    if (groups.length > 1 && groups[groups.length - 1].length === 1) {
        groups[0].push(groups.pop()[0]);
    }
    console.log(groups)
    randomDisplay.textContent = '';
    groups.map(group => {
        let h1 = document.createElement('h1');
        h1.className = "modal-title fs-5 text-center";
        h1.id = "exampleModalLabel";
        h1.textContent = "Group: " + group;

        randomDisplay.append(h1)
    })
}

randomNameButton.addEventListener('click', async () => {
    await randomNameGen();
})
randomGroupsButton.addEventListener('click', async () => {
    await randomGroupGen();
})