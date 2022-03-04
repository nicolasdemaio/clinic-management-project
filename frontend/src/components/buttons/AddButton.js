import './AddButton.css'

const AddButton = (props) => {

    const handleAdd = async (event) => {
        event.preventDefault();
    }

    return (
        <>
        <button className='add-button' onClick={handleAdd}>Agregar +</button>
        </>
    )
}

export default AddButton