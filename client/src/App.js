
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './Components/Content';
import DetailBlog from './Pages/Blog/DetailBlog';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { ChakraProvider } from '@chakra-ui/react'


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        blogs: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});



const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});


function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ChakraProvider>
            <Router>
              <Header />
              <div className='container'>
                <Routes>
                  <Route path='/home' element={<Content />} />
                  <Route path='/blogs/:id' element={<DetailBlog />} />
                  <Route path='*' element={<NotFound />} />
                  <Route path='/register' element={<Register/>} />
                  <Route path='/' element={<Login/>} />
                </Routes>
              </div>
            </Router>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );

  
}


export default App;
