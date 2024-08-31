import './employees-add-form.css'

const EmployeesAddForm = () => {
    return (
        <div className="app-add-form">
            <h3>Добавить нового сотрудника: </h3>
            <form 
            className="add-form d-flex">
            <input type="text" 
                className="form-control new-post-label" 
                placeholder="Как его зовут?"/>
            <input type="number" 
                placeholder="З.П. в рублях"/>
                className="form-control new-post-label" 
            <button className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    );
}

export default EmployeesAddForm;