import { useEffect, useState } from "react"
import Block from './Block'
import axios from 'axios'

export default function Game ({ user }) {
    const [data, setData] = useState([
        [0, 0, 0, 0],                       
        [0, 0, 0, 0], 
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ])
    
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    const initialize = () => {
        let storage = [...data]
        addNumber(storage)
        addNumber(storage)
        setData(storage)
    }
    
    useEffect(() => {
        initialize()
    }, [])
    
    const addNumber = (newGrid) => {
        let added = false  

        while (!added) {

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
                const merged = [false, false, false, false]
                for (let i=0; i < tempData.length; i++) { 
                    for (let j=i-1; j >= 0; j--){ 
                        for (let k=0; k < tempData[0].length; k++) { 
                            if (tempData[j][k] === 0) { 
                                tempData[j][k] = tempData[j+1][k]
                                tempData[j+1][k] = 0
                            } else if (!merged[k] && tempData[j][k] !== 0 && tempData[j][k] === tempData[j+1][k]) {
                                tempData[j][k] += tempData[j+1][k]
                                tempData[j+1][k] = 0 
                                merged[k] = true
                              
                                let points = 0
                                switch(tempData[j][k] || tempData[j+1][k]) {
                                    case 4: 
                                        points = 30;
                                    case 8: 
                                        points += 70;
                                    case 16: 
                                        points += 150;
                                    case 32: 
                                        points += 310;
                                    case 64: 
                                        points += 630;
                                    case 128: 
                                        points += 1270;
                                    case 256: 
                                        points += 2550;
                                    case 512: 
                                        points += 5110;
                                    case 1024: 
                                        points += 10230;
                                    case 2048: 
                                        points += 20470; break
                                }
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            } else if (e.keyCode === 40) { // down arrow
                const merged = [false, false, false, false]
                for (let i=tempData.length - 1; i >=0; i--) { 
                    for (let j=i+1; j < tempData.length; j++){ 
                        for (let k=0; k < tempData[0].length; k++) {           
                            if (tempData[j-1][k] !== 0 && tempData[j][k] === 0) {  
                                tempData[j][k] = tempData[j-1][k]
                                tempData[j-1][k] = 0
                            } else if (!merged[k] && tempData[j-1][k] !== 0 && tempData[j-1][k] === tempData[j][k]) { // [0][k] === [1][k]
                                tempData[j][k] += tempData[j-1][k]
                                tempData[j-1][k] = 0
                                merged[k] = true

                                let points = 0
                                switch(tempData[j][k] || tempData[j-1][k]) {
                                case 4: 
                                    points = 30;
                                case 8: 
                                    points += 70;
                                case 16: 
                                    points += 150;
                                case 32: 
                                    points += 310;
                                case 64: 
                                    points += 630;
                                case 128: 
                                    points += 1270;
                                case 256: 
                                    points += 2550;
                                case 512: 
                                    points += 5110;
                                case 1024: 
                                    points += 10230;
                                case 2048: 
                                    points += 20470; break
                                }
                                setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            } else if (e.keyCode === 37) { // left arrow
                const merged = [false, false, false, false]
                for (let i=0; i < tempData.length; i++) { 
                    for (let k=i; k >= 1; k--){   
                        for (let j=0; j < tempData.length; j++) {          
                            if (tempData[j][k] !== 0 && tempData[j][k-1] === 0) {  
                                tempData[j][k-1] = tempData[j][k]
                                tempData[j][k] = 0
                            }  else if (!merged[j] && tempData[j][k] !== 0 && tempData[j][k] === tempData[j][k-1]) {
                                tempData[j][k-1] += tempData[j][k]
                                tempData[j][k] = 0
                                merged[j] = true
                            
                                let points = 0
                                switch(tempData[j][k-1] || tempData[j][k]) {
                                case 4: 
                                    points = 30;
                                case 8: 
                                    points += 70;
                                case 16: 
                                    points += 150;
                                case 32: 
                                    points += 310;
                                case 64: 
                                    points += 630;
                                case 128: 
                                    points += 1270;
                                case 256: 
                                    points += 2550;
                                case 512: 
                                    points += 5110;
                                case 1024: 
                                    points += 10230;
                                case 2048: 
                                    points += 20470; break
                                }
                                    setCurrentScore(currentScore + points)
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            } else if (e.keyCode === 39) { // right arrow
                var merged = [false, false, false, false]
                for (let i=tempData[0].length - 1; i >= 0; i--) { 
                    for (let k=i; k < tempData[0].length-1; k++){ 
                        for (let j=0; j < tempData.length; j++) { 
                            if (tempData[j][k] !== 0 && tempData[j][k+1] === 0) {  
                                tempData[j][k+1] = tempData[j][k]
                                tempData[j][k] = 0
                            } else if (!merged[j] && tempData[j][k] !==0 && tempData[j][k] === tempData[j][k+1]) { 
                                tempData[j][k+1] += tempData[j][k]
                                tempData[j][k] = 0
                                merged[j] = true

                                let points = 0
                                switch(tempData[j][k+1] || tempData[j][k]) {
                                case 4: 
                                    points = 30;
                                case 8: 
                                    points += 70;
                                case 16: 
                                    points += 150;
                                case 32: 
                                    points += 310;
                                case 64: 
                                    points += 630;
                                case 128: 
                                    points += 1270;
                                case 256: 
                                    points += 2550;
                                case 512: 
                                    points += 5110;
                                case 1024: 
                                    points += 10230;
                                case 2048: 
                                    points += 20470; break
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

    // back-end API
    const postBestScore = async () => {
        try {
            
            const token = localStorage.getItem('jwt')
            const authHeaders =  {
                'authorization': token
            }
            var score = {
                'current_score': currentScore
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/score`, score, { headers: authHeaders })
            
            const { findUser } = response.data
            setBestScore(findUser[0].best_score)
            

        } catch (err) {
            console.log(err);
        }
    }
    return (
            <div 
                className="main_block_container">
                <div className="main_top_score_board">
                    <div className="main_top_titleText_container">
                        <h1 id="main_top_title">2048</h1>
                        <p id="main_top_text">Join the numbers to get to the 2048</p>
                    </div>
                    <div>
                        <p className="scoreBest_text_container">SCORE </p>
                        <p id="current_score">{currentScore}</p>
                        <button id="saveScoreButton" onClick={postBestScore}>Save score</button>
                    </div>
                    <div>
                        <p className="scoreBest_text_container">BEST</p>
                        <p id="best_score">{bestScore}</p>
                        <button id="seeBestScoreButton" onClick={postBestScore}>See best score</button>
                    </div>
                </div>
                {data.map((row, indexOne) => {
                    return (
                        <div className="block_container"
                            onKeyUp={ e => handleKeyPress(e)}
                            tabIndex="1"
                            key={indexOne}>
                            {row.map((cell, indexTwo) => <Block cell={cell} data={data} key={indexTwo} /> )}
                        </div>
                    )
                })}
            </div>
    )
}