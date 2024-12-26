import { Input } from "@/components/ui/input";
import PropTypes from 'prop-types';

function InputField({item, handleInputChange}) {
  return (
    <div>
      <Input type={item?.fieldType} 
      name={item?.name}
      required={item?.required}
      onChange = {(e) => handleInputChange(item.name, e.target.value)}/>
    </div>
  );
}

// Validate the 'item' and 'handleInputChange' prop
InputField.propTypes = {
  item: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default InputField;
