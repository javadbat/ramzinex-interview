import './list.css';
import { Header } from './header/Header';
import { Table } from './table/Table';

function Dashboard() {

  return (
    <div className="list">
      <Header/>
      <Table/>
    </div>
  )
}

export default Dashboard