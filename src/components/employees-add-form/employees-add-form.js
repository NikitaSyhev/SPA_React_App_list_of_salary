import { Component } from 'react';

// import './employees-add-form.css';
import './employees-add-form.scss';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            salary: '',
        }

    }

    onValueVhange=(e)=> {
        this.setState(
            {
                [e.target.name] :e.target.value,
            }
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        //добавил проверку: имя больше 3 символов, после зарплата заполнено ( чтобы не добавлялся пустой сотрудник)
        if(this.state.name.length > 3  && this.state.salary > 0) {
            this.props.onAdd(this.state.name, this.state.salary);
        }
      
        this.setState({
            name: '',
            salary: '',
        })
    }

   


    render(){
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавить нового сотрудника: </h3>
                <form 
                className="add-form d-flex"
                onSubmit = {this.onSubmit}>
                <input type="text" 
                    className="form-control new-post-label" 
                    placeholder="Как его зовут?"
                    name="name"
                    // атрибут value создаем управляемый компонент react
                    value={name}
                    onChange={this.onValueVhange}/>
                <input type="number" 
                className="form-control new-post-label" 
                    placeholder="З.П. в рублях"
                    name="salary"
                    // атрибут value создаем управляемый компонент react
                    value={salary}
                    onChange={this.onValueVhange}/>
               
                <button className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        );
    }
  
}

export default EmployeesAddForm;