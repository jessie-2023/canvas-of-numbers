import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import GenderGap from './pages/GenderGap'


function App()
{
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/gender-gap" element={<GenderGap />} />
        {/* <Route path="/country" element={<CountrySearch />} />
        <Route path="/gender-gap/country/:id" element={<CountryGenderGap />} /> */}
      </Routes>
    </Router>
  )
}
export default App
