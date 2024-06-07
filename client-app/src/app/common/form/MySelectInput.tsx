import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    name: string
    placeHolder: string
    options: {text:string , value:string}[]
    label?: string 
}
export default function MyTextInput (props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} >
        <Select
            clearable 
            options={props.options}
            value={field.value}
            placeholder={props.placeHolder}
            onChange={(_,d) => helpers.setValue(d.value)}
            onBlur={()=> helpers.setTouched(true)} />
          {meta.touched && meta.error ? (
            <Label basic color='red'>{meta.error}</Label>
          ): null}
        </Form.Field>
    )
}