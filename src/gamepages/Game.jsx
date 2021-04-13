import { useEffect, useState } from "react"
import Block from './Block'
import axios from 'axios'
// import cloneDeep from 'lodash.clonedeep';

export default function Game () {
    const [data, setData] = useState([
        [0, 0, 0, 0],    // 8 2 2 0                      
        [0, 0, 0, 0],   // 2 2 0 0
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ])

    // const [storage, setStorage] = useState([
    //     [0, 0, 0, 0],    // 8 2 2 0                      
    //     [0, 0, 0, 0],   // 2 2 0 0
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ])
    // 8 0 0 0  if num == 0 -> data[1][0] data[0][0] i--
    // 8 0 0 0      
    // 8 0 0 0  same number || if the cell == 0   go up go up
    // 2 2 2 0   16 4 4 0
    // 0 2 2 0    2 2 0 0




    // 0 2 0 0    0 0 2 0



    // Initialize the game
    const initialize = () => {
        let storage = [...data]
        addNumber(storage)
        console.table(storage)
        setData(storage)
    }
 
    // Add random number (2 or 4 if the board is empty)
    const addNumber = (newGrid) => {
        let added = false   // added = true
        let gridFull = false
        
        while (!added) {
            if (gridFull) break

            let random1 = Math.floor(Math.random() * 4) 
            console.log(random1);
            let random2 = Math.floor(Math.random() * 4)
            console.log(random2);

            if (newGrid[random1][random2] === 0) {  // variable[row][column]
                newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4
                added = true
            } 
        }
    }

    // Functions for (left right up down)
        const handleKeyPress = (e) => {
            let tempData = [...data]  
            // console.log('up arrow')
            if (e.keyCode === 38) {
                for (let i=0; i < tempData.length; i++) {
                    for (let k=0; k < tempData[0].length; k++){ // column
                        for (let j=i-1; j >= 0; j--) {          // row      i = 3, j = 0 
                            if (tempData[j][k] === 0) {   // row1 column0 is equal to 0
                                tempData[j][k] = tempData[j+1][k]
                                tempData[j+1][k] = 0
                            } else if (tempData[j][k] === tempData[j+1][k]) {
                                tempData[j][k] += tempData[j+1][k]
                                tempData[j+1][k] = 0
                            } else if (tempData[j][k] === 2048) {
                                alert('you win!')
                            }
                        }
                    }
                }
            }

            else if (e.keyCode === 40) {
                // console.log('down arrow');
                // down arrow
                for (let i=0; i < tempData.length; i++) {
                    for (let k=0; k < tempData[0].length; k++){ // column
                        for (let j=i+1; j < tempData[0].length; j++) {          // row      i = 3, j = 0 
                            if (tempData[j-1][k] !== 0 && tempData[j][k] === 0) {   // row1 column0 is equal to 0
                                tempData[j][k] = tempData[j-1][k]
                                tempData[j-1][k] = 0
                            } else if (tempData[j-1][k] === tempData[j][k]) { // [0][k] === [1][k]
                                tempData[j][k] += tempData[j-1][k]
                                tempData[j-1][k] = 0
                            } else if (tempData[j][k] === 2048) {
                                alert('you win!')
                            }
                            
                        }
                    }
                }
            }

            else if (e.keyCode === 37) {
                // console.log('left arrow');
                // left arrow
                for (let i=0; i < tempData.length; i++) {
                    for (let k=0; k < tempData[0].length; k++){                 // column
                        for (let j=i; j >= 0; j--) {          // row      i = 3, j = 0 
                            if (tempData[j][k] !== 0 && tempData[j][k-1] === 0) {   // j=0 k=0 
                                tempData[j][k-1] = tempData[j][k]
                                tempData[j][k] = 0
                            } 
                            // j -> 3 not working

                            // else if (tempData[j][k] === tempData[j][k+1]) { // [0][k] === [1][k]
                            //     tempData[j][k+1] += tempData[j][k]
                            //     tempData[j][k] = 0
                            // } else if (tempData[j][k] === 2048) {
                            //     alert('you win!')
                            // }
                            
                        }
                    }
                }
            }

            else if (e.keyCode === 39) {
                // console.log('right arrow');
                // // right arrow
                for (let i=0; i < tempData.length; i++) {
                    for (let k=0; k < tempData[0].length; k++){                 // column
                        for (let j=i; j < tempData[0].length; j++) {          // row      i = 3, j = 0 
                            if (tempData[j][k] !== 0 && tempData[j][k+1] === 0) {   // j=0 k=0 
                                tempData[j][k+1] = tempData[j][k]
                                tempData[j][k] = 0                        
                            } else if (tempData[j][k] === tempData[j][k+1]) { // [0][k] === [1][k]
                                tempData[j][k+1] += tempData[j][k]
                                tempData[j][k] = 0
                            } else if (tempData[j][k] === 2048) {
                                alert('you win!')
                            }
                        }
                    }
                }
            }



            initialize()

        }

        document.onkeyup = handleKeyPress;

    
    // check game status
        // board filled up - 2048 exist yes? - win
        // board filled up - 2048 exist no? - lose

    // Reset?


    useEffect( () => {
        initialize()
    }, [])
    
    // back-end API
    useEffect( () => {
        const userBestScore = async function () {
            try {
                const token = localStorage.getItem('jwt')
                // console.log(token);
                const authHeaders =  {
                    'authorization': token
                }
                var score = {
                    'current_score': 30   // req.body.current_score
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

    return (
        <div 
            onKeyUp={ e => handleKeyPress(e)} 
            tabIndex="1"
            className="main_container">
            {data.map((row, indexOne) => {
                return (
                    <div className="block_container"
                        // onKeyDown={ e => handleKeyPress(e)}
                        // tabIndex="1"
                        key={indexOne}>
                        {row.map((cell, indexTwo) => <Block cell={cell} key={indexTwo} /> )}
                    </div>
                )
            })}
        </div>

    )
    // return (
    //     <div>
    //         <div tabIndex="1" onKeyDown={e => handleKeyPress(e)}>click me</div>
    //         <input type="text" onKeyDown={e => handleKeyPress(e)}></input>
    //         {/* <div tabIndex="1" ref={ref => this.myDiv = ref}>by ref</div> */}
    //     </div>
    // )
}