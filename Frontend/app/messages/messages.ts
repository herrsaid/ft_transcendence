
import Cookies from 'js-cookie';

var Messages

// const setMessages = (data) =>{
//     Messages = data;
// }
// fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${1}`, {
//     method: 'GET',
//     headers:{
//         Authorization: `Bearer ${Cookies.get('access_token')}`
//     }
    
// }).then((response) => Messages = response.json())
// export default Messages;

async function fetchdata() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/messages?id=${1}`, {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            })
        Messages = response.json();
        console.log('hhhhhh')
        return Messages.then(data => {return(data)});
    }
    catch (error)
    {
        return null
    }
}
Messages = fetchdata()
let msg
console.log('data', Messages.then(data => {console.log(data)}));
export default Messages;