const saveToLocalStorage = (name) => {
    
    let names = getlocalStorage();

    if(!names.includes(name)) {
        names.push(name);
    }

    localStorage.setItem("Names", JSON.stringify(names));

}

const getlocalStorage = () => {

    let localStorageData = localStorage.getItem("Names");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (name) => {
    let names = getlocalStorage();

    let nameIndex = names.indexOf(name);

    names.splice(nameIndex, 1);

    localStorage.setItem("Names", JSON.stringify(names));

}



export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage};