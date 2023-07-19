const getSearch = (string = '', array = [], key = '') => {
    if(!string)
        return array

    return array.filter(item => {
        return item[key].includes(string)
    })
}

export default getSearch