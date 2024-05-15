import {Form} from "react-bootstrap";
import React from "react";

function FromSelectCurrensy({value, baseValue, onChange}) {

    const allСurrencies = {value}
    const currencyKeys = Object.keys(allСurrencies.value);

    const currencyOptions = currencyKeys.map(key => ({
        name: allСurrencies.value[key].name,
        code: allСurrencies.value[key].code
    }));

    return(
        <Form.Select value={baseValue} onChange={onChange}>
            {currencyOptions.map(option => (
                <option key={option.code} value={option.code}>
                     {option.name} ({option.code})
                </option>
            ))}
        </Form.Select>
    )
};

export default FromSelectCurrensy;