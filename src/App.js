import {Routes, Route} from 'react-router-dom';
import {Navbar, Home, Form1, Form2, Form3, Form4, Form5, Login, NoPageMatch, PaginationProvider} from './components/main';

function App() {
  return (
    <>
      <Navbar />
      <>
      <PaginationProvider>
      <Routes>
        
        <Route path='home' element={<Home />}/>
        <Route path='form1' element={<Form1 />} />
        <Route path='form2' element={<Form2 />} />
        <Route path='form3' element={<Form3 />} />
        <Route path='form4' element={<Form4 />} />
        <Route path='form5' >
          <Route index element={<Form5 />} />
        </Route>
        <Route path='/' element={<Login />} />
        {/* <Route path ='/signup' element={<Signup />} /> */}
        <Route path='*' element={<NoPageMatch />} />
       
      </Routes>
      </PaginationProvider>
      </>
    </>
  );
}

export default App;
