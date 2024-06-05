import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

function ActivityFilters () {
    return (
      <>
         <Menu vertical large style={{width: "100%", marginTop: 25 }}>
            <Header icon="filter" attached color="teal" content="Filter"/>
            <Menu.Item content='All Activities' />
            <Menu.Item content='Activities Your Hosting' />
            <Menu.Item content='Activities Your Going To' />
        </Menu>
        <Header />
        <Calendar />
      </>
 
    )
}

export default ActivityFilters