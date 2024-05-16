import { Dimmer, Loader } from "semantic-ui-react"

interface Props {
  content: string
  inverted?: boolean
}

function LoadingComponent({content='Loading...', inverted=true}: Props)  {
    return (
        <Dimmer active={true} inverted={inverted}>
         
          <Loader content={content}/>

        </Dimmer>
    )
}
export default LoadingComponent