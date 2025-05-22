import Title from "../components/Title";
import Sub from "../components/Sub/Sub";
import { useParams } from "react-router";
import { subscription } from "../data";


export default function SubById() {
    const { id } = useParams()
    let validId = (Number(id) < 1 || Number(id) > subscription.length || isNaN(id)) ? false : true

    return (
        <>
            {validId ?
                <>
                    <Title>Тариф "{subscription[id - 1].title}"</Title>
                    <Sub {...subscription[id - 1]} />
                </>
                :
                <>
                    <Title>Несуществующий тариф</Title>
                    <h3>Все тарифы находятся <a href="/subs">здесь</a></h3>
                </>

            }

        </>
    )
}