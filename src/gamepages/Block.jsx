export default function Block ({ cell }) {
    const style = {
        blockStyle: {
            height: 120,
            width: 120,
            background: "darkgray",
            margin: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 55,
            fontWeight: 800,
            color: "white",
          }
    }

    const { blockStyle } = style
    
    
    return (
        <div 

            style={{
                ...blockStyle,
                color: cell === 2 || cell === 4 ? "#645B52" 
                     : cell === 8 || cell === 16 ? "#877456" 
                     : cell === 32 || cell === 64 || cell === 128 ? "#b29700"
                     : cell === 256 || cell === 512 || cell === 1024 ? "gold" : "red"

            }}>
        
            {/* {cell} */}
            {cell !== 0 ? cell : ""}
        </div>
    )
}
