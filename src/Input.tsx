import React from "react";

type InputType = {
    name: string,
    humanLabel: string,
    onInputChange: (key: string, value: string | boolean) => void,
    type: string,
    value: string | boolean
}

const Input = ({ name, humanLabel, onInputChange, type, value }: InputType) => {
    const onChange = (e: any) => onInputChange(name, e.target.value)
    switch(type) {
        case 'checkbox' :
            return (
                <div className="form-group" key={name}>
                    <label htmlFor={name}>{humanLabel}</label>
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        onChange={e => onInputChange(name, !value)}
                        checked={Boolean(value)}
                    />
                </div>
            )
        case 'date' :
            return (
                <div className="form-group" key={name}>
                    <label htmlFor={name}>{humanLabel}</label>
                    <input
                        type="date"
                        id={name}
                        name={name}
                        value={String(value)}
                        onChange={onChange}
                    />
                </div>
            )
        default :
            return (
                <div className="form-group" key={name}>
                    <label htmlFor={name}>{humanLabel}</label>
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={String(value)}
                        onChange={onChange}
                    />
                </div>
            )
    }
}

export default Input