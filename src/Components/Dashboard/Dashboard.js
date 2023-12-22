import Navbar from './Navbardash';
import List from './List'
import Pagination from './Pagination'

import Footer from '../Home/Footer'

function Dashboard() {
    return (
      <div>
        <Navbar />
        <List />
        <Pagination/>
        
        <Footer/>
      </div>
    );
  }
  
  export default Dashboard;