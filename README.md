# sam-hook-form

> Custom Hook Form to handle Forms

[![NPM](https://img.shields.io/npm/v/sam-hook-form.svg)](https://www.npmjs.com/package/@samform/sam-hook-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @samform/sam-hook-form
yarn add @samform/sam-hook-form
```

## Description

This custom hook was based on the React Hook Form.
You can check the details to use and an example below.

<strong>values</strong>          
<p>Contain the current values of your registered inputs/selects. The values object is stored as a Ref, so it don't cause your app to rerender;</p>
<br />
<strong>register</strong>       
<p>It is necessary if you don't pass to useForm the initial values. The function create the key with the name of the input/select on the values object;</p>
<br />
<strong>handleChange</strong>    
<p>Updates the value of the input/select on the values object;</p>
<br />
<strong>handleSetValue</strong>  
<p>Receives the name of the input/select and a value, and update the values object on the specific key name;</p>
<br />
<strong>handleSetValues</strong> 
<p>Update the values object completely;</p>
<br />
<strong>errors</strong>          
<p>Errors is a state, cause normally when occurs an error you want to show in the screen;</p>
<br />
<strong>handleSetErrors</strong> 
<p>Updates the errors state.</p>

## Usage

```tsx
import React, { FormEvent } from 'react'

import { useForm } from '@samform/sam-form-hooks'

const App = () => { 
  const {values, register, handleChange} = useForm({});
  

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    console.log(values);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input name="name" ref={register} onChange={handleChange}/>
      <label>Lastname</label>
      <input name="lastname" ref={register} onChange={handleChange}/>

      <div >
        <label>Street</label>
        <input name={`address[0].street`} ref={register} onChange={handleChange}/>
        <label>Street</label>
        <input name={`address[0].number`} ref={register} onChange={handleChange}/>
      </div>

      <select name="option" ref={register} onChange={handleChange} defaultValue="2">
        <option value="1">1</option>
        <option value="2">2</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  )
}

export default App
```

## License

MIT © [SamuelFormigheri](https://github.com/SamuelFormigheri)

- [NPM](https://www.npmjs.com/package/@samform/sam-hook-form)
