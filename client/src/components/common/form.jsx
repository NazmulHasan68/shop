
import { Input } from "../ui/input";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const types = {
    INPUT : 'input',
    SELECT : 'select',
}

export default function CommonForm({formControls, FormData , setFormData, onSubmit, buttonText, isBtnDisable}) {

    const renderInputsByComponentType = (getControlItem) =>{  
        let element = null;
        let value = FormData[getControlItem.name] || ''

        switch (getControlItem?.componentType){
            case types.INPUT : 
                element =( <Input
                    name = {getControlItem?.name}
                    placeholder = {getControlItem?.placeholder}
                    id = {getControlItem?.name}
                    type ={getControlItem?.type}
                    value={value}
                    onChange={event =>setFormData({
                        ...FormData,
                        [getControlItem?.name] : event.target.value
                    })}
                />)
                break ;

            case types.SELECT: 
                element =(
                    <Select onValueChange={(value)=>setFormData({
                        ...FormData,
                        [getControlItem?.name] : value
                    })} value={value}>
                        <SelectTrigger className="w-full border py-2 rounded">
                            <SelectValue placeholder={getControlItem?.label}/>
                        </SelectTrigger>
                        <SelectContent className='border bg-white'>
                            {
                                getControlItem?.options && 
                                getControlItem?.options.length > 0 ?
                                getControlItem?.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id} className='border-b py-2'>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break ;

            case 'textarea' : 
                element =( 
                    <Textarea
                        name ={getControlItem?.name}
                        placeholder ={getControlItem?.placeholder}
                        id = {getControlItem?.id}
                        value={value}
                        onChange={event =>setFormData({
                        ...FormData,
                        [getControlItem?.name] : event.target.value
                    })}
                    />
                )
                break ;

            default :
                element = (
                    <Input
                    name = {getControlItem?.name}
                    placeholder = {getControlItem?.placeholder}
                    id = {getControlItem?.name}
                    type ={getControlItem?.type}
                    value={value}
                    onChange={event =>setFormData({
                        ...FormData,
                        [getControlItem?.name] : event.target.value
                    })}
                />)
                break
        }

        return element
    }

  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
            {
                // eslint-disable-next-line react/prop-types
                formControls?.map((controlItem) => (<div className="grid w-full gap-1.5" key={controlItem?.name}>
                    <Label className="mb-1">{controlItem.label}</Label>
                    {
                        renderInputsByComponentType(controlItem)
                    }
                </div>
                ))
            }
        </div>
        <Button disabled={isBtnDisable} type='submit' 
            className='mt-4 w-full text-white bg-slate-800 hover:bg-gray-700 '>
            {buttonText|| 'submit'}
        </Button>
    </form>
  )
}
