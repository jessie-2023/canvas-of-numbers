import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import './styles/constants.scss'
import Home from './pages/Home/Home'
import GenderGap from './pages/GenderGap/GenderGapPage'
import UnitedCanada from './pages/UnitedCanada/UnitedCanadaPage'
import HotDocs from './pages/HotDocs/HotDocs'


function App()
{
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/gender-gap" element={<GenderGap />} />
        <Route path="/canadian-federalism" element={<UnitedCanada />} />
        <Route path="/documentaries" element={<HotDocs />} />
        {/* <Route path="/gender-gap/country/:id" element={<CountryGenderGap />} /> */}
      </Routes>
    </Router>
  )
}
export default App
