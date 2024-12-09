import {Component} from 'react';
import './employees-list-item.css';


class EmployeesListItem extends Component {
    constructor (props) {
        super();
        this.state = {
            increase: false,
            className: 'list-group-item d-flex justify-content-between',
        }
    }

    onInclease = ()=> {
        //круглые скобки заменяют return ( после =>)
        this.setState(({increase})=>({
            //ставим обратное значение
            increase: !increase,
            }
        ))
    }

    classLikeAdd = ()=> {
        this.setState(({className})=>({
            className: 'list-group-item d-flex justify-content-between like',
        }))
    }

   render () {
    const {name, salary} = this.props;
    let {increase, className} = this.state;
  
    if(increase) {
        className += ' increase';
    }

        return (
            <li className={className}>
                <span className="list-group-item-label" onClick={this.classLikeAdd}>{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + ' руб.'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onInclease}>
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                            className="btn-trash btn-sm ">
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
    
   }
}

export default EmployeesListItem;