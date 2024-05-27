import { Link } from "react-router-dom"
import { Container, Header, Segment, Image, Button } from "semantic-ui-react"

const Home = () => {
    return (
      <Segment inverted textAlign="center" vertical className="masthead">
         <Container text>
           <Header as='h1' inverted>
             <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
             Reactivites
           </Header>
           <Header as='h2' inverted content='Wellcome to Reactivities'  />
           <Button as={Link} to="/activities" inverted size='huge'>
               Take Me To The Activities!
           </Button>
        
         </Container>
      </Segment>
    )
}
export default Home