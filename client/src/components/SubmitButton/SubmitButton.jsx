import { useParams } from 'react-router-dom'
import './SubmitButton.css'
import { subscription } from '../../data'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function SubmitButton({ children }) {
    const { id } = useParams()
    const { user } = useContext(UserContext)

    async function getLogin() {
        const userInfoResponse = await fetch('https://id.twitch.tv/oauth2/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`
            }
        })
        const userData = await userInfoResponse.json();
        return userData.preferred_username
    }


    async function userInfo() {
        const login = await getLogin()
        console.log(login)

        const getUserId = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
            method: 'GET',
            headers: {
                'Client-ID': `${process.env.REACT_APP_CLIENT_ID}`,
                'Authorization': `Bearer ${user}`
            }
        })

        const userId = await getUserId.json()
        return [userId.data[0].id, userId.data[0].display_name]
    }

    async function clicked() {
        let sub = subscription.find(val => String(val.id) === id)
        let [usrId, name] = await userInfo()

        // let date = new Date()

        let data = {
            id: usrId,
            // SubedAt: new Date(date),
            sub_dayDuration: Number(sub.days)
        }
        
        const sendData = await fetch(process.env.REACT_APP_API_SUBSCRIBE_DATA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if(!sendData.ok){
            console.log('Произошла ошибка!')
        }

        const send = await sendData.json()

        if (send) {
            alert(`${name}, Вы купили подписку "${sub.title}" `)
        } else {
            alert('Произошла ошибка!')
        }

    }

    return (
        <>
            <button className='submitButton' onClick={clicked}>{children}</button>
        </>
    )
}