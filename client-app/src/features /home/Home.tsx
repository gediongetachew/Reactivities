import { Link } from "react-router-dom"
import { Container } from "semantic-ui-react"

const Home = () => {
    return (
        <Container style={{margineTop : '7em'}}>
            <h1>Home Page</h1>
            <h3> go to <Link to="/activities">Activities</Link></h3>
        </Container>
    )
}
export default Home