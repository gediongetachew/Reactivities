import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props{
    name: string
    placeHolder: string
    row: string
    label?: string 
}
export default function MyTextInput (props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} >
          <textarea {...field} {...props} />
          {meta.touched && meta.error ? (
            <Label basic color='red'>{meta.error}</Label>
          ): null}
        </Form.Field>
    )
}