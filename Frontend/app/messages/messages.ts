
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
        return response.json();
    }
    catch (error)
    {
        return null
    }
}
Messages =  fetchdata();
console.log('data', Messages);
export default Messages;