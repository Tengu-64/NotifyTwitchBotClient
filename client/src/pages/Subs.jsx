import Title from "../components/Title"
import Subscriptions from "../components/Subscriptions/Subscriptions"
import { subscription } from "../data"
export default function Subs() {
    return (
        <>
        <Title>Подписки</Title>
        <div className='subs'>
            {subscription.map(sub => <Subscriptions {...sub} key={sub.title}/>)}
        </div>
        </>
        
    )
}