import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            term: '',
        }
    }

    //метод для создания управляемого компонента и передачи props term в APP.JS(наверх)
    //этот метод считывает данные, которые ввел пользователь и записывает их в стейт
    onUpdateSearch= (e) => {
       const term = e.target.value;
       this.setState({
        term,
       });
       //функция для передачи props в главный компонент APP.JS
       this.props.onUpdateSearch(term);//этф функция пришла из компонента APP.JS
    }

    render () {
        return (
            <input 
                type="text" 
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value ={this.state.term}
                onChange = {this.onUpdateSearch}/>
        )
    }
}



export default SearchPanel;