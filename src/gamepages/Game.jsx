import { useEffect, useState } from "react"
import Block from './Block'
import axios from 'axios'

export default function Game () {
    // const [data, setData] = useState([
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ])
    useEffect( () => {
        const userBestScore = async function () {
            try {
                const token = localStorage.getItem('jwt')
                console.log(token);
                const authHeaders =  {
                    'authorization': token
                }
                var score = {
                    'current_score': 30   // req.body.best_score
                }
                
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/score`, score, { headers: authHeaders })
                console.log(response);
                // const datas = response.data

            } catch (err) {
                console.log(err);
            }
        }
        userBestScore()
    }, [])

    



    // {data.map((row, idxOne) => {
    //     return (
    //         <div key={idxOne}>
    //             {row.map((digit, idxTwo) => <Block num={digit} key={idxTwo} />)}
    //         </div>
    //     )
    // })}

    return (
        <div className="main_container">
            {/* <h1>{JSON.stringify(data)}</h1> */}
            
        </div>
    )
}