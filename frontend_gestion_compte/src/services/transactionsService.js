const baseUrl = process.env.REACT_APP_API_URL + "/transactions";

// add

// get
export function getTransactions() {
    let rep;
    fetch(baseUrl).then(res => res.json()).then(res => {
        rep = res;
    })
    return rep;
}

// update

// delete
export function deleteTransaction(id) {
    const requestOption = {
        method: 'DELETE',
        haeders: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
    };
    fetch(baseUrl, requestOption).then(data => {
    })
}