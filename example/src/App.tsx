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
