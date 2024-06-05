import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound ()  {
    return (
      <Segment placeholder>
        <Header icon>
           <Icon name="search" />
           Opps - we've looked everywhere we couldn't find what ur looking for
           <Segment.Inline>
             <Button as={Link} to='/activities'>
                return to Activities page
             </Button>
           </Segment.Inline>
        </Header>
    </Segment>
    )
}