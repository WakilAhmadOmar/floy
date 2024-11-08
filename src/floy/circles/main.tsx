import { AbsoluteFill, Sequence } from "remotion"
import ReuseCircle from "./reuseCircle"


const MainCircle = () => {
    return(
        <Sequence style={{
            position:"absolute"
        }}>
            <ReuseCircle />
        </Sequence>
    )
}

export default MainCircle