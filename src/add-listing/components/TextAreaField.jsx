import { Textarea } from "@/components/ui/textarea"
import PropTypes from 'prop-types';

function TextAreaField({item, handleInputChange}) {
  return (
    <div>
        <Textarea required={item.required} placeholder={item?.initialName} onChange={(e) => handleInputChange(item.name, e.targe.value)}/>
    </div>
  )
}

// Validate the 'item' and 'handleInputChange' prop
TextAreaField.propTypes = {
  item: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default TextAreaField
