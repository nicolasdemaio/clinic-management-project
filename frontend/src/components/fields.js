import './fields.css'
// Pensaba poner a cada cosa su largo debido.
// Para tener un estilo uniforme en toda la pagina.
// Rodri pls cambia lo que no te parezca y borra si es necesario.

const DateField = (props) => {
    return (
        <label>{props.text}
          <input type="date" required />
          </label>
    )
}

const DocumentTypeField = (props) => {
    return (
        <label for='ldocumenttype' className='form-field'>
            {props.text}
              <select>
                <option value="dni">D.N.I.</option>
                <option value="lc">L.C.</option>
                <option value="le">L.E.</option>
                <option value="ci">C.I.</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </label>
    )
}

const FullnameTextField = (props) => {
    return (
        <div className='fullname-field'>
              <ShortTextField text='Nombre/s'/>
              <ShortTextField text='Apellido'/>
        </div>
    )
}

const EmailTextField = (props) => {
    return (
        <label for="lpassword" className='form-label'>{props.text}
            <input type='text' name='lpassword' required className='form-field'/>
          </label>
    )
}

const DocumentField = (props) => {
    return (
        <div className='ldocument'>
            <DocumentTypeField text='Tipo de documento'/>
            <ShortTextField text='Número de documento'/>
          </div>
    )
}


const LongTextField = (props) => {
    return (
        <label for="lpassword" className='form-label'>{props.text}
            <input type='text' name='lpassword' required className='form-field'/>
          </label>
    )
}

const ShortTextField = (props) => {
    return (
        <label for="lpassword" className='form-label'>{props.text}
            <input type='text' name='lpassword' required className='form-field'/>
          </label>
    )
}

export {
    DateField, 
    ShortTextField,
    LongTextField,
    DocumentField,
    FullnameTextField,
    EmailTextField
}