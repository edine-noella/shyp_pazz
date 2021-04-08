//generates random id;
const uuiSigner = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate(); 
    let hour = date.getHours();
    let min = date.getMinutes();
    let secs = date.getSeconds();
    let toDay = date.getDay();
    
    let timeDifferentieter = secs+""+month+""+day+""+toDay+year+s4()+hour+min;
    return s4() + s4() + '-' + s4() + '-' +timeDifferentieter+'-' + s4() + s4() + s4();
}
export {uuiSigner};