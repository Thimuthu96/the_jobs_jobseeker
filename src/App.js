import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/Home/view/Home';
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import AppRoutes from './routes/appRouter';


function App() {
  return (
    <div className="App">
      {/* <ToastContainer/> */}
      <AppRoutes/>
    </div>
  );
}

export default App;
