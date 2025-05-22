import { Link } from 'react-router'
import './Subscriptions.css'
export default function Subscriptions(props) {
    return (
        <>
            <Link to={`/subs/${props.id}`}>
                <div className='subBlock'>
                    <p>{props.title}</p>
                    <p>{props.price} ₽ - {props.days} дней</p>
                </div>
            </Link>
        </>
    )
}