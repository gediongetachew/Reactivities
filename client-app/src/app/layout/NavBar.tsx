import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';



export default function NavBar() {

   const {ActivityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
           <Container>
             <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: "10px" }} />
                Reactivities
             </Menu.Item>
             <Menu.Item name="Activities" />
             <Menu.Item>
                <Button onClick={() => ActivityStore.openForm()} positive content="Add Activitie" />
             </Menu.Item>
             
           </Container>
        </Menu>
    )
}