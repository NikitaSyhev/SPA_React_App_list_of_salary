import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
class App extends Component {

    constructor(props) {
        super();
        this.state = {
            data: [
                {name: 'Nikita', salary: 250000, increase: true, id: 1},
                {name: 'Ivan', salary: 200000, increase: false, id: 2},
                {name: 'Oleg', salary: 150000, increase: true, id: 3},
            ]
        }
    }

    deleteItem=(id)=>{
        this.setState(({data}) => {
            //алгоритм удаления элемента массива по индексу ( задача найти элемент массива, с ужным ID и удалить)
            const index = data.findIndex(elem => elem.id  === id);
            
            const before = data.slice(0, index);
            const after = data.slice(index +1);
            //из 2 массивов создаем один
            const newArr = [...before,...after];

            return {
                data: newArr,
            }
        })
    }

    render() {
        return (
            <div className='app'>
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                
                <EmployeesList 
                data={this.state.data}
                onDelete={this.deleteItem}/>
                <EmployeesAddForm/>
            </div>
        );
    }

}

export default App;


