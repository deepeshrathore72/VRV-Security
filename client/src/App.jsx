import IndexPage from './pages/indexPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import './App.css'
import ProtectedRoute from './ProtectedRoute'
import Layout from './Layout';
import Login from './pages/login'
import Register from './pages/register'
import Admin from './pages/admin';
import Editor from './pages/editor';

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}> 
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Routes */}
            <Route path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
            } 
            />
            <Route path="/editor" 
              element={
                <ProtectedRoute requiredRole="editor">
                  <Editor />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App