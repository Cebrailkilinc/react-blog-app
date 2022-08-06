import * as Yup from 'yup';

const validationSchema = Yup.object({	
	email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
    username:Yup.string().required("zorunlu alan"),
    password: Yup.string().required("Zorunlu alan"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password")]).required(),
});

export default validationSchema;