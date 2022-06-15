function getId(key) {

    let id = localStorage.getItem(key)

    if (id === 0) {
        localStorage.setItem(1);
        return 1;
    }

    id = parseInt(id)
    id++

    localStorage.setItem(key, id)

    return id;
}

export default getId;