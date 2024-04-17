import { FormInputLabel, Input, Group } from './form-input.styles';
import { StyleSheetManager } from 'styled-components';
const FormInput = ({ label, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <StyleSheetManager shouldForwardProp={(prop) => prop !== 'shrink'}>
                    <FormInputLabel shrink={otherProps.value.length}>
                        {label}
                    </FormInputLabel>
                </StyleSheetManager>
            )}
         </Group>
    );
};

export default FormInput;