import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Nikita', salary: 250000, increase: true, rise: false,id: 1},
                {name: 'Ivan', salary: 200000, increase: false, rise: false,id: 2},
                {name: 'Oleg', salary: 80000, increase: true, rise: false,id: 3},
            ],
            //строчка, по которой осуществляется поиск
            term: '',
            //стейт для софильрации: зарплата выше и сотурдники на повышение
            filter: 'all',
        }
        this.maxId = 4;
    }

    // ВАЖНО!!
    // методы действия пользователя начинаются с on (onToggleIncrease, onToggleRise, onUpdateSearch)
    //статические функции, которые используются внутри метода без on..


    //удаление сотрудника
    deleteItem=(id)=>{
        this.setState(({data}) => {
            //алгоритм удаления элемента массива по индексу ( задача найти элемент массива, с ужным ID и удалить)
            const index = data.findIndex(elem => elem.id  === id);
            
            const before = data.slice(0, index);
            const after = data.slice(index +1);
            //из 2 массивов создаем один - spread оператор
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

    //метод поиска сотруднкиа в списке
    // items - исходный массив данных, term - строка для поиска
    searchEmp = (items, term) => {
        //если пользователь ничего не ввел - вохвращаем исходные данные
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })

    }

    //метод для передачи стейта из search panel до app.js
    onUpdateSearch = (term) => {
        this.setState({
            term,
        });
    }

    //метод для фильтрации списка сотрудников при нажатиии кнопки
    filterPost =(items, filter) => {
        switch(filter){
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000RUB':
                return items.filter(item => item.salary > 100000); 
            default:
                return items;
        }
    }

    //метод фильтрации при нажатии кнопок пользователем (передача стейта из app filter в app.js)
    onFilterSelect =(filter) => {
        this.setState({filter});
    }

    render() {
        //деструктурировали стейт
        const {data, term, filter} = this.state;
        //посчитали количество сотрудников
        const employees = this.state.data.length;
        // посчитали количество сотрудников, которые получат премию
        const increased = this.state.data.filter(item => item.increase.true).length;
        //отфильтрованные данные
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo employees={employees} increased = {increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployeesList 
                data={visibleData}
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


