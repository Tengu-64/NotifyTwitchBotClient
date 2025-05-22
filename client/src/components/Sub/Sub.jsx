import './Sub.css'
import SubmitButton from '../SubmitButton/SubmitButton'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

export default function Sub(props) {
    const { user } = useContext(UserContext)
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=user:read:email`;

    return (
        <div className='subInfo'>
            <h1>{props.price} ₽ - {props.days} дней</h1>
            <p className="subText">{props.description}</p>
            {user ?
                <>
                    <SubmitButton {...props}>Купить</SubmitButton>
                </>
                :
                <>
                    <a href={TWITCH_AUTH_URL} className='regAlertMessage'>Для покупки подписки авторизируйтесь через twitch!</a>
                </>
            }

        </div >
    )
}