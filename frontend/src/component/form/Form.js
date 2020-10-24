import React, { useState } from 'react'
import axios from "axios";
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Form = () => {
    const { register, errors, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const [startDate, setStartDate] = useState('');

    return (
        <Container>
            <h1>Employees</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstname">First Name :</label>

                    <input name="firstname" ref={register({ required: "Required", pattern: { message: "First Name is required" } })} />
                    {errors.firstname && <span>You need to write your name.</span>}
                </div>
                <div>
                    <label htmlFor="lastname">Last Name :</label>

                    <input name="lastname" ref={register({ required: "Required", pattern: { message: "Last Name is required" } })} />
                    {errors.lastname && <span>You need to write your last name.</span>}
                </div>
                <div>
                    <label htmlFor="birthdate">Date of birth:</label>

                    <DatePicker
                        name="birthdate"
                        placeholderText="DD/MM/YY"
                        dateFormat="dd/MM/yyyy"
                        selected={startDate} onChange={date => setStartDate(date)}
                    />

                </div>
                <div>
                    <label htmlFor="email">Email address:</label>

                    <input
                        name="email"
                        ref={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {errors.email && errors.email.message}
                </div>

                <input type="submit" />
            </form>
        </Container>
    )
}

export default Form

const Container = styled.div`
 background-color:#def2f9;

`