import React, {Component, Fragment} from 'react';
import { Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

class FormInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        label: '',
        type: 'text',
        placeholder: '',
        className: 'form-control',
    };

    render() {
        const {name, label, type, placeholder, className} = this.props;

        return (
            <Fragment>
                <label htmlFor={name}>{label}</label>
                <Input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className={className}
                />
            </Fragment>
        );
    }
}

export default FormInput;