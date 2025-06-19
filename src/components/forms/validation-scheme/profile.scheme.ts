import * as yup from 'yup';

import { FieldRegex, ValidationMessage } from '~/utils/forms.constant';

export const profileSchema = yup.object({
    firstName: yup
        .string()
        .required(ValidationMessage.RequiredFirstName)
        .matches(FieldRegex.Firstletter, ValidationMessage.InvalidNameLetter)
        .matches(FieldRegex.Name, ValidationMessage.InvalidName)
        .max(50, ValidationMessage.MaxLength),
    lastName: yup
        .string()
        .required(ValidationMessage.RequiredLastName)
        .matches(FieldRegex.Firstletter, ValidationMessage.InvalidNameLetter)
        .matches(FieldRegex.Name, ValidationMessage.InvalidName)
        .max(50, ValidationMessage.MaxLength),
    email: yup
        .string()
        .required(ValidationMessage.RequiredEmail)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Email, ValidationMessage.InvalidEmail),
    login: yup
        .string()
        .required(ValidationMessage.RequiredLogin)
        .max(50, ValidationMessage.MaxLength)
        .matches(FieldRegex.Login, ValidationMessage.InvalidFormat)
        .min(5, ValidationMessage.InvalidFormat),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
