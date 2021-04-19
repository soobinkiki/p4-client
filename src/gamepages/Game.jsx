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
    const [winCount, setWinCount] = useState(0)
    const [gamePlayed, setGamePlayed] = useState(0)

    // const [checker, setChecker] = useState([
    //     [false, false, false, false],                       
    //     [false, false, false, false], 
    //     [false, false, false, false],
    //     [false, false, false, false]
    // ])
    
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    const initialize = () => {
        let storage = [...data]
        addNumber(storage)
        addNumber(storage)
        setData(storage)
    }

    // let checkerStorage = [...checker]
    // setChecker(checkerStorage)
    
    useEffect(() => {
        initialize()
    }, [])
    
    const addNumber = (newGrid) => {
        let added = false  
        // let gridStatus = false
        // let counter = 0

        
        while (!added) {
            let random1 = Math.floor(Math.random() * 4) 
            let random2 = Math.floor(Math.random() * 4)
            // if (gridStatus = true) alert('you lose......')

            if (newGrid[random1][random2] === 0) {  // variable[row][column]
                newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4
                added = true
            }

            // if (newGrid[random1][random2] !== 0 && newGrid[random1][random2] !== 2048) {
            //     counter++
            // } else counter--

            // if (counter = 16) gridStatus = true
               
           
        }
        
    }

    // arrow functions
    const handleKeyPress = (e) => {
            let tempData = [...data] 
            let points = currentScore 
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
                              
                                points += getPoints(tempData[j][k]) // numnber points = points + currentScore
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

                                points += getPoints(tempData[j][k])
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
                            
                                points += getPoints(tempData[j][k-1])
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

                                points += getPoints(tempData[j][k+1])
                            }
                            if (tempData[j][k] === 2048) alert('you win!')
                        }
                    }
                }
            }
            // setCurrentScore(points)
            
            var full = true
            var win = false
            for (let i = 0; i < tempData.length; i++) {
                for (let j = 0; j < tempData[i].length; j++) {
                    if (tempData[i][j] === 0) {     // + 2048 check
                        full = false
                    } 
                    if (tempData[i][j] === 2048){
                        win = true
                    }
                    
                }
            }
            setData(tempData)

            var gamePlayed = 0
            var winCount = 0
            if (full === false && win === true) {
                gamePlayed++
                winCount++
                setGamePlayed(gamePlayed)
                setWinCount(winCount)
                alert('you win')
            } else if (full === true && win === false) {
                gamePlayed++
                setGamePlayed(gamePlayed)
                alert('you lose')
            }

            if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                addNumber(tempData)
            }


            setCurrentScore(points)
        }
        document.onkeyup = handleKeyPress;
        
    const getPoints = (val1) => { 
        let points = 0;
        switch(val1) {
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
        return points;
    }

    // back-end API
    const postBestScore = async () => {
        try {
            
            const token = localStorage.getItem('jwt')
            const authHeaders =  {
                'authorization': token
            }
            var score = {
                'current_score': currentScore
                // 'current_score': winCount
                // 'current_score': gamePlayed
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
                <div className="made_in_container">
                    <p id="copyright">&copy; 2021 made by Justin Park</p>
                    <a href="https://www.linkedin.com/in/justin-park-4b20b8206/"><img id="linkedInIMG" src="/images/linkedin.png"></img></a>
                    <a href="https://github.com/soobinkiki"><img id="githubIMG" src="/images/github.png" alt="GITHUB"></img></a>
                </div>
            </div>

            
    )
}