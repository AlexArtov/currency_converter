import FormSelect from 'react-bootstrap/FormSelect';
import React from "react";

function FromSelectCurrensy({value, baseValue, onChange}) {

    const allСurrencies = {value}
    const currencyKeys = Object.keys(allСurrencies.value);

    const currencyOptions = currencyKeys.map(key => ({
        name: allСurrencies.value[key].name,
        code: allСurrencies.value[key].code
    }));

    return (
        <FormSelect value={baseValue} onChange={onChange}>
            {currencyOptions.map(option => (
                <option value={option.code}>
                    {option.name} ({option.code})
                </option>
            ))}
        </FormSelect>
    )
};

export default FromSelectCurrensy;