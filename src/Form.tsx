import React, { useReducer } from 'react';
import Input from './Input';

type InputType = {
    tag: string;
    name: string;
    type: string;
    human_label: string;
    conditional?: {
        name: string;
        show_if: (value: any) => boolean;
    }
}

type StateType = {
    [key: string] : string | boolean;
}

type ActionType = {
    type: string;
    key?: string | any;
    value?: string | boolean | any;
}

const inputs: InputType[] = [{
        "tag": "input",
        "name": "first_name",
        "type": "text",
        "human_label": "First Name"
    }, {
        "tag": "input",
        "name": "last_name",
        "type": "text",
        "human_label": "Last Name"
    }, {
        "tag": "input",
        "name": "email",
        "type": "email",
        "human_label": "Email Address"
    }, {
        "tag": "input",
        "name": "phone_number",
        "type": "text",
        "human_label": "Phone Number"
    }, {
        "tag": "input",
        "name": "job_title",
        "type": "text",
        "human_label": "Job Title"
    }, {
        "tag": "input",
        "name": "date_of_birth",
        "type": "date",
        "human_label": "Date of Birth"
    }, {
        "tag": "input",
        "name": "parental_consent",
        "type": "checkbox",
        "human_label": "Parental Consent",
        "conditional": {
            "name": "date_of_birth",
            "show_if": (value) => {
                const now = new Date();
                const dateValue = new Date(value.split('-'))
                return dateValue >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
            }
        }
}]



const buildInitialState = (inputs: InputType[]): StateType => inputs.reduce((acc, input) => ({...acc, [input.name]: input.type === "checkbox" ? false : '' }), {})

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "UPDATE_VALUE":
            return {
                ...state,
                [action.key]: action.value
            }
        case "RESET_FORM":
            return action.value
        default:
            return state;
    }

}

const inputActionCreator = (key: string, value: string | boolean): ActionType => ({
    type: "UPDATE_VALUE",
    key,
    value
})

const resetForm = (initialState: StateType) => ({
    type: "RESET_FORM",
    value: initialState
})

const Form = () => {
    const initialState = buildInitialState(inputs)
    const [state, dispatch] = useReducer(reducer, initialState)

    const onSubmit = (e: any) => {
        e.preventDefault()
        console.log(JSON.stringify(state))
        dispatch(resetForm(initialState))
    }
    const onInputChange = (key: string, value: string | boolean) => dispatch(inputActionCreator(key, value))

    return (
        <form onSubmit={onSubmit}>
            {inputs.map(input => {
                if( input?.conditional ) {
                    return input?.conditional.show_if(state[input?.conditional.name]) 
                        ? <Input key={input.name} name={input.name} humanLabel={input.human_label} type={input.type} value={state[input.name]} onInputChange={onInputChange} /> 
                        : null
                }
                return <Input key={input.name}  name={input.name} humanLabel={input.human_label} type={input.type} value={state[input.name]} onInputChange={onInputChange} />

            }
            )}
            <button>Submit Form</button>
        </form>
    )
}

export default Form