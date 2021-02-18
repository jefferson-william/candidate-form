import React, { useCallback } from 'react'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import { AddInformationFieldsProps } from '~/types/components/AddInformationFields'

const AddInformationFields: React.FC<AddInformationFieldsProps> = ({
  list,
  name,
  text,
  register,
  setList,
  formControlClass,
}) => {
  const handleAdd = useCallback(() => setList([...list, list.length]), [list])

  const handleRemove = useCallback(() => {
    list.pop()

    setList([...list])
  }, [list])

  return (
    <>
      {list.map((index) => (
        <FormControl key={index} className={formControlClass} required>
          <InputLabel htmlFor={`${name}${index}`}>{text}</InputLabel>
          <Input
            id={`${name}${index}`}
            name={`${name}[${index}]`}
            inputRef={register({ required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled={list.length === 1} aria-label="Remover" onClick={handleRemove}>
                  <Close />
                </IconButton>
                {list.length - 1 === index && (
                  <IconButton aria-label="Adicionar" onClick={handleAdd}>
                    <Add />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      ))}
    </>
  )
}

export default AddInformationFields
