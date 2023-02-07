import React, {useState} from 'react'
import { Box, Button, Spinner, Flex, useToast, Link } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import InputField from '../../Components/InputField'
import Wrapper from '../../Components/Wrapper'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER } from '../../mutations/userMutations';


const Register = () => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('')

    const toast = useToast()

    const [addUser] = useMutation(ADD_USER, {
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


  
  const handleRegister = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
        return alert('Please fill in all fields');
    }
    const res = await addUser()
    if(res.data.addUser.id === null){
        toast({
            title: 'Email exit',
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
    }
    
    // router.push('/')
  }


  return (

    <Wrapper size='small'>
					<Formik >
							<Form>
								<InputField
									name='email'
									placeholder='Email'
									label='Email'
									type='text'
                                    value = {email}
                                    onChange={(e) => setEmail(e.target?.value)}
								/>

								<Box mt={4}>
									<InputField
										name='password'
										placeholder='Password'
										label='Password'
										type='password'
                                        value = {password}
                                        onChange={(e) => setPassword(e.target?.value)}
									/>
								</Box>

								<Button
									type='submit'
									colorScheme='teal'
									mt={4}
                                    onClick = {(e) => handleRegister(e)}
									// isLoading={isSubmitting}
								>
									Register
								</Button>
							</Form>
                    </Formik>
					
	</Wrapper>
  )
}

export default Register