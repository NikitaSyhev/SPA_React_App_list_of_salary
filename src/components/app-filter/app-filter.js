import './app-filter.css';

const AppFilter = (props)=> {

    //переменная для кнопок из верстки
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники',},
        {name: 'rise', label: 'На повышение',},
        {name: 'moreThen1000RUB', label: 'От 100 тыс. рублей',},
    ];

    // формируем массив элементов на базе buttonsData
    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn btn-light' : 'btn btn-outline-light';
        return (
            <button 
            className={clazz}
            type="button"
            key = {name}
            onClick={()=>props.onFilterSelect(name)}>
                {label}
            </button> 
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;