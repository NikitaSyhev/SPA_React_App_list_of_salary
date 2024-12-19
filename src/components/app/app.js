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
                {name: 'Nikita', salary: 250000, increase: true, rise: false,id: 1},
                {name: 'Ivan', salary: 200000, increase: false, rise: false,id: 2},
                {name: 'Oleg', salary: 150000, increase: true, rise: false,id: 3},
                
            ]
        }
        this.maxId = 4;
    }

    //удаление сотрудника
    deleteItem=(id)=>{
        this.setState(({data}) => {
            //алгоритм удаления элемента массива по индексу ( задача найти элемент массива, с ужным ID и удалить)
            const index = data.findIndex(elem => elem.id  === id);
            
            const before = data.slice(0, index);
            const after = data.slice(index +1);
            //из 2 массивов создаем один
            const newArr = [...before,...after];

            return {
                //более простой вариант через меотод filter
                //data: data.filter(item => item.id != id);
                data: newArr,
            }
        })
    }

    //добавление нового сотрудника
    addItem = (name,salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id:this.maxId++,
        }

        this.setState(({data})=> {

        //создание нового массива через спред оператор ( берем старый массив + добавляем элемент newItem)
        const newArr = [...data, newItem];

        return {
            data: newArr,
        }
    });
}
    //меняет параметр Increse на противоположный / INCREASE - сотсояние
    onToggleIncrease = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            //создали новый объект
            const newItem = {...old, increse: !old.increase};
            //теперь моняем state
            const newArr = [...data.slice(0,index), newItem, ...data.slice(index+1)];

            return  {
                data:  newArr
            }

        })
    }

    //меняет состояние сотрудника ( повышается или нет) на противоположное / RISE - состояние
    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id  === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }


    render() {
        //посчитали количество сотрудников
        const employees = this.state.data.length;
        // посчитали количество сотрудников, которые получат премию
        const increased = this.state.data.filter(item => item.increase.true).length;
        return (
            <div className='app'>
                <AppInfo employees={employees} increased = {increased}/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                
                <EmployeesList 
                data={this.state.data}
                onDelete={this.deleteItem}
                onToggleIncrease={this.onToggleIncrease}
                onToggleRise={this.onToggleRise}/>
                <EmployeesAddForm
                onAdd={this.addItem}
                />
            </div>
        );
    }

}

export default App;


