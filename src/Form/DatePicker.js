import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, label, placeholder, maxDate }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.selected',
            clearValue: pickerRef => {
                pickerRef.clear();
            },
        });
    }, [ref.current, fieldName]);

    return (
        <div className={`form-group row`}>
            <label htmlFor={fieldName} className="col-sm-4 col-form-label">{label}</label>
            <div className="col-sm-8">
                <ReactDatePicker
                    name={fieldName}
                    id={fieldName}
                    selected={selected}
                    onChange={date => setSelected(date)}
                    ref={ref}
                    className="form-control"
                    placeholderText={placeholder}
                />
                {error && <span>{error}</span>}
            </div>
        </div>
    );
}