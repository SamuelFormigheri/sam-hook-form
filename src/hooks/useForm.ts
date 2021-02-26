import { useCallback, useRef, useState } from 'react';

interface IAction{
  type: 'change' | 'changeArray/Obj';
  payload: {
    name: string;
    value: string;
  }
}

interface IError{
  [key: string]: string;
}

interface IUseForm{
  values: any;
  errors: IError;
  register: (element: HTMLElement | null) => void;
  handleChange: (event: any | null) => void;
  handleSetValue: (name: string, value: string) => void;
  handleSetValues: (newValues: any | null) => void;
  handleSetErrors: (errors: IError | null) => void;
}

function reducer(state: any, action: IAction){
  switch(action.type){
    case 'change':
      state[action.payload.name] = action.payload.value;
      return state;
    case 'changeArray/Obj':
      var obj: any = state;
      // eslint-disable-next-line
      action.payload.name.split('.').map((k: string, i: number, val: string[]) => {
        if(k.includes('[') && k.includes(']')){
            var index = k.substring(k.lastIndexOf('[') + 1, k.lastIndexOf(']'));
            var newName = k.substring(0, k.lastIndexOf('['));
            if(!obj[newName]) 
              obj[newName] = [];
            if(!obj[newName][index]) 
              obj[newName][index] = {};
            obj = obj[newName][index];
            if(i === val.length - 1){
              obj = action.payload.value;
            }
          }else{
            if(!obj[k])
              obj[k] = {};
            obj = (obj[k] = (i === val.length - 1 ? action.payload.value : {}));
        }
      });
      return state;
    default:
      throw new Error();
  }
}

const useForm = (initialValues: any): IUseForm => {
  const values = useRef<any>(initialValues);
  const [errors, setErrors] = useState<IError>({});

  /** *  Use to Register Inputs that render dinamically on the screen */
  const register = useCallback((element: HTMLElement | null)=>{
    if(!element)
        return;
    const name = element.getAttribute('name');
    if(!name) 
      throw new Error('You call register without the name defined');
    let value = '';
    if(element.tagName === 'SELECT')
      value = element.querySelectorAll('option:checked')[0].getAttribute('value')?.toString() || '';
    if(name.includes('.'))
      values.current = reducer(values.current, {type : 'changeArray/Obj', payload: { name, value}});
    else
      values.current = reducer(values.current, {type : 'change', payload: { name, value}});
  },[]);

  /** *   Use to change value of the input  */
  const handleChange = useCallback((event : React.ChangeEvent<HTMLElement> | null) => {
    if(!event)
      return;
    const name = event.target.getAttribute('name');
    if(!name)
      throw new Error('You call handleChange without the name defined');

    const value = (event as React.ChangeEvent<HTMLInputElement>).target.type === 'checkbox' ? (event as React.ChangeEvent<HTMLInputElement>).target.checked.toString() : (event as React.ChangeEvent<HTMLInputElement>).target.value;

    if(name.includes('.'))
      values.current = reducer(values.current, {type : 'changeArray/Obj', payload: { name, value}});
    else
      values.current = reducer(values.current, {type : 'change', payload: { name, value}});
  },[]);

  /** *   Use to Update value of a specific input  */
  const handleSetValue = useCallback((name: string, value: string) => {
    if(!name)
      return;

    if(name.includes('.'))
      values.current = reducer(values.current, {type : 'changeArray/Obj', payload: { name, value}});
    else
      values.current = reducer(values.current, {type : 'change', payload: { name, value}});
  },[]);

  /** *   Use to Update values of the inputs  */
  const handleSetValues = useCallback((newValues: any)=>{
      values.current = newValues;
  },[]);

  /** *   Use to Update values of the errors  */
  const handleSetErrors = useCallback((errors: IError)=>{
    if(errors)
      setErrors(errors);
    else
      setErrors({});
  },[]);

  return {
    values: values.current,
    errors,
    register,
    handleChange,
    handleSetValue,
    handleSetValues,
    handleSetErrors
  };
}

export default useForm;