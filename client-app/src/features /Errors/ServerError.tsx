import { Container, Header, Segment } from "semantic-ui-react";
import {useStore} from "../../app/store/store";

export default function ServerError() { 
    const {CommonStore} = useStore();
    return (
        <Container>
          
            <Header sub as='h5' color="red" content={CommonStore.error?.message} />
             {CommonStore.error?.details && (
           <Segment>
                <Header as="h4"  content="stack trace" color="teal" />
                <code style={{marginTop: '10px'}}>{CommonStore.error?.details}</code>
            </Segment>
             )}
        </Container>
    )
}