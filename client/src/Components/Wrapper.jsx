import React from 'react'
import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Wrapper = ({ children, size = 'regular' }) => {
	return (
		<Box
			maxW={size === 'regular' ? '800px' : '400px'}
			w='100%'
			mt={8}
			mx='auto'
		>
			{children}
		</Box>
	)
}

export default Wrapper