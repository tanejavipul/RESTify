const ProfileInput = ({name, placeHolder, label, value, update}) => {


    return <>
        <div className="col-lg-6">
            <div className="input-group mb-3">
                <label htmlFor={name} className="col-4 profile-label">{label + ":"}</label>
                <input id={name} type="text" className="form-control col-8 input-text-styling shadow-none"
                       placeholder={placeHolder} name={name} required value={value} onChange={event => update(event)}/>
            </div>
        </div>
    </>

}
export default ProfileInput