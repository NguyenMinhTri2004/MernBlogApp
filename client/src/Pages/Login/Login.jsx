import React, {useState} from 'react'
import { Box, Button, Spinner, Flex, useToast, Link } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import InputField from '../../Components/InputField'
import Wrapper from '../../Components/Wrapper'
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../../mutations/userMutations';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('')

    const toast = useToast()

    const navigate = useNavigate();


    const [login] = useMutation(LOGIN, {
        variables: {email , password},
        update(cache, { data }) {
            // if (data?.register.success) {
            //     cache.writeQuery<MeQuery>({
            //         query: MeDocument,
            //         data: { me: data.register.user }
            //     })
            // }       
        },
      });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
        return alert('Please fill in all fields');
    }

    const res = await login()

    if(res.data.login.id === null){
        toast({
            title: 'Email or password not correct',
            status: 'error',
            duration: 3000,
            isClosable: true
        })
    }else{
        toast({
            title: 'Welcome',
            status: 'success',
            duration: 3000,
            isClosable: true
        })

        navigate('/home');
    }

    console.log(res)

  }
  return (

    <Wrapper size='small'>
					{/* {error && <p>Failed to login. Internal server error.</p>} */}
					<Formik>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									name='Email'
									placeholder='Email'
									label='Email'
									type='text'
                                    onChange={(e) => setEmail(e.target?.value)}
								/>

								<Box mt={4}>
									<InputField
										name='password'
										placeholder='Password'
										label='Password'
										type='password'
                                        onChange={(e) => setPassword(e.target?.value)}
									/>
								</Box>

								<Button
									type='submit'
									colorScheme='teal'
									mt={4}
                                    onClick = {(e) => handleLogin(e)}
								>
									Login
								</Button>
							</Form>
						)}
					</Formik>
	</Wrapper>
  )
}

export default Login