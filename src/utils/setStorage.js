export default function setStorage(type, data, isRemove) {
    
    try {
        if(typeof type !== 'string')
            throw new Error('Type is not string')
        else if(isRemove) {
            localStorage.removeItem(type)
            return true
        }   
        else if(data) {
            localStorage.setItem(type, JSON.stringify(data))
            return data
        } else {
            const storageData = JSON.parse(localStorage.getItem(type))
            return storageData
        }
    } catch (e) {
        console.log(e);
        return null
    }
}