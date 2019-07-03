import React, {Component} from 'react';
import {Form, Input, Scope} from '@rocketseat/unform';
import * as Yup from 'yup';
import FormInput from '../Form/FormInput';
import DatePicker from '../Form/DatePicker';

class Employee extends Component {
    state = {
        formValues: {
            'firstName': '',
            'lastName': '',
            'workplaces': [
                {id: 0},
            ],
        },
        submitted: false,
    };

    schema = Yup.object().shape({
        firstName: Yup.string().required('Fist name is required'),
        lastName: Yup.string().required('Fist name is required'),
        email: Yup.string()
            .email('Email has incorrect format')
            .required('Email is required'),
        exp: Yup.object().shape({
            companies: Yup.array().of(
                Yup.object().shape({
                    name: Yup.string().required('Company name is required'),
                    start: Yup.date().required('Start date is required').max(new Date(), 'Date cannot be in future'),
                    end: Yup.date()
                        .when('start', (st, schema) => {
                            let dateSchema = Yup.date().required('End date is required').max(new Date(), 'Date cannot be in future')
                            if (typeof st !== 'undefined') {
                                dateSchema = dateSchema.min(st, 'End date cannot be before start date');
                            }

                            return dateSchema;
                        }),
                })
            )
        }),
    });

    handleSubmit = data => {
        console.dir(data);
        this.setState({submitted: true});
    };

    renderWorkplaceInput = workplace => (
        <div key={`workplace-${workplace.id}`} className="border-bottom mb-3">
            <div className="form-group row">
                <label htmlFor={`companies[${workplace.id}].name`}
                       className="col-sm-2 col-form-label">{`#${workplace.id + 1} Company`}</label>
                <div className="col-sm-10">
                    <Input
                        name={`companies[${workplace.id}].name`}
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <DatePicker
                        name={`companies[${workplace.id}].start`}
                        placeholder="Choose start date"
                        maxDate={new Date()}
                        label="Start date"
                    />
                </div>
                <div className="col-sm-6">
                    <DatePicker
                        name={`companies[${workplace.id}].end`}
                        placeholder="Choose end date"
                        maxDate={new Date()}
                        label="End date"
                    />
                </div>
            </div>
        </div>
    );

    addWorkplace = () => {
        if (this.state.formValues.workplaces.length < 10) {
            this.setState(prevState => {
                prevState.formValues.workplaces.push({id: prevState.formValues.workplaces.length});

                return prevState;
            });
        }
    };

    render() {
        const {formValues, submitted} = this.state;

        const successMsg = <div>
            <p className="h1">Thank you for submitting a form!</p>
        </div>;

        const form = <Form
            schema={this.schema}
            initialData={formValues}
            onSubmit={this.handleSubmit}
        >
            <h3 className="mb-3 border-bottom">Employee profile</h3>
            <div className="row border-bottom mb-3">
                <div className="col">
                    <div className="form-group">
                        <FormInput label="First name" name="firstName" placeholder="Enter first name"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <FormInput label="Last name" name="lastName" placeholder="Enter last name"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <FormInput label="Email" name="email" placeholder="Enter email"/>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <p className="h4">Companies (maximum 10 latest workplaces)</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Scope path="exp">
                        {formValues.workplaces.map(workplace => this.renderWorkplaceInput(workplace))}
                    </Scope>
                </div>
            </div>
            <button
                onClick={this.addWorkplace}
                className="btn btn-lg btn-primary"
                disabled={this.state.formValues.workplaces.length >= 10}
            >Add company
            </button>

            <button type="submit" className="btn btn-lg btn-success float-right">Submit</button>
        </Form>;

        return submitted ? successMsg : form;
    }
}

export default Employee;
