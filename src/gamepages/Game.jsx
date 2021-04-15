import { useEffect, useState } from "react"
import Block from './Block'
import axios from 'axios'

export default function Game () {
    const [data, setData] = useState([
        [0, 0, 0, 0],                   
        [0, 0, 0, 0], 
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ])
    var [currentScore, setCurrentScore] = useState(0)

    // Initialize the game
    const initialize = () => {
        let storage = [...data]
        addNumber(storage)
        addNumber(storage)
        setData(storage)
        console.table(storage)
    }
 
    // Add random number (2 or 4 if the board is empty)
    const addNumber = (newGrid) => {
        let added = false   // added = true
        let gridFull = false

        while (!added) {
            if (gridFull) break

            let random1 = Math.floor(Math.random() * 4) 
            let random2 = Math.floor(Math.random() * 4)

            if (newGrid[random1][random2] === 0) {  // variable[row][column]
                newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4
                added = true
            }        
        }
    }

    // arrow functions
    const handleKeyPress = (e) => {
            let tempData = [...data]  
            if (e.keyCode === 38) { // up arrow
                for (let i=0; i < tempData.length; i++) { // 0 1 2 3 
                    var merged = [false, false, false, false]
                    for (let j=i-1; j >= 0; j--){ //  row j=-1 0 1 2
                        for (let k=0; k < tempData[0].length; k++) {  // column   i = 3, j = 0 
                            if (tempData[j][k] === 0) {   // row1 column0 is equal to 0
                                tempData[j][k] = tempData[j+1][k]
                                tempData[j+1][k] = 0
                            } else if (!merged[k] && tempData[j][k] === tempData[j+1][k]) {
                                tempData[j][k] += tempData[j+1][k]
                                tempData[j+1][k] = 0 
                                merged[k] = true 
                              
                                let points = 0
                                switch(tempData[j][k]) {
                                    case 4: points = 30; break
                                    case 8: points = 70; break
                                    case 16: points = 150; break
                                    case 32: points = 310; break
                                    case 64: points = 630; break
                                    case 128: points = 1270; break
                                    case 256: points = 2550; break
                                    case 512: points = 5110; break
                                    case 1024: points = 10230; break
                                    case 2048: points = 20470; break
                                }   
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')

                        }
                    }
                }
            } else if (e.keyCode === 40) { // down arrow
                for (let i=tempData.length - 1; i >=0; i--) {  // i= 3 2 1 0
                    var merged = [false, false, false, false]
                    for (let j=i+1; j < tempData.length; j++){ //   j= 3 2 1 0
                        for (let k=0; k < tempData[0].length; k++) {          // row      i = 3, j = 0 
                            if (tempData[j-1][k] !== 0 && tempData[j][k] === 0) {   // row1 column0 is equal to 0
                                tempData[j][k] = tempData[j-1][k]
                                tempData[j-1][k] = 0
                            } else if (!merged[k] && tempData[j-1][k] === tempData[j][k]) { // [0][k] === [1][k]
                                tempData[j][k] += tempData[j-1][k]
                                tempData[j-1][k] = 0
                                merged[k] = true

                                let points = 0
                                switch(tempData[j][k]) {
                                    case 4: points = 30; break
                                    case 8: points = 70; break
                                    case 16: points = 150; break
                                    case 32: points = 310; break
                                    case 64: points = 630; break
                                    case 128: points = 1270; break
                                    case 256: points = 2550; break
                                    case 512: points = 5110; break
                                    case 1024: points = 10230; break
                                    case 2048: points = 20470; break
                                }   
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            } else if (e.keyCode === 37) { // left arrow
                for (let i=0; i < tempData.length; i++) { // i=0 1 2 3
                    var merged = [false, false, false, false]
                    for (let k=i; k >= 1; k--){    //        k=  1 2 3 
                        for (let j=0; j < tempData.length; j++) {          // row      i = 3, j = 0 
                            if (tempData[j][k] !== 0 && tempData[j][k-1] === 0) {   // j=0 k=0 
                                tempData[j][k-1] = tempData[j][k]
                                tempData[j][k] = 0
                            }  else if (!merged[j] && tempData[j][k] === tempData[j][k-1]) { // [0][k] === [1][k]
                                tempData[j][k-1] += tempData[j][k]
                                tempData[j][k] = 0
                                merged[j] = true
                            
                                let points = 0
                                switch(tempData[j][k-1]) {
                                    case 4: points = 30; break
                                    case 8: points = 70; break
                                    case 16: points = 150; break
                                    case 32: points = 310; break
                                    case 64: points = 630; break
                                    case 128: points = 1270; break
                                    case 256: points = 2550; break
                                    case 512: points = 5110; break
                                    case 1024: points = 10230; break
                                    case 2048: points = 20470; break
                                }   
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            } else if (e.keyCode === 39) {  // right arrow
                for (let i=tempData[0].length - 1; i >= 0; i--) { //   i= 3 2 1 0
                    var merged = [false, false, false, false]
                    for (let k=i; k < tempData[0].length-1; k++){ // k= 2 1 0 -1
                        for (let j=0; j < tempData.length; j++) {  //             // row      i = 3, j = 0 
                            if (tempData[j][k] !== 0 && tempData[j][k+1] === 0) {   // j=0 k=0 
                                tempData[j][k+1] = tempData[j][k]
                                tempData[j][k] = 0
                            } else if (!merged[j] && tempData[j][k] === tempData[j][k+1]) { // [0][k] === [1][k]
                                tempData[j][k+1] += tempData[j][k]
                                tempData[j][k] = 0
                                merged[j] = true

                                let points = 0
                                switch(tempData[j][k+1]) {
                                    case 4: points = 30; break
                                    case 8: points = 70; break
                                    case 16: points = 150; break
                                    case 32: points = 310; break
                                    case 64: points = 630; break
                                    case 128: points = 1270; break
                                    case 256: points = 2550; break
                                    case 512: points = 5110; break
                                    case 1024: points = 10230; break
                                    case 2048: points = 20470; break
                                }   
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            }
            
            if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                addNumber(tempData)
            }
            setData(tempData)

        }
        document.onkeyup = handleKeyPress;


    useEffect(() => {
        initialize()
    }, [])
    
    // back-end API
    useEffect(() => {
        const userBestScore = async () => {
            try {
                const token = localStorage.getItem('jwt')
                // console.log(token);
                const authHeaders =  {
                    'authorization': token
                }
                const score = {
                    'current_score': currentScore   // req.body.current_score
                }

                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/score`, score, { headers: authHeaders })
                console.log(response);
                // const datas = response.data

            } catch (err) {
                console.log(err);
            }
        }
        userBestScore()
    }, [setCurrentScore])

    return (
            <div 
                onKeyUp={ e => handleKeyPress(e)} 
                tabIndex="1"
                className="main_block_container">
                <div className="main_top_score_board">
                    <div className="main_top_titleText_container">
                        <h1 id="main_top_title">2048</h1>
                        <p id="main_top_text">Join the numbers to get to the 2048</p>
                    </div>
                    <div >
                        <p className="scoreBest_text_container">SCORE </p>
                        <p id="current_score">{currentScore}</p>
                    </div>
                    <div>
                        <p className="scoreBest_text_container">BEST</p>
                        <p id="best_score">67246</p>
                    </div>
                </div>
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
}