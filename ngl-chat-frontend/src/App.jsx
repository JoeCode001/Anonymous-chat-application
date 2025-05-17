import './App.css'
import AppRouter from './router/router'
import { AuthProvider } from './context/AuthProvider'  // adjust path if needed

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
