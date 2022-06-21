import React from 'react';
import { useForm } from 'react-hook-form';

const { register, handleSubmit, watch } = useForm();
const onSubmit = (data) => console.log(data);
console.log(watch('example'));
