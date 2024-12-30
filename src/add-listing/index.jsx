// Import the JSON data from the 'Shared' folder
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json"

// Import the components
import Header from "@/components/Header";
import InputField from "./components/inputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";

// Import the 'Separator', 'Checkbox' and 'Button' component
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Import the 'PropTypes' and 'useState' from the 'react' library
import PropTypes from "prop-types";
import { useState } from "react";
import { CarListing } from "./../../configs/schema";
import { db } from "./../../configs";

function AddListing() {
  // Declare the 'formData' and 'featuresData' state variable using the 'useState' hook
  const [formData, setFormData] = useState([]); {/* It will store the form data */}
  const [featuresData, setFeaturesData] = useState([]); {/* It will store the features data */}

  /**
   * Used to save User Input
   * @param {*} name
   * @param {*} value
   */

  // It will handle the input change
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(formData); {/* It will log the form data in the console */}
  };

    /**
   * Used to save Feature List
   * @param {*} name
   * @param {*} value
   */

  // It will handle the features change
  const handleFeaturesChange = (name  , value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(featuresData); {/* It will log the features data in the console */}
  };

  // It will handle the form submission
  const onsubmit = async (e) => {
    e.preventDefault(); {/* It will prevent the default form submission */}
    console.log(formData);
    
    try {
      // Insert the data into the database both 'formData' and 'featuresData'
      const result = await db.insert(CarListing).values({
        ...formData,
        features: featuresData
      }).execute();

      if (result) {
        console.log("Data Inserted Successfully");
      } else {
        console.log("Data Insertion Failed");
      }
    } catch (error) {
      console.error("Database Error:", error.message);
    }
  };


  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <form className="p-10 bg-white border rounded-xl mt-10">
          {/* Car Details */}
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                carDetails.carDetails.map((item, index) => (
                    <div key={index}>
                      {/* 
                        Condition 1: if the 'FieldType' is 'text' or 'number' then display 'InputField' component
                        Condition 2: if the 'FieldType' is 'dropdown' then display 'DropdownField' component
                        Condition 3: if the 'FieldType' is 'textarea' then display 'Textarea' component
                        Else: return null
                      */}
                        <label className="flex items-center gap-2 mb-2 text-sm"><IconField icon={item.icon}/>{item?.label} {item.required && <span className="text-red-500">*</span>}</label>
                        {
                          item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChange={handleInputChange}/>
                          : item.fieldType == 'dropdown' ? <DropdownField item={item} handleInputChange={handleInputChange}/>
                          : item.fieldType == 'textarea' ? <TextAreaField item={item} handleInputChange={handleInputChange}/>
                          : null
                        }
                    </div>
                ))
            }
          </div>

          <Separator className="my-6"/>
          {/* Feature List Checklist */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                features.features.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox onCheckedChange={(value) => handleFeaturesChange(item.name, value)}/> {/* It returns item.name: value in every ticked checkboxes */}
                    <h2>{item.label}</h2>
                  </div>
                ))
              }
            </div>
          </div>

          <Separator className="my-6"/>
          {/* Car Images */}


          {/* Submit Button */}
          <div className="flex mt-10 justify-end">
            <Button type="submit" onClick={(e) => onsubmit(e)}>Submit</Button>
          </div>
        </form>
        <UploadImages />
      </div>
    </div>
  );
}

// Validate the 'PropTypes'
InputField.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    fieldType: PropTypes.oneOf(['text', 'number']),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired  // Added missing PropType
}

DropdownField.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    fieldType: PropTypes.oneOf(['dropdown']),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.array
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired  // Added missing PropType
}

export default AddListing;
