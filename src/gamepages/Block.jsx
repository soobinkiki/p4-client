export default function Block ({ cell }) {
    const style = {
        blockStyle: {
            height: 120,
            width: 120,
            background: "lightgray",
            margin: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 75,
            fontWeight: 800,
            color: "white",
          }
    }

    const { blockStyle } = style

    return (
        <div 
            style={{
                ...blockStyle,
                // background: getColors(num)
                color: cell === 2 || cell === 4 ? "#645B52" : "#fff"
            }}>
        
            {/* {cell} */}
            {cell !== 0 ? cell : ""}
        </div>
    )
}
