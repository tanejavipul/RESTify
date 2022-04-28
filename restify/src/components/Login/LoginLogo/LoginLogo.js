
const LogoName = () => {

    return (
        <div className={"login-align-b"}>
            <img src={require('../../assets/Restaurant-Logo/restaurant-logo.png')} height="110px"
                 className="float-left" alt=" "/>
            <h1 className="login-h1 nav-logo-color d-inline align-bottom"> RESTify</h1>
            <h6 className={" nav-logo-color align-bottom"}>A PLACE WHERE BLOGGERS CAN JUST TALK FOOD</h6>
        </div>
    )

}
export default LogoName