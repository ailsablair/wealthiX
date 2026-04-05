import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import IncomeExpensesForm from './pages/IncomeExpensesForm';
import DiscretionarySearch from './pages/DiscretionarySearch';
import Budgeting from './pages/Budgeting';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income-expenses" element={<IncomeExpensesForm />} />
          <Route path="/discretionary" element={<DiscretionarySearch />} />
          <Route path="/budgeting" element={<Budgeting />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
